import sys
import re
import json
import sys

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
        as: ["1", "2", "3", "4", "5", "6", "7"]
    }
];
    """

expfile = sys.argv[1]
outfile = sys.argv[2]

f = open(expfile)
lines = re.split(r"(?:\r\n)|(?:\n)|(?:\r)", f.read())

assert len(lines) > 0

colnames = re.split(r"\s*\t+\s*", lines[0])
lines = [re.split(r"\s*\t+\s*", x) for x in lines[1:]]

conditions = { }
for l in lines:
    conditions[l[colnames.index('conditionLabel')] + l[colnames.index('condition')]] = True

global_opts = { }
for k in ['experiment', 'design', 'qType']:
    global_opts[k] = lines[0][colnames.index(k)]

q = lines[0][colnames.index('question')]
m = re.match(r".*?\\n.*?1\s*=\s*(.*?),\s*et\s*7=\s*(.*?)\s*\)", q)
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

first = True
for l in lines:
    if not first:
        out.write(",\n")
    first = False
    q = re.split(r"\s*\\n\s*", l[colnames.index('question')])[0]
    out.write(json.dumps([l[colnames.index('conditionLabel')] + l[colnames.index('condition')], "AJ", dict(html=l[colnames.index('context')] + '<br>' + l[colnames.index('text')], s=q)]))

out.write("\n];\n")
