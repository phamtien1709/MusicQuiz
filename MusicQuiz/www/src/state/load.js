var loadState = {
    preload: function () {
        this.game.sound.context.resume();
        MQ.game.scale.pageAlignHorizontally = true;
        MQ.game.time.advancedTiming = true;
        MQ.game.stage.disableVisibilityChange = true;
        MQ.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //bg loading
        this.game.stage.background = MQ.game.add.sprite(0, 0, 'bg-load');
        this.logo = MQ.game.add.sprite(MQ.game.world.centerX, 565, 'logo');
        this.logo.anchor.set(0.5);
        this.term_txt = MQ.game.add.text(MQ.game.world.centerX, 1848, 'Để bắt đầu game, bạn phải đồng ý với Điều khoản sử dụng', {
            font: "40px Roboto",
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        this.term_txt.anchor.set(0.5);
        this.term_txt.addColor("#ffa33a", 37);
        //646
        this.disc = MQ.game.add.sprite(MQ.game.world.centerX, 277, 'disc');
        this.disc.anchor.set(0.5);
        // //531, 505
        this.c_o = MQ.game.add.sprite(0, -145, 'c-orange');
        this.c_o.anchor.set(0.5);
        //420, 726
        this.c_p = MQ.game.add.sprite(-113, 100, 'c-pink');
        this.c_p.anchor.set(0.5);
        //666, 707
        this.c_v = MQ.game.add.sprite(134, 62, 'c-violet');
        this.c_v.anchor.set(0.5);
        this.disc.addChild(this.c_o);
        this.disc.addChild(this.c_p);
        this.disc.addChild(this.c_v);
        this.game.add.tween(this.disc).to({ angle: 360 }, 1500, Phaser.Easing.Linear.None, true, 0, -1);
        this.tweenScale = MQ.game.add.tween(this.disc.scale).to({ x: 1.2, y: 1.2 }, 700, "Linear", true, 0, -1);
        this.tweenScale.yoyo(true, 700);
        //92909b, 
        this.txt_loading = MQ.game.add.text(MQ.game.world.centerX, 835, 'Đang tải...', {
            font: "42px Roboto",
            fill: "#92909b",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        this.txt_loading.anchor.set(0.5);
        //load playlist arr
        for (i = 0; i < MQ.playListFree.length; i++) {
            MQ.game.load.image(`playlist-${i}`, `${MQ.playListFree[i].imgPlaylist}`);
        }
        MQ.game.load.image('ava_fb', `https://graph.facebook.com/${MQ.checkId}/picture?width=241`);
        MQ.game.load.image('ava_rank', `https://graph.facebook.com/${MQ.checkId}/picture?width=120`);
        MQ.game.load.image('ava_default', 'img/assets/ava-default.png');
        MQ.game.load.image('ava_150', 'img/assets/ava-default150x150.png');
        MQ.game.load.image('ava_70', 'img/assets/ava-default70x70.png');
        MQ.game.load.image('btn-next', 'img/assets/btn-next.png');
        MQ.game.load.image('btn-playing', 'img/assets/btn-playing.png');
        //party test art
        MQ.game.load.image('art-party', 'img/assets/Menu/07_A_Party_mode.png');
        MQ.game.load.image('header-party', 'img/assets/Menu/header-party.png');
        //practice
        //spritesheet
        MQ.game.load.spritesheet('timeout_practice', 'img/assets/Practice/Timeout_Final263x325.png', 263, 325, 24);
        MQ.game.load.spritesheet('wrong_practice', 'img/assets/Practice/Wrong338x338.png', 338, 338, 15);
        //
        MQ.game.load.image('bg-practice', 'img/assets/Practice/BG_GamePlay.png');
        MQ.game.load.image('dot_practice', 'img/assets/Practice/Circle_Active_Small.png');
        MQ.game.load.image('lock-answer', 'img/assets/Practice/lock-answer.png');
        //play state
        MQ.game.load.image('bg-play', 'img/assets/Play/BG_GamePlay.png');
        MQ.game.load.image('tween-time', 'img/assets/tween-time.png');
        MQ.game.load.image('answer-tab', 'img/assets/Play/Button_Cautraloi_01.png');
        MQ.game.load.image('circle', 'img/assets/circle.png');
        MQ.game.load.image('btn-remove-answer', 'img/assets/Play/Button_Bo2DapAn.png');
        MQ.game.load.image('wrong-mini', 'img/assets/Play/Sai.png');
        MQ.game.load.image('correct-mini', 'img/assets/Play/Dung.png');
        MQ.game.load.image('circle-white', 'img/assets/Play/Circle_01.png');
        MQ.game.load.image('btn-playing', 'img/assets/btn-playing.png');
        MQ.game.load.image('btn-invite', 'img/assets/btn-invite.png');
        MQ.game.load.image('circle-active', 'img/assets/Practice/Circle_active.png');
        MQ.game.load.image('map-practice', 'img/assets/Practice/Map.png');
        MQ.game.load.image('btn-rehome', 'img/assets/Practice/btn_home.png');
        MQ.game.load.image('bg-playlist', 'img/assets/playlist/bg-playlist.png');
        MQ.game.load.image('arrow-playlist', 'img/assets/playlist/Arrow.png');
        MQ.game.load.image('arrow-go', 'img/assets/playlist/Arrow-go.png');
        MQ.game.load.image('change-btn', 'img/assets/playlist/Change_Button.png');
        MQ.game.load.image('gem-playlist', 'img/assets/playlist/gem-playlist.png');
        MQ.game.load.image('tab-playlist', 'img/assets/playlist/Tab_chonplaylist.png');
        MQ.game.load.image('tab-gem', 'img/assets/playlist/Tab_gem.png');
        MQ.game.load.image('vn-muzik', 'img/assets/playlist/VietNam_Muzik.png');
        MQ.game.load.image('w-muzik', 'img/assets/playlist/Word_Muzik.png');
        MQ.game.load.image('tab-recent', 'img/assets/playlist/tab_recent.png');
        MQ.game.load.image('tab-recent2', 'img/assets/playlist/tab_recent2.png');
        // MQ.game.load.image('bop', 'img/assets/playlist/Nhactre.png');
        //popup playlist
        MQ.game.load.image('popup-playlist', 'img/assets/popup/popup-playlist.png');
        MQ.game.load.image('x-button', 'img/assets/popup/x-button.png');
        //playlist chall to FIXME:
        MQ.game.load.image('icon-lock', 'img/assets/popup/Icon_lock.png');
        MQ.game.load.image('icon-rank', 'img/assets/popup/icon_Rank.png');
        for (playlist in MQ.listPlaylist) {
            // console.log(MQ.listPlaylist[playlist].img);
            MQ.game.load.image(`${MQ.listPlaylist[playlist].img}`, `img/assets/playlist/${MQ.listPlaylist[playlist].img}.png`);
        };
        //ranking practice
        MQ.game.load.image('circle-stroke-ranking', 'img/assets/Practice/rank/Circle_Stroke.png');
        MQ.game.load.image('ve-ranking', 'img/assets/Practice/rank/VE.png');
        // menu
        MQ.game.load.image('bg-menu', 'img/assets/Menu/BG_main.png');
        MQ.game.load.image('heart', 'img/assets/Menu/Heart_Icon.png');
        MQ.game.load.image('ticket', 'img/assets/Menu/Ticket_Icon.png');
        MQ.game.load.image('diamond', 'img/assets/Menu/Diamond_Icon.png');
        MQ.game.load.image('btn-findgame', 'img/assets/Menu/Find game_Button.png');
        MQ.game.load.image('btn-party', 'img/assets/Menu/Party_Button.png');
        MQ.game.load.image('btn-practice', 'img/assets/Menu/Practice_Button.png');
        MQ.game.load.image('line-top', 'img/assets/Menu/Line_Top.png');
        MQ.game.load.image('bot-shadow', 'img/assets/Menu/Shadow.png');
        MQ.game.load.image('menu-bg', 'img/assets/Menu/Menu_BG.png');
        MQ.game.load.image('btn-home', 'img/assets/Menu/IconMenu_Home.png');
        MQ.game.load.image('btn-home-active', 'img/assets/Menu/IconMenu_Home_active.png');
        MQ.game.load.image('btn-mail', 'img/assets/Menu/IconMenu_Mail.png');
        MQ.game.load.image('btn-mail-active', 'img/assets/Menu/IconMenu_Mail_active.png');
        MQ.game.load.image('btn-setting', 'img/assets/Menu/IconMenu_Setting.png');
        MQ.game.load.image('btn-setting-active', 'img/assets/Menu/IconMenu_Setting_active.png');
        MQ.game.load.image('btn-shop', 'img/assets/Menu/IconMenu_Shop.png');
        MQ.game.load.image('btn-shop-active', 'img/assets/Menu/IconMenu_Shop_active.png');
        MQ.game.load.image('line-under', 'img/assets/Menu/line-under.png');
        MQ.game.load.image('btn-accept', 'img/assets/Menu/btn-accept.png');
        MQ.game.load.image('playlist-chitiet', 'img/assets/Menu/playlist-chitiet.png');
        //mail 
        // MQ.game.load.image('ava-micro-mail', 'img/assets/mail/ava_01.png');
        MQ.game.load.image('btn-nhan-mail', 'img/assets/mail/Button_Nhan.png');
        MQ.game.load.image('hethong-mail', 'img/assets/mail/Mail_Hethong.png');
        MQ.game.load.image('banbe-mail', 'img/assets/mail/Mail_Banbe.png');
        MQ.game.load.image('header-line-mail', 'img/assets/mail/Header_Line.png');
        MQ.game.load.image('header-line-gradient-mail', 'img/assets/mail/Header_Line_Gradient.png');
        MQ.game.load.image('header-tab-active-mail', 'img/assets/mail/Header_tab_Active.png');
        MQ.game.load.image('header-tab-disactive-mail', 'img/assets/mail/Header_tab_disActive.png');
        MQ.game.load.image('line-mail', 'img/assets/mail/Line.png');
        MQ.game.load.image('search-bg-mail', 'img/assets/mail/Search_BG.png');
        MQ.game.load.image('search-icon-mail', 'img/assets/mail/Search_icon.png');
        MQ.game.load.image('search-tab-mail', 'img/assets/mail/Search_tab.png');
        MQ.game.load.image('tab-mess-mail', 'img/assets/mail/Tab_chon playlist.png');
        for (i = 0; i < MQ.mailDemo.length; i++) {
            MQ.game.load.image(`${MQ.mailDemo[i].avaName}`, `${MQ.mailDemo[i].avaUrl}`);
        }
        //shopLoader
        for (img in MQ.shopLoader) {
            MQ.game.load.image(`${MQ.shopLoader[img].name}`, `${MQ.shopLoader[img].url}`);
        }
        //setting Loader
        for (img in MQ.settingLoader) {
            MQ.game.load.image(`${MQ.settingLoader[img].name}`, `${MQ.settingLoader[img].url}`);
        }
        //rank ava loader
        for (img in MQ.rankFake) {
            if(MQ.rankFake[img].url !== 0){
                MQ.game.load.image(`${MQ.rankFake[img].ava}`, `${MQ.rankFake[img].url}`);
            }
        };
        //rank loader
        for (img in MQ.rankLoader) {
            MQ.game.load.image(`${MQ.rankLoader[img].name}`, `${MQ.rankLoader[img].url}`);
        }
        //popup reward
        MQ.game.load.image('screen-dim', 'img/assets/Practice/reward/screen-dim.png');
        MQ.game.load.image('circle-reward', 'img/assets/Practice/reward/Circle.png');
        MQ.game.load.image('circle-stroke-reward', 'img/assets/Practice/reward/Circle_Stroke.png');
        MQ.game.load.image('diamond-reward', 'img/assets/Practice/reward/Diamond.png');
        MQ.game.load.image('lr-reward', 'img/assets/Practice/reward/Light_Rotation.png');
        MQ.game.load.image('starall-reward', 'img/assets/Practice/reward/star_all.png');
        MQ.game.load.image('congrat-reward', 'img/assets/Practice/reward/Chucmung.png');
        MQ.game.load.image('box-lose-practice', 'img/assets/Practice/reward/BOX.png');
        MQ.game.load.image('btn-replay-lose-practice', 'img/assets/Practice/reward/Button_Choilai.png');
        MQ.game.load.image('btn-home-lose-practice', 'img/assets/Practice/reward/Button_home.png');
        MQ.game.load.image('disc-lose-practice', 'img/assets/Practice/reward/Disc.png');
        MQ.game.load.image('timeout-lose-practice', 'img/assets/Practice/reward/icon_timeout.png');
        MQ.game.load.image('btn-rank-practice', 'img/assets/Practice/reward/Button_Xephang.png');
        //win state
        MQ.game.load.image('bg-win', 'img/assets/win/BG.png');
        MQ.game.load.image('box-score-win', 'img/assets/win/Box_Score.png');
        MQ.game.load.image('cd-win', 'img/assets/win/CD.png');
        MQ.game.load.image('line-win', 'img/assets/win/Line.png');
        MQ.game.load.image('tab-highscore-win', 'img/assets/win/Tab_Kiluc.png');
        MQ.game.load.image('box-result-win', 'img/assets/win/Box_ketqua.png');
        MQ.game.load.image('pick-playlist-win', 'img/assets/win/Playlist_Cuaban.png');
        MQ.game.load.image('v-icon-win', 'img/assets/win/v_icon.png');
        MQ.game.load.image('x-icon-win', 'img/assets/win/x_icon.png');
        MQ.game.load.image('ava-playlist', 'img/assets/win/Ava_Playlist.png');
        MQ.game.load.image('line-box-win', 'img/assets/win/line-box-win.png');
        MQ.game.load.image('dot-icon-win', 'img/assets/win/dot.png');
        MQ.game.load.image('btn-next-player-win', 'img/assets/win/Button_Choilai.png');
        MQ.game.load.onFileComplete.add(this.fileComplete, this);
    },
    create: function () {
        // showConsole('Load Screen');
        // this.game.stage.smoothed = false;
        console.log(MQ.nameFB);
        console.log(MQ.checkId);
        console.log(MQ.accessToken);
        // getJSONFile
        getJSONFile('all', 'img/assets/json/excelExport.json', () => {
        });
        getJSONFile('new2017Data', 'img/assets/json/new2017Data.json', () => {
        });
        getJSONFile('cookieData', 'img/assets/json/cookieData.json', () => {
        });
        getJSONFile('mtpData', 'img/assets/json/mtpData.json', () => {
        });
        getJSONFile('nooData', 'img/assets/json/nooData.json', () => {
        });
        getJSONFile('indieData', 'img/assets/json/indieData.json', () => {
        });
        MQ.dataChallenge = [];
        getChallengeByFriend(() => {
            console.log('Get apprequests');
            getDataChallengeFromDB(() => {
                // console.log(MQ.responseChallen);
                getBotChallenge(() => {
                    // console.log(MQ.botChallenges);
                    MQ.game.state.start('menu');
                });
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