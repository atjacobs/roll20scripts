function play (track) {
    if (track) {
        track.set({'playing': true, 'softstop': false, 'volume': 50});
    }else{
        log("no track to play.")
    }
}
function stop (track) {
    if (track) {
        if (track.get("playing") === true){
            log("stopping track")
            track.set({'playing': false, 'softstop': true});
        }
    }
}
