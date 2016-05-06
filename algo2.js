
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
var shuffleSequence = seq("__workerid__",seq(rshuffle("0-1")), "__results__", "__code__");
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

["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at herself)<br>I am I.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at herself, then at you)<br>I  am you.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at herself, then at your friend Bill)<br>I am he.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at you, then at herself)<br>You are I.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at you)<br>You are you.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at you, then at your friend John)<br>You are I.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at your friend Joel, then at herself)<br>He is I.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at your friend Jasper, then at you)<br>He is you.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at your friend Pete, then at your friend Sally)<br>He is she.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at herself, then at herself and you)<br>I am we.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at herself, then at you and your friend Ruby)<br>I am you.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at herself, then at your friends Bill and Ryan)<br>I am they.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at you, then at herself and your friend Jake)<br>You are we.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at you, then at you and your friend Sarah)<br>You are you.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at you, then at your friends Jill and Brian)<br>You are they.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at your friend Joel, then at herself and you)<br>He is we.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at your friend Jasper, then at you and your friend Mary)<br>He is you.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at your friend Pete, then at your friends Sally and Erin)<br>He is they.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at herself and you, then at herself)<br>We are I.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at herself and Sue, then at you and your friend Lyn)<br>We are you.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at herself and Greta, then at your friend Bill)<br>We are he.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at you and your friend Pat, then at herself)<br>You are I.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at you and your friend Zoe, then at just you)<br>You are you.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at you and your friend Ken, then at your friend John)<br>You are he.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at your friends Joe  and Paml, then at herself)<br>They are I.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at your friends Rick and Sam, then at you)<br>They are you.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at your friends William and Tyler, then at your friend Sally)<br>They are she.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at herself and Nate)<br>We are we.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at herself and Dillon, then at you and your friend Kate)<br>We are you.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at herself and Cory, then at your friends Tara and Jasmine)<br>We are they.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at you and your friend Zack, then at herself and her friend Mitch)<br>You are we.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at you and your friend Laura)<br>You are you.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at you and your friend Valery, then at your friends Maddy and Clint)<br>You are they.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at your friends Gary and Betty, then at herself and you)<br>They are we.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at your friend Jasper, then at you and your friend Mary)<br>They are you.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at your friend Pete, then at your friends Sally and Erin)<br>They are they.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at herself)<br>I is I.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at herself, then at you)<br>I  is you.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at herself, then at your friend Bill)<br>I are he.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at you, then at herself)<br>You is I.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at you)<br>You am you.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at you, then at your friend John)<br>You am he.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at your friend Joel, then at herself)<br>He are I.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at your friend Jasper, then at you)<br>He am you.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at your friend Pete, then at your friend Sally)<br>He are she.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at herself, then at herself and you)<br>I are we.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at herself, then at you and your friend Ruby)<br>I is you.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at herself, then at your friends Bill and Ryan)<br>I is they.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at you, then at herself and your friend Jake)<br>You am we.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at you, then at you and your friend Sarah)<br>You is you.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at you, then at your friends Jill and Brian)<br>You am they.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at your friend Joel, then at herself and you)<br>He am we.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at your friend Jasper, then at you and your friend Mary)<br>He am you.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at your friend Pete, then at your friends Sally and Erin)<br>He am they.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at herself and you, then at herself)<br>We is I.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at herself and Sue, then at you and your friend Lyn)<br>We am you.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at herself and Greta, then at your friend Bill)<br>We am he.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at you and your friend Pat, then at herself)<br>You is I.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at you and your friend Zoe, then at just you)<br>You am you.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at you and your friend Ken, then at your friend John)<br>You am he.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at your friends Joe  and Paml, then at herself)<br>They is I.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at your friends Rick and Sam, then at you)<br>They is you.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at your friends William and Tyler, then at your friend Sally)<br>They am she.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at herself and Nate)<br>We is we.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at herself and Dillon, then at you and your friend Kate)<br>We am you.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at herself and Cory, then at your friends Tara and Jasmine)<br>We is they.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at you and your friend Zack, then at herself and her friend Mitch)<br>You am we.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at you and your friend Laura)<br>You is you.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at you and your friend Valery, then at your friends Maddy and Clint)<br>You am they.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at your friends Gary and Betty, then at herself and you)<br>They is we.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at your friend Jasper, then at you and your friend Mary)<br>They am you.", "leftComment": "completely unacceptable"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "How acceptable of a sentence of English do you think this is?", "html": "<br>(pointing at your friend Pete, then at your friends Sally and Erin)<br>They is they.", "leftComment": "completely unacceptable"}]
];
