let _pl = game.playlists.getName("Battle Hard");
if (_pl) {
    if (_pl.playing) {
        // turn off
        _pl.stopAll();
    } else {
        // turn on
        _pl.playAll();
    }
}