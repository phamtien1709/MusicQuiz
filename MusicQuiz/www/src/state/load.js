var loadState = {
    preload: function () {
        MQ.game.scale.pageAlignHorizontally = true;
        MQ.game.time.advancedTiming = true;
        MQ.game.stage.disableVisibilityChange = true;
        MQ.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        MQ.game.load.image('ava_fb', `https://graph.facebook.com/${MQ.checkId}/picture?width=${Math.floor(232*MQ.configs.SCALE)}`);
        MQ.game.load.image('ava_default', 'img/assets/ava-default.png');
        MQ.game.load.image('ava_150', 'img/assets/ava-default150x150.png');
        MQ.game.load.image('ava_70', 'img/assets/ava-default70x70.png');
        MQ.game.load.image('btn-next', 'img/assets/btn-next.png');
        MQ.game.load.image('btn-test', 'img/assets/btn-test.png');
        MQ.game.load.image('btn-home', 'img/assets/btn-home.png');
        MQ.game.load.image('btn-playing', 'img/assets/btn-playing.png');
        MQ.game.load.image('tween-time', 'img/assets/tween-time.png');
        MQ.game.load.image('answer-tab', 'img/assets/answer.png');
        MQ.game.load.image('correct', 'img/assets/correct.png');
        MQ.game.load.image('wrong', 'img/assets/wrong.png');
        MQ.game.load.image('wrong-mini', 'img/assets/wrong-mini.png');
        MQ.game.load.image('correct-mini', 'img/assets/correct-mini.png');
        MQ.game.load.image('circle', 'img/assets/circle.png');
        MQ.game.load.image('btn-play', 'img/assets/btn-play.png');
        MQ.game.load.image('btn-challenge', 'img/assets/btn-challenge.png');
        MQ.game.load.image('btn-findgame', 'img/assets/btn-findgame.png');
        MQ.game.load.image('btn-party', 'img/assets/btn-party.png');
        MQ.game.load.image('btn-practice', 'img/assets/btn-practice.png');
        MQ.game.load.image('btn-noti', 'img/assets/btn-noti.png');
        MQ.game.load.image('heart', 'img/assets/heart.png');
        MQ.game.load.image('diamond', 'img/assets/diamond.png');
        MQ.game.load.image('ticket', 'img/assets/ticket.png');
        MQ.game.load.image('btn-invite', 'img/assets/btn-invite.png');
        MQ.game.load.image('screen-dim', 'img/assets/screen-dim.png');
        MQ.game.load.image('btn-setting', 'img/assets/Menu/btn-setting.png');
        MQ.game.load.image('popup-profile','img/assets/Menu/popup-profile.png');
        MQ.game.load.image('bg-practice', 'img/assets/Practice/bg-practice.png');
        // menu
        MQ.game.load.image('bg-menu', 'img/assets/Menu/bg.png');
        MQ.game.load.image('bg-play', 'img/assets/Play/bg-play.png');

    },
    create: function () {
        showConsole('Load Screen');
        console.log(MQ.nameFB);
        console.log(MQ.checkId);
        console.log(MQ.accessToken);
        var loading = MQ.game.add.text(MQ.game.width / 2, MQ.game.height / 2 - 100, 'Loading...',{
            font: `${120 * MQ.configs.SCALE}px Roboto`,
            fill: "black",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        loading.anchor.set(0.5);
        getJSONFile(() => {
            // MQ.game.state.start('menu');
            console.log('getJSONFile');
        });
        MQ.dataChallenge = [];
        getChallengeByFriend(() => {
            console.log('Get apprequests');
            getDataChallengeFromDB(() => {
                MQ.game.state.start('menu');
            });
        });
        // });
    },
    update: function () {

    },
    render: function () {

    }
}