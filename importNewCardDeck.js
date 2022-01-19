// Instructions:
// Create an empty deck and give it a name
// Edit the following code, changing the 4 first lines to match the directory the images are stored
// Copy this code to a new macro and execute
// You can run this macro several times to add images from different directories to a given deck
async function getFiles(target, extensions = ``, source = `user`) {
    extensions = extensions instanceof Array ? extensions : [extensions];
    let filePicker = await FilePicker.browse(source, target);
    if (filePicker.files)
        return [...filePicker.files];
    return [];
};
function basename(str, sep) {
    return str.substr(str.lastIndexOf(sep) + 1);
}
function strip_extension(str) {
    return str.substr(0, str.lastIndexOf('.'));
}
async function importDeck(imagespath, deckname, backimage, nameback) {
    let cards = await getFiles(imagespath);
    let deck = game.cards.getName(deckname);
    let toCreate = [];
    let cardName;
    cards.forEach(c => {
        cardName = strip_extension(basename(c, '/'));
        toCreate.push({ name: cardName, origin: deck.id, back: { img: backimage, name: nameback }, faces: [{ img: c, name: cardName }], face: 0 });
    });
    deck.createEmbeddedDocuments("Card", toCreate);
    ui.notifications.info("Deck import completed!");
}

// const imagespath = "worlds/testworld/Images"; // images directory relative to Data, put all images in a directory, do not put non-images files here
// const deckname = "Test deck"; // the name of the deck you have created previously to store cards
// const backimage = "worlds/testworld/back_image.png"; // back image of the deck
// const nameback = "Back decks image"; // a generic name for back images
new Dialog({
    title: `Import new deck from images`,
    content: `
		<form>
			<div style="display: flex; width: 100%; margin-bottom: 10px">
                <label for="imagespath" style="white-space: nowrap; margin-right: 10px; padding-top:4px">Deck Image Path:</label>
                <input type="text" id="imagespath" name="imagespath" />
                <button class="imagespath-picker-button"><i class="fas fa-file-import fa-fw"></i></button>
            </div>
                <div style="display: flex; width: 100%; margin-bottom: 10px">
                <label for="deckname" style="white-space: nowrap; margin-right: 10px; padding-top:4px">Deck Name (ex Test deck):</label>
                <input type="text" id="deckname" name="deckname" />
            </div>
            <div style="display: flex; width: 100%; margin-bottom: 10px">
                <label for="backimage" style="white-space: nowrap; margin-right: 10px; padding-top:4px">Back Image:</label>
                <input type="text" id="backimage" name="backimage" />
                <button class="backimage-picker-button"><i class="fas fa-file-import fa-fw"></i></button>
            </div>
            <div style="display: flex; width: 100%; margin-bottom: 10px">
				<label for="nameback" style="white-space: nowrap; margin-right: 10px; padding-top:4px">Deck Back Name(ex Back decks image):</label>
				<input type="text" id="nameback" name="nameback" />
			</div>
		</form>
	`,
    buttons: {
        yes: {
            icon: "<i class='fas fa-check'></i>",
            label: `Import`,
            callback: (html) => {
                let imagespath = html.find('#imagespath').val();
                let deckname = html.find('#deckname').val();
                let backimage = html.find('#backimage').val();
                let nameback = html.find('#nameback').val();
                if (!imagespath) {
                    return ui.notifications.info("You did not provide a valid image path.");
                }
                if (!deckname || !game.cards.getName(deckname)) {
                    return ui.notifications.info("You did not provide a valid deck name, make sure it exists.");
                }
                if (!backimage) {
                    return ui.notifications.info("You did not provide a valid back image path.");
                }
                if (!nameback) {
                    return ui.notifications.info("You did not provide a valid name for the back image.");
                }
                importDeck(imagespath, deckname, backimage, nameback);
            }
        },
        no: {
            icon: "<i class='fas fa-times'></i>",
            label: `Cancel`
        },
    },
    default: "yes"
}).render(true);
await new Promise(r => setTimeout(r, 250));
const imagespathPicker = $(".imagespath-picker-button");
imagespathPicker[0].addEventListener("click", async function () {
    new FilePicker({
        type: "folder",
        callback: async function (imagePath) {
            $("#imagespath").val(imagePath);
        }
    }).render(true);
});
const backimagePicker = $(".backimage-picker-button");
backimagePicker[0].addEventListener("click", async function () {
    new FilePicker({
        type: "file",
        callback: async function (imagePath) {
            $("#backimage").val(imagePath);
        }
    }).render(true);
});
