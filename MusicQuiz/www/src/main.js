// Initialise Phaser
var width;
var dpr;
if (window.devicePixelRatio == 1) {
    dpr = 1.2;
} else {
    dpr = 1;
}
if (screen.width > 1080) {
    width = 1080;
} else {
    width = screen.width
}
var MQ = {};
// configs
// Define our 'global' variable
MQ.configs = {
    GAME_WIDTH: width,
    GAME_HEIGHT: width / 9 * 16,
    SCALE: width / 1080,
    SONG_NUMBER: 51,
    DPR: window.devicePixelRatio * dpr
};
//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
        families: ['Montserrat', 'Source Sans Pro']
    }
};
window.onload = function () {
    MQ.game = new Phaser.Game(MQ.configs.GAME_WIDTH, MQ.configs.GAME_HEIGHT, Phaser.CANVAS, '', null, false, false);
    // Add all the states
    MQ.game.state.add('boot', bootState);
    MQ.game.state.add('load', loadState);
    MQ.game.state.add('menu', menuState);
    MQ.game.state.add('play', playState);
    MQ.game.state.add('win', winState);
    MQ.game.state.add('party', partyState);
    MQ.game.state.add('practice', practiceState);
    // Start the 'boot' state
    MQ.game.state.start('boot');
}
// preparations before game starts
var preload = function () {
    MQ.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    MQ.game.scale.minWidth = MQ.configs.GAME_WIDTH / 2;
    MQ.game.scale.minHeight = MQ.configs.GAME_HEIGHT / 2;
    MQ.game.scale.maxWidth = MQ.configs.GAME_WIDTH;
    MQ.game.scale.maxHeight = MQ.configs.GAME_HEIGHT;
    MQ.game.scale.pageAlignHorizontally = true;
    MQ.game.time.advancedTiming = true;
    MQ.game.stage.disableVisibilityChange = true;
}
