import sys
import re
import json
import sys

def indexwd(l, colnames, name, default=None):
    assert name is not None
    index = None
    try:
        index = colnames.index(name)
    except ValueError:
        return default
    return l[index]

def make_shuffle_sequence(real_types):
    return "var shuffleSequence = seq(rshuffle(" + ', '.join([json.dumps(t) for t in real_types]) + "));\n"

def make_preamble(real_types):
    return """
var practiceItemTypes = ["practice"];
""" + make_shuffle_sequence(real_types) + """
define_ibex_controller({
    name: "AJ",

    jqueryWidget: {
        _init: function () {
            this.options.transfer = null; // Remove 'click to continue message'.
            this.element.VBox({
                options: this.options,
                triggers: [1],
                children: [
                    "Message", this.options,
                    "AcceptabilityJudgment", this.options,
                ]
            });
        }
    },

    properties: { }
});

var defaults = [
    "AJ", {
        presentAsScale: true,
        as: ["1", "2", "3", "4", "5", "6", "7"],
        audioMessage: "Click here to play audio",
        audioTrigger: "click"
    }
];
    """

expfile = sys.argv[1]
outfile = sys.argv[2]

f = open(expfile)
lines = [x for x in re.split(r"(?:\r\n)|(?:\n)|(?:\r)", f.read()) if len(x) > 1 or (len(x) == 1 and not re.match(r"^\s*$", x[0]))]

assert len(lines) > 0

colnames = re.split(r"\s*\t+\s*", lines[0])
lines = [re.split(r"\s*\t+\s*", x) for x in lines[1:]]

conditions = { }
for l in lines:
    conditions[indexwd(l, colnames, 'conditionLabel', '') + indexwd(l, colnames, 'condition', '')] = True

global_opts = { }
for k in ['experiment', 'design', 'qType']:
    global_opts[k] = lines[0][colnames.index(k)]

q = lines[0][colnames.index('question')]
scale_regexp = re.compile(r".*?(?:\\n)+.*?1\s*=\s*(.*?),?\s*(?:(?:et)|(?:and))\s*7=\s*(.*?)\s*\)?")
m = re.match(scale_regexp, q)
if not m:
    sys.stderr.write("Error: could not parse scale comments\n")
    sys.exit(1)
scale_comment_left = m.group(1)
scale_comment_right = m.group(2)

out = open(outfile, "w");

out.write(make_preamble(real_types=conditions.keys()))
out.write("defaults[1].leftComment = " + json.dumps(scale_comment_left) + ";\n")
out.write("defaults[1].rightComment = " + json.dumps(scale_comment_right) + ";\n")
out.write("var items = [\n")

def gen_item(l, colnames):
    cond = indexwd(l, colnames, 'conditionLabel', '') + indexwd(l, colnames, 'condition', '')
    controller = "AJ"
    ajoptions = None
    html = indexwd(l, colnames, 'context', '') + '<br>' + indexwd(l, colnames, 'text', '')
    # Determine whether or not this is audio.
    if indexwd(l, colnames, 'contextFile') is not None:
        # Audio.
        audiofiles = [ ]
        if indexwd(l, colnames, 'contextFile') is not None:
            audiofiles.append(indexwd(l, colnames, 'contextFile'))
        if indexwd(l, colnames, 'wavFile') is not None:
            audiofiles.append(indexwd(l, colnames, 'wavFile'))
        ajoptions = dict(
            html=html,
            s = dict(audio=audiofiles)
        )
    else:
        print "TEXT!!"
        # Text
        ajoptions = dict(
            html=html,
            s = re.split(r"\s*\\n\s*", indexwd(l, colnames, 'question', ''))[0]
        )
    return json.dumps([cond, controller, ajoptions])

first = True
for l in lines:
    if not first:
        out.write(",\n")
    first = False
    out.write(gen_item(l, colnames))

out.write("\n];\n")
