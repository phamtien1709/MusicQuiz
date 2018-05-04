var playState = {
    preload: function () {
        this.game.sound.context.resume();
        // showConsole('Load Song');
        if (MQ.isChallenged) {
            MQ.game.load.image('ava_fb_friend', `https://graph.facebook.com/${MQ.idFriendChallenge}/picture?width=200`)
        } else {

        }
        // console.log(MQ.songChoiced.Namefile);
    },
    create: function () {
        //TODO: 102px each circle distance, 656.5
        // showConsole('Play Screen');
        // console.log(MQ.countQuiz);
        var bg = MQ.game.add.sprite(0, 0, 'bg-play');
        bg.width = MQ.game.width;
        bg.height = MQ.game.height;
        var line_top = MQ.game.add.sprite(0, 0, 'line-top');
        var btn_remove_answer = MQ.game.add.button(MQ.game.world.centerX, 1815, 'btn-remove-answer');
        btn_remove_answer.anchor.set(0.5);
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
            maskAva.drawCircle(290 * MQ.configs.SCALE, 210 * MQ.configs.SCALE, 241 * MQ.configs.SCALE);
            maskAva.anchor.set(0.5);
            var ava = MQ.game.add.sprite(290 * MQ.configs.SCALE, 210 * MQ.configs.SCALE, 'ava_fb');
            ava.anchor.set(0.5);
            ava.mask = maskAva;
            // ava.scale.set(MQ.configs.SCALE);
            var nameFB = MQ.game.add.text(290 * MQ.configs.SCALE, 400 * MQ.configs.SCALE, `You`, {
                font: `50px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            nameFB.anchor.set(0.5);
            MQ.scoreText = MQ.game.add.text(290, 490 * MQ.configs.SCALE, `${MQ.score}`, {
                font: `60px Roboto`,
                fill: "yellow",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            MQ.scoreText.anchor.set(0.5);
            // opp
            var maskAvaOpp = MQ.game.add.graphics(0, 0);
            maskAvaOpp.beginFill(0xffffff);
            maskAvaOpp.drawCircle(800 * MQ.configs.SCALE, 210 * MQ.configs.SCALE, 241 * MQ.configs.SCALE);
            maskAvaOpp.anchor.set(0.5);
            var avaOpp = MQ.game.add.sprite(800 * MQ.configs.SCALE, 210 * MQ.configs.SCALE, 'ava_fb_friend');
            avaOpp.anchor.set(0.5);
            avaOpp.mask = maskAvaOpp;
            // avaOpp.scale.set(MQ.configs.SCALE);
            var nameFBOpp = MQ.game.add.text(800 * MQ.configs.SCALE, 400 * MQ.configs.SCALE, `${MQ.nameFriendChallenge}`, {
                font: `50px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            nameFBOpp.anchor.set(0.5);
            //
            MQ.songChoicedPlay = MQ.game.add.audio(`songChoiced${MQ.countQuiz}`);
            MQ.songChoicedPlay.play();
            // console.log(MQ.songChoiced);
            // console.log(MQ.songRandomChoiced);
            var spriteTime = MQ.game.add.sprite(0, 755 * MQ.configs.SCALE, 'tween-time');
            // spriteTime.scale.set(MQ.configs.SCALE);
            spriteTime.anchor.set(0, 0.5);
            var tweenSpriteTime = MQ.game.add.tween(spriteTime.scale).to({ x: MQ.configs.SCALE * 60, y: MQ.configs.SCALE }, 10000, "Linear");
            tweenSpriteTime.start();
            //
            // console.log(MQ.wrongList);
            for (i = 0; i < MQ.correctList.length; i++) {
                var correctMini = MQ.game.add.sprite(
                    (323 + MQ.correctList[i] * 107.5) * MQ.configs.SCALE,
                    580.5 * MQ.configs.SCALE,
                    'correct-mini');
                // correctMini.scale.set(MQ.configs.SCALE);
                correctMini.anchor.set(0.5);
            }
            for (i = 0; i < MQ.wrongList.length; i++) {
                var wrongMini = MQ.game.add.sprite(
                    (323 + MQ.wrongList[i] * 107.5) * MQ.configs.SCALE,
                    580.5 * MQ.configs.SCALE,
                    'wrong-mini');
                // wrongMini.scale.set(MQ.configs.SCALE);
                wrongMini.anchor.set(0.5);
            }
            // create answer
            // console.log('before loop');
            for (i = 0; i < 4; i++) {
                if (i == 0) {
                    // console.log(i);
                    this.createAnswerTabA(typeAnswer[randomTypeAnswer], i);
                }
                if (i == 1) {
                    this.createAnswerTabB(typeAnswer[randomTypeAnswer], i);
                }
                if (i == 2) {
                    this.createAnswerTabC(typeAnswer[randomTypeAnswer], i);
                }
                if (i == 3) {
                    this.createAnswerTabD(typeAnswer[randomTypeAnswer], i);
                }
            }
            tweenSpriteTime.onComplete.add(() => {
                if (MQ.countQuiz < 4) {
                    if (!MQ.choosed) {
                        // MQ.songRandomChoiced = [];
                        // getSongToChallenge(() => {
                        MQ.streak = 1;
                        this.addTimeAnswerToData(11, false, "", typeAnswer[randomTypeAnswer]);
                        MQ.songChoicedPlay.stop();
                        MQ.countQuiz += 1;
                        MQ.game.state.restart();
                        // });
                    }
                }
                else {
                    this.addTimeAnswerToData(11, false, "", typeAnswer[randomTypeAnswer]);
                    MQ.songChoicedPlay.stop();
                    MQ.game.state.start('win');
                };
            });
            MQ.timeCounter = MQ.game.time.create();
            MQ.timeCounter.start();
        }
        else {
            MQ.choosed = false;
            var correctIndex = Math.floor(Math.random() * 3.9999);
            //your
            var maskAva = MQ.game.add.graphics(0, 0);
            maskAva.beginFill(0xffffff);
            maskAva.drawCircle(290 * MQ.configs.SCALE, 210 * MQ.configs.SCALE, 241 * MQ.configs.SCALE);
            maskAva.anchor.set(0.5);
            var ava = MQ.game.add.sprite(290 * MQ.configs.SCALE, 210 * MQ.configs.SCALE, 'ava_fb');
            ava.anchor.set(0.5);
            ava.mask = maskAva;
            // ava.scale.set(MQ.configs.SCALE);
            var nameFB = MQ.game.add.text(290 * MQ.configs.SCALE, 400 * MQ.configs.SCALE, `You`, {
                font: `50px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            nameFB.anchor.set(0.5);
            MQ.scoreText = MQ.game.add.text(290, 490 * MQ.configs.SCALE, `${MQ.score}`, {
                font: `60px Roboto`,
                fill: "yellow",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            MQ.scoreText.anchor.set(0.5);
            //oppo
            var maskAvaOpp = MQ.game.add.graphics(0, 0);
            maskAvaOpp.beginFill(0xffffff);
            maskAvaOpp.drawCircle(800 * MQ.configs.SCALE, 210 * MQ.configs.SCALE, 241 * MQ.configs.SCALE);
            maskAvaOpp.anchor.set(0.5);
            var avaOpp = MQ.game.add.sprite(800 * MQ.configs.SCALE, 210 * MQ.configs.SCALE, 'ava_fb_friend');
            avaOpp.anchor.set(0.5);
            avaOpp.mask = maskAvaOpp;
            // avaOpp.scale.set(MQ.configs.SCALE);
            var nameFBOpp = MQ.game.add.text(800 * MQ.configs.SCALE, 400 * MQ.configs.SCALE, `${MQ.nameFriendChallenge}`, {
                font: `50px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            nameFBOpp.anchor.set(0.5);
            MQ.scoreTextOpp = MQ.game.add.text(800 * MQ.configs.SCALE, 490 * MQ.configs.SCALE, `${MQ.scoreOpp}`, {
                font: `60px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            MQ.scoreTextOpp.anchor.set(0.5);
            //
            MQ.songChoicedPlay = MQ.game.add.audio(`songChoiced${MQ.countQuiz}`);
            MQ.songChoicedPlay.play();
            // console.log(MQ.songChoiced);
            // console.log(MQ.songRandomChoiced);
            var spriteTime = MQ.game.add.sprite(0, 755 * MQ.configs.SCALE, 'tween-time');
            // spriteTime.scale.set(MQ.configs.SCALE);
            spriteTime.anchor.set(0, 0.5);
            var tweenSpriteTime = MQ.game.add.tween(spriteTime.scale).to({ x: MQ.configs.SCALE * 60, y: MQ.configs.SCALE }, 10000, "Linear");
            tweenSpriteTime.start();
            //
            for (i = 0; i < MQ.correctList.length; i++) {
                var correctMini = MQ.game.add.sprite(
                    (323 + MQ.correctList[i] * 107.5) * MQ.configs.SCALE,
                    580.5 * MQ.configs.SCALE,
                    'correct-mini');
                // correctMini.scale.set(MQ.configs.SCALE);
                correctMini.anchor.set(0.5);
            }
            for (i = 0; i < MQ.wrongList.length; i++) {
                var wrongMini = MQ.game.add.sprite(
                    (323 + MQ.wrongList[i] * 107.5) * MQ.configs.SCALE,
                    580.5 * MQ.configs.SCALE,
                    'wrong-mini');
                // wrongMini.scale.set(MQ.configs.SCALE);
                wrongMini.anchor.set(0.5);
            }
            // create answer
            // console.log(MQ.songChoiced);
            for (i = 0; i < 4; i++) {
                if (i == 0) {
                    this.createAnswerTabA(MQ.songChoicedList[MQ.countQuiz].typeAnswer, i);
                }
                if (i == 1) {
                    this.createAnswerTabB(MQ.songChoicedList[MQ.countQuiz].typeAnswer, i);
                }
                if (i == 2) {
                    this.createAnswerTabC(MQ.songChoicedList[MQ.countQuiz].typeAnswer, i);
                }
                if (i == 3) {
                    this.createAnswerTabD(MQ.songChoicedList[MQ.countQuiz].typeAnswer, i);
                }
            }
            tweenSpriteTime.onComplete.add(() => {
                if (MQ.countQuiz < 4) {
                    if (!MQ.choosed) {
                        // MQ.songRandomChoiced = [];
                        // getSongToChallenge(() => {
                        MQ.streak = 1;
                        this.addTimeAnswerToData(11, false, "", MQ.songChoicedList[MQ.countQuiz].typeAnswer);
                        MQ.songChoicedPlay.stop();
                        MQ.countQuiz += 1;
                        MQ.game.state.restart();
                        // });
                    }
                }
                else {
                    this.addTimeAnswerToData(11, false, "", MQ.songChoicedList[MQ.countQuiz].typeAnswer);
                    MQ.songChoicedPlay.stop();
                    MQ.game.state.start('win');
                };;
            });
            MQ.timeCounter = MQ.game.time.create();
            MQ.timeCounter.start();
        }
        // console.log('create');
    },
    update: function () {

    },
    render: function () {
        MQ.game.debug.text(MQ.game.time.fps || '--', 10, 35, "#00ff00");
    },
    createAnswerTabA: function (typeAnswer, index) {
        MQ.answerA = MQ.game.add.button(MQ.game.width / 2, 898 * MQ.configs.SCALE + (index * 209 * MQ.configs.SCALE), 'answer-tab');
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
            // console.log(MQ.answerA.answer);
            // this.addTimeAnswerToData(MQ.timeCounter.ms / 1000);
            this.calculateScoreOpp();
            if (MQ.answerA.value == MQ.songChoicedList[MQ.countQuiz].Song1 || MQ.answerA.value == MQ.songChoicedList[MQ.countQuiz].Singer1) {
                this.showTimeAnswerAndCalculatorScore(MQ.timeCounter.ms);
                this.addTimeAnswerToData(MQ.timeCounter.ms / 1000, true, MQ.answerA.value, typeAnswer, MQ.streak);
                // correct.revive();
                MQ.answerTextA.addColor('#30FF77', 0);
                MQ.correctList.push(MQ.countQuiz);
            } else {
                MQ.streak = 1;
                this.addTimeAnswerToData(MQ.timeCounter.ms / 1000, false, MQ.answerA.value, typeAnswer, MQ.streak);
                // wrong.revive();
                MQ.answerTextA.addColor('#ff0000', 0);
                MQ.wrongList.push(MQ.countQuiz);
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
        // console.log(MQ.songRandomChoicedList[MQ.countQuiz][index]);
        if (typeAnswer == "song") {
            MQ.answerTextA = MQ.game.add.text(0, 0, `${MQ.songRandomChoicedList[MQ.countQuiz][index].song}`, {
                font: `55px Roboto`,
                fill: "black",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            MQ.answerTextA.anchor.set(0.5);
            // MQ.answerTextA.scale.set(1/MQ.configs.SCALE);
            MQ.answerA.value = MQ.songRandomChoicedList[MQ.countQuiz][index].song;
            MQ.answerA.addChild(MQ.answerTextA);
            // MQ.songRandomChoiced.splice(0, 1);
        }
        else if (typeAnswer == "singer") {
            MQ.answerTextA = MQ.game.add.text(0, 0, `${MQ.songRandomChoicedList[MQ.countQuiz][index].singer}`, {
                font: `55px Roboto`,
                fill: "black",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            MQ.answerTextA.anchor.set(0.5);
            // MQ.answerTextA.scale.set(1/MQ.configs.SCALE);
            MQ.answerA.value = MQ.songRandomChoicedList[MQ.countQuiz][index].singer;
            MQ.answerA.addChild(MQ.answerTextA);
            // MQ.songRandomChoiced.splice(0, 1);
        }
        // console.log(MQ.answerA.value);
        // console.log(MQ.songChoicedList);
        if (MQ.answerA.value == MQ.songChoicedList[MQ.countQuiz].answer) {
            var ava_friend_challenge = MQ.game.add.sprite(-400, 0, 'friend-challenge-mini');
            ava_friend_challenge.anchor.set(0.5);
            ava_friend_challenge.kill();
            MQ.game.time.events.add(Phaser.Timer.SECOND * MQ.songChoicedList[MQ.countQuiz].timingFriendChallenged, () => {
                // console.log('events');
                // console.log('fuck');
                if (!MQ.isChallenged) {
                    ava_friend_challenge.revive();
                }
            });
            MQ.answerA.addChild(ava_friend_challenge);
        }
    },
    createAnswerTabB: function (typeAnswer, index) {
        MQ.answerB = MQ.game.add.button(MQ.game.width / 2, 898 * MQ.configs.SCALE + (index * 209 * MQ.configs.SCALE), 'answer-tab');
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
            // console.log(MQ.answerA.answer);
            // this.addTimeAnswerToData(MQ.timeCounter.ms / 1000);
            this.calculateScoreOpp();
            if (MQ.answerB.value == MQ.songChoicedList[MQ.countQuiz].Song1 || MQ.answerB.value == MQ.songChoicedList[MQ.countQuiz].Singer1) {
                this.showTimeAnswerAndCalculatorScore(MQ.timeCounter.ms);
                this.addTimeAnswerToData(MQ.timeCounter.ms / 1000, true, MQ.answerB.value, typeAnswer, MQ.streak);
                // correct.revive();
                MQ.answerTextB.addColor('#30FF77', 0);
                MQ.correctList.push(MQ.countQuiz);
            } else {
                MQ.streak = 1;
                this.addTimeAnswerToData(MQ.timeCounter.ms / 1000, false, MQ.answerB.value, typeAnswer, MQ.streak);
                // wrong.revive();
                MQ.answerTextB.addColor('#ff0000', 0);
                MQ.wrongList.push(MQ.countQuiz);
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
        if (typeAnswer == "song") {
            MQ.answerTextB = MQ.game.add.text(0, 0, `${MQ.songRandomChoicedList[MQ.countQuiz][index].song}`, {
                font: `55px Roboto`,
                fill: "black",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            MQ.answerTextB.anchor.set(0.5);
            // MQ.answerTextB.scale.set(1/MQ.configs.SCALE);
            MQ.answerB.value = MQ.songRandomChoicedList[MQ.countQuiz][index].song;
            MQ.answerB.addChild(MQ.answerTextB);
            // MQ.songRandomChoiced.splice(0, 1);
        }
        else if (typeAnswer == "singer") {
            MQ.answerTextB = MQ.game.add.text(0, 0, `${MQ.songRandomChoicedList[MQ.countQuiz][index].singer}`, {
                font: `55px Roboto`,
                fill: "black",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            MQ.answerTextB.anchor.set(0.5);
            // MQ.answerTextB.scale.set(1/MQ.configs.SCALE);
            MQ.answerB.value = MQ.songRandomChoicedList[MQ.countQuiz][index].singer;
            MQ.answerB.addChild(MQ.answerTextB);
            // MQ.songRandomChoiced.splice(0, 1);
        }
        if (MQ.answerB.value == MQ.songChoicedList[MQ.countQuiz].answer) {
            var ava_friend_challenge = MQ.game.add.sprite(-400, 0, 'friend-challenge-mini');
            ava_friend_challenge.anchor.set(0.5);
            ava_friend_challenge.kill();
            MQ.game.time.events.add(Phaser.Timer.SECOND * MQ.songChoicedList[MQ.countQuiz].timingFriendChallenged, () => {
                // console.log('events');
                // console.log('fuck');
                if (!MQ.isChallenged) {
                    ava_friend_challenge.revive();
                }
            });
            MQ.answerB.addChild(ava_friend_challenge);
        }
    },
    createAnswerTabC: function (typeAnswer, index) {
        MQ.answerC = MQ.game.add.button(MQ.game.width / 2, 898 * MQ.configs.SCALE + (index * 209 * MQ.configs.SCALE), 'answer-tab');
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
            // console.log(MQ.answerA.answer);
            // this.addTimeAnswerToData(MQ.timeCounter.ms / 1000);
            this.calculateScoreOpp();
            if (MQ.answerC.value == MQ.songChoicedList[MQ.countQuiz].Song1 || MQ.answerC.value == MQ.songChoicedList[MQ.countQuiz].Singer1) {
                this.showTimeAnswerAndCalculatorScore(MQ.timeCounter.ms);
                this.addTimeAnswerToData(MQ.timeCounter.ms / 1000, true, MQ.answerC.value, typeAnswer, MQ.streak);
                // correct.revive();
                MQ.answerTextC.addColor('#30FF77', 0);
                MQ.correctList.push(MQ.countQuiz);
            } else {
                MQ.streak = 1;
                this.addTimeAnswerToData(MQ.timeCounter.ms / 1000, false, MQ.answerC.value, typeAnswer, MQ.streak);
                // wrong.revive();
                MQ.answerTextC.addColor('#ff0000', 0);
                MQ.wrongList.push(MQ.countQuiz);
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
        if (typeAnswer == "song") {
            MQ.answerTextC = MQ.game.add.text(0, 0, `${MQ.songRandomChoicedList[MQ.countQuiz][index].song}`, {
                font: `55px Roboto`,
                fill: "black",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            MQ.answerTextC.anchor.set(0.5);
            // MQ.answerTextC.scale.set(1/MQ.configs.SCALE);
            MQ.answerC.value = MQ.songRandomChoicedList[MQ.countQuiz][index].song;
            MQ.answerC.addChild(MQ.answerTextC);
            // MQ.songRandomChoiced.splice(0, 1);
        }
        else if (typeAnswer == "singer") {
            MQ.answerTextC = MQ.game.add.text(0, 0, `${MQ.songRandomChoicedList[MQ.countQuiz][index].singer}`, {
                font: `55px Roboto`,
                fill: "black",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            MQ.answerTextC.anchor.set(0.5);
            // MQ.answerTextC.scale.set(1/MQ.configs.SCALE);
            MQ.answerC.value = MQ.songRandomChoicedList[MQ.countQuiz][index].singer;
            MQ.answerC.addChild(MQ.answerTextC);
            // MQ.songRandomChoiced.splice(0, 1);
        }
        if (MQ.answerC.value == MQ.songChoicedList[MQ.countQuiz].answer) {
            var ava_friend_challenge = MQ.game.add.sprite(-400, 0, 'friend-challenge-mini');
            ava_friend_challenge.anchor.set(0.5);
            ava_friend_challenge.kill();
            MQ.game.time.events.add(Phaser.Timer.SECOND * MQ.songChoicedList[MQ.countQuiz].timingFriendChallenged, () => {
                // console.log('events');
                // console.log('fuck');
                if (!MQ.isChallenged) {
                    ava_friend_challenge.revive();
                }
            });
            MQ.answerC.addChild(ava_friend_challenge);
        }
    },
    createAnswerTabD: function (typeAnswer, index) {
        MQ.answerD = MQ.game.add.button(MQ.game.width / 2, 898 * MQ.configs.SCALE + (index * 209 * MQ.configs.SCALE), 'answer-tab');
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
            if (MQ.answerD.value == MQ.songChoicedList[MQ.countQuiz].Song1 || MQ.answerD.value == MQ.songChoicedList[MQ.countQuiz].Singer1) {
                this.showTimeAnswerAndCalculatorScore(MQ.timeCounter.ms);
                this.addTimeAnswerToData(MQ.timeCounter.ms / 1000, true, MQ.answerD.value, typeAnswer, MQ.streak);
                // correct.revive();
                MQ.answerTextD.addColor('#30FF77', 0);
                MQ.correctList.push(MQ.countQuiz);
            } else {
                MQ.streak = 1;
                this.addTimeAnswerToData(MQ.timeCounter.ms / 1000, false, MQ.answerD.value, typeAnswer, MQ.streak);
                // wrong.revive();
                MQ.answerTextD.addColor('#ff0000', 0);
                MQ.wrongList.push(MQ.countQuiz);
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
        if (typeAnswer == "song") {
            MQ.answerTextD = MQ.game.add.text(0, 0, `${MQ.songRandomChoicedList[MQ.countQuiz][index].song}`, {
                font: `55px Roboto`,
                fill: "black",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            MQ.answerTextD.anchor.set(0.5);
            // MQ.answerTextD.scale.set(1/MQ.configs.SCALE);
            MQ.answerD.value = MQ.songRandomChoicedList[MQ.countQuiz][index].song;
            MQ.answerD.addChild(MQ.answerTextD);
            // MQ.songRandomChoiced.splice(0, 1);
        }
        else if (typeAnswer == "singer") {
            MQ.answerTextD = MQ.game.add.text(0, 0, `${MQ.songRandomChoicedList[MQ.countQuiz][index].singer}`, {
                font: `55px Roboto`,
                fill: "black",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            MQ.answerTextD.anchor.set(0.5);
            // MQ.answerTextD.scale.set(1/MQ.configs.SCALE);
            MQ.answerD.value = MQ.songRandomChoicedList[MQ.countQuiz][index].singer;
            MQ.answerD.addChild(MQ.answerTextD);
            // MQ.songRandomChoiced.splice(0, 1);
        }
        if (MQ.answerD.value == MQ.songChoicedList[MQ.countQuiz].answer) {
            var ava_friend_challenge = MQ.game.add.sprite(-400, 0, 'friend-challenge-mini');
            ava_friend_challenge.anchor.set(0.5);
            ava_friend_challenge.kill();
            MQ.game.time.events.add(Phaser.Timer.SECOND * MQ.songChoicedList[MQ.countQuiz].timingFriendChallenged, () => {
                // console.log('events');
                // console.log('fuck');
                if (!MQ.isChallenged) {
                    ava_friend_challenge.revive();
                }
            });
            MQ.answerD.addChild(ava_friend_challenge);
        }
    },
    showTimeAnswerAndCalculatorScore: function (timeAnswer) {
        // console.log(timeAnswer);
        var timeAnswerToSecond = timeAnswer / 1000;
        // console.log(timeAnswerToSecond);
        MQ.score += Math.floor((11 - timeAnswerToSecond) * 100 * (Math.pow(11 - timeAnswerToSecond, (MQ.streak - 1) / 4)));
        MQ.streak++;
        var textTimeAnswer = MQ.game.add.text(MQ.game.width / 2, 1815, `${timeAnswerToSecond}s`, {
            font: `110px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        textTimeAnswer.anchor.set(0.5);
        // MQ.timeAnswerToData = 
        MQ.scoreText.setText(`${MQ.score}`);
    },
    addTimeAnswerToData: function (timeAnswer, trueORfalse, answer, typeAnswer, streak) {
        MQ.timeAnswerSaveToDataAndScore.time.push({
            "ID": MQ.songChoicedList[MQ.countQuiz].ID,
            "timeAnswer": timeAnswer,
            "trueORfalse": trueORfalse,
            "answer": answer,
            "typeAnswer": typeAnswer,
            "streak": streak
        });
    },
    calculateScoreOpp: function () {
        if (MQ.countQuiz <= 4) {
            if (!MQ.isChallenged) {
                // console.log(MQ.dataChallenge.time[MQ.countQuiz - 1].trueORfalse);
                if (MQ.dataChooseToChall.time[MQ.countQuiz].trueORfalse) {
                    // console.log(MQ.dataChallenge.time[MQ.countQuiz - 1].timeAnswer);
                    // console.log(MQ.dataChallenge.time[MQ.countQuiz - 1].streak);
                    var scoreOpp = Math.floor((11 - MQ.dataChooseToChall.time[MQ.countQuiz].timeAnswer) * 100 * (Math.pow(11 - MQ.dataChooseToChall.time[MQ.countQuiz].timeAnswer, ((MQ.dataChooseToChall.time[MQ.countQuiz].streak - 2) / 4))));
                    MQ.scoreOpp += scoreOpp;
                    MQ.scoreTextOpp.setText(`${MQ.scoreOpp}`);
                }
            }
        }
    },
    showCorrectAnswer: function () {
        if (MQ.answerA.value == MQ.songChoicedList[MQ.countQuiz].Song1 || MQ.answerA.value == MQ.songChoicedList[MQ.countQuiz].Singer1) {
            MQ.answerA.alpha = 1;
            MQ.answerTextA.addColor('#30FF77', 0);
        }
        if (MQ.answerB.value == MQ.songChoicedList[MQ.countQuiz].Song1 || MQ.answerB.value == MQ.songChoicedList[MQ.countQuiz].Singer1) {
            MQ.answerB.alpha = 1;
            MQ.answerTextB.addColor('#30FF77', 0);
        }
        if (MQ.answerC.value == MQ.songChoicedList[MQ.countQuiz].Song1 || MQ.answerC.value == MQ.songChoicedList[MQ.countQuiz].Singer1) {
            MQ.answerC.alpha = 1;
            MQ.answerTextC.addColor('#30FF77', 0);
        }
        if (MQ.answerD.value == MQ.songChoicedList[MQ.countQuiz].Song1 || MQ.answerD.value == MQ.songChoicedList[MQ.countQuiz].Singer1) {
            MQ.answerD.alpha = 1;
            MQ.answerTextD.addColor('#30FF77', 0);
        }
    }
}