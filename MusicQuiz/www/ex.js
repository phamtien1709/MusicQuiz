var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function () { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
        families: ['Montserrat', 'Source Sans Pro', 'Roboto Slab']
    }

};

function preload() {

    //  Load the Google WebFont Loader script
    game.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

}

var text = null;
var grd;

function create() {

    game.stage.setBackgroundColor(0x2d2d2d);

}

function createText() {

    text = game.add.text(game.world.centerX, game.world.centerY, "- phaser -\nrocking with\ngoogle á đù con chuồn chuồn", {
        font: '60px Roboto',
        fill: "white",
        boundsAlignH: "center",
        boundsAlignV: "middle",
        fontWeight: 'Italic'
    });
    text.anchor.setTo(0.5);

    // text.font = 'Montserrat';
    // text.fontSize = 50;
    // text.fill = '#ffffff';

    // //  x0, y0 - x1, y1

    // text.align = 'center';
    // text.stroke = '#000000';


}