let currentTimeDate = SimpleCalendar.api.timestampToDate(SimpleCalendar.api.timestamp()).display.date + ' at ' + SimpleCalendar.api.timestampToDate(SimpleCalendar.api.timestamp()).display.time;

printMessage(`<a href='javascript:SimpleCalendar.api.showCalendar(undefined, true);'>${currentTimeDate}</a>`);

function printMessage(message) {
    let chatData = {
        user: game.user._id,
        content: message,
        blind: true,
        whisper: game.users.filter(u => u.isGM).map(u => u._id)
    };

    ChatMessage.create(chatData, {});
}