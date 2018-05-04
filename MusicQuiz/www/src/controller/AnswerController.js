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
            if ((this.answer == MQ.songChoiced.AnswerSong) || (this.answer == MQ.songChoiced.AnswerSinger)) {
                this.answerText.addColor("#30FF77", 0);
                // console.log(MQ.practiceModeScore);
                alert(`${MQ.indexSongChoiced.length} right answer!`);
                if (MQ.indexSongChoiced.length - 1 > MQ.practiceModeScore) {
                    const obj = MQ.achievementPractice.filter(ele => ele.answer == MQ.indexSongChoiced.length);
                    MQ.practiceModeScore = MQ.indexSongChoiced.length;
                    //update practiceModeScore
                    updatePracticeMode(MQ.practiceModeScore);
                    // console.log(obj[0]);
                    if (obj[0] !== undefined) {
                        alert(`Your reward: ${obj[0].reward} diamond!`);
                        MQ.diamond += obj[0].reward;
                        // ajax diamond
                        updateDiamond(MQ.diamond);
                    }
                }
            } else {
                MQ.indexSongChoiced = [];
                alert('You lose! Game will replay automatically.');
                this.answerText.addColor("#ff0000", 0);
            }
            // console.log(MQ.indexSongChoiced);
            setTimeout(() => {
                getSongToPractice(() => {
                    MQ.inThisQuiz = false;
                    practiceState.startLoad();
                });
            }, 3000);
            // if(this.answer == MQ.song){

            // }
        });
        if (this.configs.answer.typeAnswer == "song") {
            this.answerText = MQ.game.add.text(0, 0, `${this.configs.answer.song}`, {
                font: `70px Roboto`,
                fill: "black",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            this.answerText.anchor.set(0.5);
            // this.answerText.scale.set(1/MQ.configs.SCALE);
            this.sprite.addChild(this.answerText);
            this.answer = this.configs.answer.song;
        } else {
            this.answerText = MQ.game.add.text(0, 0, `${this.configs.answer.singer}`, {
                font: `70px Roboto`,
                fill: "black",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            this.answerText.anchor.set(0.5);
            // this.answerText.scale.set(1/MQ.configs.SCALE);
            this.sprite.addChild(this.answerText);
            this.answer = this.configs.answer.singer;
        }
    }
    update() {
        if (MQ.choosed) {
            this.sprite.inputEnabled = false;
            if (this.choosed) {

            } else {
                this.sprite.alpha = 0.5;
                if ((this.answer == MQ.songChoiced.AnswerSong) || (this.answer == MQ.songChoiced.AnswerSinger)) {
                    if (MQ.inThisQuiz) {
                        this.answerText.addColor("#30FF77", 0);
                    }
                }
            }
        }
    }
}