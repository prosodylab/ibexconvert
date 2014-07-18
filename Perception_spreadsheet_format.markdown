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

Column name       | Description
------------------|------------
experiment        | Name of the experiment
                  |
item              | Item number
                  |
condition         | Condition number
                  |
practice          | `yes` or `no`, specifying whether the item is a practice item.
                  |
context           | Context for question.
                  |
contextFile       | **??? TODO ??? Assume same but audio file rather than text?**
                  |
conditionLabel    | Condition label
                  |
cleft             | **??? TODO ??? Was this just a special option for a specific experiment, or is it more general?**
                  |
wavFile           | Name of the audio file to be played.
                  |
question          | Question to ask participant
                  |
qType             | See 'question types' below.
                  |
question          | Text of the question (if any).
                  |
design            | See 'design' below.
                  |
text              | Text to show participant.
                  |
instructions      | The name of the plain text file containing instructions.


Question types
--------------

**TODO**: What are the possible question types?

Column value | Description
-------------|------------
jm           | **??? TODO ???**


Design
------

Column value      | Description
------------------|------------
LatinSquare       | One condition from each item is displayed.
PseudoRandom      | All conditions of all items are presented; order is random.
**??? TODO ???**  | **??? TODO ???** Should have the option of presenting all conditions in such a way that the first part of the experiment can be analyzed as a latin square design.
