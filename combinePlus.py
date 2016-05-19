#PLAN: take two input files, and an output name(3 args). The first input is the original experiment file, the second is
#the experiment results.
import sys
import re
import json

originalExperiment=sys.argv[1]
trialDataFile=sys.argv[2]
outputFileName=sys.argv[3]

f=open(originalExperiment)

experimentData=re.split(r"(?:\r\n)|(?:\n)|(?:\r)",f.read())

f.close()

f2=open(trialDataFile)
trialDataList=re.split(r"(?:\r\n)|(?:\n)|(?:\r)",f2.read())

f2.close()
#nonHeadersString=''.join(experimentData[1:len(experimentData)])#old code, possibly useful later
#attempting to grab the trial headers
trialDataHeadersA=[]
pattern=re.compile(r"(?:^#\s*Col\.\s*)(\d?\d?)(?::)(?:\s*)(.*)")
for trialHeadA in trialDataList:
    match=pattern.match(trialHeadA)
    if match:
        if ("\t"+match.group(2)) not in trialDataHeadersA and int(match.group(1)) >len(trialDataHeadersA):
            tstring=("\t"+match.group(2)).lstrip('')
            trialDataHeadersA.append(tstring)
        elif int(match.group(1)) < len(trialDataHeadersA) and (match.group(2) not in trialDataHeadersA[int(match.group(1))-1]) and ("\t"+match.group(2)) not in trialDataHeadersA:
            trialDataHeadersA[int(match.group(1))-1]+=("/"+match.group(2)).lstrip('')
#trialDataHeadersA=re.split(r"(?:^#\s*Col\.\s*\d?\d?:)(.*)",f2.read())
trialString=''.join(trialDataHeadersA)
commaCount=trialString.count('\t')
print commaCount
#get worker ID\
#workerid=[]
#workerid[0]='ID not Found'
workerid='ID not found'
workerCount=0
qNumWorkerCount=0
fullcount=-1
for workerLines in trialDataList:
    fullcount+=1
    if len(workerLines)>0 and workerLines[0]!="#":
            workerLinesList=workerLines.split(',')
            if workerCount==0:
                qNumWorkerCount+=1
            while trialDataList[fullcount].count(',') < commaCount-1:
                trialDataList[fullcount]+=',NULL'
            trialDataList[fullcount]+=","+workerid
            if workerLinesList[7]=="workerid":
                #workerid[workercount]=workerLinesList[8]
                workerid=workerLinesList[8]
                workerCount+=1
#retrieve headers from original files
headersString=experimentData[0]+trialString+"\tWorker ID Number"

#open output
newoutput=open(outputFileName,'w')
#write headers to newoutput
newoutput.write(headersString+'\n')
#check item number(4th in each row from trial data) with row number of originalExperiment
workerCount2=0
qNumCount2=0
for trialLine in trialDataList:
    if len(trialLine)>0 and trialLine[0]!="#":
        itemNum=int(trialLine.split(',')[3])-2
        if itemNum and itemNum>0:
            #take row number item num from experimentData
            #add workerid based on experiment type
            newoutput.write(experimentData[itemNum]+"\t"+trialLine.replace(",", "\t")+"\t""\n")
newoutput.close()
