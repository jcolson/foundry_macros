async function updatePlaylistVolume(playListName, volume) {
    try {
        const updates = game.playlists.getName(playListName).sounds.map((sound) => ({
            _id: sound.id,
            volume
        }));
        await game.playlists.getName(playListName).updateEmbeddedDocuments('PlaylistSound', updates);
    } catch (error) {
        out.error(error);
    }
}
await updatePlaylistVolume('Inn Background', 0.05);
