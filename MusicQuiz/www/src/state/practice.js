var practiceState = {
    preload: function () {
        MQ.game.load.onLoadStart.removeAll();
        MQ.game.load.onFileComplete.removeAll();
        MQ.game.load.onLoadComplete.removeAll();
        this.game.sound.context.resume();
    },
    create: function () {
        // showConsole('Practice Screen');
        // sprite ava tween to number of answer
        MQ.practiceLoadDone = false;
        //
        // console.log(MQ.indexSongChoiced);
        // console.log(MQ.countQuiz);
        var bg = MQ.game.add.sprite(0, 0, 'bg-practice');
        bg.width = MQ.game.width;
        bg.height = MQ.game.height;
        // var typeAnswer = ["song", "singer"];
        var randomTypeAnswer = Math.floor(Math.random() * 1.9999);
        MQ.answerGroup = MQ.game.add.group();
        // variable
        MQ.choosed = false;
        MQ.inThisQuiz = true;
        // mask ava in front  of ava sprite 
        var maskAva = MQ.game.add.graphics(0, 0);
        maskAva.beginFill(0xffffff);
        maskAva.drawCircle(MQ.game.width / 2, 182, 241);
        maskAva.anchor.set(0.5);
        //fsf
        var ava = MQ.game.add.button(MQ.game.width / 2, 182, 'ava_fb');
        ava.anchor.set(0.5);
        // ava.scale.set(MQ.configs.SCALE);
        ava.mask = maskAva;
        //
        var nameFB = MQ.game.add.text(MQ.game.width / 2, 340, `${MQ.nameFB}`, {
            font: `35px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        nameFB.anchor.set(0.5);
        var map = MQ.game.add.sprite(MQ.game.world.centerX, 693.5, 'map-practice');
        map.anchor.set(0.5);
        // map.scale.set(MQ.configs.SCALE);
        var btn_home = MQ.game.add.button(1000, 80, 'arrow-go');
        btn_home.anchor.set(0.5);
        // btn_home.scale.set(MQ.configs.SCALE);
        btn_home.events.onInputDown.add(() => {
            // alert('You really want to come Menu. OK to confirm!');
            MQ.songChoicedPlay.stop();
            MQ.loadFirst = true;
            MQ.game.state.start('win');
        });
        //create answer and diamond text
        for (obj in MQ.posAchievementPractice) {
            // console.log(MQ.posAchievementPractice[obj]);
            this.CreateAnswerAndDiamondText(
                MQ.posAchievementPractice[obj].answerPosX,
                MQ.posAchievementPractice[obj].answerPosY,
                MQ.posAchievementPractice[obj].diamondPosX,
                MQ.posAchievementPractice[obj].diamondPosY,
                MQ.achievementPractice[obj].answer,
                MQ.achievementPractice[obj].reward,
                MQ.posCirclePractice[obj].x,
                MQ.posCirclePractice[obj].y);
        }
        //create dot answer target
        this.createDotAnswered();
        //
        for (i = 0; i < 4; i++) {
            if (i == 0) {
                // console.log(i);
                MQ.answerA = new AnswerController(MQ.game.width / 2, (1146 + (i * 210)), {
                    "answer": MQ.songRandomChoiced[i],
                    "value": "A"
                });
            }
            if (i == 1) {
                MQ.answerB = new AnswerController(MQ.game.width / 2, (1146 + (i * 210)), {
                    "answer": MQ.songRandomChoiced[i],
                    "value": "B"
                });
            }
            if (i == 2) {
                MQ.answerC = new AnswerController(MQ.game.width / 2, (1146 + (i * 210)), {
                    "answer": MQ.songRandomChoiced[i],
                    "value": "C"
                });
            }
            if (i == 3) {
                MQ.answerD = new AnswerController(MQ.game.width / 2, (1146 + (i * 210)), {
                    "answer": MQ.songRandomChoiced[i],
                    "value": "D"
                });
            }
        }
        var spriteTime = MQ.game.add.sprite(0, 1020, 'tween-time');
        // spriteTime.scale.set(MQ.configs.SCALE);
        spriteTime.anchor.set(0, 0.5);
        var tweenSpriteTime = MQ.game.add.tween(spriteTime.scale).to({ x: MQ.configs.SCALE * 60, y: MQ.configs.SCALE }, 10000, "Linear");
        tweenSpriteTime.start();
        //
        practiceState.load.onLoadStart.add(this.loadStart, this);
        practiceState.load.onFileComplete.add(this.fileComplete, this);
        practiceState.load.onLoadComplete.add(this.loadComplete, this);
        MQ.songChoicedPlay = MQ.game.add.audio('songChoiced');
        MQ.songChoicedPlay.play();
        tweenSpriteTime.onComplete.add(() => {
            if (!MQ.choosed) {
                setTimeout(() => {
                    this.createTimeoutLostPopup();
                }, 1500);
            }
        });
    },
    update: function () {

    },
    render: function () {

    },
    startLoad: function () {
        if (MQ.practiceMode) {
            MQ.game.load.audio('songChoiced', `./img/assets/mp3Song/${MQ.songChoiced.FileName}`);
        }
        practiceState.load.start();
    },
    loadStart: function () {
        // showConsole('Loading...');
    },
    fileComplete: function (progress, cacheKey, success, totalLoaded, totalFiles) {
        // showConsole(`File Complete: ${progress}% - ${totalLoaded} out of ${totalFiles}`);
    },
    loadComplete: function () {
        if (!MQ.practiceLoadDone) {
            MQ.practiceLoadDone = true;
            MQ.songChoicedPlay.stop();
            MQ.game.state.restart();
        }
    },
    CreateAnswerAndDiamondText: function (answerPosX, answerPosY, diamondPosX, diamondPosY, valAnswer, valReward, posCircleX, posCircleY) {
        const diamond = MQ.game.add.sprite((diamondPosX + 10), (diamondPosY), 'diamond');
        diamond.anchor.set(0, 0.5);
        diamond.scale.set(0.7);
        // diamond.scale.set(MQ.configs.SCALE);
        const txt_diamond = MQ.game.add.text((diamondPosX), diamondPosY, `${valReward}`, {
            font: `35px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        txt_diamond.anchor.set(1, 0.5);
        const txt_answered = MQ.game.add.text(answerPosX, answerPosY, `${valAnswer}`, {
            font: `35px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        })
        txt_answered.anchor.set(0.5);
        if (MQ.indexSongChoiced.length - 1 >= valAnswer) {
            txt_answered.alpha = 1;
            // if(MQ.indexSongChoiced.length - 1 == valAnswer){
            const circle = MQ.game.add.sprite(posCircleX, posCircleY, 'circle-active');
            circle.anchor.set(0.5);
            // circle.scale.set(MQ.configs.SCALE);
            // }
        } else {
            txt_answered.alpha = 0.5;
        }
    },
    createTimeoutLostPopup: function () {
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
        var disc = MQ.game.add.sprite(0, -252, 'timeout-lose-practice');
        disc.anchor.set(0.5);
        box_lose_practice.addChild(disc);
        var txt_lose = MQ.game.add.text(0, -29, 'HẾT GIỜ! BẠN ĐÃ THUA', {
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
        btn_rank.events.onInputDown.add(() => {
            MQ.isCheckRank = true;
            MQ.game.state.start('win');
        });
    },
    createDotAnswered: function () {
        // console.log(MQ.indexSongChoiced.length - 1);
        var objDot = MQ.posDotPractice.find((ele) => {
            return ele.num == MQ.indexSongChoiced.length - 1;
        });
        // console.log(objDot);
        if (objDot !== undefined) {
            var dot = MQ.game.add.sprite(objDot.x, objDot.y, 'dot_practice');
            dot.anchor.set(0.5);
            if ((objDot.num > 2 && objDot.num < 8) || (objDot.num > 12 && objDot.num < 25) || (objDot.num > 33 && objDot.num < 56)) {
                var num = MQ.game.add.text(objDot.x, objDot.y + 20, `${objDot.num}`, {
                    font: `34px Roboto`,
                    fill: "white",
                    boundsAlignH: "center",
                    boundsAlignV: "middle",
                    fontWeight: 400
                });
                num.anchor.set(0.5, 0);
            } else if (objDot.num > 8 && objDot.num < 12) {
                var num = MQ.game.add.text(objDot.x + 20, objDot.y, `${objDot.num}`, {
                    font: `34px Roboto`,
                    fill: "white",
                    boundsAlignH: "center",
                    boundsAlignV: "middle",
                    fontWeight: 400
                });
                num.anchor.set(0, 0.5);
            } else if (objDot.num > 25 && objDot.num < 33) {
                var num = MQ.game.add.text(objDot.x - 20, objDot.y, `${objDot.num}`, {
                    font: `34px Roboto`,
                    fill: "white",
                    boundsAlignH: "center",
                    boundsAlignV: "middle",
                    fontWeight: 400
                });
                num.anchor.set(1, 0.5);
            }
        }
        // for (dot in MQ.posDotPractice){
        //     var dot = MQ.game.add.sprite(MQ.posDotPractice[dot].x, MQ.posDotPractice[dot].y, 'dot_practice');
        //     dot.anchor.set(0.5);
            // if ((MQ.posDotPractice[dot].num > 2 && MQ.posDotPractice[dot].num < 8) || (MQ.posDotPractice[dot].num > 12 && MQ.posDotPractice[dot].num < 25) || (MQ.posDotPractice[dot].num > 33 && MQ.posDotPractice[dot].num < 56)) {
            //     var num = MQ.game.add.text(MQ.posDotPractice[dot].x, MQ.posDotPractice[dot].y + 20, `${MQ.posDotPractice[dot].num}`, {
            //         font: `34px Roboto`,
            //         fill: "white",
            //         boundsAlignH: "center",
            //         boundsAlignV: "middle",
            //         fontWeight: 400
            //     });
            //     num.anchor.set(0.5, 0);
            // } else if (MQ.posDotPractice[dot].num > 8 && MQ.posDotPractice[dot].num < 12) {
            //     var num = MQ.game.add.text(MQ.posDotPractice[dot].x + 20, MQ.posDotPractice[dot].y, `${MQ.posDotPractice[dot].num}`, {
            //         font: `34px Roboto`,
            //         fill: "white",
            //         boundsAlignH: "center",
            //         boundsAlignV: "middle",
            //         fontWeight: 400
            //     });
            //     num.anchor.set(0, 0.5);
            // } else if (MQ.posDotPractice[dot].num > 25 && MQ.posDotPractice[dot].num < 33) {
            //     var num = MQ.game.add.text(MQ.posDotPractice[dot].x - 20, MQ.posDotPractice[dot].y, `${MQ.posDotPractice[dot].num}`, {
            //         font: `34px Roboto`,
            //         fill: "white",
            //         boundsAlignH: "center",
            //         boundsAlignV: "middle",
            //         fontWeight: 400
            //     });
            //     num.anchor.set(1, 0.5);
            // }
        // }
    }
}