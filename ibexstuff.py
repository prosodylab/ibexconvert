#-------------------MAIN.JS-------------------

var runningOrder = runShuffleSequence(mungGroups(listOfElementSets, counter), conf_shuffleSequence);
assert(runningOrder.length > 0 && runningOrder[0].length > 0,
       "There must be some items in the running order!");

if (conf_modifyRunningOrder) {
    # We now can't share structure between element sets.
    for (var i = 0; i < runningOrder.length; ++i) {
        var l = new Array(runningOrder[i].length);
        for (var j = 0; j < l.length; ++j)
            l[j] = runningOrder[i][j];
        runningOrder[i] = l;
    }

    runningOrder = conf_modifyRunningOrder(runningOrder);
}

if (! conf_manualSendResults)
    runningOrder.push([new Element(-1, -1, null, null, "__SendResults__", { })]);





#----------SHUFFLE.JS--------------

function mungGroups(sentenceArray, counter) {
    var nulls = filter(function (e) { return e.group == null; }, sentenceArray);
    // NOTE: May need to change to a for loop for efficiency reasons.
    //var grouped = $.map(filter(function (e) { return e.group != null; }, sentenceArray),
    //                    regularizeGroup);
    var grouped = [];
    for (var i = 0; i < sentenceArray.length; ++i) {
        var k = sentenceArray[i];
        if (k.group != null)
            grouped.push(regularizeGroup(k));
    }


function runShuffleSequence(masterArray, ss) {
    assert(typeof(ss) == "object", "Bad shuffle sequence");

    var arrays = new Array();
    for (var i = 0; i < ss.args.length; ++i) {
        if (typeof(ss.args[i]) == "object") {
            arrays.push(runShuffleSequence(masterArray, ss.args[i]));
        }
        else {
            var pred = toPredicate(ss.args[i]);
            var elems = filter(function (s) { assert(s != null, "Bad array"); return pred(s.type); }, masterArray);

            if (elems.length > 0)
                arrays.push(elems);
        }
    }

    if (arrays.length == 0)
        return []

    return ss.run(arrays);
}