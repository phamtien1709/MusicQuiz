var practiceState = {
    preload: function () {

    },
    create: function () {
        showConsole('Practice Screen');
        // sprite ava tween to number of answer

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
        //
        for (i = 0; i < 4; i++) {
            if (i == 0) {
                // console.log(i);
                MQ.answerA = new AnswerController(MQ.game.width / 2, (800 + (i * 255)) * MQ.configs.SCALE, {
                    "answer": MQ.songRandomChoiced[i],
                    "typeAnswer": typeAnswer[randomTypeAnswer],
                    "value": "A"
                });
            }
            if (i == 1) {
                MQ.answerB = new AnswerController(MQ.game.width / 2, (800 + (i * 255)) * MQ.configs.SCALE, {
                    "answer": MQ.songRandomChoiced[i],
                    "typeAnswer": typeAnswer[randomTypeAnswer],
                    "value": "B"
                });
            }
            if (i == 2) {
                MQ.answerC = new AnswerController(MQ.game.width / 2, (800 + (i * 255)) * MQ.configs.SCALE, {
                    "answer": MQ.songRandomChoiced[i],
                    "typeAnswer": typeAnswer[randomTypeAnswer],
                    "value": "C"
                });
            }
            if (i == 3) {
                MQ.answerD = new AnswerController(MQ.game.width / 2, (800 + (i * 255)) * MQ.configs.SCALE, {
                    "answer": MQ.songRandomChoiced[i],
                    "typeAnswer": typeAnswer[randomTypeAnswer],
                    "value": "D"
                });
            }
        }
        var spriteTime = MQ.game.add.sprite(0, 654 * MQ.configs.SCALE, 'tween-time');
        spriteTime.scale.set(MQ.configs.SCALE);
        spriteTime.anchor.set(0, 0.5);
        var tweenSpriteTime = MQ.game.add.tween(spriteTime.scale).to({ x: MQ.configs.SCALE * 60, y: MQ.configs.SCALE }, 10000, "Linear");
        tweenSpriteTime.start();
        //
        // console.log(MQ.songChoiced);
        MQ.game.load.onLoadStart.add(this.loadStart, this);
        MQ.game.load.onFileComplete.add(this.fileComplete, this);
        MQ.game.load.onLoadComplete.add(this.loadComplete, this);
        MQ.songChoicedPlay = MQ.game.add.audio('songChoiced');
        MQ.songChoicedPlay.play();
        tweenSpriteTime.onComplete.add(() => {
            if (!MQ.choosed) {
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
        MQ.game.load.start();
    },
    loadStart: function () {
        showConsole('Loading...');
    },
    fileComplete: function (progress, cacheKey, success, totalLoaded, totalFiles) {
        showConsole(`File Complete: ${progress}% - ${totalLoaded} out of ${totalFiles}`);
    },
    loadComplete: function () {
        MQ.game.state.restart();
    }
}