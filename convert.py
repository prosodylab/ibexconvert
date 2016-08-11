import sys
import re
import json
import sys
from itertools import *

#README
#This script takes as input at least two files. The first of which is the experiment file which is to be converted, and the second of which is the name of the desired output. This should usually have .js as an extension. Next, there are a number of flags which can be added, which are detailed below.

# trigger to write consent intro and instructions into file
# default is off (False) because most experiments won't have this
wIntro = False
# add filler trials trigger
# default is true
noFiller = False
# separators trigger
# default is false
sep = False
# defaults to AJ when off
isQAJ = False


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
    if sep:
        return "sepWith(\"sep\", seq(rshuffle(" + ', '.join([json.dumps(t) for t in real_types]) +")))"
    elif noFiller:
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
                triggers: [3],
                children: [
                    "Message", this.options,
                    "FlashSentence", this.options,
                    "newCont", this.options,
                    "Question", this.options
                ]
            });
        }
    },

    properties: { }
});

define_ibex_controller({
    name: "QAJ",

    jqueryWidget: {
        _init: function () {
            this.options.transfer = null; // Remove 'click to continue message'.
            this.element.VBox({
                options: this.options,
                triggers: [1],
                children: [
                    "FlashSentence", this.options,
                    "Question2", this.options,
                    "Question", this.options
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
        audioMessage: "Click here when you're ready to listen to the story with the additional remark",
        audioTrigger: "click"
    },
    "DAJ", {
        presentAsScale: true,
        as: """ + str(scale) + """
    },
    "QAJ", {
        hasCorrectAJ: true,
        presentAsScaleAJ: false,
        audioMessage: "Click here to play audio",
        audioTrigger: "click",
        randomOrderAJ: false,
        randomOrder: false,
        presentAsScale: true,
        hasCorrect: false,
        as: """ + str(scale) + """
    }
];
    """
num_input_files=len(sys.argv)
experiment_list=[]
experiment_indices=[]
experiment_trials=[]
expfile=sys.argv[1]
outfile = sys.argv[2]
isSelfPaced=False
#Check what flags are given
#EX: -s indicates that the experiment is a self-paced reading experiment
if num_input_files>3:
    #-s=isSelfPaced
    #-w=wIntro
    #-f=noFiller
    #-e=sep
    #-q=isQAJ
    for flag in sys.argv[3:]:
        if flag=="-s":
            isSelfPaced=True
        elif flag=="-w":
            wIntro=True
        elif flag=="-f":
            noFiller=True
        elif flag=="-e":
            sep=True
        elif flag=="-q":
            isQAJ=True
        else:
            sys.stderr.write("Flag not recognized. Please use one of the approved flags, -s for self paced, -w for adding intro, -f for no filler, -e for seperator, and -q for QAJ format.\n")
            sys.exit(1)
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
            experiment_trials.append([])
            for ind in range(experiment_indices[i-1],experiment_indices[i]):
                #fill list of lists, each inner list is the container of the experiment corresponding to that expind
                experiment_trials[i-1].append(lines[ind])
        experiment_trials.append([])
        for ind2 in range(experiment_indices[len(experiment_indices)-1],len(lines)):
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
    if indexwd(l, colnames, 'qType2', '') is not None:
        questions.append(indexwd(l,colnames, 'qType2', ''))
    else:
        questions.append(indexwd(l,colnames, 'qType', ''))
    #   m = re.match(scale_regexp, indexwd(l, colnames, 'question', ''))
    #   m = re.match(scale_regexp, indexwd(l, colnames, 'question', ''))
    #if not m:
    #    sys.stderr.write("Error: could not parse scale comments\n")
    #    sys.exit(1)
    #questions.append(m.group(1))
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

def gen_item_DashAJ(sid, sn, l, colnames, line_index):
    cond = str(sid)  + '-' + indexwd(l, colnames, 'conditionLabel', '') + indexwd(l, colnames, 'condition', '')
    if session_opts[sn]['design'].upper() == 'RANDOM':
        pass
    elif session_opts[sn]['design'].upper() == 'LATINSQUARE':
        cond = [cond, items[str(sid) + '-' + str(int(indexwd(l, colnames, 'item')))]]
    elif session_opts[sn]['design'].upper() == 'WITHIN':
        cond = [cond, items[str(sid) + '-' + str(int(indexwd(l, colnames, 'item')))]]
        #cond = [cond, items[str(sid) + '-' + str(int(indexwd(l, colnames, 'item')))]]
        #cond = [cond, items[str(sid) + '-' + str(int(indexwd(l, colnames, 'item')))]]
        #cond = [cond, items[str(sid) + '-' + str(int(indexwd(l, colnames, 'item')))]]
    else:
        sys.stderr.write("Did not recognize design type '%s'\n" % session_opts[sn]['design'])
        sys.exit(1)
    controller="DAJ"
    dashedAJOptions=None  
    if indexwd(l, colnames, 'setup', '') is not None and indexwd(l, colnames, 'context', '') is not None:
        html = indexwd(l, colnames, 'setup', '') + '<br>' + indexwd(l, colnames, 'context', '') + '<br>' + indexwd(l, colnames, 'text', '')
    else:
        html = indexwd(l, colnames, 'text', '')
    if indexwd(l, colnames, 'contextFile') is not None or indexwd(l, colnames, 'wavFile') is not None:
       print "dug" 
    else:
        ajoptions = dict(
                        html = html,
                        s = re.split(r"\s*\\n\s*", indexwd(l, colnames, 'question', ''))[0],
                        #THIS IS A PLACEHOLDER TO SHOW RESULTS, the q will normally hold the 'acceptability judgement' statement
                        #instead, since that is in the datafile, in s, it repeats itself.
                        #q =  questions[line_index], #testing out uncommenting this
                        leftComment = scale_comment_lefts[line_index],
                        rightComment = scale_comment_rights[line_index]
        )
    return json.dumps([cond, controller, dashedAJOptions])

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
        cond = indexwd(l, colnames, 'condition', '') + '-' + indexwd(l, colnames, 'item', '')
        #cond = [cond, items[str(sid) + '-' + str(int(indexwd(l, colnames, 'item')))]]
        #cond = [cond, items[str(sid) + '-' + str(int(indexwd(l, colnames, 'item')))]]
        #cond = [cond, items[str(sid) + '-' + str(int(indexwd(l, colnames, 'item')))]]
        #cond = [cond, items[str(sid) + '-' + str(int(indexwd(l, colnames, 'item')))]]
    else:
        sys.stderr.write("Did not recognize design type '%s'\n" % session_opts[sn]['design'])
        sys.exit(1)
    if isSelfPaced:
        controller ="DAJ"
        html='<br>'
    elif isQAJ:
        controller = "QAJ"
        html = '<br>'
    else:
        controller = "AJ"
        html = "Read the passage below carefully: <br><br>" + indexwd(l, colnames, 'context', '')
    ajoptions = None
    
    #if indexwd(l, colnames, 'setup', '') is not None:
    #    html = indexwd(l, colnames, 'setup', '') + '<br>' + indexwd(l, colnames, 'context', '') + '<br>' + indexwd(l, colnames, 'text', '')
        #commented code below is for reading unicode strings backwards, didn't end up using this but maybe helpful later
        #if notunicode == False:
        #    html = indexwd(l, colnames, 'setup', '') + indexwd(l, colnames, 'context', '') + indexwd(l, colnames, 'text', '')
        #    html = unicode(html, 'utf-8')
        #    html = html[::-1]
   # else:
   #     html = indexwd(l, colnames, 'text', '')
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
        if indexwd(l, colnames, 'qType', '') == "jm":
            ajoptions = dict(
                html=html,
                s = dict(audio=audiofiles),
                q = questions[line_index],
                leftComment = scale_comment_lefts[line_index],
                rightComment = scale_comment_rights[line_index],
                moreHTML = indexwd(l, colnames, 'text', '')
        )
        elif indexwd(l, colnames, 'qType', '') == "mcF":
            ajoptions = dict(
                qAJ= indexwd(l, colnames, 'question', ''),
                AJas = [indexwd(l, colnames, 'correctAnswer', ''), indexwd(l, colnames, 'alt1Answer', '')],
                html=html,
                s=dict(audio=audiofiles),
                q= questions[line_index],
                leftComment = scale_comment_lefts[line_index],
                rightComment = scale_comment_rights[line_index],
                moreHTML = indexwd(l, colnames, 'text', '')
        )
    else:
        # Text
        if isSelfPaced:
            ajoptions = dict(
                    html = html,
                    s = re.split(r"\s*\\n\s*", indexwd(l, colnames, 'text', ''))[0],
                    q = questions[line_index],
                    leftComment = scale_comment_lefts[line_index],
                    rightComment = scale_comment_rights[line_index],
                    mode = "self-paced reading",
                    #as = ["1","2","3","4","5","6","7"],
                    presentAsScale = "true"
                )
        elif indexwd(l, colnames, 'qType', '') == "mcF":
            ajoptions = dict(
                qAJ= indexwd(l, colnames, 'question', ''),
                AJas = [indexwd(l, colnames, 'correctAnswer', ''), indexwd(l, colnames, 'alt1Answer', '')],
                html=html,
                #s=re.split(r"\s*\\n\s*", indexwd(l, colnames, 'question', ''))[0],
                s= questions[line_index],
                leftComment = scale_comment_lefts[line_index],
                rightComment = scale_comment_rights[line_index],
                mode = "self-paced reading",
                moreHTML = indexwd(l, colnames, 'text', '')
        )
        elif indexwd(l, colnames, 'qType', '') == "jm":
            ajoptions = dict(
                    html = html,
                    s = re.split(r"\s*\\n\s*", indexwd(l, colnames, 'text', ''))[0],
                    q = questions[line_index],
                    leftComment = scale_comment_lefts[line_index],
                    rightComment = scale_comment_rights[line_index],
                    mode = "self-paced reading",
                    #as = ["1","2","3","4","5","6","7"],
                    presentAsScale = "true"
                )
        else:
            ajoptions = dict(
                html = html,
                s = re.split(r"\s*\\n\s*", indexwd(l, colnames, 'question', ''))[0],
                #THIS IS A PLACEHOLDER TO SHOW RESULTS, the q will normally hold the 'acceptability judgement' statement
                #instead, since that is in the datafile, in s, it repeats itself.
                #q =  questions[line_index], #testing out uncommenting this
                leftComment = scale_comment_lefts[line_index],
                rightComment = scale_comment_rights[line_index],
                moreHTML = indexwd(l, colnames, 'text', '')
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
["__workerid__", "Form", { html: "<p>Please enter your participant number: <p><input type='text' name='workerid' size='20'>" }],

["__results__", "__SendResults__", { }],

["__code__", "Message", { transfer: null, html: "Thank you! Your completion code is: " + genCode() }],

["sep", "Separator", {transfer: "keypress", normalMessage: "Please press any key to move     on to the next passage.", ignoreFailure: true}],
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
        first=False
        out.write(gen_item(prefix, sn, l, colnames, line_index))
        line_index+=1
    prefix += 1
    if prefix < len(session_names):
        out.write(",\n");

out.write("\n];\n")
