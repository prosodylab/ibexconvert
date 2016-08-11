import sys
import re
import json

#README
#Instructions: This script takes as input (1) an experiment file, annotated with words of interest, (2) a results file from an ibexfarm experiment(old formatting, this should be obsolete now that Megan has given tab-delimited output) and (3) the desired name of output file.

#This is specially formatted to the second spr experiment right now, but this can be changed by going through and editing the column titles, in the future, if this script is needed again, it would be wise to generate these automatically by grabbing the relevant columns. However, this script is very likely obsolete now.

ExperimentFile=sys.argv[1]
ResultsFile=sys.argv[2]
OutputFile=sys.argv[3]

def indexwd(l, colnames, name, default=None):
    assert name is not None
    index = None
    try:
        index = colnames.index(name)
    except ValueError:
        return default
    return l[index]

#plan
#for each row in the experiment file:
##take item and condition number as well as sentence.
##Find every matching item and condition number for that sentence in the results file
###Each time the sentence is found(with matching item number and condition)
####Have a while loop, cycle through annotated words in sentence, checking each one and tracking the index
####If there is one which
def WOI_Annotation(Exp,Res,Out):
    f=open(Exp)
    f2=open(Res)

    ExpLines = [x for x in re.split(r"(?:\r\n)|(?:\n)|(?:\r)", f.read()) if len(x) > 1 or (len(x) == 1 and not re.match(r"^\s*$", x[0]))]
    f.close()
    ColNames = re.split(r"\s*\t+\s*", ExpLines[0])
    ExpLines = [re.split(r"\"*\s*\t+\s*\"*", x) for x in ExpLines[1:]]
    
    ResList=re.split(r"(?:\r\n)|(?:\n)|(?:\r)",f2.read())
    f2.close()

    commaCount=0
    ResHeaderList=[]
    ResRowList=[]
    wordColName=""
    pattern=re.compile(r"(?:^#\s*Col\.\s*)(\d?\d?)(?::)(?:\s*)(.*)")
    for ResLine in ResList:
        match=pattern.match(ResLine)
        if match:
            if (match.group(2)) not in ResHeaderList and int(match.group(1)) >len(ResHeaderList):
                tstring=(match.group(2)).lstrip('')
                ResHeaderList.append(tstring)
            elif int(match.group(1)) < len(ResHeaderList) and (match.group(2) not in ResHeaderList[int(match.group(1))-1]) and ("\t"+match.group(2)) not in ResHeaderList:
                ResHeaderList[int(match.group(1))-1]+=("/"+match.group(2)).lstrip('')
                if '.Word' in ResHeaderList[int(match.group(1))-1] and 'Word number' not in ResHeaderList[int(match.group(1))-1]:
                    wordColName=ResHeaderList[int(match.group(1))-1]
        else:
            if ResLine and ResLine[0]!='#':
                ResRowList.append(ResLine)
    ResHeaderString=','.join(ResHeaderList)
    commaCount=ResHeaderString.count(',')
    print commaCount
    ResRowList.insert(0,ResHeaderString)

    #place column full of NA and headed Word of Interest
    for ind,val in enumerate(ResRowList):
        ResRowList[ind]=ResRowList[ind].split(",")
        if ind==0:
            ResRowList[ind].insert(10,"Word of Interest")
            ResHeaderList.insert(10,"Word of Interest")
            ResRowList[ind].insert(11,"Zone of Interest")
            ResHeaderList.insert(11,"Zone of Interest")
        else:
            ResRowList[ind].insert(10,"NA")
            ResRowList[ind].insert(10,"NA")
            while len(ResRowList[ind])<commaCount+3:
                ResRowList[ind].append("NULL")
    #Two for loops: Outer loop(experiment file), inner loop(results file)
    resInd=0
    senPos=0
    expPattern=re.compile(r"^(.*)_(.*)$")#(r"^(\w*.?,?)_(.*)$")
    expPattern2=re.compile(r"^(.*)$")#(r"^(\w*.?,?)$")
    resCondPattern=re.compile(r"0-(\d)")
    condPattern2=re.compile(r"(.*)-(\d)")
    for expR in ExpLines:
        #extracting experiment condition and item number(matches item in the Res to the row num in the Exp)
        expItem=indexwd(expR,ColNames,"item")#ExpLines.index(expR)
        expCond=indexwd(expR,ColNames,"condition")
        #need regex to retrieve array of words and markers
        expText=""
        if indexwd(expR,ColNames,"text")!=None:
            expText=indexwd(expR,ColNames,"text").split(" ")
        wordArray=[]
        markerArray=[]
        #this places all the words for the current sentence in the wordArray, and all the markers in the markerArray
        #if there is no marker for a word, NA is placed in the corresponding spot
        for e in expText:
            expMatch=expPattern.match(e)
            expMatch2=expPattern2.match(e)
            if expMatch:
                wordArray.append(expMatch.group(1))
                markerArray.append(expMatch.group(2))
            elif expMatch2:
                wordArray.append(expMatch2.group(1))
                markerArray.append("NA")
        resInd=0
        for i,resR in enumerate(ResRowList):
            resItem="!"
            if indexwd(resR,ResHeaderList,"Group.").isdigit():
                resItem=int(indexwd(resR,ResHeaderList,"Group."))
            resCond=""
            if indexwd(resR,ResHeaderList,"Type.")!=None:
                resCond=indexwd(resR,ResHeaderList,"Type.")
            rCond=-1
            if resInd<=i:
                sentenceFinished=False
            resMatch=condPattern2.match(resCond)
            if resMatch:
                if resMatch.group(1)=="filler":
                    #filler
                    resItem=resMatch.group(2)
                    rCond=resMatch.group(1)
                else:
                    #nonfiller
                    resItem=resMatch.group(1)
                    rCond=resMatch.group(2)
            #need to extract condition and item number from both
            #need to match based on condition and item number(adjusted by some factor??)
            #if sentence/item/cond matches then start a while loop
            #print resItem+"=="+expItem
            #print str(rCond)+"=="+str(expCond)
            if str(resItem)==str(expItem) and str(rCond)==str(expCond) and sentenceFinished==False:
                for idx, val in enumerate(wordArray):
                    #goals: using idx, check each word against the experiment file and mark woi by appending to ResRowList
                    #how to:
                    print resR[-1]
                    if resR[-1]=="NULL" or (resInd)>len(ResRowList) or resR[-1].isdigit():
                        resInd+=1
                        break
                    #issue:resInd is off in some cases
                    #print str(idx)+"??"+str(resInd)
                    #print val+"=="+indexwd(ResRowList[resInd],ResHeaderList,"Field value./Answer./Word.").replace("%2C",",")
                    if val==indexwd(ResRowList[resInd],ResHeaderList,"Field value./Answer./Word.").replace("%2C",","):
                        #print "replacing 2c chars"
                        if ResRowList[resInd][10]=="NA":
                            ResRowList[resInd][10]=markerArray[idx]
                            ResRowList[resInd][11]=markerArray[idx]
                    resInd+=1
                sentenceFinished=True
            #include elif to catch up to current resInd position, assuming I move by more than one resind
            #else
            elif sentenceFinished==True:
                #if str(resInd)<=str(ResRowList.index(resR)):
                pass
            else:
                resInd+=1
    ##ZONES OF INTEREST STUFF
    currentZoi="NA"
    for idx, r in reversed(list(enumerate(ResRowList))):
        #Need to go up ZOI column
        #variable needed: Current Zoi
        #paste current zoi in any space with NA
        #if not NA, change currrent zoi
        if ResRowList[idx][11]=="Zone of Interest":
            break
        if str(indexwd(r,ResHeaderList,"Field name./Question2 (NULL if none)./Question (NULL if none)./Word number."))=="1":
            if indexwd(r,ResHeaderList,"Zone of Interest")=="NA":
                ResRowList[idx][11]=currentZoi
            currentZoi="NA"
        else:
            if indexwd(r,ResHeaderList,"Zone of Interest")=="NA":
                ResRowList[idx][11]=currentZoi
            else:
                currentZoi=indexwd(r,ResHeaderList,"Zone of Interest")
                ResRowList[idx][11]=currentZoi
    ###WORKERID ANNOTATION PART
    currentID="NULL"
    ResRowList[0].append("workerID")
    ResHeaderList.append("workerID")
    for idx, row in enumerate(ResRowList):
        if idx==0:
            pass
        elif idx!=0 and "workerid" in row:
            currentID=indexwd(row,ResHeaderList,"Field value./Answer./Word.")
            if currentID=="":
                currentID="NULL"
            ResRowList[idx].append(currentID)
        else:
            ResRowList[idx].append(currentID)
    ###ORIGINAL ITEM NUMBER AND CONDITION ANNOTATION
    resCondPattern=re.compile(r"(.*)-(.*)")
    fillerCondPattern=re.compile(r"filler-(.*)")
    originalItemNum=0
    originalCondition=-1
    ResRowList[0].append("Original Item Number")
    ResHeaderList.append("Original Item Number")
    ResRowList[0].append("Condition")
    ResHeaderList.append("Condition")
    for idx, row in enumerate(ResRowList):
        #ITEM
        #if idx==0:
        #    pass
        #elif idx!=0 and indexwd(row,ResHeaderList,"Group.")!="NULL":
        #    originalItemNum=int(indexwd(row,ResHeaderList,"Group."))/2
        #    ResRowList[idx].append(str(originalItemNum))
        #elif idx!=0 and indexwd(row,ResHeaderList,"Group.")=="NULL":
            #filler found, new pattern
        #else:
        #    ResRowList[idx].append("NULL")
        #CONDITION
        if idx==0:
            pass
        elif idx!=0 and indexwd(row,ResHeaderList,"Type.")!="NULL":
            if indexwd(row,ResHeaderList,"Type.")!=None:
                resCond=indexwd(row,ResHeaderList,"Type.")
            resMatch=resCondPattern.match(resCond)
            if resMatch:
                if resMatch.group(1)=="filler":
                    #filler
                    originalCondition=resMatch.group(1)
                    originalItemNum=resMatch.group(2)
                else:
                    #not filler
                    originalCondition=resMatch.group(2)
                    originalItemNum=resMatch.group(1)
                originalCondition=resMatch.group(1)
            else:
                originalCondition="NULL"
                originalItemNum="NULL"
            #print "Original condition is: "+originalCondition
            ResRowList[idx].append(str(originalItemNum))
            ResRowList[idx].append(str(originalCondition))
        else:
            ResRowList[idx].append("NULL")
            ResRowList[idx].append("NULL")
    ###QUESTION COMBINATION(Word+Understanding)
    understandingRows=[]
    ##Go through once, add all rows that aren't understanding questions##the actual spr rows
    ##Second time, use nested loops of [sprRows(fullResults)], if an understanding questions has the same(id,cond,item)
    ##then place them on the corresponding sprRow
    ##this list is what will be written 
    ###ALTERNATE IDEA: Grab all understanding questions, copy into a new list, and delete them from the old list
    ##Then match them
    for row in ResRowList[:]:
        #grab all understanding questions
        ##if it has a condition, an item number, a workerid!=null, and the word column isdigit()
        if indexwd(row,ResHeaderList,"Field value./Answer./Word.").isdigit() and indexwd(row,ResHeaderList,"workerID")!="NULL"and indexwd(row,ResHeaderList,"Original Item Number")!="NULL" and indexwd(row,ResHeaderList,"Condition")!="NULL":
            #store row
            understandingRows.append(row)
            #deleting from main list
            ##need to change, can't modify list while iterating over it
            ResRowList.remove(row)
        else:
            pass
    #RRL2=ResRowList
    #for idx, row in enumerate(RRL2):
    #    if row in understandingRows:
    #        print "removing: "+str(row)
    #        ResRowList.remove(row)
    ###add understanding rows to rows which have matching item num, workerid, and condition
    ResRowList[0].append("Understanding Question")
    ResHeaderList.append("Understanding Question")
    ResRowList[0].append("Answer Correctness")
    ResHeaderList.append("Answer Correctness")
    ResRowList[0].append("Field Value")
    ResHeaderList.append("Field Value")
    ResRowList[0].append("Response Time")
    ResHeaderList.append("Response Time")
    ResRowList[0].append("Rating Question")
    ResHeaderList.append("Rating Question")
    ResRowList[0].append("Whether or not answer was correct(NULL if not applicable)")
    ResHeaderList.append("Whether or not answer was correct(NULL if not applicable)")
    ResRowList[0].append("Naturalness Value")
    ResHeaderList.append("Naturalness Value")
    ResRowList[0].append("Response Time")
    ResHeaderList.append("Response Time")
    for idx, row in enumerate(ResRowList):
        for jdx, uRow in enumerate(understandingRows):
            #print str(indexwd(row,ResHeaderList,"workerID"))+"=="+str(indexwd(uRow,ResHeaderList,"workerID"))
            #print indexwd(row,ResHeaderList,"Original Item Number")+"=="+indexwd(uRow,ResHeaderList,"Original Item Number")
            #print str(indexwd(row,ResHeaderList,"Condition"))+"=="+str(indexwd(uRow,ResHeaderList,"Condition"))
            if idx==0:
                pass
            elif (indexwd(row,ResHeaderList,"workerID")==indexwd(uRow,ResHeaderList,"workerID")) and indexwd(row,ResHeaderList,"Original Item Number")==indexwd(uRow,ResHeaderList,"Original Item Number") and indexwd(row,ResHeaderList,"Condition")==indexwd(uRow,ResHeaderList,"Condition"):
                print "MATCH ITEM APPEND"
                print idx
                print jdx
                ResRowList[idx].append(indexwd(uRow,ResHeaderList,"Field name./Question2 (NULL if none)./Question (NULL if none)./Word number."))
                ResRowList[idx].append(indexwd(uRow,ResHeaderList,"Whether or not answer was correct (NULL if N/A)./Reading time."))
                ResRowList[idx].append(indexwd(uRow,ResHeaderList,"Field value./Answer./Word."))
                ResRowList[idx].append(indexwd(uRow,ResHeaderList,"Time taken to answer./Newline?"))
            else:
                pass
    for idx, row in enumerate(ResRowList):
        if idx==0:
            pass
        else:
            print "null fixing"
            #fill in nulls on non question columns
            #change to for loop, for each cell that needs to be filled(based on length)
            if len(row)<len(ResHeaderList):
                for x in range(0,len(ResHeaderList)-len(row)):
                    ResRowList[idx].append("NULL")
    o=open(Out,"w")
    #for right now, I'm going to ignore the weird stuff at the beginning, i.e. the yes/no questions, heynows
    ##and giant list of understanding questions which aren't assigned to anything.
    ###basically the whole stretch of the first ip address(it is most likely us testing?)
    for i,r in enumerate(ResRowList):
        if i==0:
            o.write('\t'.join(r)+'\n')
        else:
            if indexwd(r,ResHeaderList,"Field name./Question2 (NULL if none)./Question (NULL if none)./Word number.").isdigit():
                o.write('\t'.join(r)+'\n')
            else:
                pass
    o.close()

WOI_Annotation(ExperimentFile,ResultsFile,OutputFile)
print "Success!"
