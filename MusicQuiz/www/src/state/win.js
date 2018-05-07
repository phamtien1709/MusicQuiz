var winState = {
    preload: function () {
        this.game.sound.context.resume();
    },
    create: function () {
        // showConsole('Win Screen');
        var ava = MQ.game.add.sprite(200 * MQ.configs.SCALE, 200 * MQ.configs.SCALE, 'ava_fb');
        ava.anchor.set(0.5);
        ava.scale.set(MQ.configs.SCALE);
        var nameFB = MQ.game.add.text(400 * MQ.configs.SCALE, 200 * MQ.configs.SCALE, `${MQ.nameFB}`, {
            font: `65px Roboto`,
            fill: "black",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        nameFB.anchor.set(0, 0.5);
        //
        //********************************************** */
        //********************************************* */
        if (MQ.practiceMode) {
            var scoreText = MQ.game.add.text(MQ.game.width / 2, 300 * MQ.configs.SCALE, `${MQ.indexSongChoiced.length} right answer!`, {
                font: `50px Roboto`,
                fill: "black",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
        } else {
            if (MQ.responseChallen !== undefined) {
                // console.log(MQ.responseChallen);
                var objFilter = MQ.responseChallen.findIndex((ele) => {
                    return ele.data.idData == MQ.linkDB;
                })
                MQ.idRequest = MQ.responseChallen[objFilter].id;
            }
            var scoreText = MQ.game.add.text(MQ.game.width / 2, 300 * MQ.configs.SCALE, `${MQ.score}`, {
                font: `50px Roboto`,
                fill: "black",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            scoreText.anchor.set(0.5);
            if (!MQ.isChallenged) {
                var avaOpp = MQ.game.add.sprite(200 * MQ.configs.SCALE, MQ.game.height - 200 * MQ.configs.SCALE, 'ava_fb_friend');
                avaOpp.anchor.set(0.5);
                avaOpp.scale.set(MQ.configs.SCALE);
                var nameFBOpp = MQ.game.add.text(400 * MQ.configs.SCALE, MQ.game.height - 200 * MQ.configs.SCALE, `${MQ.nameFriendChallenge}`, {
                    font: `50px Roboto`,
                    fill: "black",
                    boundsAlignH: "center",
                    boundsAlignV: "middle"
                });
                nameFBOpp.anchor.set(0, 0.5);
                var scoreTextOpp = MQ.game.add.text(MQ.game.width / 2, MQ.game.height - 300 * MQ.configs.SCALE, `${MQ.scoreOpp}`, {
                    font: `50px Roboto`,
                    fill: "black",
                    boundsAlignH: "center",
                    boundsAlignV: "middle"
                });
                scoreTextOpp.anchor.set(0.5);
                if (MQ.score > MQ.scoreOpp) {
                    MQ.responseChallen[objFilter].data.scoreYour = 1;
                    var result = MQ.game.add.text(MQ.game.width / 2, MQ.game.height / 2 - 100, 'WIN!', {
                        font: `50px Roboto`,
                        fill: "black",
                        boundsAlignH: "center",
                        boundsAlignV: "middle"
                    });
                    result.anchor.set(0.5);
                } else {
                    MQ.responseChallen[objFilter].data.scoreTheir = 1;
                    var result = MQ.game.add.text(MQ.game.width / 2, MQ.game.height / 2 - 100, 'LOSE!', {
                        font: `50px Roboto`,
                        fill: "black",
                        boundsAlignH: "center",
                        boundsAlignV: "middle"
                    });
                    result.anchor.set(0.5);
                }
            }
            // handle request
            if (MQ.isChallenged) {
                postRequestToDB(() => {
                    // console.log(MQ.idDataChallenge);
                    console.log('postRequestToDB');
                    postRequestChallengeToFriend(() => {
                        console.log('postRequestChallengeToFriend');
                    });
                });
            } else {
                console.log(MQ.idRequest);
                if (MQ.idRequest !== undefined) {
                    deleteRequest(MQ.idRequest);
                }
            }
        }
        //
        var btn_home = MQ.game.add.button(MQ.game.width / 2, MQ.game.height / 2, 'btn-rehome');
        btn_home.scale.set(MQ.configs.SCALE - 0.1);
        btn_home.anchor.set(0.5);
        btn_home.events.onInputDown.add(() => {
            MQ.game.state.start('menu');
        });
    },
    update: function () {

    },
    render: function () {

    }
}