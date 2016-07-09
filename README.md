## ibexconvert

### How to get your own psycholinguistic experiment up!
Assuming you've got the proper format on your spreadsheet (if not, refer to https://github.com/prosodylab/prosodylab-experimenter/blob/master/instructions.Rmd)

####Run convert.py on your spreadsheet from the command line

``` {r, engine='bash', count_lines}
python convert.py originalExperimentFile.txt dataFileName.js 
```

####Download the scripts titled setup.sh and editFile.py to your computer, and SCP the two scripts to your Prosody Server account

``` {r, engine='bash', count_lines}
scp setup.sh firstname.lastname@prosody.linguistics.mcgill.ca
scp editFile.py firstname.lastname@prosody.linguistics.mcgill.ca
```

####SSH into the Prosody Lab web server (must have an account)

``` {r, engine='bash', count_lines}
ssh first.last@prosody.linguistics.mcgill.ca
```

####Run the script titled setup.sh (done remotely on prosody server)

``` {r, engine='bash', count_lines}
sh setup.sh experimentName dataFileName.js
```

####Further configuration can be done, i.e. SCP-ing audio files for audio experiments
...

####Go to...
`http://prosody.linguistics.mcgill.ca/~*firstname*.*lastname*/*experimentName*/www/experiment.html`


####Release experiment, results can be accessed by... (remote)

``` {r, engine='bash', count_lines}
cd /tmp/experiment_name/results
```
