import sys
import re
import json

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
    print ResRowList[0]
    print ResRowList[1]
    print ResRowList[2]
    for expR in ExpLines:
        print expR
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
                print "match for markers!"
                wordArray.append(expMatch.group(1))
                markerArray.append(expMatch.group(2))
            elif expMatch2:
                wordArray.append(expMatch2.group(1))
                markerArray.append("NA")
        print markerArray
        print wordArray
        resInd=0
        for resR in ResRowList:
            resItem="!"
            if indexwd(resR,ResHeaderList,"Group.").isdigit():
                resItem=int(indexwd(resR,ResHeaderList,"Group."))/2
            resCond=""
            if indexwd(resR,ResHeaderList,"Type.")!=None:
                resCond=indexwd(resR,ResHeaderList,"Type.")
            rCond=-1
            if str(resInd)<=str(ResRowList.index(resR)):
                sentenceFinished=False
            resMatch=resCondPattern.match(resCond)
            if resMatch:
                rCond=resMatch.group(1)
            #need to extract condition and item number from both
            #need to match based on condition and item number(adjusted by some factor??)
            #need to track where I am in sentence, and reset each time we reach a new one(variable:senPos)
            #if sentence/item/cond matches then start a while loop
            #print resItem+"=="+expItem
            #print str(rCond)+"=="+str(expCond)
            if str(resItem)==str(expItem) and str(rCond)==str(expCond) and sentenceFinished==False:
                if resR[-1]!="NULL":
                    print "IF REACHED: "+resR[-1]
                for idx, val in enumerate(wordArray):
                    #goals: using idx, check each word against the experiment file and mark woi by appending to ResRowList
                    #how to:
                    print resInd
                    if resR[-1]=="NULL" or (resInd)>len(ResRowList) or resR[-1].isdigit():
                        resInd+=1
                        break
                    #issue:resInd is off in some cases
                    print val+"=="+indexwd(ResRowList[resInd],ResHeaderList,"Field value./Word./Answer.").replace("%2C",",")
                    if val==indexwd(ResRowList[resInd],ResHeaderList,"Field value./Word./Answer.").replace("%2C",","):
                        print "value matched"
                        if ResRowList[resInd][10]=="NA":
                            ResRowList[resInd][10]=markerArray[idx]
                            ResRowList[resInd][11]=markerArray[idx]
                            print "inserting marker: "+markerArray[idx]+" at " +str(idx)
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
            print "BREAKING"
            break
        if str(indexwd(r,ResHeaderList,"Field name./Question2 (NULL if none)./Word number./Question (NULL if none)."))=="1":
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
            currentID=indexwd(row,ResHeaderList,"Field value./Word./Answer.")
            if currentID=="":
                currentID="NULL"
            ResRowList[idx].append(currentID)
        else:
            ResRowList[idx].append(currentID)
    ###ORIGINAL ITEM NUMBER AND CONDITION ANNOTATION
    resCondPattern=re.compile(r"0-(\d)")
    originalItemNum=0
    originalCondition=-1
    ResRowList[0].append("Original Item Number")
    ResRowList[0].append("Condition")
    for idx, row in enumerate(ResRowList):
        if idx==0:
            pass
        elif idx!=0 and indexwd(row,ResHeaderList,"Group.")!="NULL":
            originalItemNum=int(indexwd(row,ResHeaderList,"Group."))/2
            ResRowList[idx].append(str(originalItemNum))
        else:
            ResRowList[idx].append("NULL")
        if idx==0:
            pass
        elif idx!=0 and indexwd(row,ResHeaderList,"Type.")!="NULL":
            if indexwd(row,ResHeaderList,"Type.")!=None:
                resCond=indexwd(row,ResHeaderList,"Type.")
            resMatch=resCondPattern.match(resCond)
            if resMatch:
                originalCondition=resMatch.group(1)
            else:
                originalCondition="NULL"
            #print "Original condition is: "+originalCondition
            ResRowList[idx].append(str(originalCondition))
        else:
            ResRowList[idx].append("NULL")
    ###QUESTION COMBINATION(Word+Understanding)
    o=open(Out,"w")
    for r in ResRowList:
        o.write('\t'.join(r)+'\n')
    o.close()

WOI_Annotation(ExperimentFile,ResultsFile,OutputFile)
