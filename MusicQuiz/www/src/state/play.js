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
        MQ.answerPlayGroup = MQ.game.add.group();
        MQ.inThisQuiz = true;
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
                        MQ.answerA = new AnswerPlayController(MQ.game.width / 2, 898 + (i * 220), {
                            "index": i
                        });
                        // this.createAnswerTabA(i);
                    }
                    if (i == 1) {
                        // this.createAnswerTabB(i);
                        MQ.answerB = new AnswerPlayController(MQ.game.width / 2, 898 + (i * 220), {
                            "index": i
                        });
                    }
                    if (i == 2) {
                        // this.createAnswerTabC(i);
                        MQ.answerC = new AnswerPlayController(MQ.game.width / 2, 898 + (i * 220), {
                            "index": i
                        });
                    }
                    if (i == 3) {
                        // this.createAnswerTabD(i);
                        MQ.answerD = new AnswerPlayController(MQ.game.width / 2, 898 + (i * 220), {
                            "index": i
                        });
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
                        // console.log(i);
                        MQ.answerA = new AnswerPlayController(MQ.game.width / 2, 898 + (i * 220), {
                            "index": i
                        });
                        // this.createAnswerTabA(i);
                    }
                    if (i == 1) {
                        // this.createAnswerTabB(i);
                        MQ.answerB = new AnswerPlayController(MQ.game.width / 2, 898 + (i * 220), {
                            "index": i
                        });
                    }
                    if (i == 2) {
                        // this.createAnswerTabC(i);
                        MQ.answerC = new AnswerPlayController(MQ.game.width / 2, 898 + (i * 220), {
                            "index": i
                        });
                    }
                    if (i == 3) {
                        // this.createAnswerTabD(i);
                        MQ.answerD = new AnswerPlayController(MQ.game.width / 2, 898 + (i * 220), {
                            "index": i
                        });
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
                                MQ.answerA = new AnswerPlayController(MQ.game.width / 2, 898 + (i * 220), {
                                    "index": i
                                });
                                // this.createAnswerTabA(i);
                            }
                            if (i == 1) {
                                // this.createAnswerTabB(i);
                                MQ.answerB = new AnswerPlayController(MQ.game.width / 2, 898 + (i * 220), {
                                    "index": i
                                });
                            }
                            if (i == 2) {
                                // this.createAnswerTabC(i);
                                MQ.answerC = new AnswerPlayController(MQ.game.width / 2, 898 + (i * 220), {
                                    "index": i
                                });
                            }
                            if (i == 3) {
                                // this.createAnswerTabD(i);
                                MQ.answerD = new AnswerPlayController(MQ.game.width / 2, 898 + (i * 220), {
                                    "index": i
                                });
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