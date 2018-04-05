class AnswerController {
    constructor(x, y, configs) {
        this.sprite = MQ.answerGroup.create(x, y, 'answer-tab');
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.scale.setTo(MQ.configs.SCALE);
        this.sprite.update = this.update.bind(this);
        this.sprite.inputEnabled = true;
        this.configs = configs;
        // console.log(this.configs);
        this.choosed = false;
        this.sprite.events.onInputDown.add(() => {
            this.choosed = true;
            MQ.choosed = true;
            // MQ.answerB.choosed = true;
            // MQ.answerC.choosed = true;
            // MQ.answerD.choosed = true;
            // MQ.choosed = true;
            console.log(this.answer);
            if ((this.answer == MQ.songChoiced.AnswerSong) || (this.answer == MQ.songChoiced.AnswerSinger)) {
                this.answerText.addColor("#30FF77", 0);
            } else {
                this.answerText.addColor("#ff0000", 0);
            }
            // if(this.answer == MQ.song){

            // }
        });
        if (this.configs.answer.typeAnswer == "song") {
            this.answerText = MQ.game.add.text(0, 0, `${this.configs.answer.song}`, {
                font: `60px Roboto`,
                fill: "black",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            this.answerText.anchor.set(0.5);
            this.sprite.addChild(this.answerText);
            this.answer = this.configs.answer.song;
        } else {
            this.answerText = MQ.game.add.text(0, 0, `${this.configs.answer.singer}`, {
                font: `60px Roboto`,
                fill: "black",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            this.answerText.anchor.set(0.5);
            this.sprite.addChild(this.answerText);
            this.answer = this.configs.answer.singer;
        }
    }
    update() {
        if (MQ.choosed) {
            if (this.choosed) {

            } else {
                this.sprite.alpha = 0.5;
                if ((this.answer == MQ.songChoiced.AnswerSong) || (this.answer == MQ.songChoiced.AnswerSinger)) {
                    this.answerText.addColor("#30FF77", 0);
                }
            }
            // this.sprite.scale.setTo(MQ.configs.SCALE + 0.2);
        }
    }
}