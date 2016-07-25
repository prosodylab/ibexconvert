#plan: Take in Results file, experiment file, and output name respectively
#Make a function for each different objective
#First Function: Grab the WOI for a given set, place the part after the underscore(_) into the cell next to it in the results
#Second Function: Place relevant info from Experiment file into columns? Decide whether to match based off of experiment file
#or results file
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


#First Function
def WOI_Annotation(Exp,Res,Out):
    #plan:
    #-Extract Text column and place it in an array
    f=open(Exp)
    ExpLines = [x for x in re.split(r"(?:\r\n)|(?:\n)|(?:\r)", f.read()) if len(x) > 1 or (len(x) == 1 and not re.match(r"^\s*$", x[0]))]
    f.close()
    ColNames = re.split(r"\s*\t+\s*", ExpLines[0])
    ExpLines = [re.split(r"\"*\s*\t+\s*\"*", x) for x in ExpLines[1:]]
    WoiTextArray=[]
    for l in ExpLines:
        Woi_Text=indexwd(l,ColNames,'text')
        WoiTextArray.append(Woi_Text)
    #-Extract headers for results file and make a string with them(check combo script for existing code)
    f2=open(Res)
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
                if 'Word' in ResHeaderList[int(match.group(1))-1] and 'Word number' not in ResHeaderList[int(match.group(1))-1]:
                    wordColName=ResHeaderList[int(match.group(1))-1]
        else:
            #non-commented rows
            if ResLine and ResLine[0]!='#':
                ResRowList.append(ResLine)
    ResHeaderString=','.join(ResHeaderList)
    commaCount=ResHeaderString.count(',')
    #-Extract non-commented rows from results file, combine them with the header string.
    ResRowList.insert(0,ResHeaderString)
        #see above section(else)
    #-Loop through woi text to extract woi and their markers, store at same index in 2 arr
     #thought about other approaches
     #matrix/listoflists:too much overhead
     #dictionary: need to refer to them and keys/markers differ
    woiPattern=re.compile(r"^(.*)_(.*)$")
    actualWOI=[]
    actualWOIMarkers=[]
    currentSentenceArr=[]
    for woi in WoiTextArray:
        woiArr=woi.split(" ")
        sanitizedText=[]
        WOIInCurrentSentence=0
        inWOISentence=False
        for w in woiArr:
            if "_" in w:
                inWOISentence=True
            match=woiPattern.match(w)
            if match:
                actualWOI.append(match.group(1))
                WOIInCurrentSentence+=1
                #currentSentenceArr.append(woi)
                actualWOIMarkers.append(match.group(2))
                sanitizedText.append(match.group(1))
            else:
                sanitizedText.append(w)
        sanitizedTextW=" ".join(sanitizedText)
        i=0
        while i<=WOIInCurrentSentence and inWOISentence:
            currentSentenceArr.append(sanitizedTextW)
            i+=1
        sanitizedTextW=""
    #go through results list, if the word matches the woi, place the woimarker after it surrounded by commas
    if len(actualWOI)<1:
        sys.stderr.write("Expecting words of interest to be marked with _\n" % (k, sn))
        sys.exit(1)
    resInd=0
    woiInd=0
    #need to traverse entire file once per woi
    headerAdded=False
    FillerWOI=[False]*len(ResRowList)
    CheckedWOI=[False]*len(ResRowList)
    for woi in actualWOI:
        for r in ResRowList:
            if woiInd==0:
                ResRowList[resInd]=r.split(",")
            if woiInd>=len(actualWOI):
                pass
            else:
                #print ResRowList[resInd]
                #print indexwd(ResRowList[resInd],ResHeaderList,wordColName)+"="+actualWOI[woiInd]
                if ResRowList[resInd][-1]==currentSentenceArr[woiInd] and indexwd(ResRowList[resInd],ResHeaderList,wordColName)==actualWOI[woiInd]:
                    ind=ResRowList[resInd].index(actualWOI[woiInd])
                    #actualWoi comes up twice bc it needs to be in the woi and the zoi col
                    #print "inserting "+actualWOIMarkers[woiInd]+" at woiInd: "+str(woiInd)
                    #print ResRowList[resInd][ind+1]
                    if ResRowList[resInd][ind+1]=="!WOI" and ResRowList[resInd][ind+2]=="NA":
                        ResRowList[resInd][ind+1]=actualWOIMarkers[woiInd]
                        ResRowList[resInd][ind+2]=actualWOIMarkers[woiInd]
                    else:
                        ResRowList[resInd].insert(ind+1,actualWOIMarkers[woiInd])
                        ResRowList[resInd].insert(ind+2,actualWOIMarkers[woiInd])
                    CheckedWOI[resInd]=True
                    #woiInd+=1
                else:
                    ind=ResRowList[resInd].index(indexwd(ResRowList[resInd],ResHeaderList,wordColName))
                    if resInd==0 and not headerAdded:
                        ResRowList[resInd].insert(ind+1,"Words of Interest")
                        ResRowList[resInd].insert(ind+2,"Zone of Interest")
                        ResHeaderList.insert(ind+1,"Words of Interest")
                        ResHeaderList.insert(ind+2,"Zone of Interest")
                        headerAdded=True
                    else:
                        #place !woi, in zoi insert next woiMarker, if it belongs to this sentence
                        #Current issue: Need to make sure that the words beyond the last marker aren't marked
                            #need to tie the woi to the sentence specifically... Introduce currentSentence var?
                        ZOI="NA"
                        #if ResRowList[resInd][-1]==currentSentenceArr[woiInd]:
                           # ZOI=actualWOIMarkers[woiInd]
                        if CheckedWOI[resInd]==False and FillerWOI[resInd]==False and not resInd==0:
                            ResRowList[resInd].insert(ind+1,"!WOI")
                            ResRowList[resInd].insert(ind+2,ZOI)
                            FillerWOI[resInd]=True
                while len(ResRowList[resInd])<commaCount+2:
                    ResRowList[resInd].append("NULL")
            resInd+=1
        woiInd+=1
        resInd=0
    #ZOI Stuff!
    #For every row, first keep track of which sentence I'm in.
    #Once a new sentence is entered, check if it has WOI markers
    #If it does, find out how far forward it is, then write that many times, and continue down the column
    ZoneOfInterestCurrentSentence=""
    topLvlSentenceLength=0
    topLvlProgress=-1
    for r in ResRowList:
        WOISolved=False
        #need a way to check if r[-1] is actually a sentence or if it's a form/mcq/etc
        if r[-1]=="NULL" or resInd==0:
            pass
        else:
            topLvlProgress+=1
            if topLvlSentenceLength==topLvlProgress:#r[-1]!=ZoneOfInterestCurrentSentence:
                topLvlProgress=0
                topLvlSentenceLength=len(r[-1].split())
                ZoneOfInterestCurrentSentence=r[-1]
                #if new sentence, check forwards and count the number of woi
                sentenceLength=len(ZoneOfInterestCurrentSentence.split())
                currentIndexInSentence=0
                currentZOI="NA"
                startingIndex=ResRowList.index(r)
                sentenceList=ZoneOfInterestCurrentSentence.split()
                zoiColInd=r.index(indexwd(r,ResHeaderList,"Words of Interest"))+1
                filledZOI=False
                wordsProcessed=0
                finished=False
                while wordsProcessed<sentenceLength-1:
                    #each step, examine the zoi col to see if there is something in it
                    #if something is found, go back to starting index(after filling in, update starting index to filled area)
                    #then go forwards filling in zoi with the woi which was found
                    ##if not (indexwd(ResRowList[startingIndex+currentIndexInSentence],ResHeaderList,"Zone of Interest") == "NA"): 
                        ##print indexwd(ResRowList[startingIndex+currentIndexInSentence],ResHeaderList,"Zone of Interest")
                    if (not r[-1].isdigit()) and not (indexwd(ResRowList[startingIndex+currentIndexInSentence],ResHeaderList,"Zone of Interest")=="NA"):
                        currentZOI=indexwd(ResRowList[startingIndex+currentIndexInSentence],ResHeaderList,"Zone of Interest")
                        print currentZOI
                        #ind=ResRowList[startingIndex+currentIndexInSentence].index(NA)
                        fZInd=0
                        while True:#not (fZInd==currentIndexInSentence):
                            if not (ResRowList[startingIndex+fZInd][zoiColInd]=="NA"):
                                print "changing si from "+str(startingIndex)+" to "+str(startingIndex+currentIndexInSentence)
                                startingIndex+=currentIndexInSentence+1
                                currentIndexInSentence=0
                                filledZOI=True
                                currentZOI="NA"
                                break
                            elif ResRowList[startingIndex+fZInd][-1]!=ZoneOfInterestCurrentSentence:
                                break
                            else:
                                print "setting: " + ResRowList[startingIndex+fZInd][zoiColInd]+" to " + currentZOI
                                ResRowList[startingIndex+fZInd][zoiColInd]=currentZOI
                            fZInd+=1
                    else:
                        #topLvlProgress=0
                        #topLvlSentenceLength=len(r[-1].split())
                        pass#ZoneOfInterestCurrentSentence=""
                        #if firstZoiFound:
                            #fZInd=0
                            #while not (fZInd==currentIndexInSentence):
                                #if ResRowList[startingIndex+fZInd][zoiColInd]=="NA":
                                   #ResRowList[startingIndex+fZInd][zoiColInd]=currentZOI
                                    ##fZInd+=1
                                #else:
                                    #startingIndex+=currentIndexInSentence
                                    #currentIndexInSentence=-1
                                    #print ResRowList[startingIndex+fZInd][zoiColInd]
                                    #break
                                #fZInd+=1
                        #else:
                            #pass
                        #ResRowList[startingIndex+currentIndexInSentence][zoiColInd]=currentZOI
                        #print "WRITING: " + currentZOI
                    wordsProcessed+=1
                    currentIndexInSentence+=1
                #woiNum=#ZoneOfInterestCurrentSentence.count("_")
            #elif finished and r[-1]==ZoneOfInterestCurrentSentence:
                #print "triggering special case at "+str(resInd)
                #finished=False
            else:
                WOISolved=True
                #print "things"
                #in current sentence
        resInd+=1
    #rowlist now a list of lists of strings, each inner list is a row
    print ResHeaderList
    print ResRowList[5]
    output=open(Out,"w")
    for rl in ResRowList:
        output.write('\t'.join(rl)+'\n')

