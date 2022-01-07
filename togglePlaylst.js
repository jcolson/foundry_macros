let _pl = game.playlists.getName("Battle Hard");
if (_pl) {
    if (_pl.playing) {
        // let volume = game.audio.playing.values().next().value.volume;
        // turn off
        await _pl.stopAll();
        if (game.scenes.active.playlist && game.scenes.active.playlistSound) {
            await game.scenes.active.playlist.playSound(game.scenes.active.playlistSound);
        }
    } else {
        let _currentPlayingArr = game.playlists.playing;
        for (let currentPlaying of _currentPlayingArr) {
            await currentPlaying.stopAll();
        }
        // turn on
        await _pl.playAll();
    }
}