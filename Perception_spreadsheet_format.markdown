Introduction
-----
This file documents the input format for the Python script which converts
experiments to ibex. The main input is a spreadsheet saved as a CSV file.
Typically, this spreadsheet will refer to an instructions file, which is a plain
text (`.txt`) file.

This format differs from the format currently used in the lab (as of July 17 2014)
in that it uses one big spreadsheet rather than multiple separate spreadsheets.

Using the conversion script
-----

    python convert.py infile outfile

where `infile` is the input spreadsheet and `outfile` is the name for the ibex
data file (a `.js` file).

Audio files should be placed in the `chunk_includes` directory. Either `.wav`
or `.mp3` encoding will work.

Columns (in order)
-----

**Note on column order:** The Python script is not sensitive to the order
of columns. However, other scripts in the lab may be, so it is best to keep
them in the following order.

Not all columns need be present. For example, `wavFile` is not required if
there is no sound file to be played.

Column name                       | Description
----------------------------------|------------
`experiment`                      | Name of the experiment
                                  |
`session`                         | Session number.
                                  |
`item`                            | Item number
                                  |
`condition`                       | Condition number
                                  |
`conditionLabel`                  | Condition label
                                  |
`instructions` or `instructions1` | The name of the plain text file containing instructions for the first session.
                                  |
`instructions2`,                  |
`instructions3`, ...              | Instructions files for subsequent sessions.
                                  |
`context`                         | Context for question.
                                  |
`contextFile`                     | Audio file which is played prior to wavFile.
                                  |
`contextPause`                    | Pause between contextFile and wavFile (no pause if this column is not present).
                                  |
`cleft`                           | **??? TODO ??? Was this just a special option for a specific experiment, or is it more general?**
                                  |
`wavFile`                         | Name of the audio file to be played.
                                  |
`question`                        | Question to ask participant
                                  |
`qType`                           | See 'question types' below.
                                  |
`question`                        | Text of the question (if any).
                                  |
`correct answer/alt answer etc.`  | ***??? TODO ???***
                                  |
`design`                          | See 'design' below.
                                  |
`text`                            | Text to show participant.


Question types
--------------


Column value | Description
-------------|------------
`jm`         | Acceptability judgment (answer on scale).
`mc`         | Multiple choice.


Design
------

Column value      | Description
------------------|------------
LatinSquare       | One condition from each item is displayed (?avoiding more than one repetition of the same condition)
Random            | ?All conditions of all items are presented in random order
PseudoRandom      | All conditions of all items are presented in pseudorandom order ? (creates n=number of conditions blocks of latin square lists, randomizing them internally as in latin square design, and then randomizes blocks; advantage: if each block appears for first for a balanced number of participants, the experiment can be analyzed at the same time as a latin square design, by taking the subset of n/condition trials)
