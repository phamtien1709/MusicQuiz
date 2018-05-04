var practiceState = {
    preload: function () {
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
        var typeAnswer = ["song", "singer"];
        var randomTypeAnswer = Math.floor(Math.random() * 1.9999);
        MQ.answerGroup = MQ.game.add.group();
        // variable
        MQ.choosed = false;
        MQ.inThisQuiz = true;
        // mask ava in front  of ava sprite 
        var maskAva = MQ.game.add.graphics(0, 0);
        maskAva.beginFill(0xffffff);
        maskAva.drawCircle(MQ.game.width / 2, 182 * MQ.configs.SCALE, 200 * MQ.configs.SCALE);
        maskAva.anchor.set(0.5);
        //fsf
        var ava = MQ.game.add.button(MQ.game.width / 2, 182 * MQ.configs.SCALE, 'ava_fb');
        ava.anchor.set(0.5);
        // ava.scale.set(MQ.configs.SCALE);
        ava.mask = maskAva;
        //
        var nameFB = MQ.game.add.text(MQ.game.width / 2, 340 * MQ.configs.SCALE, `${MQ.nameFB}`, {
            font: `70px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        nameFB.anchor.set(0.5);
        var map = MQ.game.add.sprite(MQ.game.world.centerX, 693.5 * MQ.configs.SCALE, 'map-practice');
        map.anchor.set(0.5);
        // map.scale.set(MQ.configs.SCALE);
        var btn_home = MQ.game.add.button(142 * MQ.configs.SCALE, 112 * MQ.configs.SCALE, 'btn-rehome');
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
        //
        for (i = 0; i < 4; i++) {
            if (i == 0) {
                // console.log(i);
                MQ.answerA = new AnswerController(MQ.game.width / 2, (1146 + (i * 210)) * MQ.configs.SCALE, {
                    "answer": MQ.songRandomChoiced[i],
                    "typeAnswer": typeAnswer[randomTypeAnswer],
                    "value": "A"
                });
            }
            if (i == 1) {
                MQ.answerB = new AnswerController(MQ.game.width / 2, (1146 + (i * 210)) * MQ.configs.SCALE, {
                    "answer": MQ.songRandomChoiced[i],
                    "typeAnswer": typeAnswer[randomTypeAnswer],
                    "value": "B"
                });
            }
            if (i == 2) {
                MQ.answerC = new AnswerController(MQ.game.width / 2, (1146 + (i * 210)) * MQ.configs.SCALE, {
                    "answer": MQ.songRandomChoiced[i],
                    "typeAnswer": typeAnswer[randomTypeAnswer],
                    "value": "C"
                });
            }
            if (i == 3) {
                MQ.answerD = new AnswerController(MQ.game.width / 2, (1146 + (i * 210)) * MQ.configs.SCALE, {
                    "answer": MQ.songRandomChoiced[i],
                    "typeAnswer": typeAnswer[randomTypeAnswer],
                    "value": "D"
                });
            }
        }
        var spriteTime = MQ.game.add.sprite(0, 1020 * MQ.configs.SCALE, 'tween-time');
        // spriteTime.scale.set(MQ.configs.SCALE);
        spriteTime.anchor.set(0, 0.5);
        var tweenSpriteTime = MQ.game.add.tween(spriteTime.scale).to({ x: MQ.configs.SCALE * 60, y: MQ.configs.SCALE }, 10000, "Linear");
        tweenSpriteTime.start();
        //
        // console.log(MQ.songChoiced);
        // var txt_answered = MQ.game.add.text(MQ.game.world.centerX, 200 * MQ.configs.SCALE, `${MQ.indexSongChoiced.length - 1}/51`, {
        //     font: `40px Roboto`,
        //     fill: "white",
        //     boundsAlignH: "center",
        //     boundsAlignV: "middle"
        // });
        practiceState.load.onLoadStart.add(this.loadStart, this);
        practiceState.load.onFileComplete.add(this.fileComplete, this);
        practiceState.load.onLoadComplete.add(this.loadComplete, this);
        MQ.songChoicedPlay = MQ.game.add.audio('songChoiced');
        MQ.songChoicedPlay.play();
        tweenSpriteTime.onComplete.add(() => {
            if (!MQ.choosed) {
                alert('You lose! Game will replay automatically.');
                MQ.indexSongChoiced = [];
                MQ.songChoicedPlay.stop();
                getSongToPractice(() => {
                    this.startLoad();
                });
            }
        });
    },
    update: function () {

    },
    render: function () {

    },
    startLoad: function () {
        if (MQ.practiceMode) {
            MQ.game.load.audio('songChoiced', `./img/assets/mp3Song/${MQ.songChoiced.Namefile}`);
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
        const diamond = MQ.game.add.sprite((diamondPosX + 10) * MQ.configs.SCALE, (diamondPosY - 10) * MQ.configs.SCALE, 'diamond');
        diamond.anchor.set(0, 0.5);
        // diamond.scale.set(MQ.configs.SCALE);
        const txt_diamond = MQ.game.add.text((diamondPosX) * MQ.configs.SCALE, diamondPosY * MQ.configs.SCALE, `${valReward}`, {
            font: `${45 * MQ.configs.SCALE}px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        txt_diamond.anchor.set(1, 0.5);
        const txt_answered = MQ.game.add.text(answerPosX * MQ.configs.SCALE, answerPosY * MQ.configs.SCALE, `${valAnswer}`, {
            font: `${45 * MQ.configs.SCALE}px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        })
        txt_answered.anchor.set(0.5);
        if (MQ.indexSongChoiced.length - 1 >= valAnswer) {
            txt_answered.alpha = 1;
            // if(MQ.indexSongChoiced.length - 1 == valAnswer){
            const circle = MQ.game.add.sprite(posCircleX * MQ.configs.SCALE, posCircleY * MQ.configs.SCALE, 'circle-active');
            circle.anchor.set(0.5);
            // circle.scale.set(MQ.configs.SCALE);
            // }
        } else {
            txt_answered.alpha = 0.5;
        }
    }
}