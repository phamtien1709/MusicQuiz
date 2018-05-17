var playState = {
    preload: function () {
        MQ.game.load.onLoadStart.removeAll();
        MQ.game.load.onFileComplete.removeAll();
        MQ.game.load.onLoadComplete.removeAll();
        this.game.sound.context.resume();
        // showConsole('Load Song');
        //bg loading
        this.game.stage.background = MQ.game.add.sprite(0, 0, 'bg-play');
        if (MQ.isChallenged) {
            if (MQ.isBotMode) {

            } else {
                MQ.game.load.image('ava_fb_friend', `https://graph.facebook.com/${MQ.idFriendChallenge}/picture?width=241`);
            }
        } else {

        }
        // console.log(MQ.songChoiced.Namefile);
    },
    create: function () {
        //TODO: 102px each circle distance, 656.5
        var bg = MQ.game.add.sprite(0, 0, 'bg-play');
        this.bg_fake = MQ.game.add.sprite(0, 0, 'bg-win');
        var line_top = MQ.game.add.sprite(0, 0, 'line-top');
        this.btn_remove_answer = MQ.game.add.button(MQ.game.world.centerX, 1815, 'btn-remove-answer');
        this.btn_remove_answer.anchor.set(0.5);
        this.btn_remove_answer.kill();
        var txt_remove_answer = MQ.game.add.text(0, 0, 'BỎ 2 ĐÁP ÁN', {
            font: `60px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 700
        });
        txt_remove_answer.anchor.set(0.5);
        var diamond_remove_answer = MQ.game.add.sprite(400, 0, 'gem-playlist');
        diamond_remove_answer.anchor.set(1, 0.5);
        var lock_answer = MQ.game.add.sprite(480, 0, 'lock-answer');
        lock_answer.anchor.set(1, 0.5);
        this.btn_remove_answer.addChild(diamond_remove_answer);
        this.btn_remove_answer.addChild(txt_remove_answer);
        this.btn_remove_answer.addChild(lock_answer);
        // console.log('before if')
        if (MQ.isChallenged) {
            MQ.choosed = false;
            var correctIndex = Math.floor(Math.random() * 3.9999);
            var typeAnswer = ["song", "singer"];
            var randomTypeAnswer = Math.floor(Math.random() * 1.9999);
            // console.log(typeAnswer[randomTypeAnswer]);
            // console.log(correctIndex);
            var maskAva = MQ.game.add.graphics(0, 0);
            maskAva.beginFill(0xffffff);
            //290, 210, 241
            maskAva.drawCircle(800, 210, 241);
            maskAva.anchor.set(0.5);
            var ava = MQ.game.add.sprite(800, 210, 'ava_fb');
            ava.anchor.set(0.5);
            ava.mask = maskAva;
            // ava.scale.set(MQ.configs.SCALE);
            //290, 400
            var nameFB = MQ.game.add.text(800, 400, `You`, {
                font: `35px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            nameFB.anchor.set(0.5);
            //290, 490
            MQ.scoreText = MQ.game.add.text(800, 490, `${MQ.score}`, {
                font: `84px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 500
            });
            MQ.scoreText.anchor.set(0.5);
            // opp
            var maskAvaOpp = MQ.game.add.graphics(0, 0);
            maskAvaOpp.beginFill(0xffffff);
            maskAvaOpp.drawCircle(290, 210, 241);
            maskAvaOpp.anchor.set(0.5);
            if (MQ.isBotMode) {
                var avaOpp = MQ.game.add.sprite(290, 210, `bot${MQ.botKey}`);
                avaOpp.anchor.set(0.5);
                avaOpp.mask = maskAvaOpp;
            } else {
                var avaOpp = MQ.game.add.sprite(290, 210, 'ava_fb_friend');
                avaOpp.anchor.set(0.5);
                avaOpp.mask = maskAvaOpp;
            }
            // avaOpp.scale.set(MQ.configs.SCALE);
            var nameFBOpp = MQ.game.add.text(290, 400, `${MQ.nameFriendChallenge}`, {
                font: `35px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            nameFBOpp.anchor.set(0.5);
            MQ.scoreTextOpp = MQ.game.add.text(290, 490, `Lượt tiếp..`, {
                font: `60px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 500
            });
            MQ.scoreTextOpp.anchor.set(0.5);
            //this is play song
            MQ.songChoicedPlay = MQ.game.add.audio(`songChoiced${MQ.countQuiz}`);
            for (i = 0; i < MQ.correctList.length; i++) {
                var circleWhite = MQ.game.add.sprite((336 + MQ.correctList[i].countQuiz * 102), 656.5, 'circle-white');
                circleWhite.anchor.set(0.5);
                var correctMini = MQ.game.add.text(
                    (336 + MQ.correctList[i].countQuiz * 102),
                    656.5,
                    `${MQ.correctList[i].time}`);
                // correctMini.scale.set(MQ.configs.SCALE);
                correctMini.anchor.set(0.5);
            }
            for (i = 0; i < MQ.wrongList.length; i++) {
                var circleWhite = MQ.game.add.sprite((336 + MQ.wrongList[i] * 102), 656.5, 'circle-white');
                circleWhite.anchor.set(0.5);
                var wrongMini = MQ.game.add.sprite(
                    (336 + MQ.wrongList[i] * 102),
                    656.5,
                    'wrong-mini');
                // wrongMini.scale.set(MQ.configs.SCALE);
                wrongMini.anchor.set(0.5);
            }
            // console.log(MQ.countQuiz);
            if (MQ.countQuiz == 0) {
                this.createLoadingScreenAfterStart();
            } else {
                // create answer
                // console.log('before loop');
                this.bg_fake.destroy();
                this.btn_remove_answer.revive();
                MQ.songChoicedPlay.play();
                var spriteTime = MQ.game.add.sprite(0, 755, 'tween-time');
                // spriteTime.scale.set(MQ.configs.SCALE);
                spriteTime.anchor.set(0, 0.5);
                var tweenSpriteTime = MQ.game.add.tween(spriteTime.scale).to({ x: MQ.configs.SCALE * 60, y: MQ.configs.SCALE }, 10000, "Linear");
                tweenSpriteTime.start();
                for (i = 0; i < 4; i++) {
                    if (i == 0) {
                        // console.log(i);
                        this.createAnswerTabA(i);
                    }
                    if (i == 1) {
                        this.createAnswerTabB(i);
                    }
                    if (i == 2) {
                        this.createAnswerTabC(i);
                    }
                    if (i == 3) {
                        this.createAnswerTabD(i);
                    }
                }
                tweenSpriteTime.onComplete.add(() => {

                });
                MQ.timeCounter = MQ.game.time.create();
                MQ.timeCounter.start();
            }
        }
        else {
            MQ.choosed = false;
            var correctIndex = Math.floor(Math.random() * 3.9999);
            //your
            var maskAva = MQ.game.add.graphics(0, 0);
            maskAva.beginFill(0xffffff);
            maskAva.drawCircle(800, 210, 241);
            maskAva.anchor.set(0.5);
            var ava = MQ.game.add.sprite(800, 210, 'ava_fb');
            ava.anchor.set(0.5);
            ava.mask = maskAva;
            // ava.scale.set(MQ.configs.SCALE);
            var nameFB = MQ.game.add.text(800, 400, `You`, {
                font: `35px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            nameFB.anchor.set(0.5);
            MQ.scoreText = MQ.game.add.text(800, 490, `${MQ.score}`, {
                font: `84px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 500
            });
            MQ.scoreText.anchor.set(0.5);
            //oppo
            var maskAvaOpp = MQ.game.add.graphics(0, 0);
            maskAvaOpp.beginFill(0xffffff);
            maskAvaOpp.drawCircle(290, 210, 241);
            maskAvaOpp.anchor.set(0.5);
            if (MQ.isBotMode) {
                var avaOpp = MQ.game.add.sprite(290, 210, `bot${MQ.botKey}`);
                avaOpp.anchor.set(0.5);
                avaOpp.mask = maskAvaOpp;
            } else {
                var avaOpp = MQ.game.add.sprite(290, 210, `ava_fb_friend`);
                avaOpp.anchor.set(0.5);
                avaOpp.mask = maskAvaOpp;
            }
            // avaOpp.scale.set(MQ.configs.SCALE);
            var nameFBOpp = MQ.game.add.text(290, 400, `${MQ.nameFriendChallenge}`, {
                font: `35px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            nameFBOpp.anchor.set(0.5);
            MQ.scoreTextOpp = MQ.game.add.text(290, 490, `${MQ.scoreOpp}`, {
                font: `84px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 500
            });
            MQ.scoreTextOpp.anchor.set(0.5);
            //this is song play
            MQ.songChoicedPlay = MQ.game.add.audio(`songChoiced${MQ.countQuiz}`);
            // console.log(MQ.songChoiced);
            // console.log(MQ.songRandomChoiced)
            for (i = 0; i < MQ.correctList.length; i++) {
                var circleWhite = MQ.game.add.sprite((336 + MQ.correctList[i].countQuiz * 102), 656.5, 'circle-white');
                circleWhite.anchor.set(0.5);
                var correctMini = MQ.game.add.text(
                    (336 + MQ.correctList[i].countQuiz * 102),
                    656.5,
                    `${MQ.correctList[i].time}`);
                // correctMini.scale.set(MQ.configs.SCALE);
                correctMini.anchor.set(0.5);
            }
            for (i = 0; i < MQ.wrongList.length; i++) {
                var circleWhite = MQ.game.add.sprite((336 + MQ.wrongList[i] * 102), 656.5, 'circle-white');
                circleWhite.anchor.set(0.5);
                var wrongMini = MQ.game.add.sprite(
                    (336 + MQ.wrongList[i] * 102),
                    656.5,
                    'wrong-mini');
                // wrongMini.scale.set(MQ.configs.SCALE);
                wrongMini.anchor.set(0.5);
            }
            // console.log(MQ.countQuiz);
            if (MQ.countQuiz == 0) {
                this.createLoadingScreenAfterStart();
            } else {
                this.bg_fake.destroy();
                this.btn_remove_answer.revive();
                MQ.songChoicedPlay.play();
                // create answer
                var spriteTime = MQ.game.add.sprite(0, 755, 'tween-time');
                spriteTime.anchor.set(0, 0.5);
                var tweenSpriteTime = MQ.game.add.tween(spriteTime.scale).to({ x: MQ.configs.SCALE * 60, y: MQ.configs.SCALE }, 10000, "Linear");
                tweenSpriteTime.start();
                for (i = 0; i < 4; i++) {
                    if (i == 0) {
                        this.createAnswerTabA(i);
                    }
                    if (i == 1) {
                        this.createAnswerTabB(i);
                    }
                    if (i == 2) {
                        this.createAnswerTabC(i);
                    }
                    if (i == 3) {
                        this.createAnswerTabD(i);
                    }
                }
                tweenSpriteTime.onComplete.add(() => {

                });
                MQ.timeCounter = MQ.game.time.create();
                MQ.timeCounter.start();
            }
        }
        // console.log('create');
    },
    update: function () {

    },
    render: function () {
        MQ.game.debug.text(MQ.game.time.fps || '--', 10, 35, "#00ff00");
    },
    createAnswerTabA: function (index) {
        // console.log(MQ.songChoicedList);
        MQ.answerA = MQ.game.add.button(MQ.game.width / 2, 898 + (index * 220), 'answer-tab');
        // MQ.answerA.scale.set(MQ.configs.SCALE);
        MQ.answerA.anchor.set(0.5);
        MQ.answerA.events.onInputDown.add(() => {
            MQ.choosed = true;
            MQ.answerA.input.enabled = false;
            MQ.answerB.input.enabled = false;
            MQ.answerC.input.enabled = false;
            MQ.answerD.input.enabled = false;
            MQ.answerB.alpha = 0.3;
            MQ.answerC.alpha = 0.3;
            MQ.answerD.alpha = 0.3;
            this.showCorrectAnswer();
            this.calculateScoreOpp();
            if (MQ.answerA.value == MQ.songChoicedList[MQ.countQuiz].RightAnswer) {
                if (MQ.timeCounter.ms <= 10000) {
                    this.showTimeAnswerAndCalculatorScore(MQ.timeCounter.ms);
                    this.addTimeAnswerToData(MQ.timeCounter.ms / 1000, true, MQ.answerA.value, MQ.streak);
                    // correct.revive();
                    MQ.answerTextA.addColor('#01c66a', 0);
                    MQ.correctList.push({
                        "countQuiz": MQ.countQuiz,
                        "time": (MQ.timeCounter.ms / 1000).toFixed(1)
                    });
                } else {
                    this.showTimeAnswerAndCalculatorScore(10000);
                    this.addTimeAnswerToData(10, true, MQ.answerA.value, MQ.streak);
                    // correct.revive();
                    MQ.answerTextA.addColor('#01c66a', 0);
                    MQ.correctList.push({
                        "countQuiz": MQ.countQuiz,
                        "time": 10
                    });
                }
            } else {
                MQ.streak = 1;
                if (MQ.timeCounter.ms <= 10000) {
                    this.addTimeAnswerToData(MQ.timeCounter.ms / 1000, false, MQ.answerA.value, MQ.streak);
                    // wrong.revive();
                    MQ.answerTextA.addColor('#ff0000', 0);
                    MQ.wrongList.push(MQ.countQuiz);
                } else {
                    this.addTimeAnswerToData(10, false, MQ.answerA.value, MQ.streak);
                    // wrong.revive();
                    MQ.answerTextA.addColor('#ff0000', 0);
                    MQ.wrongList.push(MQ.countQuiz);
                }
            }
            // show time
            // console.log(MQ.timeCounter.ms);
            MQ.timeCounter.stop();
            setTimeout(() => {
                if (MQ.countQuiz < 4) {
                    if (MQ.isChallenged) {
                        // getSongToQuiz(() => {
                        // MQ.songRandomChoiced = [[],[],[]];
                        MQ.songChoicedPlay.stop();
                        MQ.countQuiz += 1;
                        MQ.game.state.restart();
                        // });
                    } else {
                        // getSongToChallenge(() => {
                        MQ.songChoicedPlay.stop();
                        MQ.countQuiz += 1;
                        MQ.game.state.restart();
                        // });
                    }
                } else {
                    MQ.timeAnswerSaveToDataAndScore.score = MQ.score;
                    MQ.songChoicedPlay.stop();
                    MQ.game.state.start('win');
                }
            }, 1000);
        }
        );
        // console.log(MQ.songRandomChoicedList[MQ.countQuiz]);
        // console.log(index);
        MQ.answerTextA = MQ.game.add.text(0, 0, `${MQ.songRandomChoicedList[MQ.countQuiz][index].answer}`, {
            font: `50px Roboto`,
            fill: "black",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        MQ.answerTextA.anchor.set(0.5);
        // MQ.answerTextA.scale.set(1/MQ.configs.SCALE);
        MQ.answerA.value = MQ.songRandomChoicedList[MQ.countQuiz][index].answer;
        MQ.answerA.addChild(MQ.answerTextA);
        // MQ.songRandomChoiced.splice(0, 1);
        // console.log(MQ.answerA.value);
        // console.log(MQ.songChoicedList);
        if (MQ.answerA.value == MQ.songChoicedList[MQ.countQuiz].answer) {
            var maskAvaFriend = MQ.game.add.graphics(0, 0);
            maskAvaFriend.beginFill(0xffffff);
            maskAvaFriend.drawCircle(-400, 0, 70);
            maskAvaFriend.anchor.set(0.5);
            if (!MQ.isBotMode) {
                var ava_friend_challenge = MQ.game.add.sprite(-400, 0, 'friend-challenge-mini');
                ava_friend_challenge.anchor.set(0.5);
                ava_friend_challenge.mask = maskAvaFriend;
            } else {
                var ava_friend_challenge = MQ.game.add.sprite(-400, 0, `bot-mini${MQ.botKey}`);
                ava_friend_challenge.anchor.set(0.5);
                ava_friend_challenge.mask = maskAvaFriend;
            }
            ava_friend_challenge.kill();
            MQ.game.time.events.add(Phaser.Timer.SECOND * MQ.songChoicedList[MQ.countQuiz].timingFriendChallenged, () => {
                // console.log('events');
                // console.log('fuck');
                if (!MQ.isChallenged) {
                    ava_friend_challenge.revive();
                }
            });
            MQ.answerA.addChild(maskAvaFriend);
            MQ.answerA.addChild(ava_friend_challenge);
        }
    },
    createAnswerTabB: function (index) {
        MQ.answerB = MQ.game.add.button(MQ.game.width / 2, 898 + (index * 220), 'answer-tab');
        // MQ.answerB.scale.set(MQ.configs.SCALE);
        MQ.answerB.anchor.set(0.5);
        MQ.answerB.events.onInputDown.add(() => {
            MQ.choosed = true;
            MQ.answerA.input.enabled = false;
            MQ.answerB.input.enabled = false;
            MQ.answerC.input.enabled = false;
            MQ.answerD.input.enabled = false;
            MQ.answerA.alpha = 0.3;
            MQ.answerC.alpha = 0.3;
            MQ.answerD.alpha = 0.3;
            this.showCorrectAnswer();
            this.calculateScoreOpp();
            if (MQ.answerB.value == MQ.songChoicedList[MQ.countQuiz].RightAnswer) {
                if (MQ.timeCounter.ms <= 10000) {
                    this.showTimeAnswerAndCalculatorScore(MQ.timeCounter.ms);
                    this.addTimeAnswerToData(MQ.timeCounter.ms / 1000, true, MQ.answerB.value, MQ.streak);
                    // correct.revive();
                    MQ.answerTextB.addColor('#01c66a', 0);
                    MQ.correctList.push({
                        "countQuiz": MQ.countQuiz,
                        "time": (MQ.timeCounter.ms / 1000).toFixed(1)
                    });
                } else {
                    this.showTimeAnswerAndCalculatorScore(10000);
                    this.addTimeAnswerToData(10, true, MQ.answerB.value, MQ.streak);
                    // correct.revive();
                    MQ.answerTextB.addColor('#01c66a', 0);
                    MQ.correctList.push({
                        "countQuiz": MQ.countQuiz,
                        "time": 10
                    });
                }
            } else {
                MQ.streak = 1;
                if (MQ.timeCounter.ms <= 10000) {
                    this.addTimeAnswerToData(MQ.timeCounter.ms / 1000, false, MQ.answerB.value, MQ.streak);
                    // wrong.revive();
                    MQ.answerTextB.addColor('#ff0000', 0);
                    MQ.wrongList.push(MQ.countQuiz);
                } else {
                    this.addTimeAnswerToData(10, false, MQ.answerB.value, MQ.streak);
                    // wrong.revive();
                    MQ.answerTextB.addColor('#ff0000', 0);
                    MQ.wrongList.push(MQ.countQuiz);
                }
            }
            // show time
            // console.log(MQ.timeCounter.ms);
            MQ.timeCounter.stop();
            setTimeout(() => {
                if (MQ.countQuiz < 4) {
                    if (MQ.isChallenged) {
                        // getSongToQuiz(() => {
                        // MQ.songRandomChoiced = [[],[],[]];
                        MQ.songChoicedPlay.stop();
                        MQ.countQuiz += 1;
                        MQ.game.state.restart();
                        // });
                    } else {
                        // getSongToChallenge(() => {
                        MQ.songChoicedPlay.stop();
                        MQ.countQuiz += 1;
                        MQ.game.state.restart();
                        // });
                    }
                } else {
                    MQ.timeAnswerSaveToDataAndScore.score = MQ.score;
                    MQ.songChoicedPlay.stop();
                    MQ.game.state.start('win');
                }
            }, 1000);
        }
        );
        MQ.answerTextB = MQ.game.add.text(0, 0, `${MQ.songRandomChoicedList[MQ.countQuiz][index].answer}`, {
            font: `50px Roboto`,
            fill: "black",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        MQ.answerTextB.anchor.set(0.5);
        // MQ.answerTextB.scale.set(1/MQ.configs.SCALE);
        MQ.answerB.value = MQ.songRandomChoicedList[MQ.countQuiz][index].answer;
        MQ.answerB.addChild(MQ.answerTextB);
        // MQ.songRandomChoiced.splice(0, 1);
        if (MQ.answerB.value == MQ.songChoicedList[MQ.countQuiz].answer) {
            var maskAvaFriend = MQ.game.add.graphics(0, 0);
            maskAvaFriend.beginFill(0xffffff);
            maskAvaFriend.drawCircle(-400, 0, 70);
            maskAvaFriend.anchor.set(0.5);
            if (!MQ.isBotMode) {
                var ava_friend_challenge = MQ.game.add.sprite(-400, 0, 'friend-challenge-mini');
                ava_friend_challenge.anchor.set(0.5);
                ava_friend_challenge.mask = maskAvaFriend;
            } else {
                var ava_friend_challenge = MQ.game.add.sprite(-400, 0, `bot-mini${MQ.botKey}`);
                ava_friend_challenge.anchor.set(0.5);
                ava_friend_challenge.mask = maskAvaFriend;
            }
            ava_friend_challenge.kill();
            MQ.game.time.events.add(Phaser.Timer.SECOND * MQ.songChoicedList[MQ.countQuiz].timingFriendChallenged, () => {
                // console.log('events');
                // console.log('fuck');
                if (!MQ.isChallenged) {
                    ava_friend_challenge.revive();
                }
            });
            MQ.answerB.addChild(maskAvaFriend);
            MQ.answerB.addChild(ava_friend_challenge);
        }
    },
    createAnswerTabC: function (index) {
        MQ.answerC = MQ.game.add.button(MQ.game.width / 2, 898 + (index * 220), 'answer-tab');
        // MQ.answerC.scale.set(MQ.configs.SCALE);
        MQ.answerC.anchor.set(0.5);
        MQ.answerC.events.onInputDown.add(() => {
            MQ.choosed = true;
            MQ.answerA.input.enabled = false;
            MQ.answerB.input.enabled = false;
            MQ.answerC.input.enabled = false;
            MQ.answerD.input.enabled = false;
            MQ.answerB.alpha = 0.3;
            MQ.answerA.alpha = 0.3;
            MQ.answerD.alpha = 0.3;
            this.showCorrectAnswer();
            this.calculateScoreOpp();
            if (MQ.answerC.value == MQ.songChoicedList[MQ.countQuiz].RightAnswer) {
                if (MQ.timeCounter.ms <= 10000) {
                    this.showTimeAnswerAndCalculatorScore(MQ.timeCounter.ms);
                    this.addTimeAnswerToData(MQ.timeCounter.ms / 1000, true, MQ.answerC.value, MQ.streak);
                    // correct.revive();
                    MQ.answerTextC.addColor('#01c66a', 0);
                    MQ.correctList.push({
                        "countQuiz": MQ.countQuiz,
                        "time": (MQ.timeCounter.ms / 1000).toFixed(1)
                    });
                } else {
                    this.showTimeAnswerAndCalculatorScore(10000);
                    this.addTimeAnswerToData(10, true, MQ.answerC.value, MQ.streak);
                    // correct.revive();
                    MQ.answerTextC.addColor('#01c66a', 0);
                    MQ.correctList.push({
                        "countQuiz": MQ.countQuiz,
                        "time": 10
                    });
                }
            } else {
                MQ.streak = 1;
                if (MQ.timeCounter.ms <= 10000) {
                    this.addTimeAnswerToData(MQ.timeCounter.ms / 1000, false, MQ.answerC.value, MQ.streak);
                    // wrong.revive();
                    MQ.answerTextC.addColor('#ff0000', 0);
                    MQ.wrongList.push(MQ.countQuiz);
                } else {
                    this.addTimeAnswerToData(10, false, MQ.answerC.value, MQ.streak);
                    // wrong.revive();
                    MQ.answerTextC.addColor('#ff0000', 0);
                    MQ.wrongList.push(MQ.countQuiz);
                }
            }
            // show time
            // console.log(MQ.timeCounter.ms);
            MQ.timeCounter.stop();
            setTimeout(() => {
                if (MQ.countQuiz < 4) {
                    if (MQ.isChallenged) {
                        // getSongToQuiz(() => {
                        // MQ.songRandomChoiced = [[],[],[]];
                        MQ.songChoicedPlay.stop();
                        MQ.countQuiz += 1;
                        MQ.game.state.restart();
                        // });
                    } else {
                        // getSongToChallenge(() => {
                        MQ.songChoicedPlay.stop();
                        MQ.countQuiz += 1;
                        MQ.game.state.restart();
                        // });
                    }
                } else {
                    MQ.timeAnswerSaveToDataAndScore.score = MQ.score;
                    MQ.songChoicedPlay.stop();
                    MQ.game.state.start('win');
                }
            }, 1000);
        }
        );
        MQ.answerTextC = MQ.game.add.text(0, 0, `${MQ.songRandomChoicedList[MQ.countQuiz][index].answer}`, {
            font: `50px Roboto`,
            fill: "black",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        MQ.answerTextC.anchor.set(0.5);
        // MQ.answerTextC.scale.set(1/MQ.configs.SCALE);
        MQ.answerC.value = MQ.songRandomChoicedList[MQ.countQuiz][index].answer;
        MQ.answerC.addChild(MQ.answerTextC);
        // MQ.songRandomChoiced.splice(0, 1);
        if (MQ.answerC.value == MQ.songChoicedList[MQ.countQuiz].answer) {
            var maskAvaFriend = MQ.game.add.graphics(0, 0);
            maskAvaFriend.beginFill(0xffffff);
            maskAvaFriend.drawCircle(-400, 0, 70);
            maskAvaFriend.anchor.set(0.5);
            if (!MQ.isBotMode) {
                var ava_friend_challenge = MQ.game.add.sprite(-400, 0, 'friend-challenge-mini');
                ava_friend_challenge.anchor.set(0.5);
                ava_friend_challenge.mask = maskAvaFriend;
            } else {
                var ava_friend_challenge = MQ.game.add.sprite(-400, 0, `bot-mini${MQ.botKey}`);
                ava_friend_challenge.anchor.set(0.5);
                ava_friend_challenge.mask = maskAvaFriend;
            }
            ava_friend_challenge.kill();
            MQ.game.time.events.add(Phaser.Timer.SECOND * MQ.songChoicedList[MQ.countQuiz].timingFriendChallenged, () => {
                // console.log('events');
                // console.log('fuck');
                if (!MQ.isChallenged) {
                    ava_friend_challenge.revive();
                }
            });
            MQ.answerC.addChild(maskAvaFriend);
            MQ.answerC.addChild(ava_friend_challenge);
        }
    },
    createAnswerTabD: function (index) {
        MQ.answerD = MQ.game.add.button(MQ.game.width / 2, 898 + (index * 220), 'answer-tab');
        // MQ.answerD.scale.set(MQ.configs.SCALE);
        MQ.answerD.anchor.set(0.5);
        MQ.answerD.events.onInputDown.add(() => {
            MQ.choosed = true;
            MQ.answerA.input.enabled = false;
            MQ.answerB.input.enabled = false;
            MQ.answerC.input.enabled = false;
            MQ.answerD.input.enabled = false;
            MQ.answerB.alpha = 0.3;
            MQ.answerC.alpha = 0.3;
            MQ.answerA.alpha = 0.3;
            this.showCorrectAnswer();
            // console.log(MQ.answerA.answer);
            this.calculateScoreOpp();
            if (MQ.answerD.value == MQ.songChoicedList[MQ.countQuiz].RightAnswer) {
                if (MQ.timeCounter.ms <= 10000) {
                    this.showTimeAnswerAndCalculatorScore(MQ.timeCounter.ms);
                    this.addTimeAnswerToData(MQ.timeCounter.ms / 1000, true, MQ.answerD.value, MQ.streak);
                    // correct.revive();
                    MQ.answerTextD.addColor('#01c66a', 0);
                    MQ.correctList.push({
                        "countQuiz": MQ.countQuiz,
                        "time": (MQ.timeCounter.ms / 1000).toFixed(1)
                    });
                } else {
                    this.showTimeAnswerAndCalculatorScore(10000);
                    this.addTimeAnswerToData(10, true, MQ.answerD.value, MQ.streak);
                    // correct.revive();
                    MQ.answerTextD.addColor('#01c66a', 0);
                    MQ.correctList.push({
                        "countQuiz": MQ.countQuiz,
                        "time": 10
                    });
                }
            } else {
                MQ.streak = 1;
                if (MQ.timeCounter.ms <= 10000) {
                    this.addTimeAnswerToData(MQ.timeCounter.ms / 1000, false, MQ.answerD.value, MQ.streak);
                    // wrong.revive();
                    MQ.answerTextD.addColor('#ff0000', 0);
                    MQ.wrongList.push(MQ.countQuiz);
                } else {
                    this.addTimeAnswerToData(10, false, MQ.answerD.value, MQ.streak);
                    // wrong.revive();
                    MQ.answerTextD.addColor('#ff0000', 0);
                    MQ.wrongList.push(MQ.countQuiz);
                }
            }
            // show time
            // console.log(MQ.timeCounter.ms);
            MQ.timeCounter.stop();
            setTimeout(() => {
                if (MQ.countQuiz < 4) {
                    if (MQ.isChallenged) {
                        // getSongToQuiz(() => {
                        // MQ.songRandomChoiced = [[],[],[]];
                        MQ.songChoicedPlay.stop();
                        MQ.countQuiz += 1;
                        MQ.game.state.restart();
                        // });
                    } else {
                        // getSongToChallenge(() => {
                        MQ.songChoicedPlay.stop();
                        MQ.countQuiz += 1;
                        MQ.game.state.restart();
                        // });
                    }
                } else {
                    MQ.timeAnswerSaveToDataAndScore.score = MQ.score;
                    MQ.songChoicedPlay.stop();
                    MQ.game.state.start('win');
                }
            }, 1000);
        }
        );
        MQ.answerTextD = MQ.game.add.text(0, 0, `${MQ.songRandomChoicedList[MQ.countQuiz][index].answer}`, {
            font: `50px Roboto`,
            fill: "black",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        MQ.answerTextD.anchor.set(0.5);
        // MQ.answerTextD.scale.set(1/MQ.configs.SCALE);
        MQ.answerD.value = MQ.songRandomChoicedList[MQ.countQuiz][index].answer;
        MQ.answerD.addChild(MQ.answerTextD);
        // MQ.songRandomChoiced.splice(0, 1);
        if (MQ.answerD.value == MQ.songChoicedList[MQ.countQuiz].answer) {
            var maskAvaFriend = MQ.game.add.graphics(0, 0);
            maskAvaFriend.beginFill(0xffffff);
            maskAvaFriend.drawCircle(-400, 0, 70);
            maskAvaFriend.anchor.set(0.5);
            if (!MQ.isBotMode) {
                var ava_friend_challenge = MQ.game.add.sprite(-400, 0, 'friend-challenge-mini');
                ava_friend_challenge.anchor.set(0.5);
                ava_friend_challenge.mask = maskAvaFriend;
            } else {
                var ava_friend_challenge = MQ.game.add.sprite(-400, 0, `bot-mini${MQ.botKey}`);
                ava_friend_challenge.anchor.set(0.5);
                ava_friend_challenge.mask = maskAvaFriend;
            }
            ava_friend_challenge.kill();
            MQ.game.time.events.add(Phaser.Timer.SECOND * MQ.songChoicedList[MQ.countQuiz].timingFriendChallenged, () => {
                // console.log('events');
                // console.log('fuck');
                if (!MQ.isChallenged) {
                    ava_friend_challenge.revive();
                }
            });
            MQ.answerD.addChild(maskAvaFriend);
            MQ.answerD.addChild(ava_friend_challenge);
        }
    },
    showTimeAnswerAndCalculatorScore: function (timeAnswer) {
        // console.log(timeAnswer);
        var timeAnswerToSecond = timeAnswer / 1000;
        // console.log(timeAnswerToSecond);
        // var textTimeAnswer = MQ.game.add.text(MQ.game.width / 2, 1815, `${timeAnswerToSecond}s`, {
        //     font: `110px Roboto`,
        //     fill: "white",
        //     boundsAlignH: "center",
        //     boundsAlignV: "middle",
        //     fontWeight: 400
        // });
        // textTimeAnswer.anchor.set(0.5);
        MQ.score += Math.floor((11 - timeAnswerToSecond) * 100 * (Math.pow(11 - timeAnswerToSecond, (MQ.streak - 1) / 4)));
        MQ.streak++;
        // MQ.timeAnswerToData = 
        MQ.scoreText.setText(`${MQ.score}`);
    },
    addTimeAnswerToData: function (timeAnswer, trueORfalse, answer, streak) {
        MQ.timeAnswerSaveToDataAndScore.time.push({
            "ID": MQ.songChoicedList[MQ.countQuiz].ID,
            "timeAnswer": timeAnswer,
            "trueORfalse": trueORfalse,
            "answer": answer,
            "streak": streak
        });
    },
    calculateScoreOpp: function () {
        if (MQ.countQuiz <= 4) {
            if (!MQ.isChallenged) {
                if (!MQ.isBotMode) {
                    if (MQ.dataChooseToChall.time[MQ.countQuiz].trueORfalse) {
                        var scoreOpp = Math.floor((11 - MQ.dataChooseToChall.time[MQ.countQuiz].timeAnswer) * 100 * (Math.pow(11 - MQ.dataChooseToChall.time[MQ.countQuiz].timeAnswer, ((MQ.dataChooseToChall.time[MQ.countQuiz].streak - 2) / 4))));
                        MQ.scoreOpp += scoreOpp;
                        MQ.scoreTextOpp.setText(`${MQ.scoreOpp}`);
                    }
                } else {
                    if (MQ.dataChooseToChall.data.time[MQ.countQuiz].trueORfalse) {
                        var scoreOpp = Math.floor((11 - MQ.dataChooseToChall.data.time[MQ.countQuiz].timeAnswer) * 100 * (Math.pow(11 - MQ.dataChooseToChall.data.time[MQ.countQuiz].timeAnswer, ((MQ.dataChooseToChall.data.time[MQ.countQuiz].streak - 2) / 4))));
                        MQ.scoreOpp += scoreOpp;
                        MQ.scoreTextOpp.setText(`${MQ.scoreOpp}`);
                    }
                }
            }
        }
    },
    showCorrectAnswer: function () {
        if (MQ.answerA.value == MQ.songChoicedList[MQ.countQuiz].RightAnswer) {
            MQ.answerA.alpha = 1;
            MQ.answerTextA.addColor('#30FF77', 0);
        }
        if (MQ.answerB.value == MQ.songChoicedList[MQ.countQuiz].RightAnswer) {
            MQ.answerB.alpha = 1;
            MQ.answerTextB.addColor('#30FF77', 0);
        }
        if (MQ.answerC.value == MQ.songChoicedList[MQ.countQuiz].RightAnswer) {
            MQ.answerC.alpha = 1;
            MQ.answerTextC.addColor('#30FF77', 0);
        }
        if (MQ.answerD.value == MQ.songChoicedList[MQ.countQuiz].RightAnswer) {
            MQ.answerD.alpha = 1;
            MQ.answerTextD.addColor('#30FF77', 0);
        }
    },
    createLoadingScreenAfterStart: function () {
        // var bg_fake = MQ.game.add.sprite(0, 0, )
        var nameOfPlaylist = MQ.game.add.text(MQ.game.world.centerX, 682, `${MQ.nameOfPlaylist}`, {
            font: `60px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        nameOfPlaylist.anchor.set(0.5);
        var txt_ready = MQ.game.add.text(MQ.game.world.centerX, 911, `Sẵn sàng`, {
            font: `45px Roboto`,
            fill: "#4b445f",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        txt_ready.anchor.set(0.5);
        var countdownNumber = MQ.game.add.text(MQ.game.width / 2, 1318, '3', {
            font: `420px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        countdownNumber.anchor.set(0.5);
        let firstTween = MQ.game.add.tween(countdownNumber.scale).to({ x: 0.5, y: 0.5 }, 1000, "Linear");
        firstTween.start();
        MQ.soundCountDown.play();
        firstTween.onComplete.add(() => {
            countdownNumber.scale.set(1);
            countdownNumber.setText('2');
            let secondTween = MQ.game.add.tween(countdownNumber.scale).to({ x: 0.5, y: 0.5 }, 1000, "Linear");
            secondTween.start();
            MQ.soundCountDown.play();
            secondTween.onComplete.add(() => {
                countdownNumber.scale.set(1);
                countdownNumber.setText('1');
                let thirdTween = MQ.game.add.tween(countdownNumber.scale).to({ x: 0.5, y: 0.5 }, 1000, "Linear");
                thirdTween.start();                
                MQ.soundCountDown.play();
                thirdTween.onComplete.add(() => {
                    // countdownNumber.scale.set(1);
                    countdownNumber.setText('Bắt đầu');
                    let startTween = MQ.game.add.tween(countdownNumber.scale).to({ x: 0.5, y: 0.5 }, 1000, "Linear");
                    startTween.start();
                    startTween.onComplete.add(() => {
                        countdownNumber.destroy();
                        nameOfPlaylist.destroy();
                        txt_ready.destroy();
                        this.btn_remove_answer.revive();
                        this.bg_fake.destroy();
                        MQ.songChoicedPlay.play();
                        var spriteTime = MQ.game.add.sprite(0, 755, 'tween-time');
                        // spriteTime.scale.set(MQ.configs.SCALE);
                        spriteTime.anchor.set(0, 0.5);
                        var tweenSpriteTime = MQ.game.add.tween(spriteTime.scale).to({ x: 60, y: 1 }, 10000, "Linear");
                        tweenSpriteTime.start();
                        for (i = 0; i < 4; i++) {
                            if (i == 0) {
                                // console.log(i);
                                this.createAnswerTabA(i);
                            }
                            if (i == 1) {
                                this.createAnswerTabB(i);
                            }
                            if (i == 2) {
                                this.createAnswerTabC(i);
                            }
                            if (i == 3) {
                                this.createAnswerTabD(i);
                            }
                        }
                        tweenSpriteTime.onComplete.add(() => {

                        });
                        MQ.timeCounter = MQ.game.time.create();
                        MQ.timeCounter.start();
                    })
                })
            })
        })
    }
}