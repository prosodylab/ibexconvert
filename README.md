# ibexconvert

# How to get your own psycholinguistic experiment up!
Assuming you've got the proper format on your spreadsheet (will flesh this out later to be more comprehensive in that regard, but for now refer to https://github.com/addrummond/ibex/blob/master/docs/manual.md)

#Run convert.py on your spreadsheet (done either remotely or locally)

``` sh
python convert.py original_experiment_file.txt output_file.js 
```

#Clone this version of ibex in your public_html directory on the prosody server (done remotely on prosody server)

``` sh
git clone https://github.com/mjezew/ibex/
```

#Run the script titled configure.sh (done remotely on prosody server)

``` sh
sh configure.sh
```

#Scp (secure copy) your output.js file into the "data_includes" file (done locally)

``` sh
scp output.js firstname.lastname@prosody.linguistics.mcgill.ca:~/public_html/experiment_name/data_includes
```

#Further configuration can be done, i.e. scp-ing audio files for audio experiments
...

#Release experiment, results can be accessed by... (remote)

``` sh
cd /tmp/experiment_name/results
```







