# ibexconvert

# How to get your own psycholinguistic experiment up!
Assuming you've got the proper format on your spreadsheet (will flesh this out later to be more comprehensive in that regard, but for now refer to https://github.com/addrummond/ibex/blob/master/docs/manual.md)

1. Run convert.py on your spreadsheet (done either remotely or locally)

``` sh
    $ python convert.py original_experiment_file.txt output_file.js 
```

2. Clone this version of ibex in your public_html directory on the prosody server (done remotely on prosody server)

``` sh
    $ git clone https://github.com/mjezew/ibex/
```

3. Run the script titled configure.sh (done remotely on prosody server)

``` sh
    $ sh configure.sh
```

4. Scp (secure copy) your output.js file into the "data_includes" file (done locally)

``` sh
    $ scp output.js firstname.lastname@prosody.linguistics.mcgill.ca:~/public_html/experiment_name/data_includes
```

5. Further configuration can be done, i.e. scp-ing audio files for audio experiments
...

6. Release experiment, results can be accessed by... (remote)

``` sh
    $ cd /tmp/experiment_name/results
```







