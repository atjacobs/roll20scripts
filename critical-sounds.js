var criticalHit = null;
var criticalFail = null;

// *NOTE*: that you need the sound-utils script for this to work.
// This scripts has some black magic to it.  R20 API is notoriously buggy and unstable.  This is what worked at the time.

on("ready",function(){
    var allTracks = findObjs({
        _type: 'jukeboxtrack',
    });
    allTracks.forEach(function(track) {
        if(track.get('title') === 'Critical Hit') {
            criticalHit = track;
        } else if (track.get('title') === 'Critical Fail') {
            criticalFail = track;
        }
    });
    
});

function playCrit(rolls){
    rolls.forEach(function(roll){
        if (roll.dice === 1 && roll.sides === 20) {
            if (roll.results[0].v === 20){
                log("crit hit!")
                stop(criticalHit)
                stop(criticalFail)
                play(criticalHit);
            }else if (roll.results[0].v === 1){
                log("crit miss!")
                stop(criticalHit)
                stop(criticalFail)
                play(criticalFail);
            }
        }
    });
}

on("chat:message",function(msg){
    var rolls = null
    if (msg.type === "rollresult" || msg.type === "gmrollresult") {
        playCrit(JSON.parse(msg.content).rolls)
    }
    else if (msg.inlinerolls){
        log("inline rolls!")
        msg.inlinerolls.forEach(function(roll){
            log(roll.results.rolls)
            playCrit(roll.results.rolls)
        })
    }
    else{
        log(msg)
    }
});
