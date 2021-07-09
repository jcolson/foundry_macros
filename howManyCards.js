//console.debug(game.users);
let ppInfo = '<div class="dnd5e chat-card"><header class="card-header flexrow"><h3 class="item-name">Card Info</h3></header><div class="card-content" style="display: block;">';
for (user of game.users) {
        //console.debug(`actor:`, user.data);
        // console.debug(`skilz:`,actor.data.data.skills);
        let numCards = user.data.flags.cardsupport?.chbMacroMap?.length?user.data.flags.cardsupport?.chbMacroMap?.length:0;
        // there is always a null in the array when cards exist, exclude that in the count
        numCards = numCards>0?numCards-1:numCards;
        ppInfo += `<p><strong>${user.data.name}</strong>:Cards:${numCards}</p>`
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