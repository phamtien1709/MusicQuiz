var menuState = {
    preload: function () {
        MQ.game.load.image('tab-friend', 'img/assets/tab-friend.png');
        for (i = 0; i < MQ.installed_friend.length; i++) {
            MQ.game.load.image(`'friend${i}'`, `https://graph.facebook.com/${MQ.installed_friend[i].id}/picture?width=150`);
        };
        if (MQ.responseChallen !== undefined) {
            for (i = 0; i < MQ.responseChallen.length; i++) {
                // console.log(MQ.responseChallen[i].from.id);
                MQ.game.load.image(`'friend${MQ.installed_friend.length + i}'`, `https://graph.facebook.com/${MQ.responseChallen[i].from.id}/picture?width=${Math.floor(150 * MQ.configs.SCALE)}`)
            }
        }
    },
    create: function () {
        // variable
        showConsole('Menu Screen');
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
        MQ.game.load.onLoadStart.add(this.loadStart, this);
        MQ.game.load.onFileComplete.add(this.fileComplete, this);
        MQ.game.load.onLoadComplete.add(this.loadComplete, this);
        //
        // mask ava in front  of ava sprite 
        var maskAva = MQ.game.add.graphics(0, 0);
        maskAva.beginFill(0xffffff);
        maskAva.drawCircle(200 * MQ.configs.SCALE, 182 * MQ.configs.SCALE, 200 * MQ.configs.SCALE);
        maskAva.anchor.set(0.5);
        //fsf
        var ava = MQ.game.add.button(200 * MQ.configs.SCALE, 182 * MQ.configs.SCALE, 'ava_fb');
        ava.anchor.set(0.5);
        ava.scale.set(MQ.configs.SCALE);
        ava.mask = maskAva;
        //
        var nameFB = MQ.game.add.text(400 * MQ.configs.SCALE, 120 * MQ.configs.SCALE, `${MQ.nameFB}`, {
            font: `${105 / MQ.configs.DPR}px Roboto`,
            fill: "black",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        nameFB.anchor.set(0, 0.5);
        //reward 
        var heart = MQ.game.add.sprite(447 * MQ.configs.SCALE, 280 * MQ.configs.SCALE, 'heart');
        heart.anchor.set(0.5, 1);
        heart.scale.set(MQ.configs.SCALE);
        var diamond = MQ.game.add.sprite(647 * MQ.configs.SCALE, 280 * MQ.configs.SCALE, 'diamond');
        diamond.anchor.set(0, 1);
        diamond.scale.set(MQ.configs.SCALE);
        var ticket = MQ.game.add.sprite(855 * MQ.configs.SCALE, 280 * MQ.configs.SCALE, 'ticket');
        ticket.anchor.set(0.5, 1);
        ticket.scale.set(MQ.configs.SCALE);
        // text reward
        MQ.txt_heart = MQ.game.add.text(490 * MQ.configs.SCALE, 270 * MQ.configs.SCALE, `${MQ.heart}/20`, {
            font: `${45 / MQ.configs.DPR}px Roboto`,
            fill: "pink",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        MQ.txt_heart.anchor.set(0, 0.5);
        MQ.txt_diamond = MQ.game.add.text(700 * MQ.configs.SCALE, 270 * MQ.configs.SCALE, `${MQ.diamond}`, {
            font: `${45 / MQ.configs.DPR}px Roboto`,
            fill: "orange",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        MQ.txt_diamond.anchor.set(0, 0.5);
        MQ.txt_ticket = MQ.game.add.text(920 * MQ.configs.SCALE, 270 * MQ.configs.SCALE, `${MQ.ticket}`, {
            font: `${45 / MQ.configs.DPR}px Roboto`,
            fill: "green",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        MQ.txt_ticket.anchor.set(0, 0.5);
        //text turn
        var txt_yourTurn = MQ.game.add.text(110 * MQ.configs.SCALE, 810 * MQ.configs.SCALE, 'LƯỢT CỦA BẠN', {
            font: `${45 / MQ.configs.DPR}px Roboto`,
            fill: "#8a8a8a",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        txt_yourTurn.anchor.set(0, 0.5);
        var txt_theirTurn = MQ.game.add.text(110 * MQ.configs.SCALE, 1310 * MQ.configs.SCALE, 'CHỌN ĐỐI THỦ', {
            font: `${45 / MQ.configs.DPR}px Roboto`,
            fill: "#8a8a8a",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        txt_theirTurn.anchor.set(0, 0.5);
        //btn-invite
        MQ.btn_invite = MQ.game.add.button(930 * MQ.configs.SCALE, 800 * MQ.configs.SCALE, 'btn-invite');
        MQ.btn_invite.anchor.set(0.5);
        MQ.btn_invite.scale.set(MQ.configs.SCALE);
        MQ.btn_invite.events.onInputDown.add(() => {
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
        btn_next.scale.set(MQ.configs.SCALE - 0.1);
        btn_next.anchor.set(0.5);
        btn_next.kill();
        //btn playing
        var btn_playing = MQ.game.add.button(MQ.game.width / 3, MQ.game.height * (125 / 128), 'btn-playing');
        btn_playing.scale.set(MQ.configs.SCALE - 0.1);
        btn_playing.anchor.set(0.5);
        btn_playing.kill();
        //
        for (i = 0; i < MQ.installed_friend.length; i++) {
            // this.createTabFriennd();
            let testMaskInstalled = MQ.game.add.sprite(0, (i * 200) * (MQ.configs.SCALE), 'tab-friend');
            testMaskInstalled.scale.set(MQ.configs.SCALE);
            let friend_avaInstalled = MQ.game.add.sprite(150, 100, `'friend${i}'`);
            friend_avaInstalled.anchor.set(0.5);
            // friend_avaInstalled.scale.set(MQ.configs.SCALE);
            testMaskInstalled.addChild(friend_avaInstalled);
            let nameFriendInstalled = MQ.game.add.text(300, 100, `${MQ.installed_friend[i].name}`, {
                font: `${105 / MQ.configs.DPR}px Roboto`,
                fill: "black",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            nameFriendInstalled.anchor.set(0, 0.5);
            // console.log(nameFriendInstalled);
            let btn_play = MQ.game.add.button(950, 100, 'btn-playing');
            btn_play.anchor.set(0.5);
            // btn_play.scale.set(MQ.configs.SCALE);
            testMaskInstalled.addChild(btn_play);
            testMaskInstalled.addChild(nameFriendInstalled);
            MQ.grapInstalled.addChild(testMaskInstalled);
            MQ.testMaskInstalled += testMaskInstalled.height;
            let idFriend = MQ.installed_friend[i].id;
            btn_play.events.onInputDown.add(() => {
                btn_play.input.enabled = false;
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
        }
        // MQ.grapInstalled.kill();
        MQ.grap.kill();
        //////////
        MQ.grapInstalled.mask = MQ.scrollMaskPoke;
        MQ.grapChallenge.mask = MQ.scrollMaskChall;
        //TEST TODO
        // console.log(MQ.responseChallen);
        //
        btn_playing.events.onInputDown.add(() => {

        });
        // challenged
        // try to catch more friend challenge
        if (MQ.responseChallen !== undefined) {
            for (i = 0; i < MQ.responseChallen.length; i++) {
                let testMaskChallenge = MQ.game.add.sprite(0, i * 200, 'tab-friend');
                // testMaskChallenge.scale.set(MQ.configs.SCALE);
                let friend_avaChallenge = MQ.game.add.sprite(150 * MQ.configs.SCALE, 50 * MQ.configs.SCALE, `'friend${MQ.installed_friend.length + i}'`);
                friend_avaChallenge.anchor.set(0.5);
                friend_avaChallenge.scale.set(MQ.configs.SCALE);
                // friend_avaChallenge.scale.set(1/MQ.configs.SCALE);
                testMaskChallenge.addChild(friend_avaChallenge);
                let nameFriendChallenge = MQ.game.add.text(300 * MQ.configs.SCALE, 50 * MQ.configs.SCALE, `${MQ.responseChallen[i].from.name}`, {
                    font: `${40 / MQ.configs.DPR}px Roboto`,
                    fill: "black",
                    boundsAlignH: "center",
                    boundsAlignV: "middle"
                });
                nameFriendChallenge.anchor.set(0, 0.5);
                testMaskChallenge.addChild(nameFriendChallenge);
                let btn_play = MQ.game.add.button(950 * MQ.configs.SCALE, 50 * MQ.configs.SCALE, 'btn-play');
                btn_play.anchor.set(0.5);
                btn_play.scale.set(MQ.configs.SCALE);
                testMaskChallenge.addChild(btn_play);
                let textScore = MQ.game.add.text(700 * MQ.configs.SCALE, 50 * MQ.configs.SCALE, `${MQ.responseChallen[i].data.scoreTheir} : ${MQ.responseChallen[i].data.scoreYour}`, {
                    font: `${40 / MQ.configs.DPR}px Roboto`,
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
                    btn_play.input.enabled = false;
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
        btn_findgame.scale.set(MQ.configs.SCALE);
        // btn_findgame.alpha = 0.5;
        var btn_party = MQ.game.add.button(540 * MQ.configs.SCALE, 555 * MQ.configs.SCALE, 'btn-party');
        btn_party.anchor.set(0.5);
        btn_party.scale.set(MQ.configs.SCALE)
        // btn_party.alpha = 0.5;
        var btn_practice = MQ.game.add.button(890 * MQ.configs.SCALE, 555 * MQ.configs.SCALE, 'btn-practice');
        btn_practice.anchor.set(0.5);
        btn_practice.scale.set(MQ.configs.SCALE);
        // btn_practice.alpha = 0.5;
        var btn_noti = MQ.game.add.button((1080 - 50) * MQ.configs.SCALE, 50 * MQ.configs.SCALE, 'btn-noti');
        btn_noti.anchor.set(0.5);
        btn_noti.scale.set(MQ.configs.SCALE);
        var btn_setting = MQ.game.add.button(50 * MQ.configs.SCALE, 50 * MQ.configs.SCALE, 'btn-setting');
        btn_setting.anchor.set(0.5);
        btn_setting.scale.set(MQ.configs.SCALE);
        // screen dim
        MQ.screen_dim = MQ.game.add.sprite(0, 0, 'screen-dim');
        MQ.screen_dim.width = MQ.game.width;
        MQ.screen_dim.height = MQ.game.height;
        MQ.screen_dim.kill();
        var popup_profile = MQ.game.add.sprite(200 * MQ.configs.SCALE, 182 * MQ.configs.SCALE, 'popup-profile');
        popup_profile.anchor.set(0.5);
        popup_profile.scale.set(0);
        // loadState.loadAvatarFb();
        ava.events.onInputDown.add(() => {
            MQ.screen_dim.revive();
            var tweenScale = MQ.game.add.tween(popup_profile.scale).to({ x: MQ.configs.SCALE, y: MQ.configs.SCALE }, 100, Phaser.Easing.Linear.None);
            var tweenPos = MQ.game.add.tween(popup_profile).to({ x: MQ.game.world.centerX, y: MQ.game.height / 3 }, 100, Phaser.Easing.Linear.None);
            tweenPos.start();
            tweenScale.start();
        });
        // practice btn input
        btn_practice.events.onInputDown.add(() => {
            if (MQ.heart > 0) {
                getSongToPractice(() => {
                    MQ.practiceMode = true;
                    this.startLoad();
                    subHeartOnPractice();
                    // MQ.game.state.start('practice');
                });
            } else {
                alert('Not enough heart! Wait for 3 minutes.');
            }
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
        MQ.game.load.start();
    },
    loadStart: function () {
        showConsole('Loading...');
    },
    fileComplete: function (progress, cacheKey, success, totalLoaded, totalFiles) {
        showConsole(`File Complete: ${progress}% - ${totalLoaded} out of ${totalFiles}`);
    },
    loadComplete: function () {
        // showConsole('Load Song Complete');
        // console.log('Load complete');
        if (!MQ.loadVar) {
            MQ.loadVar = true;
            if (MQ.practiceMode) {
                MQ.game.state.start('practice');
            } else {
                MQ.game.state.start('play');
            }
            // MQ.game.load.stop();
        }
        // MQ.game.state.start('play');
    }
}