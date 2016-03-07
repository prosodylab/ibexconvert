#PLAN: take two input files, and an output name(3 args). The first input is the original experiment file, the second is
#the experiment results.
#First, match until end of line on the first file, and place it in the new file. Then put a tab, and grab the trial data

#each time a patient is reached, add new break column, and then possibly put labels again?
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

#grab the experiment, status, animacy, qtype, design, and record for the first column(Dumb version, will assume these are
#the same, since I'm unsure which parts of the data are necesary to include on each participant line 
#experiment
experimentType=re.match(r"^(.*?)\t",experimentData[1])
#status
status=re.match(r"^((.*?\t.*?){5})",experimentData[1])
#animacy
animacy=re.match(r"^((.*?\t.*?){6})",experimentData[1])
#qtype
qtype=re.match(r"^((.*?\t.*?){11})",experimentData[1])
#design
design=re.match(r"^((.*?\t.*?){12})",experimentData[1])
#recordVar
recordVar=re.match(r"^((.*?\t.*?){13})",experimentData[1]+"\t")

#testing the check for which one this found
#for posterity, the number in brackets is the column number of the part I want, the first half of the tuple
#contains everything before it
#print status.groups()[1]

copiedDataString=experimentType.groups()[0]+"\t"+status.groups()[1]+animacy.groups()[1]+qtype.groups()[1]+design.groups()[1]+recordVar.groups()[1]

#Next, we need to get the correct list of column headers for the selected experimentData columns
#thankfully we basically already have the code for this
#experiment
experimentTypeh=re.match(r"^(.*?)\t",experimentData[0])
#status
statush=re.match(r"^((.*?\t.*?){5})",experimentData[0])
#animacy
animacyh=re.match(r"^((.*?\t.*?){6})",experimentData[0])
#qtype
qtypeh=re.match(r"^((.*?\t.*?){11})",experimentData[0])
#design
designh=re.match(r"^((.*?\t.*?){12})",experimentData[0])
#recordVar
recordVarh=re.match(r"^((.*?\t.*?){13})",experimentData[0]+"\t")

copiedHeaderString=experimentTypeh.groups()[0]+"\t"+statush.groups()[1]+animacyh.groups()[1]+qtypeh.groups()[1]+designh.groups()[1]+recordVarh.groups()[1]

trialDataListWithNonHeaders=[]
for i in xrange(len(trialDataList)):
    if len(trialDataList[i])>0 and not trialDataList[i][0]=="#":
        trialDataList[i]=copiedDataString + trialDataList[i].replace(",", "\t")

out=open(outputFileName, 'w')
out.write(copiedHeaderString+"\n")
for line2 in trialDataList:
    if len(line2)>0 and not line2[0]=="#":
        out.write(line2+"\n")
out.close()
