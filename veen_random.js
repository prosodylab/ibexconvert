
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

["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"People lined up at the climate conference to see government officials. Everyone saw several well known politicians. Nancy felt happy because she saw the vice president, Joe Biden, among other people. But Bill was able to top that. \"<br>He even saw the most famous politician of all: Obama.", "leftComment": "completely unnatural"}],
["0-2", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"People lined up at the climate conference to see government officials. The line was too long, so each person got to meet only one official. Nancy felt happy because she saw the vice president, Joe Biden. But Bill was able to top that. \"<br>He even saw the most famous politician of all: Obama.", "leftComment": "completely unnatural"}],
["0-3", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"People lined up at the climate conference to see government officials. Everyone saw several well known politicians. Nancy felt happy because she saw the vice president, Joe Biden, among other people. But Bill was able to top that. \"<br>He even saw Obama.", "leftComment": "completely unnatural"}],
["0-4", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"People lined up at the climate conference to see government officials. The line was too long, so each person got to meet only one official. Nancy felt happy because she saw the vice president, Joe Biden. But Bill was able to top that. \"<br>He even saw Obama.", "leftComment": "completely unnatural"}],
["0-5", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"People lined up at the climate conference to see government officials. Everyone saw several well known politicians. Nancy felt happy because she saw the vice president, Joe Biden, among other people. But Bill was able to top that. \"<br>He saw even the most famous politician of all: Obama.", "leftComment": "completely unnatural"}],
["0-6", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"People lined up at the climate conference to see government officials. The line was too long, so each person got to meet only one official. Nancy felt happy because she saw the vice president, Joe Biden. But Bill was able to top that. \"<br>He saw even the most famous politician of all: Obama.", "leftComment": "completely unnatural"}],
["0-7", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"People lined up at the climate conference to see government officials. Everyone saw several well known politicians. Nancy felt happy because she saw the vice president, Joe Biden, among other people. But Bill was able to top that. \"<br>He saw even Obama.", "leftComment": "completely unnatural"}],
["0-8", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"People lined up at the climate conference to see government officials. The line was too long, so each person got to meet only one official. Nancy felt happy because she saw the vice president, Joe Biden. But Bill was able to top that. \"<br>He saw even Obama.", "leftComment": "completely unnatural"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"Everyone on the Dutch speed skating team won more than one medal, mostly, everyone won bronze and silver medals. Mary did particularly well.\"<br>She even won the most coveted of all: A gold medal.", "leftComment": "completely unnatural"}],
["0-2", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"Every member of the the Dutch speed skating team won exactly one medal, most of them won a bronze medal, two won a silver medal. Mary did particularly well. \"<br>She even won the most coveted of all: A gold medal.", "leftComment": "completely unnatural"}],
["0-3", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"Everyone on the Dutch speed skating team won more than one medal, mostly, everyone won bronze and silver medals. Mary did particularly well.\"<br>She even won a gold medal.", "leftComment": "completely unnatural"}],
["0-4", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"Every member of the the Dutch speed skating team won exactly one medal, most of them won a bronze medal, two won a silver medal. Mary did particularly well. \"<br>She even won a gold medal.", "leftComment": "completely unnatural"}],
["0-5", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"Everyone on the Dutch speed skating team won more than one medal, mostly, everyone won bronze and silver medals. Mary did particularly well.\"<br>She won even the most coveted of all: A gold medal.", "leftComment": "completely unnatural"}],
["0-6", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"Every member of the the Dutch speed skating team won exactly one medal, most of them won a bronze medal, two won a silver medal. Mary did particularly well. \"<br>She won even the most coveted of all: A gold medal.", "leftComment": "completely unnatural"}],
["0-7", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"Everyone on the Dutch speed skating team won more than one medal, mostly, everyone won bronze and silver medals. Mary did particularly well.\"<br>She won even a gold medal.", "leftComment": "completely unnatural"}],
["0-8", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"Every member of the the Dutch speed skating team won exactly one medal, most of them won a bronze medal, two won a silver medal. Mary did particularly well. \"<br>She won even a gold medal.", "leftComment": "completely unnatural"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"We were playing a card game where each player has three cards. The player with the highest card wins. Aces beat kings, kings beat queens, etc. In the end Sally asked whether I have a queen. I said I did. \"<br>\"But in fact, I even had the most highly ranked card: The ace of clubs.\"", "leftComment": "completely unnatural"}],
["0-2", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"We were playing a card game where each player only gets one card. Aces beat kings, kings beat queens, etc. In the end Sally asked whether I have a queen. \"<br>\"But in fact, I even had the most highly ranked card: The ace of clubs.\"", "leftComment": "completely unnatural"}],
["0-3", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"We were playing a card game where each player has three cards. The player with the highest card wins. Aces beat kings, kings beat queens, etc. In the end Sally asked whether I have a queen. I said I did. \"<br>\"But in fact, I even had the ace of clubs.\"", "leftComment": "completely unnatural"}],
["0-4", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"We were playing a card game where each player only gets one card. Aces beat kings, kings beat queens, etc. In the end Sally asked whether I have a queen. \"<br>\"But in fact, I even had the ace of clubs.\"", "leftComment": "completely unnatural"}],
["0-5", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"We were playing a card game where each player has three cards. The player with the highest card wins. Aces beat kings, kings beat queens, etc. In the end Sally asked whether I have a queen. I said I did. \"<br>\"But in fact, I had even the most highly ranked card: The ace of clubs.\"", "leftComment": "completely unnatural"}],
["0-6", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"We were playing a card game where each player only gets one card. Aces beat kings, kings beat queens, etc. In the end Sally asked whether I have a queen. \"<br>\"But in fact, I had even the most highly ranked card: The ace of clubs.\"", "leftComment": "completely unnatural"}],
["0-7", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"We were playing a card game where each player has three cards. The player with the highest card wins. Aces beat kings, kings beat queens, etc. In the end Sally asked whether I have a queen. I said I did. \"<br>\"But in fact, I had even the ace of clubs.\"", "leftComment": "completely unnatural"}],
["0-8", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"We were playing a card game where each player only gets one card. Aces beat kings, kings beat queens, etc. In the end Sally asked whether I have a queen. \"<br>\"But in fact, I had even the ace of clubs.\"", "leftComment": "completely unnatural"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"Today, Donald Trump was in a particularly cantankerous mood. He was insulting people left and right. \"<br>\"This time, he even insulted his greatest ally: Chris Christie.\"", "leftComment": "completely unnatural"}],
["0-2", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"Today, Donald Trump did something odd. That the one person he insulted today was someone who's a Republican wasn't so surprising, given what happened in the past weeks. But people were surprised nevertheless, and I can tell you why.\"<br>\"This time, he even insulted his greatest ally: Chris Christie.\"", "leftComment": "completely unnatural"}],
["0-3", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"Today, Donald Trump was in a particularly cantankerous mood. He was insulting people left and right. \"<br>\"This time, he even insulted Chris Christie.\"", "leftComment": "completely unnatural"}],
["0-4", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"Today, Donald Trump did something odd. That the one person he insulted today was someone who's a Republican wasn't so surprising, given what happened in the past weeks. But people were surprised nevertheless, and I can tell you why.\"<br>\"This time, he even insulted Chris Christie.\"", "leftComment": "completely unnatural"}],
["0-5", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"Today, Donald Trump was in a particularly cantankerous mood. He was insulting people left and right. \"<br>\"This time, he insulted even his greatest ally: Chris Christie.\"", "leftComment": "completely unnatural"}],
["0-6", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"Today, Donald Trump did something odd. That the one person he insulted today was someone who's a Republican wasn't so surprising, given what happened in the past weeks. But people were surprised nevertheless, and I can tell you why.\"<br>\"This time, he insulted even his greatest ally: Chris Christie.\"", "leftComment": "completely unnatural"}],
["0-7", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"Today, Donald Trump was in a particularly cantankerous mood. He was insulting people left and right. \"<br>\"This time, he insulted even Chris Christie. \"", "leftComment": "completely unnatural"}],
["0-8", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>\"Today, Donald Trump did something odd. That the one person he insulted today was someone who's a Republican wasn't so surprising, given what happened in the past weeks. But people were surprised nevertheless, and I can tell you why.\"<br>\"This time, he insulted even Chris Christie. \"", "leftComment": "completely unnatural"}]
];
