## ibexconvert

### How to get your own psycholinguistic experiment up!
Assuming you've got the proper format on your spreadsheet (if not, refer to https://github.com/prosodylab/prosodylab-experimenter/blob/master/instructions.Rmd)

####Run convert.py on your spreadsheet from the command line

``` {r, engine='bash', count_lines}
python convert.py originalExperimentFile.txt dataFileName.js 
```

####Download the scripts titled setup.sh and editFile.py to your computer, and SCP the two scripts to your Prosody Server account

``` sh
scp setup.sh firstname.lastname@prosody.linguistics.mcgill.ca
scp editFile.py firstname.lastname@prosody.linguistics.mcgill.ca
```

####SSH into the Prosody Lab web server (must have an account)

``` sh
ssh first.last@prosody.linguistics.mcgill.ca
```

####Run the script titled setup.sh (done remotely on prosody server)

``` sh
sh setup.sh experimentName dataFileName.js
```

####Further configuration can be done, i.e. SCP-ing audio files for audio experiments
...

####Release experiment, results can be accessed by... (remote)

``` sh
cd /tmp/experiment_name/results
```
