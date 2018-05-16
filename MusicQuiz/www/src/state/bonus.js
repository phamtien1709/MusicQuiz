var bonusState = {
    preload: function () {
        //bg loading
        this.game.stage.background = MQ.game.add.sprite(0, 0, 'bg-load');
        MQ.game.load.onLoadStart.removeAll();
        MQ.game.load.onFileComplete.removeAll();
        MQ.game.load.onLoadComplete.removeAll();
    },
    create: function () {
        this.createFindgameGroup();
        this.createChallPlaylistGroup();
        bonusState.load.onLoadStart.add(this.loadStart, this);
        bonusState.load.onFileComplete.add(this.fileComplete, this);
        bonusState.load.onLoadComplete.add(this.loadComplete, this);
        // variable
        // showConsole('Menu Screen');
        // this.game.stage.smoothed = true;
        if (!MQ.isBotMode) {
            if (MQ.isChallenged) {
                MQ.idFriendChallenge = 0;
                MQ.nameFriendChallenge = "";
                MQ.songChoiced = [];
                // MQ.isChallenged = false;
                MQ.practiceMode = false;
                MQ.isBotMode = false;
                MQ.songRandomChoiced = [];
                MQ.countQuiz = 0;
                MQ.indexSongChoiced = [];
            } else {
                MQ.songChoiced = [];
                MQ.songRandomChoiced = [];
                MQ.countQuiz = 0;
                MQ.indexSongChoiced = [];
            }
        } else {
            if (MQ.isChallenged) {
                MQ.idFriendChallenge = 0;
                MQ.nameFriendChallenge = "";
                MQ.songChoiced = [];
                // MQ.isChallenged = false;
                MQ.practiceMode = false;
                // MQ.isBotMode = false;
                MQ.songRandomChoiced = [];
                MQ.countQuiz = 0;
                MQ.indexSongChoiced = [];
            }
        }
        //load
        MQ.loadVar = false;
    },
    update: function () {

    },
    render: function () {

    },
    createPlaylistDetail: function () {
        let img_playlist_detail = MQ.game.add.button(0, MQ.game.height, 'playlist-chitiet');
        img_playlist_detail.inputEnabled = true;
        img_playlist_detail.input.enableDrag();
        img_playlist_detail.input.allowHorizontalDrag = false;
        MQ.game.add.tween(img_playlist_detail).to({ y: 0 }, 500, "Linear", true);
        // console.log
        img_playlist_detail.events.onDragUpdate.add(() => {
            if (img_playlist_detail.position.y > 0) {
                // console.log('<=0');
                img_playlist_detail.input.disableDrag();
                img_playlist_detail.position.y = 0;
                img_playlist_detail.input.enableDrag();
            }
            if (img_playlist_detail.position.y < -(img_playlist_detail.height - 1920)) {
                // console.log('>=1920');
                img_playlist_detail.input.disableDrag();
                img_playlist_detail.position.y = -(img_playlist_detail.height - 1920);
                img_playlist_detail.input.enableDrag();
            }
        });
    },
    createChallPlaylistGroup: function () {
        this.challPlaylistGroup = MQ.game.add.group();
        // position of challplaylist
        if (MQ.isBotMode) {
            this.challPlaylistGroup.position.x = 0;
        }
        if (!MQ.isChallenged) {
            this.challPlaylistGroup.position.x = 0;
        } else {
            this.challPlaylistGroup.position.x = -MQ.game.width;
        }
        let bg_challPlaylist = MQ.game.add.button(0, 0, 'bg-playlist');
        // bg_challPlaylist.scale.set(MQ.configs.SCALE);
        this.challPlaylistGroup.add(bg_challPlaylist);
        // tab-chon-playlist
        let tab_chonplaylist = MQ.game.add.sprite(MQ.game.world.centerX, 0, 'tab-playlist');
        tab_chonplaylist.anchor.set(0.5, 0);
        // tab_chonplaylist.scale.set(MQ.configs.SCALE);
        this.challPlaylistGroup.add(tab_chonplaylist);
        //87
        let txt_chonplaylist = MQ.game.add.text(0, 87, 'CHỌN 1 PLAYLIST',
            {
                font: `50px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 700
            });
        // txt_chonplaylist.scale.set(1 / MQ.configs.SCALE);
        txt_chonplaylist.anchor.set(0.5);
        tab_chonplaylist.addChild(txt_chonplaylist);
        //74
        let arrow_chonplaylist = MQ.game.add.button(-(540 - 74), 87, 'arrow-playlist');
        arrow_chonplaylist.anchor.set(0.5);
        tab_chonplaylist.addChild(arrow_chonplaylist);
        arrow_chonplaylist.events.onInputDown.add(() => {
            MQ.button_sound.play();
            MQ.game.state.start('menu');
        });
        // 990
        let gem_playlist = MQ.game.add.sprite((990 - 540), 80, 'gem-playlist');
        gem_playlist.anchor.set(0.5);
        tab_chonplaylist.addChild(gem_playlist);
        txt_gem_playlist = MQ.game.add.text((940 - 540), 87, `${MQ.diamond}`, {
            font: `45px Roboto`,
            fill: "#93909d",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 700
        });
        txt_gem_playlist.anchor.set(1, 0.5);
        // txt_gem_playlist.scale.set(1 / MQ.configs.SCALE);
        tab_chonplaylist.addChild(txt_gem_playlist);
        // end <-- tab chon playlist -->
        //change btn plts
        //1776
        var btn_change_playlist = MQ.game.add.button(MQ.game.world.centerX, 1776, 'change-btn');
        // btn_change_playlist.scale.set(MQ.configs.SCALE);
        btn_change_playlist.anchor.set(0.5);
        this.challPlaylistGroup.add(btn_change_playlist);
        //110
        let txt_change_playlist = MQ.game.add.text(-430, 0, 'THAY ĐỔI PLAYLIST', {
            font: `50px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 700
        });
        txt_change_playlist.anchor.set(0, 0.5);
        // txt_change_playlist.scale.set(1 / MQ.configs.SCALE)
        btn_change_playlist.addChild(txt_change_playlist);
        //959
        let gem_change_playlist = MQ.game.add.sprite(419, -10, 'gem-playlist');
        gem_change_playlist.anchor.set(0.5);
        btn_change_playlist.addChild(gem_change_playlist);
        // end change btn plts
        // console.log(this.challPlaylistGroup);
        //1335
        let txt_type_playlist = MQ.game.add.text(60, 1335, 'Thể loại âm nhạc', {
            font: `50px Roboto`,
            fill: "#93909d",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        txt_type_playlist.anchor.set(0, 0.5);
        this.challPlaylistGroup.add(txt_type_playlist);
        //vn-muzik (293, 1526)
        var btn_vn_muzik = MQ.game.add.button(293, 1526, 'vn-muzik');
        btn_vn_muzik.anchor.set(0.5);
        // btn_vn_muzik.scale.set(MQ.configs.SCALE);
        this.challPlaylistGroup.add(btn_vn_muzik);
        // w-muzik (808, 1526)
        var btn_w_muzik = MQ.game.add.button(787, 1526, 'w-muzik');
        btn_w_muzik.anchor.set(0.5);
        btn_vn_muzik.events.onInputDown.add(() => {
            MQ.button_sound.play();
            this.createPlaylistDetail();
        });
        this.challPlaylistGroup.add(btn_w_muzik);
        //683.5
        for (playlist in MQ.listPlaylist) {
            let tab_playlist = MQ.game.add.button(MQ.game.world.centerX, 287 + playlist * 200, 'tab-recent2');
            tab_playlist.anchor.set(0.5);
            this.challPlaylistGroup.add(tab_playlist);
            var imgPlaylist = MQ.game.add.sprite(-480, 0, `${MQ.listPlaylist[playlist].img}`)
            imgPlaylist.anchor.set(0, 0.5);
            tab_playlist.addChild(imgPlaylist);
            var txt_playlist = MQ.game.add.text(-(540 - 300), 0, `${MQ.listPlaylist[playlist].name}`, {
                font: `45px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            txt_playlist.anchor.set(0, 0.5);
            tab_playlist.addChild(txt_playlist);
            tab_playlist.namePlaylist = MQ.listPlaylist[playlist].namePlaylist;
            tab_playlist.nameOfPlaylist = MQ.listPlaylist[playlist].name;
            tab_playlist.events.onInputDown.add(() => {
                MQ.button_sound.play();
                // MQ.sound.stop();
                MQ.countQuiz  = 0;
                MQ.score = 0;
                MQ.scoreOpp = 0;
                MQ.correctList = [];
                MQ.wrongList = [];
                MQ.songChoicedList = [];
                MQ.songRandomChoicedList = [];
                MQ.streak = 1;
                MQ.getSongChall = 0;
                MQ.timeAnswerSaveToDataAndScore = {
                    "time": [],
                    "score": 0
                };
                MQ.scoreYour = 0;
                MQ.scoreTheir = 0;
                MQ.isChallenged = true;
                var findData = MQ.data.filter(data => data.nameData == `${tab_playlist.namePlaylist}`);
                // MQ.sound.stop();
                // console.log(findData);
                MQ.dataChoosed = findData[0].data;
                getSongToQuiz(MQ.dataChoosed, () => {
                    getSongToQuiz(MQ.dataChoosed, () => {
                        getSongToQuiz(MQ.dataChoosed, () => {
                            getSongToQuiz(MQ.dataChoosed, () => {
                                getSongToQuiz(MQ.dataChoosed, () => {
                                    this.startLoad();
                                });
                            });
                        });
                    });
                });
            });
        }
    },
    createFindgameGroup() {
        this.findgameGroup = MQ.game.add.group();
        if (MQ.isChallenged) {
            this.findgameGroup.position.x = 0;
        } else {
            this.findgameGroup.position.x = -MQ.game.width;
        }
        let bg_findgame = MQ.game.add.button(0, 0, 'bg-playlist');
        // bg_findgame.scale.set(MQ.configs.SCALE);
        this.findgameGroup.add(bg_findgame);
        //btn-invite
        this.btn_invite = MQ.game.add.button(1020, 250, 'btn-invite');
        this.btn_invite.anchor.set(1, 0.5);
        // MQ.btn_invite.scale.set(MQ.configs.SCALE);
        this.btn_invite.events.onInputDown.add(() => {
            MQ.button_sound.play();
            FB.ui({
                method: 'apprequests',
                message: 'Come and play MusicQuiz with me!'
            }, (response) => {
                console.log(response);
            });
        });
        this.findgameGroup.add(this.btn_invite);
        let txt_chooseCompetitor = MQ.game.add.text(110, 350, 'CHỌN ĐỐI THỦ', {
            font: `45px Roboto`,
            fill: "#8a8a8a",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        this.findgameGroup.add(txt_chooseCompetitor);
        this.scrollMaskPoke = MQ.game.add.graphics(0, 400);
        this.scrollMaskPoke.beginFill();
        this.scrollMaskPoke.drawRect(0, 0, MQ.game.width, 1280);
        this.scrollMaskPoke.endFill();
        this.grapFriendInstalled = MQ.game.add.graphics(0, 400);
        this.grapFriendInstalled.drawRect(0, 0, MQ.game.width, 750);
        this.grapFriendInstalled.inputEnabled = true;
        this.grapFriendInstalled.input.enableDrag();
        this.grapFriendInstalled.input.allowHorizontalDrag = false;
        this.grapFriendInstalled.events.onDragStop.add(() => {
            if (MQ.installed_friend.length > 1) {
                if (this.grapFriendInstalled.position.y > 400) {
                    var tweengrapInstalled = MQ.game.add.tween(this.grapFriendInstalled).to({ y: 400 }, 250, "Linear");
                    tweengrapInstalled.start();
                }
                if (this.grapFriendInstalled.position.y < -(-150 + this.testMaskInstalled - this.testMaskInstalled / MQ.installed_friend.length - 400)) {
                    var tweengrapInstalled = MQ.game.add.tween(this.grapFriendInstalled).to({ y: -(-150 + this.testMaskInstalled - this.testMaskInstalled / MQ.installed_friend.length - 400) }, 250, "Linear");
                    tweengrapInstalled.start();
                }
            }
        });
        this.testMaskInstalled = 0;
        this.grapFriendInstalled.mask = this.scrollMaskPoke;
        for (i = 0; i < MQ.installed_friend.length; i++) {
            // this.createTabFriennd();
            let testMaskInstalled = MQ.game.add.sprite(0, (i * 190) * (MQ.configs.SCALE), 'tab-friend');
            // testMaskInstalled.scale.set(MQ.configs.SCALE);
            let maskAvaFriendInstall = MQ.game.add.graphics(0, 0);
            maskAvaFriendInstall.beginFill(0xffffff);
            maskAvaFriendInstall.drawCircle(150, 90, 120);
            maskAvaFriendInstall.anchor.set(0.5);
            testMaskInstalled.addChild(maskAvaFriendInstall);
            let friend_avaInstalled = MQ.game.add.sprite(150, 90, `'friend${i}'`);
            friend_avaInstalled.anchor.set(0.5);
            friend_avaInstalled.mask = maskAvaFriendInstall;
            // friend_avaInstalled.scale.set(MQ.configs.SCALE);
            testMaskInstalled.addChild(friend_avaInstalled);
            let nameFriendInstalled = MQ.game.add.text(300, 90, `${MQ.installed_friend[i].name}`, {
                font: `45px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            nameFriendInstalled.anchor.set(0, 0.5);
            // nameFriendInstalled.scale.set(1 / MQ.configs.SCALE);
            // console.log(nameFriendInstalled);
            let btn_play = MQ.game.add.button(950, 90, 'btn-playing');
            btn_play.anchor.set(0.5);
            // btn_play.scale.set(MQ.configs.SCALE);
            testMaskInstalled.addChild(btn_play);
            testMaskInstalled.addChild(nameFriendInstalled);
            this.grapFriendInstalled.addChild(testMaskInstalled);
            this.testMaskInstalled += testMaskInstalled.height;
            let idFriend = MQ.installed_friend[i].id;
            btn_play.events.onInputDown.add(() => {
                MQ.button_sound.play();
                MQ.score = 0;
                MQ.correctList = [];
                MQ.wrongList = [];
                MQ.songChoicedList = [];
                MQ.songRandomChoicedList = [];
                MQ.streak = 1;
                MQ.timeAnswerSaveToDataAndScore = {
                    "time": [],
                    "score": 0
                };
                MQ.idFriendChallenge = idFriend;
                MQ.nameFriendChallenge = nameFriendInstalled._text;
                var tween_challPlaylist = MQ.game.add.tween(this.challPlaylistGroup).to({
                    x: 0
                }, 300, "Linear");
                tween_challPlaylist.start();
            });
            this.grapFriendInstalled.addChild(testMaskInstalled);
            this.findgameGroup.add(this.grapFriendInstalled);
        }
        let tab_chonplaylist = MQ.game.add.sprite(MQ.game.world.centerX, 0, 'tab-playlist');
        tab_chonplaylist.anchor.set(0.5, 0);
        // tab_chonplaylist.scale.set(MQ.configs.SCALE);
        this.findgameGroup.add(tab_chonplaylist);
        let txt_chonplaylist = MQ.game.add.text(0, 87, 'CHỌN 1 ĐỐI THỦ',
            {
                font: `50px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 700
            });
        // txt_chonplaylist.scale.set(1 / MQ.configs.SCALE);
        txt_chonplaylist.anchor.set(0.5);
        tab_chonplaylist.addChild(txt_chonplaylist);
        let arrow_chonplaylist = MQ.game.add.button(-(540 - 74), 87, 'arrow-playlist');
        arrow_chonplaylist.anchor.set(0.5);
        tab_chonplaylist.addChild(arrow_chonplaylist);
        arrow_chonplaylist.events.onInputDown.add(() => {
            MQ.button_sound.play();
            MQ.game.state.start('menu');
        });
    },
    startLoad: function () {
        if (MQ.practiceMode) {
            MQ.game.load.audio('songChoiced', `./img/assets/mp3Song/${MQ.songChoiced.FileName}`);
        } else {
            if (!MQ.isBotMode) {
                MQ.game.load.image('ava_fb_friend', `https://graph.facebook.com/${MQ.idFriendChallenge}/picture?width=${Math.floor(241)}`);
                MQ.game.load.image('friend-challenge', `https://graph.facebook.com/${MQ.idFriendChallenge}/picture?width=${Math.floor(150)}`);
                MQ.game.load.image('friend-challenge-mini', `https://graph.facebook.com/${MQ.idFriendChallenge}/picture?width=${Math.floor(70)}`);
            }
            for (i = 0; i < 5; i++) {
                // console.log(MQ.songChoicedList[i].Namefile);
                MQ.game.load.audio(`songChoiced${i}`, `./img/assets/mp3Song/${MQ.songChoicedList[i].FileName}`);
            }
        }
        // console.log(MQ.idFriendChallenge)
        bonusState.load.start();
    },
    loadStart: function () {
        // showConsole('Loading...');
    },
    fileComplete: function (progress, cacheKey, success, totalLoaded, totalFiles) {

    },
    loadComplete: function () {
        console.log('load Done');
        if (!MQ.loadVar) {
            MQ.loadVar = true;
            if (MQ.practiceMode) {
                // console.log('run prac');
                MQ.game.state.start('practice');
            } else {
                MQ.game.state.start('play');
            }
            // MQ.game.load.stop();
        }
        // MQ.game.state.start('play');
    }
}