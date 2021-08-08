//usage example:
//@Macro[scFhrpFOhgpI01MQ]{speak-actor-message-language}-Huarwar Mulphoon-You will DIE in the name of Levistus!!!  You are working with the duergar and are plotting the destruction of Ten Towns!!!-infernal
//console.log($(event.target).parent()[0].textContent);
args = $(event.target).parent()[0].textContent.split('-');
args.shift();
args.shift();
args.shift();
args.shift();
//console.log(args);
let speakactor = game.actors.contents.find(c => c.name === args[0]);
//console.log(`speakactor:`,speakactor);
let speaktoken = canvas.tokens.placeables.find(p => p.name === args[0]);
console.log(`speaktoken:`, speaktoken);
let playertoken = token;
speaktoken.control();
//no longer needed, can use lang: in chatmessage.create now
//$(`#polyglot select`).val(args[2]);
ChatMessage.create(
    {
        speaker: { token: speaktoken.data._id, actor: speakactor, scene: canvas.scene },
        content: args[1],
        type: CONST.CHAT_MESSAGE_TYPES.IC,
        lang: args[2],
    }, { chatBubble: true });

if (playertoken) {
    playertoken.control();
}