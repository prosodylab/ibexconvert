#!/bin/sh
#
# This script converts all .wav files in the current directory to mp3 files
# with the same name (but with the extension .mp3 instead of .wav).
#
# Run it as follows:
#
#     sh convert.sh
#

for fn in *.wav; do
    lame -f -b128 $fn ${fn%.*}.mp3
done
