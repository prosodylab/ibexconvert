#!/bin/sh
for fn in *.wav; do
    lame -f -b128 $fn ${fn%.*}.mp3
done
