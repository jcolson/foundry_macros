//console.debug(game.actors);
let ppInfo = '<div class="dnd5e chat-card"><header class="card-header flexrow"><h3 class="item-name">Passive Perception</h3></header><div class="card-content" style="display: block;">';
for (actor of game.actors) {
    if (actor.data.type == 'character') {
        // console.debug(`actor:`, actor.data);
        // console.debug(`skilz:`,actor.data.data.skills);
        let playerName;
        for (let playerKey of Object.getOwnPropertyNames(actor.data.permission)) {
            let player = game.users.get(playerKey);
            if (player && !player?.isGM) {
                // console.debug(`player ${player.name}`);
                playerName = player.name;
            }
        }
        ppInfo += `<p>${playerName ? playerName + ":" : ''}<strong>${actor.data.name}</strong>:PP:${actor.data.data.skills.prc.passive}</p>`
    }
}
printMessage(`${ppInfo}</div></div>`);
function printMessage(message) {
    let chatData = {
        user: game.user._id,
        content: message,
        blind: true,
        whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
    };

    ChatMessage.create(chatData, {});
}