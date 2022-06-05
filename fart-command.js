// *NOTE*: depends on sound-util.js

var fartTracks = [];

var responseStrings = ["Excuse me...", "I need to use the restroom...", "did someone step on a duck?", "that was the dog"]

on("ready",function(){
    var allCampaigns = findObjs({
        _type: "campaign", 
    });
    allCampaigns.forEach(function(camp){
        JSON.parse(camp.get("_jukeboxfolder")).forEach(function(list){
           if (list.n === "farts"){
                var count = list.i.length
                for(let i = 0; i < count; i++){
                    var track = getObj('jukeboxtrack', list.i[i]);
                    fartTracks.push(track)
                }
           }
        });
    });
});

on("chat:message", function(msg){
    if ((msg.type !== "api" ) || (msg.content !== "!fart") ){
       return;
    }
    who=getObj('player',msg.playerid);
    log("someone farted...");
    log(who);
    var message = responseStrings[randomInteger(responseStrings.length - 1)];
    var fart = fartTracks[randomInteger(fartTracks.length - 1)]
    play(fart)
    
    var character = findObjs({ type: 'character', name: msg.who })[0],
        player = getObj('player', msg.playerid);
    if (character) sendChat('character|'+character.id, message);
    else sendChat('player|'+player.id, message);
});
