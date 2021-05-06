//console.debug(game.actors.entries);
let ppInfo = 'Languages:\n';
for (actor of game.actors.entries) {
    if (actor.data.type == 'character') {
        // console.debug(`actor:`, actor.data);
        // console.debug(`skilz:`,actor.data.data);
        let playerName;
        for (let playerKey of Object.getOwnPropertyNames(actor.data.permission)) {
            let player = game.users.get(playerKey);
            if (player && !player?.isGM) {
                // console.debug(`player ${player.name}`);
                playerName = player.name;
            }
        }
        ppInfo += `${playerName ? playerName + ":" : ''}${actor.data.name}:${actor.data.data.traits.languages.value}\n`
    }
}
printMessage(`${ppInfo}`);
function printMessage(message) {
    let chatData = {
        user: game.user._id,
        content: message,
        blind: true,
        whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
    };

    ChatMessage.create(chatData, {});
}