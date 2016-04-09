
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
var shuffleSequence = seq("__workerid__",seq(rshuffle("0-1", "0-3", "0-2", "0-5", "0-4", "0-7", "0-6", "0-8")), "__results__", "__code__");
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
];var items = [

["__workerid__", "Form", { html: "<p>Please enter your worker id: <p><input type='text' name='workerid' size='20'>" }],

["__results__", "__SendResults__", { }],

["__code__", "Message", { transfer: null, html: "Thank you! Your completion code is: " + genCode() }],

["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>He even saw the most famous politician of all: Obama.", "leftComment": "completely unnatural"}],
["0-2", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>He even saw the most famous politician of all: Obama.", "leftComment": "completely unnatural"}],
["0-3", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>He even saw Obama.", "leftComment": "completely unnatural"}],
["0-4", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>He even saw Obama.", "leftComment": "completely unnatural"}],
["0-5", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>He saw even the most famous politician of all: Obama.", "leftComment": "completely unnatural"}],
["0-6", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>He saw even the most famous politician of all: Obama.", "leftComment": "completely unnatural"}],
["0-7", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>He saw even Obama.", "leftComment": "completely unnatural"}],
["0-8", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>He saw even Obama.", "leftComment": "completely unnatural"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>She even won the most coveted of all: A gold medal.", "leftComment": "completely unnatural"}],
["0-2", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>She even won the most coveted of all: A gold medal.", "leftComment": "completely unnatural"}],
["0-3", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>She even won a gold medal.", "leftComment": "completely unnatural"}],
["0-4", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>She even won a gold medal.", "leftComment": "completely unnatural"}],
["0-5", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>She won even the most coveted of all: A gold medal.", "leftComment": "completely unnatural"}],
["0-6", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>She won even the most coveted of all: A gold medal.", "leftComment": "completely unnatural"}],
["0-7", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>She won even a gold medal.", "leftComment": "completely unnatural"}],
["0-8", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>She won even a gold medal.", "leftComment": "completely unnatural"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>\"But in fact, I even had the most highly ranked card: The ace of clubs.\"", "leftComment": "completely unnatural"}],
["0-2", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>\"But in fact, I even had the most highly ranked card: The ace of clubs.\"", "leftComment": "completely unnatural"}],
["0-3", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>\"But in fact, I even had the ace of clubs.\"", "leftComment": "completely unnatural"}],
["0-4", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>\"But in fact, I even had the ace of clubs.\"", "leftComment": "completely unnatural"}],
["0-5", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>\"But in fact, I had even the most highly ranked card: The ace of clubs.\"", "leftComment": "completely unnatural"}],
["0-6", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>\"But in fact, I had even the most highly ranked card: The ace of clubs.\"", "leftComment": "completely unnatural"}],
["0-7", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>\"But in fact, I had even the ace of clubs.\"", "leftComment": "completely unnatural"}],
["0-8", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>\"But in fact, I had even the ace of clubs.\"", "leftComment": "completely unnatural"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>\"This time, he even insulted his greatest ally: Chris Christie.\"", "leftComment": "completely unnatural"}],
["0-2", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>\"This time, he even insulted his greatest ally: Chris Christie.\"", "leftComment": "completely unnatural"}],
["0-3", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>\"This time, he even insulted Chris Christie.\"", "leftComment": "completely unnatural"}],
["0-4", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>\"This time, he even insulted Chris Christie.\"", "leftComment": "completely unnatural"}],
["0-5", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>\"This time, he insulted even his greatest ally: Chris Christie.\"", "leftComment": "completely unnatural"}],
["0-6", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>\"This time, he insulted even his greatest ally: Chris Christie.\"", "leftComment": "completely unnatural"}],
["0-7", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>\"This time, he insulted even Chris Christie. \"", "leftComment": "completely unnatural"}],
["0-8", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br><br>\"This time, he insulted even Chris Christie. \"", "leftComment": "completely unnatural"}]
];
