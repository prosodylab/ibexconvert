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
nonHeadersString=''.join(experimentData[1:len(experimentData)])
#trialDataHeaders should be programmatically grabbed, right now I'm just hardcoding them in, because I'm not sure if they ever change...
trialDataHeaders="\t Time results were received\t MD5 hash of participant's IP address\t Controller name\t Item number\t Element number\t Type\t Group\t Question (NULL if none)\t Answer\t Whether or not answer was correct (NULL if N/A)\t Time taken to answer"

#get worker ID
workerid='ID not Found'
for workerLines in trialDataList:
    if len(workerLines)>0 and workerLines[0]!="#":
            workerLinesList=workerLines.split(',')
            workerid=workerLinesList[8]
            break
#retrieve headers from original files
headersString=experimentData[0]+trialDataHeaders+"\tWorker ID Number"
#open output
newoutput=open(outputFileName,'w')
#write headers to newoutput
newoutput.write(headersString+'\n')
#check item number(4th in each row from trial data) with row number of originalExperiment
for trialLine in trialDataList:
    if len(trialLine)>0 and trialLine[0]!="#":
        itemNum=int(trialLine.split(',')[3])-2
        if itemNum and itemNum>0:
            #take row number item num from experimentData
            newoutput.write(experimentData[itemNum]+"\t"+trialLine.replace(",", "\t")+"\t"+workerid+"\n")
newoutput.close()
