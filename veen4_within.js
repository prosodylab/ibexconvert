
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

["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>People lined up at the climate conference to see government officials. Everyone saw several well known politicians. Nancy felt especially happy because she saw some of the really high profile politicians.<br>Even Obama.", "leftComment": "completely unnatural"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>People lined up at the climate conference to see government officials. The line was too long, so each person got to meet only one official. Nancy felt happy because she got to see someone high profile.\u00a0 <br>Even Obama.", "leftComment": "completely unnatural"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>People lined up at the climate conference to see government officials. Everyone saw several well known politicians. Nancy felt especially happy because she saw some of the really high profile politicians.<br>Obama, even.", "leftComment": "completely unnatural"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>People lined up at the climate conference to see government officials. The line was too long, so each person got to meet only one official. Nancy felt happy because she got to see someone high profile.\u00a0 <br>Obama, even.", "leftComment": "completely unnatural"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>People lined up at the climate conference to see government officials. Everyone saw several well known politicians. Nancy felt especially happy because she saw some of the really high profile politicians.<br>Even Obama, too.", "leftComment": "completely unnatural"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>People lined up at the climate conference to see government officials. The line was too long, so each person got to meet only one official. Nancy felt happy because she got to see someone high profile.\u00a0 <br>Even Obama, too.", "leftComment": "completely unnatural"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>People lined up at the climate conference to see government officials. Everyone saw several well known politicians. Nancy felt especially happy because she saw some of the really high profile politicians.<br>Obama even, too.", "leftComment": "completely unnatural"}],
["0-1", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>People lined up at the climate conference to see government officials. The line was too long, so each person got to meet only one official. Nancy felt happy because she got to see someone high profile.\u00a0 <br>Obama even, too.", "leftComment": "completely unnatural"}],
["0-2", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>It\u2019s International Friendship day and in our school, each child is supposed to hug at least one other student. Alice has not been talking to Isaac for the past few months since he\u2019s her least favourite classmate. But today Alice hugged all of her classmates. <br>Even Isaac.", "leftComment": "completely unnatural"}],
["0-2", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>It\u2019s International Friendship day at school and each child is supposed to choose exactly one other student to hug. Alice has not been talking to Harry, Alfie, and Isaac for the past few months. She particularly does not like Isaac. But today, she decided that the only person she would hug is someone she didn\u2019t normally talk to. <br>Even Isaac.", "leftComment": "completely unnatural"}],
["0-2", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>It\u2019s International Friendship day and in our school, each child is supposed to hug at least one other student. Alice has not been talking to Isaac for the past few months since he\u2019s her least favourite classmate. But today Alice hugged all of her classmates. <br>Isaac, even. ", "leftComment": "completely unnatural"}],
["0-2", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>It\u2019s International Friendship day at school and each child is supposed to choose exactly one other student to hug. Alice has not been talking to Harry, Alfie, and Isaac for the past few months. She particularly does not like Isaac. But today, she decided that the only person she would hug is someone she didn\u2019t normally talk to. <br>Isaac, even. ", "leftComment": "completely unnatural"}],
["0-2", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>It\u2019s International Friendship day and in our school, each child is supposed to hug at least one other student. Alice has not been talking to Isaac for the past few months since he\u2019s her least favourite classmate. But today Alice hugged all of her classmates. <br>Even Isaac, too.", "leftComment": "completely unnatural"}],
["0-2", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>It\u2019s International Friendship day at school and each child is supposed to choose exactly one other student to hug. Alice has not been talking to Harry, Alfie, and Isaac for the past few months. She particularly does not like Isaac. But today, she decided that the only person she would hug is someone she didn\u2019t normally talk to. <br>Even Isaac, too.", "leftComment": "completely unnatural"}],
["0-2", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>It\u2019s International Friendship day and in our school, each child is supposed to hug at least one other student. Alice has not been talking to Isaac for the past few months since he\u2019s her least favourite classmate. But today Alice hugged all of her classmates. <br>Isaac even, too.", "leftComment": "completely unnatural"}],
["0-2", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>It\u2019s International Friendship day at school and each child is supposed to choose exactly one other student to hug. Alice has not been talking to Harry, Alfie, and Isaac for the past few months. She particularly does not like Isaac. But today, she decided that the only person she would hug is someone she didn\u2019t normally talk to. <br>Isaac even, too.", "leftComment": "completely unnatural"}],
["0-3", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>Tom participated in a chess tournament in which he did really well. He defeated multiple internationally renowned players.<br>Even Gary Kasparov.", "leftComment": "completely unnatural"}],
["0-3", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>Tom made it to the semi-finals in a chess tournament where he had to beat only one person to reach the final match. He did very well because he defeated an internationally renowned chess champion.<br>Even Gary Kasparov.", "leftComment": "completely unnatural"}],
["0-3", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>Tom participated in a chess tournament in which he did really well. He defeated multiple internationally renowned players.<br>Gary Kasparov, even.", "leftComment": "completely unnatural"}],
["0-3", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>Tom made it to the semi-finals in a chess tournament where he had to beat only one person to reach the final match. He did very well because he defeated an internationally renowned chess champion.<br>Gary Kasparov, even.", "leftComment": "completely unnatural"}],
["0-3", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>Tom participated in a chess tournament in which he did really well. He defeated multiple internationally renowned players.<br>Even Gary Kasparov, too.", "leftComment": "completely unnatural"}],
["0-3", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>Tom made it to the semi-finals in a chess tournament where he had to beat only one person to reach the final match. He did very well because he defeated an internationally renowned chess champion.<br>Even Gary Kasparov, too.", "leftComment": "completely unnatural"}],
["0-3", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>Tom participated in a chess tournament in which he did really well. He defeated multiple internationally renowned players.<br>Gary Kasparov even, too.", "leftComment": "completely unnatural"}],
["0-3", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>Tom made it to the semi-finals in a chess tournament where he had to beat only one person to reach the final match. He did very well because he defeated an internationally renowned chess champion.<br>Gary Kasparov even, too.", "leftComment": "completely unnatural"}],
["0-4", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>To host a soccer world cup, the candidate country needs to have a suitable climate. For the next three world cups, the candidate countries do not necessarily have a suitable climate. But FIFA eventually chose three countries.  <br>Even Qatar.", "leftComment": "completely unnatural"}],
["0-4", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>To host a soccer world cup, the candidate country needs to have a suitable climate. For 2022, the three candidates had unpleasant conditions. But FIFA eventually chose one. <br>Even Qatar.", "leftComment": "completely unnatural"}],
["0-4", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>To host a soccer world cup, the candidate country needs to have a suitable climate. For the next three world cups, the candidate countries do not necessarily have a suitable climate. But FIFA eventually chose three countries.  <br>Qatar, even.", "leftComment": "completely unnatural"}],
["0-4", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>To host a soccer world cup, the candidate country needs to have a suitable climate. For 2022, the three candidates had unpleasant conditions. But FIFA eventually chose one. <br>Qatar, even.", "leftComment": "completely unnatural"}],
["0-4", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>To host a soccer world cup, the candidate country needs to have a suitable climate. For the next three world cups, the candidate countries do not necessarily have a suitable climate. But FIFA eventually chose three countries.  <br>Even Qatar, too.", "leftComment": "completely unnatural"}],
["0-4", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>To host a soccer world cup, the candidate country needs to have a suitable climate. For 2022, the three candidates had unpleasant conditions. But FIFA eventually chose one. <br>Even Qatar, too.", "leftComment": "completely unnatural"}],
["0-4", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>To host a soccer world cup, the candidate country needs to have a suitable climate. For the next three world cups, the candidate countries do not necessarily have a suitable climate. But FIFA eventually chose three countries.  <br>Qatar even, too.", "leftComment": "completely unnatural"}],
["0-4", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>To host a soccer world cup, the candidate country needs to have a suitable climate. For 2022, the three candidates had unpleasant conditions. But FIFA eventually chose one. <br>Qatar even, too.", "leftComment": "completely unnatural"}],
["0-5", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>The director of our high school has been looking for a number of teachers for a long time. He eventually hired a number of people to teach various courses.<br>Even a university professor.", "leftComment": "completely unnatural"}],
["0-5", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>The director of our high school has been looking for a teacher for the mathematics course for a long time. He eventually hired one.<br>Even a university professor.", "leftComment": "completely unnatural"}],
["0-5", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>The director of our high school has been looking for a number of teachers for a long time. He eventually hired a number of people to teach various courses.<br>A university professor, even.", "leftComment": "completely unnatural"}],
["0-5", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>The director of our high school has been looking for a teacher for the mathematics course for a long time. He eventually hired one.<br>A university professor, even.", "leftComment": "completely unnatural"}],
["0-5", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>The director of our high school has been looking for a number of teachers for a long time. He eventually hired a number of people to teach various courses.<br>Even a university professor, too.", "leftComment": "completely unnatural"}],
["0-5", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>The director of our high school has been looking for a teacher for the mathematics course for a long time. He eventually hired one.<br>Even a university professor, too.", "leftComment": "completely unnatural"}],
["0-5", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>The director of our high school has been looking for a number of teachers for a long time. He eventually hired a number of people to teach various courses.<br>A university professor even, too.", "leftComment": "completely unnatural"}],
["0-5", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>The director of our high school has been looking for a teacher for the mathematics course for a long time. He eventually hired one.<br>A university professor even, too.", "leftComment": "completely unnatural"}],
["0-6", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>I took many courses last semester. The final exams were extremely difficult. I was really worried I would fail the semester. But I actually got some good grades.<br>Even an A+.", "leftComment": "completely unnatural"}],
["0-6", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>I took one course last semester. The final exam for that course was extremely difficult. I was really worried I would fail. But I actually got a good grade.<br>Even an A+.", "leftComment": "completely unnatural"}],
["0-6", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>I took many courses last semester. The final exams were extremely difficult. I was really worried I would fail the semester. But I actually got some good grades.<br>An A+, even.", "leftComment": "completely unnatural"}],
["0-6", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>I took one course last semester. The final exam for that course was extremely difficult. I was really worried I would fail. But I actually got a good grade.<br>An A+, even.", "leftComment": "completely unnatural"}],
["0-6", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>I took many courses last semester. The final exams were extremely difficult. I was really worried I would fail the semester. But I actually got some good grades.<br>Even an A+, too.", "leftComment": "completely unnatural"}],
["0-6", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>I took one course last semester. The final exam for that course was extremely difficult. I was really worried I would fail. But I actually got a good grade.<br>Even an A+, too.", "leftComment": "completely unnatural"}],
["0-6", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>I took many courses last semester. The final exams were extremely difficult. I was really worried I would fail the semester. But I actually got some good grades.<br>An A+ even, too.", "leftComment": "completely unnatural"}],
["0-6", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>I took one course last semester. The final exam for that course was extremely difficult. I was really worried I would fail. But I actually got a good grade.<br>An A+ even, too.", "leftComment": "completely unnatural"}],
["0-7", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>We were playing a card game where each player has five cards. The player with the highest card wins. Aces beat kings, kings beat queens, etc. In the end Sally asked whether I had a jack. I said I did. But in fact I had some better cards in my hand.<br>Even an ace.", "leftComment": "completely unnatural"}],
["0-7", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>We were playing a card game where each player gets only one card. Aces beat kings, kings beat queens, etc.  In the end Sally asked whether I had a jack. But the only card I had was higher. <br>Even an ace.", "leftComment": "completely unnatural"}],
["0-7", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>We were playing a card game where each player has five cards. The player with the highest card wins. Aces beat kings, kings beat queens, etc. In the end Sally asked whether I had a jack. I said I did. But in fact I had some better cards in my hand.<br>An ace, even.", "leftComment": "completely unnatural"}],
["0-7", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>We were playing a card game where each player gets only one card. Aces beat kings, kings beat queens, etc.  In the end Sally asked whether I had a jack. But the only card I had was higher. <br>An ace, even.", "leftComment": "completely unnatural"}],
["0-7", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>We were playing a card game where each player has five cards. The player with the highest card wins. Aces beat kings, kings beat queens, etc. In the end Sally asked whether I had a jack. I said I did. But in fact I had some better cards in my hand.<br>Even an ace, too.", "leftComment": "completely unnatural"}],
["0-7", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>We were playing a card game where each player gets only one card. Aces beat kings, kings beat queens, etc.  In the end Sally asked whether I had a jack. But the only card I had was higher. <br>Even an ace, too.", "leftComment": "completely unnatural"}],
["0-7", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>We were playing a card game where each player has five cards. The player with the highest card wins. Aces beat kings, kings beat queens, etc. In the end Sally asked whether I had a jack. I said I did. But in fact I had some better cards in my hand.<br>An ace even, too.", "leftComment": "completely unnatural"}],
["0-7", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>We were playing a card game where each player gets only one card. Aces beat kings, kings beat queens, etc.  In the end Sally asked whether I had a jack. But the only card I had was higher. <br>An ace even, too.", "leftComment": "completely unnatural"}],
["0-8", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>Everyone on the Dutch speed skating team won at least one medal. Mostly, people won bronze and silver medals. Mary did particularly well this year and won multiple medals. <br>Even a gold medal.", "leftComment": "completely unnatural"}],
["0-8", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>Each member of the Dutch speed skating team won exactly one medal: bronze, silver, or gold. Mary, who was trying out for the team, did particularly well and also ended up winning a medal. <br>Even a gold medal.", "leftComment": "completely unnatural"}],
["0-8", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>Everyone on the Dutch speed skating team won at least one medal. Mostly, people won bronze and silver medals. Mary did particularly well this year and won multiple medals. <br>A gold medal, even.", "leftComment": "completely unnatural"}],
["0-8", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>Each member of the Dutch speed skating team won exactly one medal: bronze, silver, or gold. Mary, who was trying out for the team, did particularly well and also ended up winning a medal. <br>A gold medal, even.", "leftComment": "completely unnatural"}],
["0-8", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>Everyone on the Dutch speed skating team won at least one medal. Mostly, people won bronze and silver medals. Mary did particularly well this year and won multiple medals. <br>Even a gold medal, too.", "leftComment": "completely unnatural"}],
["0-8", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>Each member of the Dutch speed skating team won exactly one medal: bronze, silver, or gold. Mary, who was trying out for the team, did particularly well and also ended up winning a medal. <br>Even a gold medal, too.", "leftComment": "completely unnatural"}],
["0-8", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>Everyone on the Dutch speed skating team won at least one medal. Mostly, people won bronze and silver medals. Mary did particularly well this year and won multiple medals. <br>A gold medal even, too.", "leftComment": "completely unnatural"}],
["0-8", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>Each member of the Dutch speed skating team won exactly one medal: bronze, silver, or gold. Mary, who was trying out for the team, did particularly well and also ended up winning a medal. <br>A gold medal even, too.", "leftComment": "completely unnatural"}],
["0-9", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>I was playing a dice game with some friends where each of us had to throw three dice at the same time and the one with the biggest total would win. I rolled good numbers.<br>Even a six.", "leftComment": "completely unnatural"}],
["0-9", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>I was playing a dice game with some friends where each of us had to throw one die and the one with the highest number would win. I was first and I rolled a high number.<br>Even a six.", "leftComment": "completely unnatural"}],
["0-9", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>I was playing a dice game with some friends where each of us had to throw three dice at the same time and the one with the biggest total would win. I rolled good numbers.<br>A six, even.", "leftComment": "completely unnatural"}],
["0-9", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>I was playing a dice game with some friends where each of us had to throw one die and the one with the highest number would win. I was first and I rolled a high number.<br>A six, even.", "leftComment": "completely unnatural"}],
["0-9", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>I was playing a dice game with some friends where each of us had to throw three dice at the same time and the one with the biggest total would win. I rolled good numbers.<br>Even a six, too.", "leftComment": "completely unnatural"}],
["0-9", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>I was playing a dice game with some friends where each of us had to throw one die and the one with the highest number would win. I was first and I rolled a high number.<br>Even a six, too.", "leftComment": "completely unnatural"}],
["0-9", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>I was playing a dice game with some friends where each of us had to throw three dice at the same time and the one with the biggest total would win. I rolled good numbers.<br>A six even, too.", "leftComment": "completely unnatural"}],
["0-9", "AJ", {"q": "Please select a number", "rightComment": "completely natural", "s": "How natural did you think this sentence was?", "html": "<br>I was playing a dice game with some friends where each of us had to throw one die and the one with the highest number would win. I was first and I rolled a high number.<br>A six even, too.", "leftComment": "completely unnatural"}]
];
