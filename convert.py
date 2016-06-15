import sys
import re
import json
import sys
from itertools import *

# trigger to write consent intro and instructions into file
# default is off (False) because most experiments won't have this
wIntro = True
#noFiller defaulted to true bc most experiments don't need it
noFiller = True

def indexwd(l, colnames, name, default=None):
    assert name is not None
    index = None
    try:
        index = colnames.index(name)
    except ValueError:
        return default
    return l[index]


def flatten(listOfLists):
    #"Flatten one level of nesting"
    return chain.from_iterable(listOfLists)


def roundrobin(*iterables):
    #"roundrobin('ABC', 'D', 'EF') --> A D E B F C"
    # Recipe credited to George Sakkis
    pending = len(iterables)
    nexts = cycle(iter(it).next for it in iterables)
    while pending:
        try:
            for next in nexts:
                yield next()
        except StopIteration:
            pending -= 1
            nexts = cycle(islice(nexts, pending))

#def make_shuffle_sequence(real_types):
#    return "seq(rshuffle(" + ', '.join([json.dumps(t) for t in real_types]) + "))"

def make_shuffle_sequence(real_types):
    if noFiller:
        return "seq(rshuffle(" + ', '.join([json.dumps(t) for t in real_types]) + "))"
    else:
        #print indexwd(l, colnames, 'experiment', None)
        #print "shuffle(randomize("+indexwd(l, colnames, 'experiment', None)+"), seq(rshuffle(" + ', '.join([json.dumps(t) for t in real_types]) + ")))"
        return "shuffle(randomize("+indexwd(l, colnames, 'experiment', None)+"), seq(rshuffle(" + ', '.join([json.dumps(t) for t in real_types]) + ")))"


scale=["1","2","3","4","5","6","7"]
def make_preamble(shuffle_sequence):
    return """
var manualSendResults = true;
function genCode()
{
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var c = "";
    for (var i = 0; i < 5; ++i) {
        var j = parseInt(Math.round(Math.random()*(chars.length-1)));
        c = chars[j] + c + chars[j];
    }
    return c;
}


var counterOverride = parseInt(Math.round(Math.random()*10000));

var practiceItemTypes = ["practice"];
var shuffleSequence = """ + shuffle_sequence + """;
define_ibex_controller({
    name: "DAJ",

    jqueryWidget: {
        _init: function () {
            this.options.transfer = null; // Remove 'click to continue message'.
            this.options.hideS = true;
        this.element.VBox({
                options: this.options,
                triggers: [1],
                children: [
                    "DashedSentence", this.options,
                    "Question", this.options,
                ]
        });
        }
    },

    properties: { }
});

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
        as: """ + str(scale) + """,
        audioMessage: "Click here to play audio",
        audioTrigger: "click"
    },
    "DAJ", {
        presentAsScale: true,
        as: """ + str(scale) + """,
    }
];
    """
num_input_files=len(sys.argv)
experiment_list=[]
experiment_indices=[]
experiment_trials=[]
expfile=sys.argv[1]
outfile = sys.argv[2]


f = open(expfile)
lines = [x for x in re.split(r"(?:\r\n)|(?:\n)|(?:\r)", f.read()) if len(x) > 1 or (len(x) == 1 and not re.match(r"^\s*$", x[0]))]

assert len(lines) > 0

colnames = re.split(r"\s*\t+\s*", lines[0])
lines = [re.split(r"\"*\s*\t+\s*\"*", x) for x in lines[1:]]

sessions = { }
session_names = [ ]
for l in lines:
    sesh = indexwd(l, colnames, 'session')
    if sesh is not None:
        if not sessions.has_key(sesh):
            sessions[sesh] = [ ]
            session_names.append(sesh) #session_names generation
        sessions[sesh].append(l)
    else:
        #out = open(outfile, "w")
        #out.write("""var actual = [
        #                "AJ", {
        #                    presentAsScale: true,
        #                    as: ["1","2","3"]
        #                    audioMessage: "click here"
        #                }
        #            ];""")
        if sessions.has_key('default'):
            sessions['default'].append(l)
        else:
            session_names.append('default')
            sessions['default'] = [l]

conditions = { }
items = { }
seshnum = 0
primes = [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43 ]


