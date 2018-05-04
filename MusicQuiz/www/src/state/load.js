var loadState = {
    preload: function () {
        MQ.game.scale.pageAlignHorizontally = true;
        MQ.game.time.advancedTiming = true;
        MQ.game.stage.disableVisibilityChange = true;
        MQ.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //bg loading
        this.game.stage.background = MQ.game.add.sprite(0, 0, 'bg-load');
        this.logo = MQ.game.add.sprite(MQ.game.world.centerX, 222, 'logo');
        this.logo.anchor.set(0.5);
        this.term_txt = MQ.game.add.text(MQ.game.world.centerX, 1848, 'Để bắt đầu game, bạn phải đồng ý với Điều khoản sử dụng', {
            font: "40px Roboto",
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        this.term_txt.anchor.set(0.5);
        // this.term_txt.addColor("#ffffff",0);
        this.term_txt.addColor("#ffa33a", 37);
        //646
        this.disc = MQ.game.add.sprite(MQ.game.world.centerX, 646, 'disc');
        this.disc.anchor.set(0.5);
        // console.log(this.disc.y);
        //531, 505
        this.c_o = MQ.game.add.sprite(-MQ.game.world.centerX + 531, -this.disc.y + 505, 'c-orange');
        this.c_o.anchor.set(0.5);
        //420, 726
        this.c_p = MQ.game.add.sprite(-MQ.game.world.centerX + 420, 726 - this.disc.y, 'c-pink');
        this.c_p.anchor.set(0.5);
        //666, 707
        this.c_v = MQ.game.add.sprite(-MQ.game.world.centerX + 666, 707 - this.disc.y, 'c-violet');
        this.c_v.anchor.set(0.5);
        this.disc.addChild(this.c_o);
        this.disc.addChild(this.c_p);
        this.disc.addChild(this.c_v);
        this.game.add.tween(this.disc).to({ angle: 360 }, 1500, Phaser.Easing.Linear.None, true, 0, -1);
        this.tweenScale = MQ.game.add.tween(this.disc.scale).to({ x: 1.2, y: 1.2 }, 700, "Linear", true, 0, -1);
        this.tweenScale.yoyo(true, 700);
        //92909b, 
        this.txt_loading = MQ.game.add.text(MQ.game.world.centerX, 850, 'Đang tải...', {
            font: "42px Roboto",
            fill: "#92909b",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        this.txt_loading.anchor.set(0.5);
        // this.game.stage.background.width = MQ.game.width;
        // this.game.stage.background.height = MQ.game.height;
        MQ.game.load.image('ava_fb', `https://graph.facebook.com/${MQ.checkId}/picture?width=200`);
        MQ.game.load.image('ava_default', 'img/assets/ava-default.png');
        MQ.game.load.image('ava_150', 'img/assets/ava-default150x150.png');
        MQ.game.load.image('ava_70', 'img/assets/ava-default70x70.png');
        MQ.game.load.image('btn-next', 'img/assets/btn-next.png');
        // MQ.game.load.image('btn-home', 'img/assets/btn-home.png');
        MQ.game.load.image('btn-playing', 'img/assets/btn-playing.png');
        MQ.game.load.image('tween-time', 'img/assets/tween-time.png');
        MQ.game.load.image('answer-tab', 'img/assets/answer.png');
        MQ.game.load.image('circle', 'img/assets/circle.png');
        MQ.game.load.image('btn-play', 'img/assets/btn-play.png');
        MQ.game.load.image('btn-findgame', 'img/assets/btn-findgame.png');
        MQ.game.load.image('btn-party', 'img/assets/btn-party.png');
        MQ.game.load.image('btn-practice', 'img/assets/btn-practice.png');
        MQ.game.load.image('btn-noti', 'img/assets/btn-noti.png');
        MQ.game.load.image('heart', 'img/assets/heart.png');
        MQ.game.load.image('diamond', 'img/assets/diamond.png');
        MQ.game.load.image('wrong-mini', 'img/assets/wrong-mini.png');
        MQ.game.load.image('correct-mini', 'img/assets/correct-mini.png');
        MQ.game.load.image('ticket', 'img/assets/ticket.png');
        MQ.game.load.image('btn-invite', 'img/assets/btn-invite.png');
        MQ.game.load.image('screen-dim', 'img/assets/screen-dim.png');
        MQ.game.load.image('btn-setting', 'img/assets/Menu/btn-setting.png');
        MQ.game.load.image('popup-profile', 'img/assets/Menu/popup-profile.png');
        MQ.game.load.image('bg-practice', 'img/assets/Practice/bg-practice.png');
        MQ.game.load.image('circle-active', 'img/assets/Practice/Circle_active.png');
        MQ.game.load.image('map-practice', 'img/assets/Practice/Map.png');
        MQ.game.load.image('btn-home', 'img/assets/Practice/btn_home.png');
        MQ.game.load.image('bg-playlist', 'img/assets/playlist/bg-playlist.png');
        MQ.game.load.image('arrow-playlist', 'img/assets/playlist/Arrow.png');
        MQ.game.load.image('change-btn', 'img/assets/playlist/Change_Button.png');
        MQ.game.load.image('gem-playlist', 'img/assets/playlist/gem-playlist.png');
        MQ.game.load.image('tab-playlist', 'img/assets/playlist/Tab_chonplaylist.png');
        MQ.game.load.image('tab-gem', 'img/assets/playlist/Tab_gem.png');
        MQ.game.load.image('vn-muzik', 'img/assets/playlist/VietNam_Muzik.png');
        MQ.game.load.image('w-muzik', 'img/assets/playlist/Word_Muzik.png');
        MQ.game.load.image('tab-recent', 'img/assets/playlist/tab_recent.png');
        MQ.game.load.image('bop', 'img/assets/playlist/best-of-playlist.png');
        // menu
        MQ.game.load.image('bg-menu', 'img/assets/Menu/bg.png');
        MQ.game.load.image('bg-play', 'img/assets/Play/bg-play.png');
        MQ.game.load.image('popup-playlist', 'img/assets/popup/popup-playlist.png');
        MQ.game.load.image('sprite-playlist', 'img/assets/popup/sprite-playlist.png');
        MQ.game.load.image('x-button', 'img/assets/popup/x-button.png');
        MQ.game.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        MQ.game.load.onFileComplete.add(this.fileComplete, this);
    },
    create: function () {
        // showConsole('Load Screen');
        // this.game.stage.smoothed = false;
        console.log(MQ.nameFB);
        console.log(MQ.checkId);
        console.log(MQ.accessToken);
        // var loading = MQ.game.add.text(MQ.game.width / 2, MQ.game.height / 2 - 100, 'Loading...',{
        //     font: `${150/MQ.configs.DPR}px Roboto`,
        //     fill: "black",
        //     boundsAlignH: "center",
        //     boundsAlignV: "middle"
        // });
        // loading.anchor.set(0.5);
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

    },
    fileComplete: function (progress, cacheKey, success, totalLoaded, totalFiles) {
        // showConsole(`Loading... ${progress}%`);
        this.txt_loading.setText(`Đang tải... ${progress} %`);
    }
}