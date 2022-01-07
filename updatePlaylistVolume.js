const updates = game.playlists.getName("Battle Hard").sounds.map((sound) => ({
    _id: sound.id,
    volume: 0.05
}));
await game.playlists.getName("Battle Hard").updateEmbeddedDocuments("PlaylistSound", updates);