for sn in session_names:
    conditions[sn] = { }
    for l in sessions[sn]:
        if indexwd(l, colnames, 'conditionLabel', None) is not None or indexwd(l, colnames, 'condition', None) is not None:
            conditions[sn][indexwd(l, colnames, 'conditionLabel', '') + indexwd(l, colnames, 'condition', '')] = True
        if indexwd(l, colnames, 'item', None) is not None:
            it = int(indexwd(l,colnames,'item'))
            if items.has_key(str(seshnum) + '-' + str(it)):
                pass
            else:
                items[str(seshnum) + '-' + str(it)] = primes[seshnum] * it
        if indexwd(l, colnames, 'experiment', None) is not None:
            #count number of possible experiments and put them into seperate playlists
            if indexwd(l,colnames,'experiment','') not in experiment_list:
                #add experiment name to list
                experiment_list.append(indexwd(l,colnames,'experiment',''))
                #track index of where this experiment starts in the file
                experiment_indices.append(sessions[sn].index(l))
            else:
                pass
    if len(experiment_indices)>1:
        for i in range(1,len(experiment_indices)):
            #print experiment_indices
            #print i
            print "!"
            experiment_trials.append([])
            for ind in range(experiment_indices[i-1],experiment_indices[i]):
                #fill list of lists, each inner list is the container of the experiment corresponding to that expind
                #In order to do this, make a list in the inner loop, then append it? Maybe?
                #errors in this nested loop because the experiment 
                #print experiment_trials[i]
                experiment_trials[i-1].append(lines[ind])
        experiment_trials.append([])
        for ind2 in range(experiment_indices[len(experiment_indices)-1],len(lines)):
            print ind2
            experiment_trials[len(experiment_trials)-1].append(lines[ind2])
    else:
        for l2 in sessions[sn]:
            experiment_trials.append(l2)
    seshnum += 1


firstdigits=1
seconddigits=7

session_opts = { }
for sn in session_names:
    session_opts[sn] = { }
    for k in ['experiment', 'design', 'qType']: #qtype
        if indexwd(sessions[sn][0], colnames, k, None) is None:
            sys.stderr.write("Expecting '%s' column in session '%s'\n" % (k, sn))
            sys.exit(1)
        session_opts[sn][k] = indexwd(sessions[sn][0], colnames, k)

#I'm leaving the old regex in for now because I think it is still used to grab the question.
scale_regexp = re.compile(r"^\s*(.*?)(?:\\n)+.*?(\d*)\s*=\s*(.*?)\,?\s?(?:(?:et)|(?:and))?;?\s*(\d*)\s*=\s*(.*?)\s*\)?\s*$")
column_style_scale_regexp = re.compile(r"^\s*(.*)_(\d*)_(\d*)_(.*)_(.*)$")
questions = [ ]
qType=""
scale_comment_lefts = [ ]
scale_comment_rights = [ ]
for l in lines:
    m = re.match(scale_regexp, indexwd(l, colnames, 'question', ''))
    if not m:
        sys.stderr.write("Error: could not parse scale comments\n")
        sys.exit(1)
    questions.append(m.group(1))
    checkQType = indexwd(l, colnames, 'qType', '')
    if checkQType.find('_') > 0:
        m2=re.match(column_style_scale_regexp, indexwd(l, colnames, 'qType', ''))
        if not m2:
            sys.stderr.write("Error: could not parse scale comments or digits. Please format it as 'qtype_scaledigit1_scaledigit2_scalecommentleft_scalecommentright'\n")
            sys.exit(1)
        qType=m2.group(1)    
        firstdigits=m2.group(2)
        seconddigits=m2.group(3)
        scale_comment_rights.append(m2.group(5))
        scale_comment_lefts.append(m2.group(4))
    else:
        firstdigits=m.group(2)
        scale_comment_lefts.append(m.group(3))
        seconddigits=m.group(4)
        scale_comment_rights.append(m.group(5))


def gen_item(sid, sn, l, colnames, line_index):
    #cond = str(sid) + '-' + indexwd(l, colnames, 'conditionLabel', '') + indexwd(l, colnames, 'condition', '')
    cond = str(sid) + '-' + indexwd(l, colnames, 'conditionLabel', '') + indexwd(l, colnames, 'condition', '')
    if session_opts[sn]['design'].upper() == 'RANDOM':
        pass
    elif session_opts[sn]['design'].upper() == 'LATINSQUARE':
        cond = [cond, items[str(sid) + '-' + str(int(indexwd(l, colnames, 'item')))]]
    elif session_opts[sn]['design'].upper() == 'WITHIN':
        #cond = [cond, items[str(sid) + '-' + str(int(indexwd(l, colnames, 'item')))]]
        #cond = str(sid) + '-' + indexwd(l, colnames, 'item', '') 
        cond = [cond, items[str(sid) + '-' + str(int(indexwd(l, colnames, 'item')))]]
        cond = [cond, items[str(sid) + '-' + str(int(indexwd(l, colnames, 'item')))]]
        cond = [cond, items[str(sid) + '-' + str(int(indexwd(l, colnames, 'item')))]]
        cond = [cond, items[str(sid) + '-' + str(int(indexwd(l, colnames, 'item')))]]
    else:
        sys.stderr.write("Did not recognize design type '%s'\n" % session_opts[sn]['design'])
        sys.exit(1)
    controller = "AJ"
    ajoptions = None
    html = indexwd(l, colnames, 'context', '') + '<br>' + indexwd(l, colnames, 'text', '')
    #if indexwd(l, colnames, 'setup', '') is not None:
    #    html = indexwd(l, colnames, 'setup', '') + '<br>' + indexwd(l, colnames, 'context', '') + '<br>' + indexwd(l, colnames, 'text', '')
        #commented code below is for reading unicode strings backwards, didn't end up using this but maybe helpful later
        #if notunicode == False:
        #    html = indexwd(l, colnames, 'setup', '') + indexwd(l, colnames, 'context', '') + indexwd(l, colnames, 'text', '')
        #    html = unicode(html, 'utf-8')
        #    html = html[::-1]
    #else:
        #likewise here for unicode stuff
        #if notunicode == False:
        #    html = unicode(html, 'utf-8')
        #    html = html[::-1]
    # Determine whether or not this is audio.
    if indexwd(l, colnames, 'contextFile') is not None or indexwd(l, colnames, 'wavFile') is not None:
        # Audio
        audiofiles = [ ]
        if indexwd(l, colnames, 'contextFile') is not None:
            audiofiles.append(indexwd(l, colnames, 'contextFile'))
        if indexwd(l, colnames, 'wavFile') is not None:
            audiofiles.append(indexwd(l, colnames, 'wavFile'))
            print indexwd(l, colnames, 'wavFile')
        ajoptions = dict(
            html=html,
            s = dict(audio=audiofiles),
            q = questions[line_index],
            leftComment = scale_comment_lefts[line_index],
            rightComment = scale_comment_rights[line_index]
        )
    else:
        # Text
        ajoptions = dict(
            html = html,
            s = re.split(r"\s*\\n\s*", indexwd(l, colnames, 'question', ''))[0],
            #THIS IS A PLACEHOLDER TO SHOW RESULTS, the q will normally hold the 'acceptability judgement' statement
            #instead, since that is in the datafile, in s, it repeats itself.
            #q =  questions[line_index], #testing out uncommenting this
            leftComment = scale_comment_lefts[line_index],
            rightComment = scale_comment_rights[line_index]
        )
    #print "this is what you want:"
    #print html
    #print cond
    return json.dumps([cond, controller, ajoptions])

