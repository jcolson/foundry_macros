/**
 * Macro showing Character's Artwork for selected token or character sheet
 *
 * @author Forien#2130
 * @url https://patreon.com/forien
 * @licence MIT
 */
let topAppId;
let maxZ = 0;
let tActor;
for (let w of Object.values(ui.windows)) {
    if (w.position.zIndex > maxZ) {
        maxZ = w.position.zIndex
        topAppId = w.appId
    }
}
if (ui.windows[topAppId].object.data?.img) {
    // console.log(ui.windows[topAppId].object.data.img)
    tActor = ui.windows[topAppId].object;
} else if (token) {
    tActor = token.actor;
}
if (tActor) {
    let ip = new ImagePopout(tActor.data.img, {
        title: tActor.name,
        shareable: true,
        uuid: tActor.uuid
    }).render(true);
    ip.shareImage();
} else {
    ui.notifications.warn("Please select token or a character sheet first.");
}