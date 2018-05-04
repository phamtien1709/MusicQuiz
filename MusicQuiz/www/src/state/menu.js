var menuState = {
    preload: function () {
        MQ.game.load.onLoadStart.removeAll();
        MQ.game.load.onFileComplete.removeAll();
        MQ.game.load.onLoadComplete.removeAll();
        if (MQ.loadFirst == undefined) {
            MQ.game.load.image('tab-friend', 'img/assets/tab-friend.png');
            for (i = 0; i < MQ.installed_friend.length; i++) {
                MQ.game.load.image(`'friend${i}'`, `https://graph.facebook.com/${MQ.installed_friend[i].id}/picture?width=150`);
            };
            if (MQ.responseChallen !== undefined) {
                for (i = 0; i < MQ.responseChallen.length; i++) {
                    MQ.game.load.image(`'friend${MQ.installed_friend.length + i}'`, `https://graph.facebook.com/${MQ.responseChallen[i].from.id}/picture?width=150`)
                }
            }
        }
    },
    create: function () {
        // variable
        // showConsole('Menu Screen');
        this.game.stage.smoothed = true;
        MQ.idFriendChallenge = 0;
        MQ.nameFriendChallenge = "";
        MQ.songChoiced = [];
        MQ.isChallenged = false;
        MQ.practiceMode = false;
        MQ.songRandomChoiced = [];
        MQ.countQuiz = 0;
        MQ.indexSongChoiced = [];
        //bg
        var bg = MQ.game.add.sprite(0, 0, 'bg-menu');
        bg.width = MQ.game.width;
        bg.height = MQ.game.height;
        //load
        MQ.loadVar = false;
        menuState.load.onLoadStart.add(this.loadStart, this);
        menuState.load.onFileComplete.add(this.fileComplete, this);
        menuState.load.onLoadComplete.add(this.loadComplete, this);
        //
        // mask ava in front  of ava sprite 
        var maskAva = MQ.game.add.graphics(0, 0);
        maskAva.beginFill(0xffffff);
        maskAva.drawCircle(200 * MQ.configs.SCALE, 182 * MQ.configs.SCALE, 200 * MQ.configs.SCALE);
        maskAva.anchor.set(0.5);
        //fsf
        var ava = MQ.game.add.button(200 * MQ.configs.SCALE, 182 * MQ.configs.SCALE, 'ava_fb');
        ava.anchor.set(0.5);
        // ava.scale.set(MQ.configs.SCALE);
        ava.mask = maskAva;
        //
        var nameFB = MQ.game.add.text(400 * MQ.configs.SCALE, 120 * MQ.configs.SCALE, `${MQ.nameFB}`, {
            font: `80px Roboto`,
            fill: "black",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        nameFB.anchor.set(0, 0.5);
        //reward 
        var heart = MQ.game.add.sprite(447 * MQ.configs.SCALE, 280 * MQ.configs.SCALE, 'heart');
        heart.anchor.set(0.5, 1);
        // heart.scale.set(MQ.configs.SCALE);
        var diamond = MQ.game.add.sprite(647 * MQ.configs.SCALE, 280 * MQ.configs.SCALE, 'diamond');
        diamond.anchor.set(0, 1);
        // diamond.scale.set(MQ.configs.SCALE);
        var ticket = MQ.game.add.sprite(855 * MQ.configs.SCALE, 280 * MQ.configs.SCALE, 'ticket');
        ticket.anchor.set(0.5, 1);
        // ticket.scale.set(MQ.configs.SCALE);
        // text reward
        MQ.txt_heart = MQ.game.add.text(490 * MQ.configs.SCALE, 270 * MQ.configs.SCALE, `${MQ.heart}/20`, {
            font: `45px Roboto`,
            fill: "pink",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        MQ.txt_heart.anchor.set(0, 0.5);
        MQ.txt_diamond = MQ.game.add.text(700 * MQ.configs.SCALE, 270 * MQ.configs.SCALE, `${MQ.diamond}`, {
            font: `45px Roboto`,
            fill: "orange",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        MQ.txt_diamond.anchor.set(0, 0.5);
        MQ.txt_ticket = MQ.game.add.text(920 * MQ.configs.SCALE, 270 * MQ.configs.SCALE, `${MQ.ticket}`, {
            font: `45px Roboto`,
            fill: "green",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        MQ.txt_ticket.anchor.set(0, 0.5);
        //text turn
        var txt_yourTurn = MQ.game.add.text(110 * MQ.configs.SCALE, 810 * MQ.configs.SCALE, 'LƯỢT CỦA BẠN', {
            font: `45px Roboto`,
            fill: "#8a8a8a",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        txt_yourTurn.anchor.set(0, 0.5);
        var txt_theirTurn = MQ.game.add.text(110 * MQ.configs.SCALE, 1310 * MQ.configs.SCALE, 'LƯỢT CỦA ĐỐI THỦ', {
            font: `45px Roboto`,
            fill: "#8a8a8a",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        txt_theirTurn.anchor.set(0, 0.5);
        //btn-invite
        MQ.btn_invite = MQ.game.add.button(930 * MQ.configs.SCALE, 800 * MQ.configs.SCALE, 'btn-invite');
        MQ.btn_invite.anchor.set(0.5);
        // MQ.btn_invite.scale.set(MQ.configs.SCALE);
        MQ.btn_invite.events.onInputDown.add(() => {
            // MQ.button_sound.play();
            FB.ui({
                method: 'apprequests',
                message: 'Come and play MusicQuiz with me!'
            }, (response) => {
                console.log(response);
            })
        })
        // scroll mask
        MQ.scrollMaskChall = MQ.game.add.graphics(0, MQ.configs.SCALE * 850);
        MQ.scrollMaskChall.beginFill();
        MQ.scrollMaskChall.drawRect(0, 0, MQ.game.width, MQ.configs.SCALE * 400);
        MQ.scrollMaskChall.endFill();
        MQ.scrollMaskPoke = MQ.game.add.graphics(0, MQ.configs.SCALE * 1350);
        MQ.scrollMaskPoke.beginFill();
        MQ.scrollMaskPoke.drawRect(0, 0, MQ.game.width, MQ.configs.SCALE * 450);
        MQ.scrollMaskPoke.endFill();
        MQ.grap = MQ.game.add.graphics(0, MQ.configs.SCALE * 350);
        MQ.grap.drawRect(0, 0, MQ.game.width, MQ.game.height * ((110 / 128) - (40 / 128)));
        MQ.grap.inputEnabled = true;
        MQ.grap.input.enableDrag();
        MQ.grap.input.allowHorizontalDrag = false;
        MQ.grap.events.onDragStop.add(() => {
            if (MQ.taggable_friend.length > 4) {
                if (MQ.grap.position.y > MQ.configs.SCALE * 400) {
                    var tweenGrap = MQ.game.add.tween(MQ.grap).to({ y: MQ.configs.SCALE * 400 }, 250, "Linear");
                    tweenGrap.start();
                }
                if (MQ.grap.position.y < -(MQ.testMask - MQ.testMask / MQ.taggable_friend.length * 4 - MQ.configs.SCALE * 400)) {
                    var tweenGrap = MQ.game.add.tween(MQ.grap).to({ y: -(MQ.testMask - MQ.testMask / 5 - MQ.configs.SCALE * 400) }, 250, "Linear");
                    tweenGrap.start();
                }
            }
        });
        MQ.grapInstalled = MQ.game.add.graphics(0, MQ.configs.SCALE * 1350);
        MQ.grapInstalled.drawRect(0, 0, MQ.game.width, MQ.configs.SCALE * 450);
        MQ.grapInstalled.inputEnabled = true;
        MQ.grapInstalled.input.enableDrag();
        MQ.grapInstalled.input.allowHorizontalDrag = false;
        MQ.grapInstalled.events.onDragStop.add(() => {
            if (MQ.installed_friend.length > 1) {
                if (MQ.grapInstalled.position.y > MQ.configs.SCALE * 1350) {
                    var tweengrapInstalled = MQ.game.add.tween(MQ.grapInstalled).to({ y: MQ.configs.SCALE * 1350 }, 250, "Linear");
                    tweengrapInstalled.start();
                }
                if (MQ.grapInstalled.position.y < -(MQ.testMaskInstalled - MQ.testMaskInstalled / MQ.installed_friend.length - MQ.configs.SCALE * 1350)) {
                    var tweengrapInstalled = MQ.game.add.tween(MQ.grapInstalled).to({ y: -(MQ.testMaskInstalled - MQ.testMaskInstalled / MQ.installed_friend.length - MQ.configs.SCALE * 1350) }, 250, "Linear");
                    tweengrapInstalled.start();
                }
            }
        });
        MQ.grapChallenge = MQ.game.add.graphics(0, MQ.configs.SCALE * 850);
        MQ.grapChallenge.drawRect(0, 100, MQ.game.width, MQ.configs.SCALE * 400);
        MQ.grapChallenge.inputEnabled = true;
        MQ.grapChallenge.input.enableDrag();
        MQ.grapChallenge.input.allowHorizontalDrag = false;
        MQ.grapChallenge.events.onDragStop.add(() => {

        });
        MQ.testMaskChallenge = 0;
        MQ.testMask = 0;
        MQ.testMaskInstalled = 0;
        //btn next
        var btn_next = MQ.game.add.button(MQ.game.width / 3 * 2, MQ.game.height * (125 / 128), 'btn-next');
        // btn_next.scale.set(MQ.configs.SCALE - 0.1);
        btn_next.anchor.set(0.5);
        btn_next.kill();
        //btn playing
        var btn_playing = MQ.game.add.button(MQ.game.width / 3, MQ.game.height * (125 / 128), 'btn-playing');
        // btn_playing.scale.set(MQ.configs.SCALE - 0.1);
        btn_playing.anchor.set(0.5);
        btn_playing.kill();
        //

        // MQ.grapInstalled.kill();
        MQ.grap.kill();
        //////////
        MQ.grapInstalled.mask = MQ.scrollMaskPoke;
        MQ.grapChallenge.mask = MQ.scrollMaskChall;
        //TEST TODO
        // console.log(MQ.responseChallen);
        //
        btn_playing.events.onInputDown.add(() => {
            // MQ.button_sound.play();
        });
        // challenged
        // try to catch more friend challenge
        if (MQ.responseChallen !== undefined) {
            for (i = 0; i < MQ.responseChallen.length; i++) {
                let testMaskChallenge = MQ.game.add.sprite(0, i * 200, 'tab-friend');
                // testMaskChallenge.scale.set(MQ.configs.SCALE);
                let friend_avaChallenge = MQ.game.add.sprite(150 * MQ.configs.SCALE, 50 * MQ.configs.SCALE, `'friend${MQ.installed_friend.length + i}'`);
                friend_avaChallenge.anchor.set(0.5);
                // friend_avaChallenge.scale.set(MQ.configs.SCALE);
                // friend_avaChallenge.scale.set(1/MQ.configs.SCALE);
                testMaskChallenge.addChild(friend_avaChallenge);
                let nameFriendChallenge = MQ.game.add.text(300 * MQ.configs.SCALE, 50 * MQ.configs.SCALE, `${MQ.responseChallen[i].from.name}`, {
                    font: `40px Roboto`,
                    fill: "black",
                    boundsAlignH: "center",
                    boundsAlignV: "middle"
                });
                nameFriendChallenge.anchor.set(0, 0.5);
                testMaskChallenge.addChild(nameFriendChallenge);
                let btn_play = MQ.game.add.button(950 * MQ.configs.SCALE, 50 * MQ.configs.SCALE, 'btn-play');
                btn_play.anchor.set(0.5);
                // btn_play.scale.set(MQ.configs.SCALE);
                testMaskChallenge.addChild(btn_play);
                let textScore = MQ.game.add.text(700 * MQ.configs.SCALE, 50 * MQ.configs.SCALE, `${MQ.responseChallen[i].data.scoreTheir} : ${MQ.responseChallen[i].data.scoreYour}`, {
                    font: `40px Roboto`,
                    fill: "black",
                    boundsAlignH: "center",
                    boundsAlignV: "middle"
                });
                btn_play.value = {
                    "value": i,
                    "linkDB": MQ.responseChallen[i].data.idData,
                    "data": MQ.responseChallen[i]
                };
                textScore.anchor.set(0, 0.5);
                testMaskChallenge.addChild(textScore);
                // var indexOfData = i;
                btn_play.events.onInputDown.add(() => {
                    // MQ.button_sound.play();
                    // btn_play.input.enabled = false;
                    MQ.idFriendChallenge = btn_play.value.data.from.id;
                    MQ.nameFriendChallenge = btn_play.value.data.from.name;
                    MQ.linkDB = btn_play.value.linkDB;
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
                    // MQ.sound.stop();
                    MQ.dataChooseToChall = MQ.dataChallenge[btn_play.value.value];
                    getSongToChallenge(() => {
                        getSongToChallenge(() => {
                            getSongToChallenge(() => {
                                getSongToChallenge(() => {
                                    getSongToChallenge(() => {
                                        // this.startLoad();
                                        this.startLoad();
                                    })
                                })
                            })
                        })
                    });
                });
                MQ.testMaskChallenge += testMaskChallenge.height;
                MQ.grapChallenge.addChild(testMaskChallenge);
            }
        }
        // button TODO
        var btn_findgame = MQ.game.add.button(191 * MQ.configs.SCALE, 555 * MQ.configs.SCALE, 'btn-findgame');
        btn_findgame.anchor.set(0.5);
        // btn_findgame.scale.set(MQ.configs.SCALE);
        btn_findgame.events.onInputDown.add(() => {
            // MQ.button_sound.play();
            var tween_findgame = MQ.game.add.tween(this.findgameGroup).to({
                x: 0
            }, 500, "Linear");
            tween_findgame.start();
        })
        // btn_findgame.alpha = 0.5;
        var btn_party = MQ.game.add.button(540 * MQ.configs.SCALE, 555 * MQ.configs.SCALE, 'btn-party');
        btn_party.anchor.set(0.5);
        // btn_party.scale.set(MQ.configs.SCALE)
        // btn_party.alpha = 0.5;
        var btn_practice = MQ.game.add.button(890 * MQ.configs.SCALE, 555 * MQ.configs.SCALE, 'btn-practice');
        btn_practice.anchor.set(0.5);
        // btn_practice.scale.set(MQ.configs.SCALE);
        // btn_practice.alpha = 0.5;
        var btn_noti = MQ.game.add.button((1080 - 50) * MQ.configs.SCALE, 50 * MQ.configs.SCALE, 'btn-noti');
        btn_noti.anchor.set(0.5);
        // btn_noti.scale.set(MQ.configs.SCALE);
        var btn_setting = MQ.game.add.button(50 * MQ.configs.SCALE, 50 * MQ.configs.SCALE, 'btn-setting');
        btn_setting.anchor.set(0.5);
        // btn_setting.scale.set(MQ.configs.SCALE);
        // screen dim
        MQ.screen_dim = MQ.game.add.sprite(0, 0, 'screen-dim');
        MQ.screen_dim.width = MQ.game.width;
        MQ.screen_dim.height = MQ.game.height;
        MQ.screen_dim.kill();
        ava.events.onInputDown.add(() => {
            // MQ.button_sound.play();
        });
        // practice btn input
        btn_practice.events.onInputDown.add(() => {
            // MQ.button_sound.play();
            if (MQ.heart > 0) {
                btn_practice.inputEnabled = false;
                btn_findgame.inputEnabled = false;
                btn_party.inputEnabled = false;
                this.popupPlaylist.revive();
            } else {
                alert('Not enough heart! Wait for 3 minutes.');
            }
        });
        // MQ.sound.play();
        // MQ.sound.fade(0, 0.7, 10000);
        // console.log(MQ.sound);
        // var id2 = MQ.sound.play();
        // popup popup
        this.popupPlaylist = MQ.game.add.sprite(MQ.game.world.centerX, MQ.game.world.centerY, 'popup-playlist');
        this.popupPlaylist.anchor.set(0.5);
        // this.popupPlaylist.scale.set(MQ.configs.SCALE);
        for (playList in MQ.playListFree) {
            this.createButtonPlaylist(playList, MQ.playListFree[playList]);
        }
        var btn_x = MQ.game.add.button(410, -270, 'x-button');
        btn_x.anchor.set(0.5);
        btn_x.events.onInputDown.add(() => {
            // MQ.button_sound.play();
            btn_practice.inputEnabled = true;
            btn_findgame.inputEnabled = true;
            btn_party.inputEnabled = true;
            this.popupPlaylist.kill();
        });
        this.popupPlaylist.addChild(btn_x);
        this.popupPlaylist.kill();
        // this is state playlist after challenge into menu
        //
        //
        this.createFindgameGroup();
        this.challPlaylistGroup = MQ.game.add.group();
        // this.findgameGroup = MQ.game.add.group();
        // position of challplaylist
        this.challPlaylistGroup.position.x = -MQ.game.width;
        const bg_challPlaylist = MQ.game.add.button(0, 0, 'bg-playlist');
        // bg_challPlaylist.scale.set(MQ.configs.SCALE);
        this.challPlaylistGroup.add(bg_challPlaylist);
        // tab-chon-playlist
        const tab_chonplaylist = MQ.game.add.sprite(MQ.game.world.centerX, 0, 'tab-playlist');
        tab_chonplaylist.anchor.set(0.5, 0);
        // tab_chonplaylist.scale.set(MQ.configs.SCALE);
        this.challPlaylistGroup.add(tab_chonplaylist);
        //87
        const txt_chonplaylist = MQ.game.add.text(0, 87, 'CHỌN 1 PLAYLIST',
            {
                font: `50px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 'Bold'
            });
        // txt_chonplaylist.scale.set(1 / MQ.configs.SCALE);
        txt_chonplaylist.anchor.set(0.5);
        tab_chonplaylist.addChild(txt_chonplaylist);
        //74
        const arrow_chonplaylist = MQ.game.add.button(-(540 - 74), 87, 'arrow-playlist');
        arrow_chonplaylist.anchor.set(0.5);
        tab_chonplaylist.addChild(arrow_chonplaylist);
        arrow_chonplaylist.events.onInputDown.add(() => {
            // MQ.button_sound.play();
            var tween_challPlaylistReturn = MQ.game.add.tween(this.challPlaylistGroup).to({
                x: -MQ.game.width
            }, 500, "Linear");
            tween_challPlaylistReturn.start();
        });
        // 990
        const gem_playlist = MQ.game.add.sprite((990 - 540), 80, 'gem-playlist');
        gem_playlist.anchor.set(0.5);
        tab_chonplaylist.addChild(gem_playlist);
        txt_gem_playlist = MQ.game.add.text((940 - 540), 87, `${MQ.diamond}`, {
            font: `45px Roboto`,
            fill: "#93909d",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 'Bold'
        });
        txt_gem_playlist.anchor.set(1, 0.5);
        // txt_gem_playlist.scale.set(1 / MQ.configs.SCALE);
        tab_chonplaylist.addChild(txt_gem_playlist);
        // end <-- tab chon playlist -->
        //change btn plts
        //1776
        var btn_change_playlist = MQ.game.add.button(MQ.game.world.centerX, 1776 * MQ.configs.SCALE, 'change-btn');
        // btn_change_playlist.scale.set(MQ.configs.SCALE);
        btn_change_playlist.anchor.set(0.5);
        this.challPlaylistGroup.add(btn_change_playlist);
        //110
        const txt_change_playlist = MQ.game.add.text(-430, 0, 'CHANGE SUGGEST PLAYLIST', {
            font: `50px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 'Bold'
        });
        txt_change_playlist.anchor.set(0, 0.5);
        // txt_change_playlist.scale.set(1 / MQ.configs.SCALE)
        btn_change_playlist.addChild(txt_change_playlist);
        //959
        const gem_change_playlist = MQ.game.add.sprite(419, -10, 'gem-playlist');
        gem_change_playlist.anchor.set(0.5);
        btn_change_playlist.addChild(gem_change_playlist);
        // end change btn plts
        // console.log(this.challPlaylistGroup);
        //545
        const txt_recent_playlist = MQ.game.add.text(60 * MQ.configs.SCALE, 545 * MQ.configs.SCALE, 'Recent Playlist', {
            font: `50px Roboto`,
            fill: "#93909d",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        txt_recent_playlist.anchor.set(0, 0.5);
        this.challPlaylistGroup.add(txt_recent_playlist);
        //1335
        const txt_type_playlist = MQ.game.add.text(60 * MQ.configs.SCALE, 1335 * MQ.configs.SCALE, 'Thể loại âm nhạc', {
            font: `50px Roboto`,
            fill: "#93909d",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        txt_type_playlist.anchor.set(0, 0.5);
        this.challPlaylistGroup.add(txt_type_playlist);
        //vn-muzik (293, 1526)
        var btn_vn_muzik = MQ.game.add.button(293 * MQ.configs.SCALE, 1526 * MQ.configs.SCALE, 'vn-muzik');
        btn_vn_muzik.anchor.set(0.5);
        // btn_vn_muzik.scale.set(MQ.configs.SCALE);
        this.challPlaylistGroup.add(btn_vn_muzik);
        // w-muzik (808, 1526)
        var btn_w_muzik = MQ.game.add.button(808 * MQ.configs.SCALE, 1526 * MQ.configs.SCALE, 'w-muzik');
        btn_w_muzik.anchor.set(0.5);
        // btn_w_muzik.scale.set(MQ.configs.SCALE);
        this.challPlaylistGroup.add(btn_w_muzik);
        // this.challPlaylistGroup.position.x = MQ.game.width/2;
        //683.5
        var recent_playlist_list = MQ.game.add.button(MQ.game.world.centerX, 683.5 * MQ.configs.SCALE, 'tab-recent');
        recent_playlist_list.anchor.set(0.5);
        // recent_playlist_list.scale.set(MQ.configs.SCALE);
        this.challPlaylistGroup.add(recent_playlist_list);
        var bop = MQ.game.add.sprite(-(540 - 60), 0, 'bop');
        bop.anchor.set(0, 0.5);
        recent_playlist_list.addChild(bop);
        var txt_bop = MQ.game.add.text(-(540 - 275), -20, 'Best Of Playlist', {
            font: `45px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        txt_bop.anchor.set(0, 0.5);
        // txt_bop.scale.set(1 / MQ.configs.SCALE);
        recent_playlist_list.addChild(txt_bop);
        //318
        var best_of_buy = MQ.game.add.sprite(MQ.game.world.centerX, 318 * MQ.configs.SCALE, 'tab-recent');
        best_of_buy.anchor.set(0.5);
        // best_of_buy.scale.set(MQ.configs.SCALE);
        this.challPlaylistGroup.add(best_of_buy);
        var txt_bob = MQ.game.add.text(-(540 - 275), 0, 'Best Of Mua', {
            font: `45px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        txt_bob.anchor.set(0, 0.5);
        // txt_bob.scale.set(1 / MQ.configs.SCALE);
        best_of_buy.addChild(txt_bob);
        var bob = MQ.game.add.sprite(-480, 0, 'bop');
        bob.anchor.set(0, 0.5);
        best_of_buy.addChild(bob);
        var tab_of_buy = MQ.game.add.button((906 - 540), 0, 'tab-gem');
        tab_of_buy.anchor.set(0.5);
        best_of_buy.addChild(tab_of_buy);
        //
        //
        recent_playlist_list.events.onInputDown.add(() => {
            // MQ.button_sound.play();
            // MQ.sound.stop();
            MQ.scoreYour = 0;
            MQ.scoreTheir = 0;
            MQ.isChallenged = true;
            getSongToQuiz(() => {
                getSongToQuiz(() => {
                    getSongToQuiz(() => {
                        getSongToQuiz(() => {
                            getSongToQuiz(() => {
                                this.startLoad();
                            })
                        })
                    })
                })
            });
        });
    },
    update: function () {

    },
    render: function () {
        MQ.txt_diamond.setText(`${MQ.diamond}`);
        MQ.txt_heart.setText(`${MQ.heart}/20`);
        MQ.txt_ticket.setText(`${MQ.ticket}`);
    },
    startLoad: function () {
        if (MQ.practiceMode) {
            MQ.game.load.audio('songChoiced', `./img/assets/mp3Song/${MQ.songChoiced.Namefile}`);
        } else {
            MQ.game.load.image('ava_fb_friend', `https://graph.facebook.com/${MQ.idFriendChallenge}/picture?width=${Math.floor(232 * MQ.configs.SCALE)}`);
            MQ.game.load.image('friend-challenge', `https://graph.facebook.com/${MQ.idFriendChallenge}/picture?width=${Math.floor(150 * MQ.configs.SCALE)}`);
            MQ.game.load.image('friend-challenge-mini', `https://graph.facebook.com/${MQ.idFriendChallenge}/picture?width=${Math.floor(70 * MQ.configs.SCALE)}`);
            for (i = 0; i < 5; i++) {
                // console.log(MQ.songChoicedList[i].Namefile);
                MQ.game.load.audio(`songChoiced${i}`, `./img/assets/mp3Song/${MQ.songChoicedList[i].Namefile}`);
            }
        }
        // console.log(MQ.idFriendChallenge)
        menuState.load.start();
    },
    loadStart: function () {
        // showConsole('Loading...');
    },
    fileComplete: function (progress, cacheKey, success, totalLoaded, totalFiles) {

    },
    loadComplete: function () {
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
    },
    createButtonPlaylist(index, namePlaylist) {
        var spritePlaylist = MQ.game.add.button(-286 + 286 * index, 0, 'sprite-playlist');
        spritePlaylist.anchor.set(0.5);
        spritePlaylist.value = namePlaylist;
        var textPlaylist = MQ.game.add.text(-286 + 286 * index, 200, `${namePlaylist}`, {
            font: `${45}px Roboto`,
            fill: "black",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        textPlaylist.anchor.set(0.5);
        this.popupPlaylist.addChild(spritePlaylist);
        this.popupPlaylist.addChild(textPlaylist);
        spritePlaylist.events.onInputDown.add(() => {
            // MQ.button_sound.play();
            // MQ.sound.stop();
            getSongToPractice(() => {
                MQ.practiceMode = true;
                this.startLoad();
                subHeartOnPractice();
                // MQ.game.state.start('practice');
            });
        })
    },
    createFindgameGroup() {
        this.findgameGroup = MQ.game.add.group();
        this.findgameGroup.position.x = -MQ.game.width;
        const bg_findgame = MQ.game.add.button(0, 0, 'bg-playlist');
        // bg_findgame.scale.set(MQ.configs.SCALE);
        this.findgameGroup.add(bg_findgame);
        const tab_chonplaylist = MQ.game.add.sprite(MQ.game.world.centerX, 0, 'tab-playlist');
        tab_chonplaylist.anchor.set(0.5, 0);
        // tab_chonplaylist.scale.set(MQ.configs.SCALE);
        this.findgameGroup.add(tab_chonplaylist);
        const txt_chonplaylist = MQ.game.add.text(0, 87, 'CHỌN 1 ĐỐI THỦ',
            {
                font: `50px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 'Bold'
            });
        // txt_chonplaylist.scale.set(1 / MQ.configs.SCALE);
        txt_chonplaylist.anchor.set(0.5);
        tab_chonplaylist.addChild(txt_chonplaylist);
        const arrow_chonplaylist = MQ.game.add.button(-(540 - 74), 87, 'arrow-playlist');
        arrow_chonplaylist.anchor.set(0.5);
        tab_chonplaylist.addChild(arrow_chonplaylist);
        arrow_chonplaylist.events.onInputDown.add(() => {
            // MQ.button_sound.play();
            var tween_findgameReturn = MQ.game.add.tween(this.findgameGroup).to({
                x: -MQ.game.width
            }, 300, "Linear");
            tween_findgameReturn.start();
        });
        const txt_chooseCompetitor = MQ.game.add.text(110 * MQ.configs.SCALE, 350 * MQ.configs.SCALE, 'CHỌN ĐỐI THỦ', {
            font: `45px Roboto`,
            fill: "#8a8a8a",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        this.findgameGroup.add(txt_chooseCompetitor);
        this.scrollMaskPoke = MQ.game.add.graphics(0, MQ.configs.SCALE * 400);
        this.scrollMaskPoke.beginFill();
        this.scrollMaskPoke.drawRect(0, 0, MQ.game.width, MQ.configs.SCALE * 750);
        this.scrollMaskPoke.endFill();
        this.grapFriendInstalled = MQ.game.add.graphics(0, MQ.configs.SCALE * 400);
        this.grapFriendInstalled.drawRect(0, 0, MQ.game.width, MQ.configs.SCALE * 750);
        this.grapFriendInstalled.inputEnabled = true;
        this.grapFriendInstalled.input.enableDrag();
        this.grapFriendInstalled.input.allowHorizontalDrag = false;
        this.grapFriendInstalled.events.onDragStop.add(() => {
            if (MQ.installed_friend.length > 1) {
                if (this.grapFriendInstalled.position.y > MQ.configs.SCALE * 400) {
                    var tweengrapInstalled = MQ.game.add.tween(this.grapFriendInstalled).to({ y: MQ.configs.SCALE * 400 }, 250, "Linear");
                    tweengrapInstalled.start();
                }
                if (this.grapFriendInstalled.position.y < -(this.testMaskInstalled - this.testMaskInstalled / MQ.installed_friend.length - MQ.configs.SCALE * 400)) {
                    var tweengrapInstalled = MQ.game.add.tween(this.grapFriendInstalled).to({ y: -(this.testMaskInstalled - this.testMaskInstalled / MQ.installed_friend.length - MQ.configs.SCALE * 400) }, 250, "Linear");
                    tweengrapInstalled.start();
                }
            }
        });
        this.testMaskInstalled = 0;
        this.grapFriendInstalled.mask = this.scrollMaskPoke;
        for (i = 0; i < MQ.installed_friend.length; i++) {
            // this.createTabFriennd();
            let testMaskInstalled = MQ.game.add.sprite(0, (i * 200) * (MQ.configs.SCALE), 'tab-friend');
            // testMaskInstalled.scale.set(MQ.configs.SCALE);
            let friend_avaInstalled = MQ.game.add.sprite(150, 100, `'friend${i}'`);
            friend_avaInstalled.anchor.set(0.5);
            // friend_avaInstalled.scale.set(MQ.configs.SCALE);
            testMaskInstalled.addChild(friend_avaInstalled);
            let nameFriendInstalled = MQ.game.add.text(300, 100, `${MQ.installed_friend[i].name}`, {
                font: `45px Roboto`,
                fill: "black",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            nameFriendInstalled.anchor.set(0, 0.5);
            // nameFriendInstalled.scale.set(1 / MQ.configs.SCALE);
            // console.log(nameFriendInstalled);
            let btn_play = MQ.game.add.button(950, 100, 'btn-playing');
            btn_play.anchor.set(0.5);
            // btn_play.scale.set(MQ.configs.SCALE);
            testMaskInstalled.addChild(btn_play);
            testMaskInstalled.addChild(nameFriendInstalled);
            this.grapFriendInstalled.addChild(testMaskInstalled);
            this.testMaskInstalled += testMaskInstalled.height;
            let idFriend = MQ.installed_friend[i].id;
            btn_play.events.onInputDown.add(() => {
                // MQ.button_sound.play();
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
                }, 500, "Linear");
                tween_challPlaylist.start();
            });
            this.grapFriendInstalled.addChild(testMaskInstalled);
            this.findgameGroup.add(this.grapFriendInstalled);
        }
    }
}