var menuState = {
    preload: function () {
        this.game.sound.context.resume();
        MQ.game.load.onLoadStart.removeAll();
        MQ.game.load.onFileComplete.removeAll();
        MQ.game.load.onLoadComplete.removeAll();
        //bg loading
        this.game.stage.background = MQ.game.add.sprite(0, 0, 'bg-load');
        for (i = 0; i < MQ.botChallenges.length; i++) {
            MQ.game.load.image(`bot${i}`, `${MQ.botChallenges[i].avaUrl}`);
            MQ.game.load.image(`bot-menu${i}`, `${MQ.botChallenges[i].avaMenu}`);
            MQ.game.load.image(`bot-mini${i}`, `${MQ.botChallenges[i].avaMini}`);
        }
        if (MQ.loadFirst == undefined) {
            MQ.game.load.image('tab-friend', 'img/assets/tab-friend.png');
            for (i = 0; i < MQ.installed_friend.length; i++) {
                MQ.game.load.image(`'friend${i}'`, `https://graph.facebook.com/${MQ.installed_friend[i].id}/picture?width=120`);
            };
            if (MQ.responseChallen !== undefined) {
                for (i = 0; i < MQ.responseChallen.length; i++) {
                    MQ.game.load.image(`'friend${MQ.installed_friend.length + i}'`, `https://graph.facebook.com/${MQ.responseChallen[i].from.id}/picture?width=120`);
                }
            }
        }
    },
    create: function () {
        // variable
        MQ.idFriendChallenge = 0;
        MQ.nameFriendChallenge = "";
        MQ.songChoiced = [];
        MQ.isChallenged = false;
        MQ.practiceMode = false;
        MQ.isBotMode = false;
        MQ.songRandomChoiced = [];
        MQ.countQuiz = 0;
        MQ.indexSongChoiced = [];
        //load
        MQ.loadVar = false;
        //bg
        var bg = MQ.game.add.sprite(0, 0, 'bg-menu');
        bg.width = MQ.game.width;
        bg.height = MQ.game.height;
        var line_top = MQ.game.add.sprite(0, 0, 'line-top');
        // line_top.anchor()
        menuState.load.onLoadStart.add(this.loadStart, this);
        menuState.load.onFileComplete.add(this.fileComplete, this);
        menuState.load.onLoadComplete.add(this.loadComplete, this);
        //

        // TODO: SCROLL MASK
        MQ.grapBotChallenge = MQ.game.add.group();
        MQ.grapBotChallenge.y = 135;
        // });
        MQ.testMaskChallenge = 0;
        MQ.testMask = 0;
        MQ.testMaskInstalled = 0;
        //TEST TODO: friend challenges
        // console.log(MQ.responseChallen);
        //
        // try to catch more friend challenge FIXME:
        for (i = 0; i < MQ.botChallenges.length; i++) {
            let testMaskChallenge = MQ.game.add.sprite(0, i * 180, 'tab-friend');
            // testMaskChallenge.scale.set(MQ.configs.SCALE);
            let friend_avaChallenge = MQ.game.add.sprite(125, 90, `bot-menu${i}`);
            friend_avaChallenge.anchor.set(0.5);
            testMaskChallenge.addChild(friend_avaChallenge);
            let nameFriendChallenge = MQ.game.add.text(220, 90, `${MQ.botChallenges[i].name}`, {
                font: `40px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            nameFriendChallenge.anchor.set(0, 0.5);
            testMaskChallenge.addChild(nameFriendChallenge);
            let btn_play = MQ.game.add.button(933, 90, 'btn-accept');
            btn_play.anchor.set(0.5);
            // btn_play.scale.set(MQ.configs.SCALE);
            testMaskChallenge.addChild(btn_play);
            let textScore = MQ.game.add.text(670, 90, `${MQ.botChallenges[i].scoreTheir} : ${MQ.botChallenges[i].scoreYour}`, {
                font: `40px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            btn_play.value = {
                "value": i,
                "data": MQ.botChallenges[i]
            };
            textScore.anchor.set(0, 0.5);
            testMaskChallenge.addChild(textScore);
            // var indexOfData = i;
            btn_play.events.onInputDown.add(() => {
                // console.log(friend_avaChallenge);
                MQ.botKey = friend_avaChallenge.key.slice(-1);
                MQ.button_sound.play();
                MQ.isBotMode = true;
                MQ.nameFriendChallenge = btn_play.value.data.name;
                MQ.nameOfPlaylist = 'Nhạc trẻ 2017';
                // MQ.linkDB = btn_play.value.linkDB;
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
                MQ.dataChooseToChall = MQ.botChallenges[btn_play.value.value];
                var findData = MQ.data.filter(data => data.nameData == "new2017Data");
                MQ.dataChoosed = findData[0].data;
                getSongToBotChallenge(MQ.dataChoosed, () => {
                    getSongToBotChallenge(MQ.dataChoosed, () => {
                        getSongToBotChallenge(MQ.dataChoosed, () => {
                            getSongToBotChallenge(MQ.dataChoosed, () => {
                                getSongToBotChallenge(MQ.dataChoosed, () => {
                                    // this.startLoad();
                                    this.startLoad();
                                })
                            })
                        })
                    })
                });
            });
            MQ.testMaskChallenge += testMaskChallenge.height;
            MQ.grapBotChallenge.addChild(testMaskChallenge);
        }
        MQ.grapChallenge = MQ.game.add.group();
        MQ.grapChallenge.y = MQ.grapBotChallenge.y + MQ.grapBotChallenge.height;
        // challenged
        // try to catch more friend challenge
        if (MQ.responseChallen !== undefined) {
            for (i = 0; i < MQ.responseChallen.length; i++) {
                let testMaskChallenge = MQ.game.add.sprite(0, i * 180, 'tab-friend');
                // testMaskChallenge.scale.set(MQ.configs.SCALE);
                let maskAvaFriendChallen = MQ.game.add.graphics(0, 0);
                maskAvaFriendChallen.beginFill(0xffffff);
                maskAvaFriendChallen.drawCircle(125, 90, 120);
                maskAvaFriendChallen.anchor.set(0.5);
                testMaskChallenge.addChild(maskAvaFriendChallen);
                let friend_avaChallenge = MQ.game.add.sprite(125, 90, `'friend${MQ.installed_friend.length + i}'`);
                friend_avaChallenge.anchor.set(0.5);
                friend_avaChallenge.mask = maskAvaFriendChallen;
                testMaskChallenge.addChild(friend_avaChallenge);
                let nameFriendChallenge = MQ.game.add.text(220, 90, `${MQ.responseChallen[i].from.name}`, {
                    font: `40px Roboto`,
                    fill: "white",
                    boundsAlignH: "center",
                    boundsAlignV: "middle",
                    fontWeight: 400
                });
                nameFriendChallenge.anchor.set(0, 0.5);
                testMaskChallenge.addChild(nameFriendChallenge);
                let btn_play = MQ.game.add.button(933, 90, 'btn-accept');
                btn_play.anchor.set(0.5);
                // btn_play.scale.set(MQ.configs.SCALE);
                testMaskChallenge.addChild(btn_play);
                let textScore = MQ.game.add.text(670, 90, `${MQ.responseChallen[i].data.scoreTheir} : ${MQ.responseChallen[i].data.scoreYour}`, {
                    font: `40px Roboto`,
                    fill: "white",
                    boundsAlignH: "center",
                    boundsAlignV: "middle",
                    fontWeight: 400
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
                    MQ.button_sound.play();
                    // btn_play.input.enabled = false;
                    MQ.idFriendChallenge = btn_play.value.data.from.id;
                    MQ.nameFriendChallenge = btn_play.value.data.from.name;
                    MQ.nameOfPlaylist = 'Nhạc trẻ 2017';
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
                    var findData = MQ.data.filter(data => data.nameData == "new2017Data")
                    // MQ.sound.stop();
                    // console.log(findData);
                    MQ.dataChoosed = findData[0].data;
                    getSongToChallenge(MQ.dataChoosed, () => {
                        getSongToChallenge(MQ.dataChoosed, () => {
                            getSongToChallenge(MQ.dataChoosed, () => {
                                getSongToChallenge(MQ.dataChoosed, () => {
                                    getSongToChallenge(MQ.dataChoosed, () => {
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
        //test poke challenge
        //TODO: scroll menu
        this.scrollMaskMenu = MQ.game.add.graphics(0, 680);
        this.scrollMaskMenu.beginFill(0x190d35);
        this.scrollMaskMenu.drawRect(0, 0, MQ.game.width, 1000);
        this.scrollMaskMenu.endFill();
        MQ.grapMenu = MQ.game.add.graphics(0, 680);
        MQ.grapMenu.drawRect(0, 0, MQ.game.width, 1000);
        MQ.grapMenu.inputEnabled = true;
        MQ.grapMenu.input.enableDrag();
        MQ.grapMenu.input.allowHorizontalDrag = false;
        MQ.grapMenu.events.onDragStop.add(() => {
            // console.log(MQ.grapMenu.position.y);
            // console.log(-680 +132 + MQ.grapBotChallenge.y + MQ.grapBotChallenge.height + MQ.grapChallenge.height);
            if (MQ.grapMenu.position.y > 680) {
                var tweenGrapMenu = MQ.game.add.tween(MQ.grapMenu).to({ y: 680 }, 250, "Linear");
                tweenGrapMenu.start();
            }
            if (MQ.grapMenu.position.y < -(-1600 + 132 + MQ.grapBotChallenge.y + MQ.grapBotChallenge.height + MQ.grapChallenge.height)) {
                var tweenGrapMenu = MQ.game.add.tween(MQ.grapMenu).to({ y: -(-1600 + 132 + MQ.grapBotChallenge.y + MQ.grapBotChallenge.height + MQ.grapChallenge.height) }, 250, "Linear");
                tweenGrapMenu.start();
            }
        });
        // this is state playlist after challenge into menu
        //
        MQ.grapMenu.mask = this.scrollMaskMenu;
        //text turn
        var txt_yourTurn = MQ.game.add.text(60, 86, 'Lượt của bạn', {
            font: `45px Roboto`,
            fill: "#8a8a8a",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        txt_yourTurn.anchor.set(0, 0.5);
        var line_under_yourTurn = MQ.game.add.sprite(MQ.game.world.centerX, 132, 'line-under');
        line_under_yourTurn.anchor.set(0.5);
        var txt_theirTurn = MQ.game.add.text(60, 86 + MQ.grapBotChallenge.y + MQ.grapBotChallenge.height + MQ.grapChallenge.height, 'Lượt của đối thủ', {
            font: `45px Roboto`,
            fill: "#8a8a8a",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        var line_under_theirTurn = MQ.game.add.sprite(MQ.game.world.centerX, 132 + MQ.grapBotChallenge.y + MQ.grapBotChallenge.height + MQ.grapChallenge.height, 'line-under');
        line_under_theirTurn.anchor.set(0.5);
        txt_theirTurn.anchor.set(0, 0.5);
        MQ.grapMenu.addChild(txt_yourTurn);
        MQ.grapMenu.addChild(line_under_yourTurn);
        MQ.grapMenu.addChild(txt_theirTurn);
        MQ.grapMenu.addChild(line_under_theirTurn);
        MQ.grapMenu.addChild(MQ.grapBotChallenge);
        MQ.grapMenu.addChild(MQ.grapChallenge);
        // mask ava in front  of ava sprite 
        var maskAva = MQ.game.add.graphics(0, 0);
        maskAva.beginFill(0xffffff);
        maskAva.drawCircle(179, 190, 241);
        maskAva.anchor.set(0.5);
        //fsf
        var ava = MQ.game.add.button(179, 190, 'ava_fb');
        ava.anchor.set(0.5);
        // ava.scale.set(MQ.configs.SCALE);
        ava.mask = maskAva;
        //
        var nameFB = MQ.game.add.text(340, 122, `${MQ.nameFB}`, {
            font: `80px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        nameFB.anchor.set(0, 0.5);
        //level
        var u_level = MQ.game.add.text(340, 200, 'LV 1 - Tập sự', {
            font: `45px Roboto`,
            fill: "orange",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        u_level.anchor.set(0, 0.5);
        u_level.addColor("#ffffff", 6);
        //reward 
        var heart = MQ.game.add.sprite(371, 280, 'heart');
        heart.anchor.set(0.5);
        // heart.scale.set(MQ.configs.SCALE);
        var diamond = MQ.game.add.button(650, 280, 'diamond');
        diamond.anchor.set(0.5);
        // diamond.scale.set(MQ.configs.SCALE);
        var ticket = MQ.game.add.sprite(874, 280, 'ticket');
        ticket.anchor.set(0.5);
        // ticket.scale.set(MQ.configs.SCALE);
        // text reward
        MQ.txt_heart = MQ.game.add.text(420, 280, `${MQ.heart}/20`, {
            font: `45px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        MQ.txt_heart.anchor.set(0, 0.5);
        MQ.txt_diamond = MQ.game.add.text(700, 280, `${MQ.diamond}`, {
            font: `45px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        MQ.txt_diamond.anchor.set(0, 0.5);
        MQ.txt_ticket = MQ.game.add.text(932, 280, `${MQ.ticket}`, {
            font: `45px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        MQ.txt_ticket.anchor.set(0, 0.5);
        // button TODO
        var btn_findgame = MQ.game.add.button(210, 518, 'btn-findgame');
        btn_findgame.anchor.set(0.5);
        // btn_findgame.scale.set(MQ.configs.SCALE);
        btn_findgame.events.onInputDown.add(() => {
            MQ.button_sound.play();
            var tween_findgame = MQ.game.add.tween(this.findgameGroup).to({
                x: 0
            }, 300, "Linear");
            tween_findgame.start();
        })
        // btn_findgame.alpha = 0.5;
        var btn_party = MQ.game.add.button(870, 518, 'btn-party');
        btn_party.anchor.set(0.5);
        btn_party.events.onInputDown.add(() => {
            MQ.button_sound.play();
            this.createArtStylePopupParty();
        });
        var btn_practice = MQ.game.add.button(540, 518, 'btn-practice');
        btn_practice.anchor.set(0.5);
        ava.events.onInputDown.add(() => {
            MQ.button_sound.play();
        });
        // practice btn input
        btn_practice.events.onInputDown.add(() => {
            MQ.button_sound.play();
            btn_practice.inputEnabled = false;
            btn_findgame.inputEnabled = false;
            btn_party.inputEnabled = false;
            screen_dim_popup.revive();
            this.popupPlaylist.revive();
        });
        //
        this.createMailDisplay();
        this.createShopDisplay();
        this.createSettingDisplay();
        diamond.events.onInputDown.add(() => {
            MQ.button_sound.play();
            btn_setting.revive();
            btn_setting_active.kill();
            btn_home.revive();
            btn_home_active.kill();
            btn_mail.revive();
            btn_mail_active.kill();
            btn_shop.kill();
            btn_shop_active.revive();
            //tween all grap
            MQ.game.add.tween(this.mailGroup).to({ x: MQ.game.width }, 300, "Linear", true);
            MQ.game.add.tween(this.shopGroup).to({ x: 0 }, 300, "Linear", true);
            MQ.game.add.tween(this.settingGroup).to({ x: MQ.game.width }, 300, "Linear", true);
        });
        // console.log(this.mailGroup);
        //
        // FIXME: menu_BG
        var bot_shadow = MQ.game.add.sprite(MQ.game.world.centerX, 1756, 'bot-shadow');
        bot_shadow.anchor.set(0.5);
        var menu_BG = MQ.game.add.button(MQ.game.world.centerX, 1815, 'menu-bg');
        menu_BG.anchor.set(0.5);
        var btn_mail = MQ.game.add.button(3 / 8 * MQ.game.width - MQ.game.width / 2, 0, 'btn-mail');
        btn_mail.anchor.set(0.5);
        var btn_mail_active = MQ.game.add.button(3 / 8 * MQ.game.width - MQ.game.width / 2, 0, 'btn-mail-active');
        btn_mail_active.anchor.set(0.5);
        // btn_noti.scale.set(MQ.configs.SCALE);
        var btn_setting = MQ.game.add.button(3 / 8 * MQ.game.width, 0, 'btn-setting');
        btn_setting.anchor.set(0.5);
        var btn_setting_active = MQ.game.add.button(3 / 8 * MQ.game.width, 0, 'btn-setting-active');
        btn_setting_active.anchor.set(0.5);
        var btn_home = MQ.game.add.button(1 / 8 * MQ.game.width - MQ.game.width / 2, 0, 'btn-home');
        btn_home.anchor.set(0.5);
        var btn_home_active = MQ.game.add.button(1 / 8 * MQ.game.width - MQ.game.width / 2, 0, 'btn-home-active');
        btn_home_active.anchor.set(0.5);
        var btn_shop = MQ.game.add.button(1 / 8 * MQ.game.width, 0, 'btn-shop');
        btn_shop.anchor.set(0.5);
        var btn_shop_active = MQ.game.add.button(1 / 8 * MQ.game.width, 0, 'btn-shop-active');
        btn_shop_active.anchor.set(0.5);
        menu_BG.addChild(btn_home);
        menu_BG.addChild(btn_mail);
        menu_BG.addChild(btn_setting);
        menu_BG.addChild(btn_shop);
        menu_BG.addChild(btn_home_active);
        menu_BG.addChild(btn_mail_active);
        menu_BG.addChild(btn_setting_active);
        menu_BG.addChild(btn_shop_active);
        //first menu
        btn_home.kill();
        btn_mail_active.kill();
        btn_shop_active.kill();
        btn_setting_active.kill();
        //dissactive
        btn_mail.events.onInputDown.add(() => {
            MQ.button_sound.play();
            btn_mail.kill();
            btn_mail_active.revive();
            btn_home.revive();
            btn_home_active.kill();
            btn_setting.revive();
            btn_setting_active.kill();
            btn_shop.revive();
            btn_shop_active.kill();
            //tween all grap
            MQ.game.add.tween(this.mailGroup).to({ x: 0 }, 100, "Linear", true);
            MQ.game.add.tween(this.shopGroup).to({ x: MQ.game.width }, 100, "Linear", true);
            MQ.game.add.tween(this.settingGroup).to({ x: MQ.game.width }, 100, "Linear", true);
        });
        btn_setting.events.onInputDown.add(() => {
            MQ.button_sound.play();
            btn_setting.kill();
            btn_setting_active.revive();
            btn_home.revive();
            btn_home_active.kill();
            btn_mail.revive();
            btn_mail_active.kill();
            btn_shop.revive();
            btn_shop_active.kill();
            //tween all grap
            MQ.game.add.tween(this.mailGroup).to({ x: MQ.game.width }, 100, "Linear", true);
            MQ.game.add.tween(this.shopGroup).to({ x: MQ.game.width }, 100, "Linear", true);
            MQ.game.add.tween(this.settingGroup).to({ x: 0 }, 100, "Linear", true);
        });
        btn_shop.events.onInputDown.add(() => {
            MQ.button_sound.play();
            btn_setting.revive();
            btn_setting_active.kill();
            btn_home.revive();
            btn_home_active.kill();
            btn_mail.revive();
            btn_mail_active.kill();
            btn_shop.kill();
            btn_shop_active.revive();
            //tween all grap
            MQ.game.add.tween(this.mailGroup).to({ x: MQ.game.width }, 100, "Linear", true);
            MQ.game.add.tween(this.shopGroup).to({ x: 0 }, 100, "Linear", true);
            MQ.game.add.tween(this.settingGroup).to({ x: MQ.game.width }, 100, "Linear", true);
        });
        btn_home.events.onInputDown.add(() => {
            MQ.button_sound.play();
            btn_setting.revive();
            btn_setting_active.kill();
            btn_home.kill();
            btn_home_active.revive();
            btn_mail.revive();
            btn_mail_active.kill();
            btn_shop.revive();
            btn_shop_active.kill();
            //tween all grap
            MQ.game.add.tween(this.mailGroup).to({ x: MQ.game.width }, 100, "Linear", true);
            MQ.game.add.tween(this.shopGroup).to({ x: MQ.game.width }, 100, "Linear", true);
            MQ.game.add.tween(this.settingGroup).to({ x: MQ.game.width }, 100, "Linear", true);
        });
        //active
        btn_mail_active.events.onInputDown.add(() => {
            MQ.button_sound.play();
            btn_mail.kill();
            btn_mail_active.revive();
            btn_home.revive();
            btn_home_active.kill();
            btn_setting.revive();
            btn_setting_active.kill();
            btn_shop.revive();
            btn_shop_active.kill();
        });
        btn_setting_active.events.onInputDown.add(() => {
            MQ.button_sound.play();
            btn_setting.kill();
            btn_setting_active.revive();
            btn_home.revive();
            btn_home_active.kill();
            btn_mail.revive();
            btn_mail_active.kill();
            btn_shop.revive();
            btn_shop_active.kill();
        });
        btn_shop_active.events.onInputDown.add(() => {
            MQ.button_sound.play();
            btn_setting.revive();
            btn_setting_active.kill();
            btn_home.revive();
            btn_home_active.kill();
            btn_mail.revive();
            btn_mail_active.kill();
            btn_shop.kill();
            btn_shop_active.revive();
        });
        btn_home_active.events.onInputDown.add(() => {
            MQ.button_sound.play();
            btn_setting.revive();
            btn_setting_active.kill();
            btn_home.kill();
            btn_home_active.revive();
            btn_mail.revive();
            btn_mail_active.kill();
            btn_shop.revive();
            btn_shop_active.kill();
        });
        // FIXME:popup popup
        var screen_dim_popup = MQ.game.add.sprite(0, 0, 'screen-dim');
        screen_dim_popup.alpha = 0.7;
        screen_dim_popup.kill();
        this.popupPlaylist = MQ.game.add.sprite(MQ.game.world.centerX, MQ.game.world.centerY, 'popup-playlist');
        this.popupPlaylist.anchor.set(0.5);
        for (playList in MQ.playListFree) {
            this.createButtonPlaylist(playList, MQ.playListFree[playList]);
        }
        var btn_x = MQ.game.add.button(this.popupPlaylist.width / 2 - 25, -this.popupPlaylist.height / 2 + 15, 'x-button');
        btn_x.anchor.set(0.5);
        btn_x.events.onInputDown.add(() => {
            screen_dim_popup.kill();
            MQ.button_sound.play();
            btn_practice.inputEnabled = true;
            btn_findgame.inputEnabled = true;
            btn_party.inputEnabled = true;
            this.popupPlaylist.kill();
        });
        this.popupPlaylist.addChild(btn_x);
        this.popupPlaylist.kill();
        //
        //
        this.createFindgameGroup();
        this.createChallPlaylistGroup();
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
        menuState.load.start();
    },
    loadStart: function () {
        // showConsole('Loading...');
    },
    fileComplete: function (progress, cacheKey, success, totalLoaded, totalFiles) {

    },
    loadComplete: function () {
        // console.log('done');
        if (!MQ.loadVar) {
            MQ.loadVar = true;
            if (MQ.practiceMode) {
                // console.log('run prac');
                MQ.game.state.start('practice');
            } else {
                // console.log('run play');
                MQ.game.state.start('play');
            }
        }
    },
    createButtonPlaylist(index, namePlaylist) {
        if (index % 2 == 0) {
            if (index == 0) {
                var spritePlaylist = MQ.game.add.button(-232, -47, `playlist-${index}`);
                spritePlaylist.anchor.set(0.5);
                spritePlaylist.value = namePlaylist.namePlaylist;
                this.popupPlaylist.addChild(spritePlaylist);
                let icon_rank = MQ.game.add.sprite(160, -58, 'icon-rank');
                icon_rank.anchor.set(0.5)
                spritePlaylist.addChild(icon_rank);
                spritePlaylist.events.onInputDown.add(() => {
                    MQ.button_sound.play();
                    var findData = MQ.data.filter(data => data.nameData == spritePlaylist.value);
                    MQ.dataChoosed = findData[0].data;
                    MQ.correctCount = 0;
                    MQ.firstCorrect = false;
                    getSongToPractice(MQ.dataChoosed, () => {
                        MQ.practiceMode = true;
                        this.startLoad();
                        subHeartOnPractice();
                    });
                })
            }
            if (index == 2) {
                var spritePlaylist = MQ.game.add.button(-232, 222, `playlist-${index}`);
                spritePlaylist.anchor.set(0.5);
                spritePlaylist.value = namePlaylist.namePlaylist;
                this.popupPlaylist.addChild(spritePlaylist);
                let icon_lock = MQ.game.add.sprite(160, 58, 'icon-lock');
                icon_lock.anchor.set(0.5)
                spritePlaylist.addChild(icon_lock);
            }
        } else {
            if (index == 1) {
                var spritePlaylist = MQ.game.add.button(232, -47, `playlist-${index}`);
                spritePlaylist.anchor.set(0.5);
                spritePlaylist.value = namePlaylist.namePlaylist;
                this.popupPlaylist.addChild(spritePlaylist);
                let icon_lock = MQ.game.add.sprite(160, 58, 'icon-lock');
                icon_lock.anchor.set(0.5)
                spritePlaylist.addChild(icon_lock);
            }
            if (index == 3) {
                var spritePlaylist = MQ.game.add.button(232, 222, `playlist-${index}`);
                spritePlaylist.anchor.set(0.5);
                spritePlaylist.value = namePlaylist.namePlaylist;
                this.popupPlaylist.addChild(spritePlaylist);
                let icon_lock = MQ.game.add.sprite(160, 58, 'icon-lock');
                icon_lock.anchor.set(0.5)
                spritePlaylist.addChild(icon_lock);
            }
        }
    },
    createFindgameGroup() {
        this.findgameGroup = MQ.game.add.group();
        this.findgameGroup.position.x = -MQ.game.width;
        const bg_findgame = MQ.game.add.button(0, 0, 'bg-playlist');
        // bg_findgame.scale.set(MQ.configs.SCALE);
        this.findgameGroup.add(bg_findgame);
        //btn-invite
        MQ.btn_invite = MQ.game.add.button(1020, 270, 'btn-invite');
        MQ.btn_invite.anchor.set(1, 0.5);
        // MQ.btn_invite.scale.set(MQ.configs.SCALE);
        MQ.btn_invite.events.onInputDown.add(() => {
            MQ.button_sound.play();
            FB.ui({
                method: 'apprequests',
                message: 'Come and play MusicQuiz with me!'
            }, (response) => {
                console.log(response);
            })
        });
        this.findgameGroup.add(MQ.btn_invite);
        const txt_chooseCompetitor = MQ.game.add.text(60, 270, 'CHỌN ĐỐI THỦ', {
            font: `45px Roboto`,
            fill: "#8a8a8a",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        this.findgameGroup.add(txt_chooseCompetitor);
        this.scrollMaskPoke = MQ.game.add.graphics(0, 400);
        this.scrollMaskPoke.beginFill();
        this.scrollMaskPoke.drawRect(0, 0, MQ.game.width, 1350);
        this.scrollMaskPoke.endFill();
        this.grapFriendInstalled = MQ.game.add.graphics(0, 400);
        this.grapFriendInstalled.drawRect(0, 0, MQ.game.width, 1350);
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
            maskAvaFriendInstall.drawCircle(120, 90, 120);
            maskAvaFriendInstall.anchor.set(0.5);
            testMaskInstalled.addChild(maskAvaFriendInstall);
            let friend_avaInstalled = MQ.game.add.sprite(120, 90, `'friend${i}'`);
            friend_avaInstalled.anchor.set(0.5);
            friend_avaInstalled.mask = maskAvaFriendInstall;
            // friend_avaInstalled.scale.set(MQ.configs.SCALE);
            testMaskInstalled.addChild(friend_avaInstalled);
            let nameFriendInstalled = MQ.game.add.text(220, 90, `${MQ.installed_friend[i].name}`, {
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
        this.grapBotToChall = MQ.game.add.group();
        this.grapBotToChall.y = this.grapFriendInstalled.y + this.grapFriendInstalled.height;
        // for(i = 0; i < MQ.botChallenges.length; i++){
        //     let testMaskInstalled = MQ.game.add.sprite(0, (i * 190), 'tab-friend');
        //     let friend_avaInstalled = MQ.game.add.sprite(150, 90, `bot-menu${i}`);
        //     friend_avaInstalled.anchor.set(0.5);
        //     // friend_avaInstalled.scale.set(MQ.configs.SCALE);
        //     testMaskInstalled.addChild(friend_avaInstalled);
        //     let nameFriendInstalled = MQ.game.add.text(300, 90, `${MQ.botChallenges[i].name}`, {
        //         font: `45px Roboto`,
        //         fill: "white",
        //         boundsAlignH: "center",
        //         boundsAlignV: "middle",
        //         fontWeight: 400
        //     });
        //     nameFriendInstalled.anchor.set(0, 0.5);
        //     // nameFriendInstalled.scale.set(1 / MQ.configs.SCALE);
        //     // console.log(nameFriendInstalled);
        //     let btn_play = MQ.game.add.button(950, 90, 'btn-playing');
        //     btn_play.anchor.set(0.5);
        //     // btn_play.scale.set(MQ.configs.SCALE);
        //     testMaskInstalled.addChild(btn_play);
        //     testMaskInstalled.addChild(nameFriendInstalled);
        //     this.testMaskInstalled += testMaskInstalled.height;
        //     let idFriend = MQ.installed_friend[i].id;
        //     btn_play.events.onInputDown.add(() => {
        //         MQ.button_sound.play();
        //         MQ.score = 0;
        //         MQ.correctList = [];
        //         MQ.wrongList = [];
        //         MQ.songChoicedList = [];
        //         MQ.songRandomChoicedList = [];
        //         MQ.botKey = friend_avaInstalled.key.slice(-1);
        //         MQ.isBotMode = true;
        //         MQ.streak = 1;
        //         MQ.timeAnswerSaveToDataAndScore = {
        //             "time": [],
        //             "score": 0
        //         };
        //         MQ.idFriendChallenge = idFriend;
        //         MQ.nameFriendChallenge = nameFriendInstalled._text;
        //         var tween_challPlaylist = MQ.game.add.tween(this.challPlaylistGroup).to({
        //             x: 0
        //         }, 300, "Linear");
        //         tween_challPlaylist.start();
        //     });
            // this.grapBotToChall.addChild(testMaskInstalled);
        // }
        this.grapFriendInstalled.addChild(this.grapBotToChall);
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
                fontWeight: 700
            });
        // txt_chonplaylist.scale.set(1 / MQ.configs.SCALE);
        txt_chonplaylist.anchor.set(0.5);
        tab_chonplaylist.addChild(txt_chonplaylist);
        const arrow_chonplaylist = MQ.game.add.button(-(540 - 74), 87, 'arrow-playlist');
        arrow_chonplaylist.anchor.set(0.5);
        tab_chonplaylist.addChild(arrow_chonplaylist);
        arrow_chonplaylist.events.onInputDown.add(() => {
            MQ.button_sound.play();
            var tween_findgameReturn = MQ.game.add.tween(this.findgameGroup).to({
                x: -MQ.game.width
            }, 300, "Linear");
            tween_findgameReturn.start();
        });
    },
    createArtStylePopupParty() {
        this.artPartyGroup = MQ.game.add.group();
        var screen_dim = MQ.game.add.button(0, 0, 'screen-dim');
        // screen_dim.alpha = 1;
        this.artPartyGroup.add(screen_dim);
        var artParty = MQ.game.add.sprite(0, 0, 'art-party');
        artParty.inputEnabled = true;
        artParty.input.enableDrag();
        artParty.input.allowHorizontalDrag = false;
        artParty.events.onDragUpdate.add(() => {
            if (artParty.position.y > 0) {
                // console.log('<=0');
                artParty.input.disableDrag();
                artParty.position.y = 0;
                artParty.input.enableDrag();
            }
            if (artParty.position.y < -(artParty.height - 1920)) {
                // console.log('>=1920');
                artParty.input.disableDrag();
                artParty.position.y = -(artParty.height - 1920);
                artParty.input.enableDrag();
            }
        });
        var header_party = MQ.game.add.sprite(0, 0, 'header-party');
        this.artPartyGroup.add(artParty);
        this.artPartyGroup.add(header_party);
        var btn = MQ.game.add.button(77, 87, 'arrow-playlist');
        btn.anchor.set(0.5);
        header_party.addChild(btn);
        btn.events.onInputDown.add(()=>{
            MQ.button_sound.play();
            this.artPartyGroup.destroy();
        });
    },
    createPlaylistDetail: function () {
        let img_playlist_detail = MQ.game.add.button(0, MQ.game.height, 'playlist-chitiet');
        img_playlist_detail.inputEnabled = true;
        img_playlist_detail.input.enableDrag();
        img_playlist_detail.input.allowHorizontalDrag = false;
        MQ.game.add.tween(img_playlist_detail).to({ y: 0 }, 500, "Linear", true);
        let btn_x = MQ.game.add.button(76.8, 86.5, 'arrow-playlist');
        btn_x.anchor.set(0.5);
        btn_x.events.onInputDown.add(() => {
            MQ.button_sound.play();
            let tween_playlist_detail = MQ.game.add.tween(img_playlist_detail).to({ x: -MQ.game.width }, 300, "Linear");
            tween_playlist_detail.start();
            tween_playlist_detail.onComplete.add(() => {
                img_playlist_detail.destroy();
            });
        });
        img_playlist_detail.addChild(btn_x);
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
                fontWeight: 700
            });
        // txt_chonplaylist.scale.set(1 / MQ.configs.SCALE);
        txt_chonplaylist.anchor.set(0.5);
        tab_chonplaylist.addChild(txt_chonplaylist);
        //74
        const arrow_chonplaylist = MQ.game.add.button(-(540 - 74), 87, 'arrow-playlist');
        arrow_chonplaylist.anchor.set(0.5);
        tab_chonplaylist.addChild(arrow_chonplaylist);
        arrow_chonplaylist.events.onInputDown.add(() => {
            MQ.button_sound.play();
            var tween_challPlaylistReturn = MQ.game.add.tween(this.challPlaylistGroup).to({
                x: -MQ.game.width
            }, 300, "Linear");
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
        const txt_change_playlist = MQ.game.add.text(-430, 0, 'THAY ĐỔI PLAYLIST', {
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
        const gem_change_playlist = MQ.game.add.sprite(419, -10, 'gem-playlist');
        gem_change_playlist.anchor.set(0.5);
        btn_change_playlist.addChild(gem_change_playlist);
        // end change btn plts
        // console.log(this.challPlaylistGroup);
        //1335
        const txt_type_playlist = MQ.game.add.text(60, 1335, 'Thể loại âm nhạc', {
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
            // console.log(MQ.listPlaylist[playlist].name);
            tab_playlist.events.onInputDown.add(() => {
                MQ.nameOfPlaylist = tab_playlist.nameOfPlaylist;
                MQ.button_sound.play();
                // MQ.sound.stop();
                MQ.scoreYour = 0;
                MQ.scoreTheir = 0;
                MQ.isChallenged = true;
                var findData = MQ.data.filter(data => data.nameData == `${tab_playlist.namePlaylist}`)
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
    createMailDisplay: function () {
        this.mailGroup = MQ.game.add.group();
        this.mailGroup.position.x = MQ.game.width;
        var bg = MQ.game.add.button(0, 0, 'bg-playlist');
        this.mailGroup.add(bg);
        var img_mail_hethong = MQ.game.add.sprite(MQ.game.width, 345,'hethong-mail');
        img_mail_hethong.inputEnabled = true;
        img_mail_hethong.input.enableDrag();
        img_mail_hethong.input.allowHorizontalDrag = false;
        img_mail_hethong.events.onDragStop.add(()=>{
            if(img_mail_hethong.position.y > 345){
                MQ.game.add.tween(img_mail_hethong).to({ y: 345 }, 250, "Linear", true);
            }
            if(img_mail_hethong.position.y < 0){
                MQ.game.add.tween(img_mail_hethong).to({ y: 0 }, 250, "Linear", true);
            }
        });
        this.mailGroup.add(img_mail_hethong);
        var img_mail_banbe = MQ.game.add.sprite(MQ.game.width, 345,'banbe-mail');
        img_mail_banbe.inputEnabled = true;
        img_mail_banbe.input.enableDrag();
        img_mail_banbe.input.allowHorizontalDrag = false;
        img_mail_banbe.events.onDragStop.add(()=>{
            if(img_mail_banbe.position.y > 345){
                MQ.game.add.tween(img_mail_banbe).to({ y: 345 }, 250, "Linear", true);
            }
            if(img_mail_banbe.position.y < 0){
                MQ.game.add.tween(img_mail_banbe).to({ y: 0 }, 250, "Linear", true);
            }
        });
        this.mailGroup.add(img_mail_banbe);
        var scrollMaskMess = MQ.game.add.graphics(0, 345);
        scrollMaskMess.beginFill();
        scrollMaskMess.drawRect(0, 0, MQ.game.width, 1360);
        scrollMaskMess.endFill();
        this.mailGroup.add(scrollMaskMess);
        var grapMess = MQ.game.add.graphics(0, 345);
        grapMess.drawRect(0, 0, MQ.game.width, 1360);
        grapMess.inputEnabled = true;
        grapMess.input.enableDrag();
        grapMess.input.allowHorizontalDrag = false;
        grapMess.mask = scrollMaskMess;
        grapMess.events.onDragStop.add(() => {
            if (grapMess.position.y > 345) {
                MQ.game.add.tween(grapMess).to({ y: 345 }, 250, "Linear", true);
            }
            if (grapMess.position.y < 0) {
                MQ.game.add.tween(grapMess).to({ y: 0 }, 250, "Linear", true);
            }
        });
        for (demo in MQ.mailDemo) {
            let tab_mess = MQ.game.add.sprite(MQ.game.width / 2, demo * 232, 'tab-mess-mail');
            tab_mess.anchor.set(0.5, 0);
            let avaDemo = MQ.game.add.sprite(-423, 113, `${MQ.mailDemo[demo].avaName}`);
            avaDemo.anchor.set(0.5);
            tab_mess.addChild(avaDemo);
            let name = MQ.game.add.text(-333, 93, `${MQ.mailDemo[demo].name}`, {
                font: `45px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 500
            });
            name.anchor.set(0, 0.5);
            tab_mess.addChild(name);
            let mess = MQ.game.add.text(-333, 140, `${MQ.mailDemo[demo].mess}`, {
                font: `35px Roboto`,
                fill: "#93909d",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            mess.anchor.set(0, 0.5);
            tab_mess.addChild(mess);
            let date = MQ.game.add.text(488, 84, `${MQ.mailDemo[demo].date}`, {
                font: `27px Roboto`,
                fill: "#9e47f3",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            date.anchor.set(1, 0.5);
            tab_mess.addChild(date);
            let line = MQ.game.add.sprite(0, 230, 'line-mail');
            line.anchor.set(0.5);
            tab_mess.addChild(line);
            grapMess.addChild(tab_mess);
        }
        this.mailGroup.add(grapMess);
        var searchBg = MQ.game.add.button(0, 0, 'search-bg-mail');
        var searchTab = MQ.game.add.button(MQ.game.width / 2, 87, 'search-tab-mail');
        searchTab.anchor.set(0.5);
        //-454
        var searchIcon = MQ.game.add.button(-454, 0, 'search-icon-mail');
        searchIcon.anchor.set(0.5);
        searchTab.addChild(searchIcon);
        var txtSearch = MQ.game.add.text(-400, 0, 'Tìm kiếm...', {
            font: `35px Roboto`,
            fill: "#93909d",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        txtSearch.anchor.set(0, 0.5);
        searchTab.addChild(txtSearch);
        searchBg.addChild(searchTab);
        this.mailGroup.add(searchBg);
        var headerTab1 = MQ.game.add.button(180, 260, 'header-tab-active-mail');
        headerTab1.anchor.set(0.5);
        var txtHeaderTab1 = MQ.game.add.text(0, 0, 'Mới nhất', {
            font: `45px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        txtHeaderTab1.anchor.set(0.5);
        headerTab1.addChild(txtHeaderTab1);
        var lineHeaderTab1 = MQ.game.add.sprite(0, 87, 'header-line-gradient-mail');
        lineHeaderTab1.anchor.set(0.5);
        headerTab1.addChild(lineHeaderTab1);
        this.mailGroup.add(headerTab1);
        var headerTab2 = MQ.game.add.button(540, 260, 'header-tab-disactive-mail');
        headerTab2.anchor.set(0.5);
        var txtHeaderTab2 = MQ.game.add.text(0, 0, 'Hệ thống', {
            font: `45px Roboto`,
            fill: "#93909d",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        txtHeaderTab2.anchor.set(0.5);
        headerTab2.addChild(txtHeaderTab2);
        var lineHeaderTab2 = MQ.game.add.sprite(0, 87, 'header-line-gradient-mail');
        lineHeaderTab2.anchor.set(0.5);
        headerTab2.addChild(lineHeaderTab2);
        lineHeaderTab2.kill();
        this.mailGroup.add(headerTab2);
        var headerTab3 = MQ.game.add.button(900, 260, 'header-tab-disactive-mail');
        headerTab3.anchor.set(0.5);
        var txtHeaderTab3 = MQ.game.add.text(0, 0, 'Bạn bè', {
            font: `45px Roboto`,
            fill: "#93909d",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        txtHeaderTab3.anchor.set(0.5);
        headerTab3.addChild(txtHeaderTab3);
        var lineHeaderTab3 = MQ.game.add.sprite(0, 87, 'header-line-gradient-mail');
        lineHeaderTab3.anchor.set(0.5);
        headerTab3.addChild(lineHeaderTab3);
        lineHeaderTab3.kill();
        this.mailGroup.add(headerTab3);
        headerTab1.events.onInputDown.add(() => {
            MQ.button_sound.play();
            headerTab1.loadTexture('header-tab-active-mail');
            headerTab2.loadTexture('header-tab-disactive-mail');
            headerTab3.loadTexture('header-tab-disactive-mail');
            lineHeaderTab1.revive();
            lineHeaderTab2.kill();
            lineHeaderTab3.kill();
            txtHeaderTab1.addColor('#ffffff', 0);
            txtHeaderTab2.addColor('#93909d', 0);
            txtHeaderTab3.addColor('#93909d', 0);
            MQ.game.add.tween(grapMess).to({ x: 0 }, 250, "Linear", true);
            MQ.game.add.tween(img_mail_hethong).to({ x: MQ.game.width }, 250, "Linear", true);
            MQ.game.add.tween(img_mail_banbe).to({ x: MQ.game.width }, 250, "Linear", true);
        });
        headerTab2.events.onInputDown.add(() => {
            MQ.button_sound.play();
            headerTab2.loadTexture('header-tab-active-mail');
            headerTab1.loadTexture('header-tab-disactive-mail');
            headerTab3.loadTexture('header-tab-disactive-mail');
            lineHeaderTab1.kill();
            lineHeaderTab2.revive();
            lineHeaderTab3.kill();
            txtHeaderTab1.addColor('#93909d', 0);
            txtHeaderTab2.addColor('#ffffff', 0);
            txtHeaderTab3.addColor('#93909d', 0);
            MQ.game.add.tween(img_mail_hethong).to({ x: 0 }, 250, "Linear", true);
            MQ.game.add.tween(grapMess).to({ x: MQ.game.width }, 250, "Linear", true);
            MQ.game.add.tween(img_mail_banbe).to({ x: MQ.game.width }, 250, "Linear", true);
        });
        headerTab3.events.onInputDown.add(() => {
            MQ.button_sound.play();
            headerTab3.loadTexture('header-tab-active-mail');
            headerTab2.loadTexture('header-tab-disactive-mail');
            headerTab1.loadTexture('header-tab-disactive-mail');
            lineHeaderTab1.kill();
            lineHeaderTab2.kill();
            lineHeaderTab3.revive();
            txtHeaderTab1.addColor('#93909d', 0);
            txtHeaderTab2.addColor('#93909d', 0);
            txtHeaderTab3.addColor('#ffffff', 0);
            MQ.game.add.tween(grapMess).to({ x: MQ.game.width }, 250, "Linear", true);
            MQ.game.add.tween(img_mail_hethong).to({ x: MQ.game.width }, 250, "Linear", true);
            MQ.game.add.tween(img_mail_banbe).to({ x: 0}, 250, "Linear", true);
        });
    },
    createShopDisplay: function () {
        this.shopGroup = MQ.game.add.group();
        this.shopGroup.position.x = MQ.game.width;
        var bg = MQ.game.add.button(0, 0, 'bg-playlist');
        // bg.alpha = 0.1;
        this.shopGroup.add(bg);
        this.createPlaylistDetailShop();
        this.createResourceShop();
        this.createGiftShop();
        this.createVipShop();
        // btn header
        var btn_playlist = MQ.game.add.button(0, 0, 'playlist-playlist-shop');
        this.shopGroup.add(btn_playlist);
        var btn_diamond = MQ.game.add.button(270, 0, 'diamond-playlist-shop');
        this.shopGroup.add(btn_diamond);
        var btn_gift = MQ.game.add.button(540, 0, 'gif-playlist-shop');
        this.shopGroup.add(btn_gift);
        var btn_vip = MQ.game.add.button(810, 0, 'vip-playlist-shop');
        this.shopGroup.add(btn_vip);
        var btn_playlist_active = MQ.game.add.button(0, 0, 'playlist-active-playlist-shop');
        this.shopGroup.add(btn_playlist_active);
        var btn_diamond_active = MQ.game.add.button(270, 0, 'diamond-active-playlist-shop');
        this.shopGroup.add(btn_diamond_active);
        var btn_gift_active = MQ.game.add.button(540, 0, 'gif-active-playlist-shop');
        this.shopGroup.add(btn_gift_active);
        var btn_vip_active = MQ.game.add.button(810, 0, 'vip-active-playlist-shop');
        this.shopGroup.add(btn_vip_active);
        btn_diamond_active.kill();
        btn_gift_active.kill();
        btn_vip_active.kill();
        btn_playlist.events.onInputDown.add(() => {
            MQ.button_sound.play();
            btn_playlist_active.revive();
            btn_diamond_active.kill();
            btn_gift_active.kill();
            btn_vip_active.kill();
            MQ.game.add.tween(this.grapPlaylistShop).to({ x: 0 }, 100, "Linear", true);
            MQ.game.add.tween(this.grapResourceShop).to({ x: MQ.game.width }, 100, "Linear", true);
            MQ.game.add.tween(this.grapGiftShop).to({ x: MQ.game.width }, 100, "Linear", true);
            MQ.game.add.tween(this.grapVipShop).to({ x: MQ.game.width }, 100, "Linear", true);
        });
        btn_diamond.events.onInputDown.add(() => {
            MQ.button_sound.play();
            btn_playlist_active.kill();
            btn_diamond_active.revive();
            btn_gift_active.kill();
            btn_vip_active.kill();
            MQ.game.add.tween(this.grapPlaylistShop).to({ x: MQ.game.width / 2 * 3 }, 100, "Linear", true);
            MQ.game.add.tween(this.grapResourceShop).to({ x: 0 }, 100, "Linear", true);
            MQ.game.add.tween(this.grapGiftShop).to({ x: MQ.game.width }, 100, "Linear", true);
            MQ.game.add.tween(this.grapVipShop).to({ x: MQ.game.width }, 100, "Linear", true);
        });
        btn_gift.events.onInputDown.add(() => {
            MQ.button_sound.play();
            btn_playlist_active.kill();
            btn_diamond_active.kill();
            btn_gift_active.revive();
            btn_vip_active.kill();
            MQ.game.add.tween(this.grapPlaylistShop).to({ x: MQ.game.width / 2 * 3 }, 100, "Linear", true);
            MQ.game.add.tween(this.grapResourceShop).to({ x: MQ.game.width }, 100, "Linear", true);
            MQ.game.add.tween(this.grapGiftShop).to({ x: 0 }, 100, "Linear", true);
            MQ.game.add.tween(this.grapVipShop).to({ x: MQ.game.width }, 100, "Linear", true);
        });
        btn_vip.events.onInputDown.add(() => {
            MQ.button_sound.play();
            btn_playlist_active.kill();
            btn_diamond_active.kill();
            btn_gift_active.kill();
            btn_vip_active.revive();
            MQ.game.add.tween(this.grapPlaylistShop).to({ x: MQ.game.width / 2 * 3 }, 100, "Linear", true);
            MQ.game.add.tween(this.grapResourceShop).to({ x: MQ.game.width }, 100, "Linear", true);
            MQ.game.add.tween(this.grapGiftShop).to({ x: MQ.game.width }, 100, "Linear", true);
            MQ.game.add.tween(this.grapVipShop).to({ x: 0 }, 100, "Linear", true);
        });
    },
    createPlaylistDetailShop: function () {
        // console.log(this.shopGroup.height);
        var scrollMaskPlaylistShop = MQ.game.add.graphics(0, 210);
        scrollMaskPlaylistShop.beginFill();
        scrollMaskPlaylistShop.drawRect(0, 0, MQ.game.width, 1485);
        scrollMaskPlaylistShop.endFill();
        this.shopGroup.add(scrollMaskPlaylistShop);
        this.grapPlaylistShop = MQ.game.add.graphics(0, 210);
        this.grapPlaylistShop.drawRect(0, 0, MQ.game.width, 1345);
        this.grapPlaylistShop.inputEnabled = true;
        this.grapPlaylistShop.input.enableDrag();
        this.grapPlaylistShop.input.allowHorizontalDrag = false;
        this.grapPlaylistShop.mask = scrollMaskPlaylistShop;
        this.grapPlaylistShop.events.onDragStop.add(() => {
            if (this.grapPlaylistShop.position.y > 210) {
                MQ.game.add.tween(this.grapPlaylistShop).to({ y: 210 }, 250, "Linear", true);
            }
            if (this.grapPlaylistShop.position.y < (520 - 2070)) {
                MQ.game.add.tween(this.grapPlaylistShop).to({ y: (520 - 2070) }, 250, "Linear", true);
            }
        });
        this.shopGroup.add(this.grapPlaylistShop);
        var bg_chude = MQ.game.add.sprite(0, 0, 'bg-chude-playlistdetail-shop');
        this.grapPlaylistShop.addChild(bg_chude);
        var tab_header = MQ.game.add.sprite(0, 0, 'tab1-header-playlist-shop');
        this.grapPlaylistShop.addChild(tab_header);
        // tab chu de
        var grapChude = MQ.game.add.graphics(0, 260);
        grapChude.drawRect(0, 0, MQ.game.width, 300);
        grapChude.inputEnabled = true;
        grapChude.input.enableDrag();
        grapChude.input.allowVerticalDrag = false;
        grapChude.events.onDragStop.add(() => {
            if (grapChude.position.x > 0) {
                MQ.game.add.tween(grapChude).to({ x: 0 }, 250, "Linear", true);
            }
            if (grapChude.position.x < -400) {
                MQ.game.add.tween(grapChude).to({ x: -400 }, 250, "Linear", true);
            }
        });
        this.grapPlaylistShop.addChild(grapChude);
        var txt_chude = MQ.game.add.text(60, 192, 'Chủ đề', {
            font: `40px Roboto`,
            fill: "#93909d",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        var txt_showall = MQ.game.add.text(862, 192, 'Xem tất cả', {
            font: `40px Roboto`,
            fill: "#93909d",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        this.grapPlaylistShop.addChild(txt_showall);
        this.grapPlaylistShop.addChild(txt_chude);
        var bg_fieldsGrapChude = MQ.game.add.sprite(0, 0, 'fieldDrag-playlistdetail-shop');
        bg_fieldsGrapChude.alpha = 0.1;
        grapChude.addChild(bg_fieldsGrapChude);
        var countWidthChude = 60;
        for (chude in MQ.listChude) {
            let tab_chude = MQ.game.add.sprite(countWidthChude, 78, `${MQ.listChude[chude].img}`)
            tab_chude.anchor.set(0, 0.5);
            let txt_chude = MQ.game.add.text(43, 0, `${MQ.listChude[chude].name}`, {
                font: `45px Roboto`,
                fill: "#ffffff",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            txt_chude.anchor.set(0, 0.5);
            tab_chude.addChild(txt_chude);
            grapChude.addChild(tab_chude);
            countWidthChude += tab_chude.width + 30;
            // console.log(txt_chude.width);
        }
        //
        var line1 = MQ.game.add.sprite(60, 523, 'line-playlistdetail-shop');
        this.grapPlaylistShop.addChild(line1);
        var txt_phobiennhat = MQ.game.add.text(60, 616, 'Phổ biến nhất', {
            font: `40px Roboto`,
            fill: "#93909d",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        var txt_showall2 = MQ.game.add.text(862, 616, 'Xem tất cả', {
            font: `40px Roboto`,
            fill: "#93909d",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        this.grapPlaylistShop.addChild(txt_phobiennhat);
        this.grapPlaylistShop.addChild(txt_showall2);
        // tab pho bien nhat
        var grapPhobien = MQ.game.add.graphics(0, 680);
        grapPhobien.inputEnabled = true;
        grapPhobien.input.enableDrag();
        grapPhobien.input.allowVerticalDrag = false;
        grapPhobien.events.onDragStop.add(() => {
            if (grapPhobien.position.x > 0) {
                MQ.game.add.tween(grapPhobien).to({ x: 0 }, 250, "Linear", true);
            }
            if (grapPhobien.position.x < -400) {
                MQ.game.add.tween(grapPhobien).to({ x: -400 }, 250, "Linear", true);
            }
        });
        this.shopGroup.add(grapPhobien);
        var bg_fieldsGrapPhobien = MQ.game.add.sprite(0, 0, 'fieldDragPhobien-playlistdetail-shop');
        bg_fieldsGrapPhobien.alpha = 0.1;
        grapPhobien.addChild(bg_fieldsGrapPhobien);
        var countWidthPhobien = 60;
        for (i = 5; i < 9; i++) {
            let ava = MQ.game.add.sprite(countWidthPhobien, 145, `ava${i}-playlist-shop`);
            ava.anchor.set(0, 0.5);
            grapPhobien.addChild(ava);
            let txt_ava = MQ.game.add.text(countWidthPhobien, 310, `${MQ.listPhobien[i - 5]}`, {
                font: `35px Roboto`,
                fill: "#ffffff",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            grapPhobien.addChild(txt_ava);
            let txt_free = MQ.game.add.text(countWidthPhobien, 425, 'Thử MIỄN PHÍ', {
                font: `33px Roboto`,
                fill: "#ffa33a",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            grapPhobien.addChild(txt_free);
            countWidthPhobien += ava.width + 30;
        }
        this.grapPlaylistShop.addChild(grapPhobien);
        //
        var line2 = MQ.game.add.sprite(60, 1270, 'line-playlistdetail-shop');
        this.grapPlaylistShop.addChild(line2);
        var txt_moi = MQ.game.add.text(60, 1360, 'Mới', {
            font: `40px Roboto`,
            fill: "#93909d",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        var txt_showall3 = MQ.game.add.text(862, 1360, 'Xem tất cả', {
            font: `40px Roboto`,
            fill: "#93909d",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        this.grapPlaylistShop.addChild(txt_moi);
        this.grapPlaylistShop.addChild(txt_showall3);
        //tab moi
        var grapMoi = MQ.game.add.graphics(0, 1420);
        grapMoi.inputEnabled = true;
        grapMoi.input.enableDrag();
        grapMoi.input.allowVerticalDrag = false;
        grapMoi.events.onDragStop.add(() => {
            if (grapMoi.position.x > 0) {
                MQ.game.add.tween(grapMoi).to({ x: 0 }, 250, "Linear", true);
            }
            if (grapMoi.position.x < -400) {
                MQ.game.add.tween(grapMoi).to({ x: -400 }, 250, "Linear", true);
            }
        });
        // this.shopGroup.add(grapMoi);
        var bg_fieldsGrapMoi = MQ.game.add.sprite(0, 0, 'fieldDragMoi-playlistdetail-shop');
        bg_fieldsGrapMoi.alpha = 0.1;
        grapMoi.addChild(bg_fieldsGrapMoi);
        var countWidthMoi = 60;
        for (i = 9; i < 13; i++) {
            let ava = MQ.game.add.sprite(countWidthMoi, 145, `ava${i}-playlist-shop`);
            ava.anchor.set(0, 0.5);
            grapMoi.addChild(ava);
            let txt_ava = MQ.game.add.text(countWidthMoi, 310, `${MQ.listMoi[i - 9]}`, {
                font: `35px Roboto`,
                fill: "#ffffff",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            grapMoi.addChild(txt_ava);
            let txt_free = MQ.game.add.text(countWidthMoi, 425, 'Thử MIỄN PHÍ', {
                font: `33px Roboto`,
                fill: "#ffa33a",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            grapMoi.addChild(txt_free);
            countWidthMoi += ava.width + 30;
        }
        this.grapPlaylistShop.addChild(grapMoi);
        //1120
        var line3 = MQ.game.add.sprite(60, 2008, 'line-playlistdetail-shop');
        this.grapPlaylistShop.addChild(line3);
        var txt_noibat = MQ.game.add.text(60, 2098, 'Ca sĩ nổi bật', {
            font: `40px Roboto`,
            fill: "#93909d",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        var txt_showall4 = MQ.game.add.text(862, 2098, 'Xem tất cả', {
            font: `40px Roboto`,
            fill: "#93909d",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        this.grapPlaylistShop.addChild(txt_noibat);
        this.grapPlaylistShop.addChild(txt_showall4);
        // tab noi bat
        var grapNoibat = MQ.game.add.graphics(0, 2158);
        grapNoibat.inputEnabled = true;
        grapNoibat.input.enableDrag();
        grapNoibat.input.allowVerticalDrag = false;
        grapNoibat.events.onDragStop.add(() => {
            if (grapNoibat.position.x > 0) {
                MQ.game.add.tween(grapNoibat).to({ x: 0 }, 250, "Linear", true);
            }
            if (grapNoibat.position.x < -400) {
                MQ.game.add.tween(grapNoibat).to({ x: -400 }, 250, "Linear", true);
            }
        });
        // this.shopGroup.add(grapMoi);
        var bg_fieldsGrapNoibat = MQ.game.add.sprite(0, 0, 'fieldDragNoibat-playlistdetail-shop');
        bg_fieldsGrapNoibat.alpha = 0.1;
        grapNoibat.addChild(bg_fieldsGrapNoibat);
        var countWidthNoibat = 60;
        for (i = 1; i < 5; i++) {
            let ava = MQ.game.add.sprite(countWidthNoibat, 145, `ava${i}-playlist-shop`);
            ava.anchor.set(0, 0.5);
            grapNoibat.addChild(ava);
            let txt_ava = MQ.game.add.text(countWidthNoibat, 310, `${MQ.listNoibat[i - 1]}`, {
                font: `35px Roboto`,
                fill: "#ffffff",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            grapNoibat.addChild(txt_ava);
            let txt_free = MQ.game.add.text(countWidthNoibat, 425, 'Thử MIỄN PHÍ', {
                font: `33px Roboto`,
                fill: "#ffa33a",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            grapNoibat.addChild(txt_free);
            countWidthNoibat += ava.width + 30;
        }
        this.grapPlaylistShop.addChild(grapNoibat);
        //btn-xemtatca-playlistdetail-shop
        //btn-yourplaylist-playlistdetail-shop
        var btn_showall_playlist = MQ.game.add.button(MQ.game.width / 2, 2874, 'btn-xemtatca-playlistdetail-shop');
        btn_showall_playlist.anchor.set(0.5);
        this.grapPlaylistShop.addChild(btn_showall_playlist);
        var btn_showyour_playlist = MQ.game.add.button(MQ.game.width / 2, 3074, 'btn-yourplaylist-playlistdetail-shop');
        btn_showyour_playlist.anchor.set(0.5);
        this.grapPlaylistShop.addChild(btn_showyour_playlist);
    },
    createResourceShop: function () {
        var scrollMaskResourceShop = MQ.game.add.graphics(0, 210);
        scrollMaskResourceShop.beginFill();
        scrollMaskResourceShop.drawRect(0, 0, MQ.game.width, 1485);
        scrollMaskResourceShop.endFill();
        // this.shopGroup.add(scrollMaskResourceShop);
        this.grapResourceShop = MQ.game.add.graphics(0, 210);
        this.grapResourceShop.drawRect(0, 0, MQ.game.width, 1485);
        this.grapResourceShop.inputEnabled = true;
        this.grapResourceShop.mask = scrollMaskResourceShop;
        this.grapResourceShop.x = MQ.game.width;
        this.shopGroup.add(this.grapResourceShop);
        var tab_header = MQ.game.add.sprite(0, 0, 'tab2-header-playlist-shop');
        this.grapResourceShop.addChild(tab_header);
        for (i = 0; i < MQ.listResource.length; i++) {
            let txt_pack = MQ.game.add.text(60, 274 + i * 240, `${MQ.listResource[i].text}`, {
                font: `39px Roboto`,
                fill: "#ffffff",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            txt_pack.anchor.set(0, 0.5);
            this.grapResourceShop.addChild(txt_pack);
            //diamond-resource-shop
            let diamond = MQ.game.add.sprite(430, 274 + i * 240, 'diamond-resource-shop');
            diamond.anchor.set(0, 0.5);
            this.grapResourceShop.addChild(diamond);
            let txt_diamond = MQ.game.add.text(530, 274 + i * 240, `x${MQ.listResource[i].diamond}`, {
                font: `39px Roboto`,
                fill: "#ffffff",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            txt_diamond.anchor.set(0, 0.5);
            this.grapResourceShop.addChild(txt_diamond);
            //btn-tien-resource-shop, watch-video-playlist-shop
            if (i == 0) {
                let btn_buy = MQ.game.add.button(884, 274 + i * 240, 'watch-video-playlist-shop');
                btn_buy.anchor.set(0.5);
                let txt_buy = MQ.game.add.text(-109, 0, `${MQ.listResource[i].price}`, {
                    font: `40px Roboto`,
                    fill: "#ffffff",
                    boundsAlignH: "center",
                    boundsAlignV: "middle",
                    fontWeight: 400
                });
                txt_buy.anchor.set(0, 0.5);
                btn_buy.addChild(txt_buy);
                this.grapResourceShop.addChild(btn_buy);
            } else {
                let btn_buy = MQ.game.add.button(884, 274 + i * 240, 'btn-tien-resource-shop');
                btn_buy.anchor.set(0.5);
                let txt_buy = MQ.game.add.text(0, 0, `${MQ.listResource[i].price}$`, {
                    font: `40px Roboto`,
                    fill: "#ffffff",
                    boundsAlignH: "center",
                    boundsAlignV: "middle",
                    fontWeight: 400
                });
                txt_buy.anchor.set(0.5);
                btn_buy.addChild(txt_buy);
                this.grapResourceShop.addChild(btn_buy);
            }
        }
    },
    createGiftShop: function () {
        var scrollMaskGiftShop = MQ.game.add.graphics(0, 210);
        scrollMaskGiftShop.beginFill();
        scrollMaskGiftShop.drawRect(0, 0, MQ.game.width, 1485);
        scrollMaskGiftShop.endFill();
        // this.shopGroup.add(scrollMaskResourceShop);
        this.grapGiftShop = MQ.game.add.graphics(0, 210);
        this.grapGiftShop.drawRect(0, 0, MQ.game.width, 1485);
        this.grapGiftShop.inputEnabled = true;
        this.grapGiftShop.mask = scrollMaskGiftShop;
        this.grapGiftShop.x = MQ.game.width;
        this.shopGroup.add(this.grapGiftShop);
        var txt_comingsoon = MQ.game.add.text(MQ.game.width / 2, 500, 'Coming soon ..', {
            font: `40px Roboto`,
            fill: "#ffffff",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        txt_comingsoon.anchor.set(0.5);
        this.grapGiftShop.addChild(txt_comingsoon);
    },
    createVipShop: function () {
        var scrollMaskVipShop = MQ.game.add.graphics(0, 210);
        scrollMaskVipShop.beginFill();
        scrollMaskVipShop.drawRect(0, 0, MQ.game.width, 1485);
        scrollMaskVipShop.endFill();
        // this.shopGroup.add(scrollMaskResourceShop);
        this.grapVipShop = MQ.game.add.graphics(0, 210);
        this.grapVipShop.drawRect(0, 0, MQ.game.width, 1485);
        this.grapVipShop.inputEnabled = true;
        this.grapVipShop.mask = scrollMaskVipShop;
        this.grapVipShop.x = MQ.game.width;
        this.shopGroup.add(this.grapVipShop);
        var txt_comingsoon = MQ.game.add.text(MQ.game.width / 2, 500, 'Coming soon ..', {
            font: `40px Roboto`,
            fill: "#ffffff",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        txt_comingsoon.anchor.set(0.5);
        this.grapVipShop.addChild(txt_comingsoon);
    },
    createSettingDisplay: function () {
        this.settingGroup = MQ.game.add.group();
        this.settingGroup.position.x = MQ.game.width;
        var bg_setting = MQ.game.add.button(0, 0, 'bg-playlist');
        this.settingGroup.addChild(bg_setting);
        var scrollMaskSetting = MQ.game.add.graphics(0, 173);
        scrollMaskSetting.beginFill();
        scrollMaskSetting.drawRect(0, 0, MQ.game.width, 1535);
        scrollMaskSetting.endFill();
        this.settingGroup.add(scrollMaskSetting);
        this.grapSetting = MQ.game.add.graphics(0, 173);
        this.grapSetting.drawRect(0, 0, MQ.game.width, 1535);
        this.grapSetting.inputEnabled = true;
        this.grapSetting.input.enableDrag();
        this.grapSetting.input.allowHorizontalDrag = false;
        this.grapSetting.mask = scrollMaskSetting;
        var bg_display_setting = MQ.game.add.sprite(0, 0, 'bg-playlist');
        this.grapSetting.addChild(bg_display_setting);
        this.grapSetting.events.onDragStop.add(() => {
            if (this.grapSetting.position.y > 173) {
                MQ.game.add.tween(this.grapSetting).to({ y: 173 }, 250, "Linear", true);
            }
            if (this.grapSetting.position.y < -210) {
                MQ.game.add.tween(this.grapSetting).to({ y: -210 }, 250, "Linear", true);
            }
        });
        this.settingGroup.add(this.grapSetting);
        for (i = 0; i < MQ.listSetting.length; i++) {
            let txt_selection = MQ.game.add.text(60, 66 + i * 177, `${MQ.listSetting[i].text}`, {
                font: `45px Roboto`,
                fill: "#ffffff",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            this.grapSetting.addChild(txt_selection);
            let btn_selection = MQ.game.add.button(1020, i * 177, `${MQ.listSetting[i].btn}`);
            btn_selection.anchor.set(1, 0);
            this.grapSetting.addChild(btn_selection);
            let line = MQ.game.add.sprite(60, 170 + i * 177, 'line_setting');
            this.grapSetting.addChild(line);
        }
        var btn_logout = MQ.game.add.button(MQ.game.world.centerX, 1547, 'btn_logout_setting');
        btn_logout.anchor.set(0.5);
        this.grapSetting.addChild(btn_logout);
        var header_setting = MQ.game.add.sprite(0, 0, 'tab_header_setting');
        this.settingGroup.add(header_setting);

    }
}