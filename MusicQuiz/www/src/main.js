// Initialise Phaser
var width;
var dpr;
if (window.devicePixelRatio == 1) {
    dpr = 1.0;
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
    GAME_WIDTH: 1080,
    GAME_HEIGHT: 1920,
    SCALE: 1080 / 1080,
    SONG_NUMBER: 51,
    DPR: window.devicePixelRatio * dpr
};
window.onload = function () {
    MQ.game = new Phaser.Game(1080, 1920, Phaser.CANVAS, 'game', true);
    // Add all the states
    MQ.game.state.add('boot', bootState);
    MQ.game.state.add('load', loadState);
    MQ.game.state.add('menu', menuState);
    MQ.game.state.add('play', playState);
    MQ.game.state.add('win', winState);
    MQ.game.state.add('party', partyState);
    MQ.game.state.add('practice', practiceState);
    MQ.game.state.add('bonus', bonusState);
    // Start the 'boot' state
    MQ.game.state.start('boot');
}
// preparations before game starts
var preload = function () {
    Howler._autoResume();
    MQ.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // MQ.game.scale.minWidth = MQ.configs.GAME_WIDTH / 2;
    // MQ.game.scale.minHeight = MQ.configs.GAME_HEIGHT / 2;
    // MQ.game.scale.maxWidth = MQ.configs.GAME_WIDTH;
    // MQ.game.scale.maxHeight = MQ.configs.GAME_HEIGHT;
    MQ.game.scale.pageAlignHorizontally = true;
    MQ.game.time.advancedTiming = true;
    MQ.game.stage.disableVisibilityChange = true;
}
