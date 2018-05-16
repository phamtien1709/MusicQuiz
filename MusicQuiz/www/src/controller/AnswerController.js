class AnswerController {
    constructor(x, y, configs) {
        this.sprite = MQ.answerGroup.create(x, y, 'answer-tab');
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        // this.sprite.scale.setTo(MQ.configs.SCALE);
        this.sprite.update = this.update.bind(this);
        this.sprite.inputEnabled = true;
        this.configs = configs;
        this.choosed = false;
        this.sprite.events.onInputDown.add(() => {
            this.choosed = true;
            MQ.choosed = true;
            // console.log(this.answer);
            if ((this.answer == MQ.songChoiced.AnswerSong) || (this.answer == MQ.songChoiced.RightAnswer)) {
                MQ.firstCorrect = true;
                MQ.correctCount = MQ.indexSongChoiced.length;
                this.answerText.addColor("#01c66a", 0);
                // console.log(MQ.practiceModeScore);
                // alert(`${MQ.indexSongChoiced.length} right answer!`);
                if (MQ.indexSongChoiced.length - 1 > MQ.practiceModeScore) {
                    const obj = MQ.achievementPractice.filter(ele => ele.answer == MQ.indexSongChoiced.length);
                    MQ.practiceModeScore = MQ.indexSongChoiced.length - 1;
                    //update practiceModeScore
                    updatePracticeMode(MQ.practiceModeScore);
                    if (obj[0] !== undefined) {
                        MQ.diamond += obj[0].reward;
                        // ajax diamond
                        updateDiamond(MQ.diamond);
                        setTimeout(() => {
                            this.createRewardPopup(obj[0].reward, obj[0].answer);
                        }, 1000);
                    } else {
                        setTimeout(() => {
                            getSongToPractice(MQ.dataChoosed, () => {
                                MQ.inThisQuiz = false;
                                practiceState.startLoad();
                            });
                        }, 2500);
                    }
                } else {
                    const obj = MQ.achievementPractice.filter(ele => ele.answer == MQ.indexSongChoiced.length);
                    // console.log(obj);
                    if(obj[0] !== undefined){
                        setTimeout(() => {
                            this.createPopupNotReward(obj[0].answer);
                        }, 1000);
                    }
                    setTimeout(() => {
                        getSongToPractice(MQ.dataChoosed, () => {
                            MQ.inThisQuiz = false;
                            practiceState.startLoad();
                        });
                    }, 3000);
                }
            } else {
                if(MQ.firstCorrect){
                    MQ.correctCount = MQ.indexSongChoiced.length-1;
                } else {
                    MQ.correctCount = 0;
                }
                MQ.indexSongChoiced = [];
                this.answerText.addColor("#ff0000", 0);
                setTimeout(() => {
                    this.createLosePopup();
                }, 1500)
            }
        });
        this.answerText = MQ.game.add.text(0, 0, `${this.configs.answer.answer}`, {
            font: `50px Roboto`,
            fill: "black",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        this.answerText.anchor.set(0.5);
        // this.answerText.scale.set(1/MQ.configs.SCALE);
        this.sprite.addChild(this.answerText);
        this.answer = this.configs.answer.answer;
    }
    update() {
        if (MQ.choosed) {
            this.sprite.inputEnabled = false;
            if (this.choosed) {

            } else {
                this.sprite.alpha = 0.5;
                if ((this.answer == MQ.songChoiced.RightAnswer)) {
                    if (MQ.inThisQuiz) {
                        this.answerText.addColor("#30FF77", 0);
                    }
                }
            }
        }
    }
    createRewardPopup(val, num) {
        var screen_dim = MQ.game.add.button(0, 0, 'screen-dim');
        screen_dim.alpha = 0.8;
        var c_in = MQ.game.add.sprite(MQ.game.world.centerX, MQ.game.world.centerY - 100, 'circle-reward');
        c_in.anchor.set(0.5);
        c_in.scale.set(0.4);
        var c_stroke = MQ.game.add.sprite(0, 0, 'circle-stroke-reward');
        c_stroke.anchor.set(0.5);
        var lr = MQ.game.add.sprite(0, 0, 'lr-reward');
        lr.anchor.set(0.5);
        var diamond_reward = MQ.game.add.sprite(0, -50, 'diamond-reward');
        diamond_reward.anchor.set(0.5);
        var star_all = MQ.game.add.sprite(0, -50, 'starall-reward');
        star_all.anchor.set(0.5);
        star_all.scale.set(0.8);
        var congrat_reward = MQ.game.add.sprite(0, 350, 'congrat-reward');
        congrat_reward.anchor.set(0.5);
        //txt
        var txt_congrat = MQ.game.add.text(0, 20, `Bạn đã vượt qua`, {
            font: `36px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        txt_congrat.anchor.set(0.5);
        congrat_reward.addChild(txt_congrat);
        var txt_congrat2 = MQ.game.add.text(0, 60, `${num} câu hỏi`, {
            font: `36px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        txt_congrat2.anchor.set(0.5);
        congrat_reward.addChild(txt_congrat2);
        var tween = MQ.game.add.tween(star_all.scale).to({ x: 1, y: 1 }, 200, "Linear", true, 0, -1);
        tween.yoyo(true, 300);
        diamond_reward.addChild(star_all);
        var txt_bonus = MQ.game.add.text(0, 100, `+${val}`, {
            font: `80px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        txt_bonus.anchor.set(0.5);
        c_in.addChild(c_stroke);
        c_in.addChild(lr);
        c_in.addChild(congrat_reward);
        c_in.addChild(diamond_reward);
        c_in.addChild(txt_bonus);
        //tween
        var tween_core = MQ.game.add.tween(c_in.scale).to({ x: 1, y: 1 }, 2000, "Linear");
        tween_core.start();
        MQ.game.add.tween(lr).to({ angle: 360 }, 2000, "Linear", true);
        tween_core.onComplete.add(() => {
            setTimeout(() => {
                getSongToPractice(MQ.dataChoosed, () => {
                    MQ.inThisQuiz = false;
                    practiceState.startLoad();
                });
            }, 500);
            //TODO:
        });
    }
    createLosePopup() {
        let screen_dim = MQ.game.add.sprite(0, 0, 'screen-dim');
        screen_dim.alpha = 0.8;
        var box_lose_practice = MQ.game.add.button(MQ.game.world.centerX, MQ.game.world.centerY, 'box-lose-practice');
        box_lose_practice.anchor.set(0.5);
        var btn_replay = MQ.game.add.button(0, 365, 'btn-replay-lose-practice');
        btn_replay.anchor.set(0.5);
        box_lose_practice.addChild(btn_replay);
        var btn_home = MQ.game.add.button(-346, 185, 'btn-home-lose-practice');
        btn_home.anchor.set(0.5);
        box_lose_practice.addChild(btn_home);
        //90, 185
        var btn_rank = MQ.game.add.button(90, 185, 'btn-rank-practice');
        btn_rank.anchor.set(0.5);
        box_lose_practice.addChild(btn_rank);
        var disc = MQ.game.add.sprite(0, -252, 'disc-lose-practice');
        disc.anchor.set(0.5);
        box_lose_practice.addChild(disc);
        var txt_lose = MQ.game.add.text(0, -29, 'BẠN ĐÃ TRẢ LỜI SAI', {
            font: `45px Roboto`,
            fill: "black",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        txt_lose.anchor.set(0.5);
        box_lose_practice.addChild(txt_lose);
        btn_replay.events.onInputDown.add(() => {
            MQ.firstCorrect = false;
            MQ.indexSongChoiced = [];
            getSongToPractice(MQ.dataChoosed, () => {
                MQ.inThisQuiz = false;
                practiceState.startLoad();
            });
        });
        btn_home.events.onInputDown.add(() => {
            MQ.songChoicedPlay.stop();
            MQ.loadFirst = true;
            MQ.game.state.start('win');
        });
        btn_rank.events.onInputDown.add(()=>{
            MQ.songChoicedPlay.stop();
            MQ.isCheckRank = true;
            MQ.game.state.start('win');
        });
    }
    createPopupNotReward (answer) {
        // console.log(`Bạn đã đạt mốc: ${answer}`);
        var screen_dim = MQ.game.add.button(0, 0, 'screen-dim');
        screen_dim.alpha = 0.8;
        var congrat_reward = MQ.game.add.sprite(MQ.game.world.centerX, MQ.game.world.centerY, 'congrat-reward');
        congrat_reward.anchor.set(0.5);
        //txt
        var txt_congrat = MQ.game.add.text(0, 20, `Bạn đã vượt qua`, {
            font: `36px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        txt_congrat.anchor.set(0.5);
        congrat_reward.addChild(txt_congrat);
        var txt_congrat2 = MQ.game.add.text(0, 60, `${answer} câu hỏi`, {
            font: `36px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        txt_congrat2.anchor.set(0.5);
        congrat_reward.addChild(txt_congrat2);
    }
}