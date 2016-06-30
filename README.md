# ibexconvert

# How to get your own psycholinguistic experiment up!
Assuming you've got the proper format on your spreadsheet (if not, refer to https://github.com/prosodylab/prosodylab-experimenter/blob/master/instructions.Rmd)

#Run convert.py on your spreadsheet from the command line

``` sh
python convert.py original_experiment_file.txt output_file.js 
```

#SSH into the Prosody Lab web server (must have an account)

``` sh
ssh first.last@prosody.linguistics.mcgill.ca
```

#Run the script titled configure.sh (done remotely on prosody server)

``` sh
sh configure.sh experimentName dataFileName
```

#Further configuration can be done, i.e. scp-ing audio files for audio experiments
...

#Release experiment, results can be accessed by... (remote)

``` sh
cd /tmp/experiment_name/results
```







