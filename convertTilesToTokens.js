main()

async function main() {
    console.log(`About to convert these tiles to tokens`, canvas.tiles.controlled);
    if (canvas.tiles.controlled.length == 0) {
        ui.notifications.error(`You need to select at least one tile to convert`);
        return;
    }
    for (let theOldTile of canvas.tiles.controlled) {
        console.log(`theOldTile`, theOldTile);
        let theNewToken = await Token.create({
            name: theOldTile.data._id,
            x: theOldTile.data.x,
            y: theOldTile.data.y,
            displayName: 0,
            img: theOldTile.data.img,
            width: 1,
            height: 1,
            scale: 1,
            elevation: 0,
            lockRotation: false,
            rotation: theOldTile.data.rotation,
            vision: true,
            dimSight: 60,
            brightSight: 0,
            dimLight: 0,
            brightLight: 0,
            sightAngle: 360,
            hidden: theOldTile.data.hidden,
            actorLink: false,
            disposition: -1,
        });
        console.log(`the newtoken`, theNewToken);
        await theOldTile.delete();
    }
    ui.notifications.info(`Tiles converted to Tokens!  Cheers!`);
}