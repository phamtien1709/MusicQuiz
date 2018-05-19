class AnswerPlayController {
    constructor(x, y, configs) {
        this.sprite = MQ.game.add.button(x, y, 'answer-tab');
        // MQ.answerA.scale.set(MQ.configs.SCALE);
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.update = this.update.bind(this);
        this.sprite.inputEnabled = true;
        this.configs = configs;
        this.choosed = false;
        this.sprite.events.onInputDown.add(() => {
            this.choosed = true;
            MQ.choosed = true;
            // playState.showCorrectAnswer();
            playState.calculateScoreOpp();
            if (this.sprite.value == MQ.songChoicedList[MQ.countQuiz].RightAnswer) {
                if (MQ.timeCounter.ms <= 10000) {
                    playState.showTimeAnswerAndCalculatorScore(MQ.timeCounter.ms);
                    playState.addTimeAnswerToData(MQ.timeCounter.ms / 1000, true, this.sprite.value, MQ.streak);
                    // correct.revive();
                    this.answerText.addColor('#01c66a', 0);
                    MQ.correctList.push({
                        "countQuiz": MQ.countQuiz,
                        "time": (MQ.timeCounter.ms / 1000).toFixed(1)
                    });
                } else {
                    playState.showTimeAnswerAndCalculatorScore(10000);
                    playState.addTimeAnswerToData(10, true, this.sprite.value, MQ.streak);
                    // correct.revive();
                    this.answerText.addColor('#01c66a', 0);
                    MQ.correctList.push({
                        "countQuiz": MQ.countQuiz,
                        "time": 10
                    });
                }
            } else {
                MQ.streak = 1;
                if (MQ.timeCounter.ms <= 10000) {
                    playState.addTimeAnswerToData(MQ.timeCounter.ms / 1000, false, this.sprite.value, MQ.streak);
                    // wrong.revive();
                    this.answerText.addColor('#ff0000', 0);
                    MQ.wrongList.push(MQ.countQuiz);
                } else {
                    playState.addTimeAnswerToData(10, false, this.sprite.value, MQ.streak);
                    // wrong.revive();
                    this.answerText.addColor('#ff0000', 0);
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
        // console.log(this.configs.index);
        this.answerText = MQ.game.add.text(0, 0, `${MQ.songRandomChoicedList[MQ.countQuiz][this.configs.index].answer}`, {
            font: `50px Roboto`,
            fill: "black",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        this.answerText.anchor.set(0.5);
        // this.answerText.scale.set(1/MQ.configs.SCALE);
        this.sprite.value = MQ.songRandomChoicedList[MQ.countQuiz][this.configs.index].answer;
        this.sprite.addChild(this.answerText);
        // MQ.songRandomChoiced.splice(0, 1);
        // console.log(MQ.answerA.value);
        // console.log(MQ.songChoicedList);
        if (this.sprite.value == MQ.songChoicedList[MQ.countQuiz].answer) {
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
            this.sprite.addChild(maskAvaFriend);
            this.sprite.addChild(ava_friend_challenge);
        }
    }
    update() {
        if (MQ.choosed) {
            this.sprite.inputEnabled = false;
            if (this.choosed) {

            } else {
                this.sprite.alpha = 0.5;
                if ((this.sprite.value == MQ.songChoicedList[MQ.countQuiz].RightAnswer)) {
                    if (MQ.inThisQuiz) {
                        this.sprite.alpha = 1;
                        this.answerText.addColor("#30FF77", 0);
                    }
                }
            }
        }
    }
}