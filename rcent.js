
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
var shuffleSequence = seq("__workerid__",seq(rshuffle("0-1", "0-3", "0-2", "0-5", "0-4")), "__results__", "__code__");
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

[["0-1", 2], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The carpenter that the craftsman that the peasant carried hurt supervised the apprentice.", "leftComment": "completely unacceptable"}],
[["0-2", 2], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The carpenter that the craftsman hurt supervised the apprentice that the peasant carried.", "leftComment": "completely unacceptable"}],
[["0-3", 2], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The carpenter supervised the apprentice that the craftsman that the peasant carried hurt.", "leftComment": "completely unacceptable"}],
[["0-4", 2], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The carpenter supervised the apprentice that hurt the craftsman that carried the peasant.", "leftComment": "completely unacceptable"}],
[["0-5", 2], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The carpenter that hut the craftsman supervised the apprentice that carried the peasant.", "leftComment": "completely unacceptable"}],
[["0-1", 4], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The mother that the daughter that the sister found frightened greeted the grandmother.", "leftComment": "completely unacceptable"}],
[["0-2", 4], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The mother that the daughter frightened greeted the grandmother that the sister found.", "leftComment": "completely unacceptable"}],
[["0-3", 4], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The mother greeted the grandmother that the daughter that the sister found frightened.", "leftComment": "completely unacceptable"}],
[["0-4", 4], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The mother greeted the grandmother that frightened the daughter that found the sister.", "leftComment": "completely unacceptable"}],
[["0-5", 4], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The mother that frightened the daughter greeted the grandmother that found the sister.", "leftComment": "completely unacceptable"}],
[["0-1", 6], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The worker that the tenant that the foreman looked for injured questioned the shepherd.", "leftComment": "completely unacceptable"}],
[["0-2", 6], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The worker that the tenant injured questioned the shepherd that the foreman looked for.", "leftComment": "completely unacceptable"}],
[["0-3", 6], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The worker questioned the shepherd that the tenant that the foreman looked for injured.", "leftComment": "completely unacceptable"}],
[["0-4", 6], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The worker questioned the shepherd that injured the tenant that looked for the foreman.", "leftComment": "completely unacceptable"}],
[["0-5", 6], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The worker that injured the tenant questioned the shepherd that looked for the foreman.", "leftComment": "completely unacceptable"}],
[["0-1", 8], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The trader that the businessman that the professor hired confused annoyed the investor.", "leftComment": "completely unacceptable"}],
[["0-2", 8], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The trader that the businessman confused annoyed the investor that the professor hired.", "leftComment": "completely unacceptable"}],
[["0-3", 8], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The trader annoyed the investor that the businessman that the professor hired confused.", "leftComment": "completely unacceptable"}],
[["0-4", 8], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The trader annoyed the investor that confused the businessman that hired the professor.", "leftComment": "completely unacceptable"}],
[["0-5", 8], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The trader that confused the businessman annoyed the investor that hired the professor.", "leftComment": "completely unacceptable"}],
[["0-1", 10], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The painter that the musician that the father missed sheltered cooked for the artist.", "leftComment": "completely unacceptable"}],
[["0-2", 10], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The painter that the musician sheltered cooked for the artist that the father missed.", "leftComment": "completely unacceptable"}],
[["0-3", 10], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The painter cooked for the artist that the musician that the father missed sheltered.", "leftComment": "completely unacceptable"}],
[["0-4", 10], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The painter cooked for the artist that sheltered the musician that missed the father.", "leftComment": "completely unacceptable"}],
[["0-5", 10], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The painter that sheltered the musician cooked for the artist that missed the father.", "leftComment": "completely unacceptable"}],
[["0-1", 12], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The saxophonist that the trumpeter that the conductor brought along distracted thanked the violinist.", "leftComment": "completely unacceptable"}],
[["0-2", 12], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The saxophonist that the trumpeter distracted thanked the violinist that the conductor brought along.", "leftComment": "completely unacceptable"}],
[["0-3", 12], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The saxophonist thanked the violinist that the trumpeter that the conductor brought along distracted.", "leftComment": "completely unacceptable"}],
[["0-4", 12], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The saxophonist thanked the violinist that distracted the trumpeter that brought along the conductor.", "leftComment": "completely unacceptable"}],
[["0-5", 12], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The saxophonist that distracted the trumpeter thanked the violinist that brought along the conductor.", "leftComment": "completely unacceptable"}],
[["0-1", 14], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The pharmacist that the optician that the stranger saw troubled questioned the customer.", "leftComment": "completely unacceptable"}],
[["0-2", 14], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The pharmacist that the optician troubled questioned the customer that the stranger saw.", "leftComment": "completely unacceptable"}],
[["0-3", 14], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The pharmacist questioned the customer that the optician that the stranger saw troubled.", "leftComment": "completely unacceptable"}],
[["0-4", 14], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The pharmacist questioned the customer that troubled the optician that saw the stranger.", "leftComment": "completely unacceptable"}],
[["0-5", 14], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The pharmacist that troubled the optician questioned the customer that saw the stranger.", "leftComment": "completely unacceptable"}],
[["0-1", 16], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The cleaner that the janitor that the doctor recognized hurt surprised the patient.", "leftComment": "completely unacceptable"}],
[["0-2", 16], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The cleaner that the janitor hurt surprised the patient that the doctor recognized.", "leftComment": "completely unacceptable"}],
[["0-3", 16], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The cleaner surprised the patient that the janitor that the doctor recognized hurt.", "leftComment": "completely unacceptable"}],
[["0-4", 16], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The cleaner surprised the patient that hurt the janitor that recognized the doctor.", "leftComment": "completely unacceptable"}],
[["0-5", 16], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The cleaner that hurt the janitor surprised the patient that recognized the doctor.", "leftComment": "completely unacceptable"}],
[["0-1", 18], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The dancer that the singer that the bystander admired hurt tipped the doorman.", "leftComment": "completely unacceptable"}],
[["0-2", 18], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The dancer that the singer hurt tipped the doorman that the bystander admired.", "leftComment": "completely unacceptable"}],
[["0-3", 18], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The dancer tipped the doorman that the singer that the bystander admired hurt.", "leftComment": "completely unacceptable"}],
[["0-4", 18], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The dancer tipped the doorman that hurt the singer that admired the bystander.", "leftComment": "completely unacceptable"}],
[["0-5", 18], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The dancer that hurt the singer tipped the doorman that admired the bystander.", "leftComment": "completely unacceptable"}],
[["0-1", 20], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The artist that the sportsman that the guard shouted at annoyed instructed the newscaster.", "leftComment": "completely unacceptable"}],
[["0-2", 20], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The artist that the sportsman annoyed instructed the newscaster that the guard shouted at.", "leftComment": "completely unacceptable"}],
[["0-3", 20], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The artist instructed the newscaster that the sportsman that the guard shouted at annoyed.", "leftComment": "completely unacceptable"}],
[["0-4", 20], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The artist instructed the newscaster that annoyed the sportsman that shouted at the guard.", "leftComment": "completely unacceptable"}],
[["0-5", 20], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The artist that annoyed the sportsman instructed the newscaster that shouted at the guard.", "leftComment": "completely unacceptable"}],
[["0-1", 22], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The clerk that the bureaucrat that the visitor had forgotten about helped annoyed the neighbor.", "leftComment": "completely unacceptable"}],
[["0-2", 22], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The clerk that the bureaucrat helped annoyed the neighbor that the visitor had forgotten about.", "leftComment": "completely unacceptable"}],
[["0-3", 22], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The clerk annoyed the neighbor that the bureaucrat that the visitor had forgotten about helped.", "leftComment": "completely unacceptable"}],
[["0-4", 22], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The clerk annoyed the neighbor that helped the bureaucrat that had forgotten about the visitor.", "leftComment": "completely unacceptable"}],
[["0-5", 22], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The clerk that helped the bureaucrat annoyed the neighbor that had forgotten about the visitor.", "leftComment": "completely unacceptable"}],
[["0-1", 24], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The son that the father that the teacher saw disturbed visited the grandfather.", "leftComment": "completely unacceptable"}],
[["0-2", 24], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The son that the father visited disturbed the grandfather that the teacher saw.", "leftComment": "completely unacceptable"}],
[["0-3", 24], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The son visited the grandfather that the father that the teacher saw disturbed.", "leftComment": "completely unacceptable"}],
[["0-4", 24], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The son visited the grandfather that disturbed the father that saw the teacher.", "leftComment": "completely unacceptable"}],
[["0-5", 24], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The son that visited the father disturbed the grandfather that saw the teacher.", "leftComment": "completely unacceptable"}],
[["0-1", 26], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The conductor that the choirmaster that the worker ignored hit berated the musician.", "leftComment": "completely unacceptable"}],
[["0-2", 26], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The conductor that the choirmaster hit berated the musician that the worker ignored.", "leftComment": "completely unacceptable"}],
[["0-3", 26], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The conductor berated the musician that the choirmaster that the worker ignored hit.", "leftComment": "completely unacceptable"}],
[["0-4", 26], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The conductor berated the musician that hit the choirmaster that ignored the worker.", "leftComment": "completely unacceptable"}],
[["0-5", 26], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The conductor that hit the choirmaster berated the musician that ignored the worker.", "leftComment": "completely unacceptable"}],
[["0-1", 28], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The defence that the prosecutor that the spy looked at surprised convinced the judge.", "leftComment": "completely unacceptable"}],
[["0-2", 28], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The defence that the prosecutor surprised convinced the judge that the spy looked at.", "leftComment": "completely unacceptable"}],
[["0-3", 28], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The defence convinced the judge that the prosecutor that the spy looked at surprised.", "leftComment": "completely unacceptable"}],
[["0-4", 28], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The defence convinced the judge that surprised the prosecutor that looked at the spy.", "leftComment": "completely unacceptable"}],
[["0-5", 28], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The defence that surprised the prosecutor convinced the judge that looked at the spy.", "leftComment": "completely unacceptable"}],
[["0-1", 30], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The cousin that the brother that the peasant described pleased hated the uncle.", "leftComment": "completely unacceptable"}],
[["0-2", 30], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The cousin that the brother pleased hated the uncle that the peasant described.", "leftComment": "completely unacceptable"}],
[["0-3", 30], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The cousin hated the uncle that the brother that the peasant described pleased.", "leftComment": "completely unacceptable"}],
[["0-4", 30], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The cousin hated the uncle that pleased the brother that described the peasant.", "leftComment": "completely unacceptable"}],
[["0-5", 30], "AJ", {"q": "Please select a number", "rightComment": "completely acceptable", "s": "Do you think this sentence is an acceptable sentence of English?", "html": "<br><br>The cousin that pleased the brother hated the uncle that described the peasant.", "leftComment": "completely unacceptable"}]
];