#Second Function:extract the neccessary stuff from the EXPERIMENT file, either add it onto the results file or vice versa?
#Always run after the first file
def spr_Exp_Combination(Exp, Res, Out):
    #PLAN: Need to decide(add exp onto results, or add results onto exp)
    #Take each row of exp file, find matching item num, write that row of the res onto the exp
    f=open(Exp)
    #get experiment file array of rows
    ExpLines = [x for x in re.split(r"(?:\r\n)|(?:\n)|(?:\r)", f.read()) if len(x) > 1 or (len(x) == 1 and not re.match(r"^\s*$", x[0]))]
    f.close()
    #get experiment column names
    ExpColNames = re.split(r"\s*\t+\s*", ExpLines[0])
    ExpLines = [re.split(r"\"*\s*\t+\s*\"*", x) for x in ExpLines[1:]]
    #get result row array
    f2=open(Out) #using out because function one has already written to there
    ResLines = [x for x in re.split(r"(?:\r\n)|(?:\n)|(?:\r)", f2.read()) if len(x) > 1 or (len(x) == 1 and not re.match(r"^\s*$", x[0]))]
    f2.close()
    #get result column names
    ResColNames = re.split(r"\s*\t+\s*", ResLines[0])
    ResRowList = [re.split(r"\"*\s*\t+\s*\"*", x) for x in ResLines[1:]]
    #get list of itemnums from Results
    itemNumbers=[]
    for cellz in ResLines:
        cell=cellz.split("\t")
        itemNumbers.append(indexwd(cell,ResColNames,"Item number."))
    #For each row in expfile, find matching item num in results file and attach the res onto the exp
    #alternately, each itemnumber is used as the the index to access the matching item num
    j=0
    inSentence=False
    f3=open(Out, "w")
    for item in itemNumbers:
        if item=="Item number.":
            pass
        else:
            item=int(item)-4
            ##ExpLines[item]+=
            #print j
            #ExpLines[item]+=ResRowList[j]
            j+=1
        #if inSentence:
            #Take only the word number, word, woi, reading time, time taken to answer
            #ExpRow[item]+=
            #check if end of sentence, if so, set inSentence
        #else:
                #take everything from resrow[j], set inSentence
                #ExpRow[item]+=ResRowList
                #inSentence=True
            #j+=1
    print ExpLines[0]
    print ExpLines[5]
    for ex in ExpLines:
        f3.write('\t'.join(ex)+'\n')
    f3.close()
    return Out

#Main body here
WOI_Annotation(ExperimentFile,ResultsFile,OutputFile)
#spr_Exp_Combination(ExperimentFile,ResultsFile,OutputFile)
print "Success!"