instructions = None
if 'instructions' in colnames:
    instructions = [ ]
    for sn in session_names:
        f = open(indexwd(sessions[sn][0], colnames, 'instructions'))
        contents = f.read().decode('utf-8')
        instructions.append(contents)

shufseqs = [ ]
prefix = 0
for sn in session_names:
    if instructions is not None:
        shufseqs.append(str(prefix) + "-instructions")
    shufseqs.append(make_shuffle_sequence(real_types=[str(prefix) + '-' + x for x in conditions[sn].keys()]))
    prefix += 1
shufseq = 'seq("__workerid__",' + ','.join(shufseqs) + ', "__results__", "__code__")'
if wIntro:
    shufseq = 'seq("consent", "intro", "instructions",' + ','.join(shufseqs) + ', "__results__", "__code__")'

out = open(outfile, "w")
###ACTUAL PREAMBLE CODE GENNED HERE
scale=range(int(firstdigits),1+int(seconddigits));
for i in scale:
    scale[scale.index(i)]=str(i)
out.write(make_preamble(shufseq))
#out.write("defaults[1].leftComment = " + json.dumps(scale_comment_left) + ";\n")
#out.write("defaults[1].rightComment = " + json.dumps(scale_comment_right) + ";\n")
out.write("var items = [\n")

out.write("""
["__workerid__", "Form", { html: "<p>Please enter your worker id: <p><input type='text' name='workerid' size='20'>" }],

["__results__", "__SendResults__", { }],

["__code__", "Message", { transfer: null, html: "Thank you! Your completion code is: " + genCode() }],

""")

if wIntro:
    out.write("""["instructions", "Form", {html: {include: "instructions.html"}}],

["intro", "Form", { html: { include: "example_intro.html" }, validators: {age: function (s) { if (s.match(/^\d+$/)) return true; else return "Bad value for \u2018age\u2019";}, dlang: function (s) {if (s) return true; else return "bad"} }}],

["consent", "Form", {html: {include: "consent.html"}}],

""")

first = True
prefix = 0
line_index = 0
for sn in session_names:
    if instructions is not None:
        raw_text = instructions[prefix]
        if raw_text is not None:
            raw_text = raw_text.encode('utf-8', 'xmlcharrefreplace')
            raw_text = raw_text.replace("\r\r", "<p>")
            raw_text = raw_text.replace("\n\n", "<p>")
            raw_text = raw_text.replace("\r\n\r\n", "<p>")
            out.write("['%s', 'Message', { html: %s, transfer: 'keypress' }]" % (str(prefix) + "-instructions", json.dumps(raw_text)))
            if prefix == 0:
                out.write(",\n")
    #put this loop inside another for loop? Going through all the sessions? 
#    for l in sessions[sn]:
#        if not first:
#            out.write(",\n")
#        first = False
        #only gen_item call located here, alternately place the loop right here
#        out.write(gen_item(prefix, sn, l, colnames, line_index))
#        line_index += 1
    #tuple_exp=tuple(experiment_trials)
    #interleaved_list=roundrobin(flatten(experiment_trials))
    for l in sessions[sn]:
        if not first:
            out.write(",\n")
        first = False
        out.write(gen_item(prefix, sn, l, colnames, line_index))
        line_index += 1
    prefix += 1
    if prefix < len(session_names):
        out.write(",\n");

out.write("\n];\n")
