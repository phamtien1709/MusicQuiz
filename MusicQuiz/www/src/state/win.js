var winState = {
    preload: function () {
        MQ.game.load.onLoadStart.removeAll();
        MQ.game.load.onFileComplete.removeAll();
        MQ.game.load.onLoadComplete.removeAll();
        //bg loading
        this.game.stage.background = MQ.game.add.sprite(0, 0, 'bg-win');
        var line_top = MQ.game.add.sprite(0, 0, 'line-win');
        this.game.sound.context.resume();
    },
    create: function () {
        MQ.loadVar = false;
        // showConsole('Win Screen');
        if (!MQ.isBotMode) {
            if (MQ.practiceMode) {
                var maskAva = MQ.game.add.graphics(0, 0);
                maskAva.beginFill(0xffffff);
                maskAva.drawCircle(540, 176, 241);
                maskAva.anchor.set(0.5);
                var ava = MQ.game.add.sprite(540, 176, 'ava_fb');
                ava.anchor.set(0.5);
                ava.mask = maskAva;
                var nameFB = MQ.game.add.text(540, 360, `${MQ.nameFB}`, {
                    font: `50px Roboto`,
                    fill: "white",
                    boundsAlignH: "center",
                    boundsAlignV: "middle",
                    fontWeight: 400
                });
                nameFB.anchor.set(0.5);
            } else {
                if (MQ.isChallenged) {
                    var maskAva = MQ.game.add.graphics(0, 0);
                    maskAva.beginFill(0xffffff);
                    maskAva.drawCircle(931, 325, 178);
                    maskAva.anchor.set(0.5);
                    var ava = MQ.game.add.sprite(931, 325, 'ava_fb');
                    ava.anchor.set(0.5);
                    ava.mask = maskAva;
                    var nameFB = MQ.game.add.text(809, 298, `${MQ.nameFB}`, {
                        font: `35px Roboto`,
                        fill: "#97919f",
                        boundsAlignH: "center",
                        boundsAlignV: "middle",
                        fontWeight: 400
                    });
                    nameFB.anchor.set(1, 0.5);
                } else {
                    var maskAva = MQ.game.add.graphics(0, 0);
                    maskAva.beginFill(0xffffff);
                    maskAva.drawCircle(931, 482, 178);
                    maskAva.anchor.set(0.5);
                    var ava = MQ.game.add.sprite(931, 482, 'ava_fb');
                    ava.anchor.set(0.5);
                    ava.mask = maskAva;
                    var nameFB = MQ.game.add.text(809, 455, `${MQ.nameFB}`, {
                        font: `35px Roboto`,
                        fill: "#97919f",
                        boundsAlignH: "center",
                        boundsAlignV: "middle",
                        fontWeight: 400
                    });
                    nameFB.anchor.set(1, 0.5);
                }
            }
        } else {
            if (MQ.isChallenged) {
                var maskAva = MQ.game.add.graphics(0, 0);
                maskAva.beginFill(0xffffff);
                maskAva.drawCircle(931, 325, 178);
                maskAva.anchor.set(0.5);
                var ava = MQ.game.add.sprite(931, 325, 'ava_fb');
                ava.anchor.set(0.5);
                ava.mask = maskAva;
                var nameFB = MQ.game.add.text(809, 298, `${MQ.nameFB}`, {
                    font: `35px Roboto`,
                    fill: "#97919f",
                    boundsAlignH: "center",
                    boundsAlignV: "middle",
                    fontWeight: 400
                });
                nameFB.anchor.set(1, 0.5);
            } else {
                var maskAva = MQ.game.add.graphics(0, 0);
                maskAva.beginFill(0xffffff);
                maskAva.drawCircle(931, 482, 178);
                maskAva.anchor.set(0.5);
                var ava = MQ.game.add.sprite(931, 482, 'ava_fb');
                ava.anchor.set(0.5);
                ava.mask = maskAva;
                var nameFB = MQ.game.add.text(809, 455, `${MQ.nameFB}`, {
                    font: `35px Roboto`,
                    fill: "#97919f",
                    boundsAlignH: "center",
                    boundsAlignV: "middle",
                    fontWeight: 400
                });
                nameFB.anchor.set(1, 0.5);
            }
        }
        //
        //********************************************** */
        //********************************************* */
        if (MQ.practiceMode) {
            var btn_home = MQ.game.add.button(MQ.game.width / 2, MQ.game.height - 150, 'btn-home-lose-practice');
            btn_home.scale.set(MQ.configs.SCALE - 0.1);
            btn_home.anchor.set(0.5);
            btn_home.events.onInputDown.add(() => {
                MQ.button_sound.play();
                MQ.game.state.start('menu');
            });
            this.createBoxScorePractice();
        } else {
            if (!MQ.isBotMode) {
                // console.log(MQ.responseChallen);
                if (!MQ.isChallenged) {
                    var scoreText = MQ.game.add.text(809, 510, `${MQ.score}`, {
                        font: `60px Roboto`,
                        fill: "white",
                        boundsAlignH: "center",
                        boundsAlignV: "middle",
                        fontWeight: 500
                    });
                    scoreText.anchor.set(1, 0.5);
                    // console.log(MQ.linkDB);
                    var objFilter = MQ.responseChallen.findIndex((ele) => {
                        return ele.data.idData == MQ.linkDB;
                    });
                    MQ.idRequest = MQ.responseChallen[objFilter].id;
                    //
                    var maskAvaOpp = MQ.game.add.graphics(0, 0);
                    maskAvaOpp.beginFill(0xffffff);
                    maskAvaOpp.drawCircle(149, 482, 178);
                    maskAvaOpp.anchor.set(0.5);
                    var avaOpp = MQ.game.add.sprite(149, 482, `ava_fb_friend`);
                    avaOpp.anchor.set(0.5);
                    avaOpp.mask = maskAvaOpp;
                    var nameFBOpp = MQ.game.add.text(268, 455, `${MQ.nameFriendChallenge}`, {
                        font: `35px Roboto`,
                        fill: "white",
                        boundsAlignH: "center",
                        boundsAlignV: "middle",
                        fontWeight: 400
                    });
                    nameFBOpp.anchor.set(0, 0.5);
                    var scoreTextOpp = MQ.game.add.text(270, 510, `${MQ.scoreOpp}`, {
                        font: `60px Roboto`,
                        fill: "white",
                        boundsAlignH: "center",
                        boundsAlignV: "middle",
                        fontWeight: 500
                    });
                    scoreTextOpp.anchor.set(0, 0.5);
                    //
                    this.createBoxScoreFriendChallen();
                } else {
                    var scoreText = MQ.game.add.text(809, 348, `${MQ.score}`, {
                        font: `60px Roboto`,
                        fill: "white",
                        boundsAlignH: "center",
                        boundsAlignV: "middle",
                        fontWeight: 500
                    });
                    scoreText.anchor.set(1, 0.5);
                    var maskAvaOpp = MQ.game.add.graphics(0, 0);
                    maskAvaOpp.beginFill(0xffffff);
                    maskAvaOpp.drawCircle(149, 325, 178);
                    maskAvaOpp.anchor.set(0.5);
                    var avaOpp = MQ.game.add.sprite(149, 325, `ava_fb_friend`);
                    avaOpp.anchor.set(0.5);
                    avaOpp.mask = maskAvaOpp;
                    avaOpp.alpha = 0.7;
                    var nameFBOpp = MQ.game.add.text(268, 298, `${MQ.nameFriendChallenge}`, {
                        font: `35px Roboto`,
                        fill: "white",
                        boundsAlignH: "center",
                        boundsAlignV: "middle",
                        fontWeight: 400
                    });
                    nameFBOpp.anchor.set(0, 0.5);
                    nameFBOpp.alpha = 0.7;
                    var scoreTextOpp = MQ.game.add.text(270, 360, `Lượt của\nđối thủ`, {
                        font: `35px Roboto`,
                        fill: "white",
                        boundsAlignH: "center",
                        boundsAlignV: "middle",
                        fontWeight: 500
                    });
                    scoreTextOpp.anchor.set(0, 0.5);
                    // scoreTextOpp.alpha = 0.7;
                    this.createBoxScoreYourChallen();
                    // if (MQ.responseChallen !== undefined) {
                    // console.log(MQ.responseChallen);
                    // }
                }
            } else {
                if (!MQ.isChallenged) {
                    var scoreText = MQ.game.add.text(809, 510, `${MQ.score}`, {
                        font: `60px Roboto`,
                        fill: "white",
                        boundsAlignH: "center",
                        boundsAlignV: "middle",
                        fontWeight: 500
                    });
                    scoreText.anchor.set(1, 0.5);
                    //
                    var maskAvaOpp = MQ.game.add.graphics(0, 0);
                    maskAvaOpp.beginFill(0xffffff);
                    maskAvaOpp.drawCircle(149, 482, 178);
                    maskAvaOpp.anchor.set(0.5);
                    var avaOpp = MQ.game.add.sprite(149, 482, `bot${MQ.botKey}`);
                    avaOpp.anchor.set(0.5);
                    avaOpp.mask = maskAvaOpp;
                    var nameFBOpp = MQ.game.add.text(268, 455, `${MQ.nameFriendChallenge}`, {
                        font: `35px Roboto`,
                        fill: "#97919f",
                        boundsAlignH: "center",
                        boundsAlignV: "middle",
                        fontWeight: 400
                    });
                    nameFBOpp.anchor.set(0, 0.5);
                    var scoreTextOpp = MQ.game.add.text(270, 510, `${MQ.scoreOpp}`, {
                        font: `60px Roboto`,
                        fill: "white",
                        boundsAlignH: "center",
                        boundsAlignV: "middle",
                        fontWeight: 500
                    });
                    scoreTextOpp.anchor.set(0, 0.5);
                } else {
                    var scoreText = MQ.game.add.text(809, 348, `${MQ.score}`, {
                        font: `60px Roboto`,
                        fill: "white",
                        boundsAlignH: "center",
                        boundsAlignV: "middle",
                        fontWeight: 500
                    });
                    scoreText.anchor.set(1, 0.5);
                    //
                    var maskAvaOpp = MQ.game.add.graphics(0, 0);
                    maskAvaOpp.beginFill(0xffffff);
                    maskAvaOpp.drawCircle(149, 325, 178);
                    maskAvaOpp.anchor.set(0.5);
                    var avaOpp = MQ.game.add.sprite(149, 325, `bot${MQ.botKey}`);
                    avaOpp.anchor.set(0.5);
                    avaOpp.mask = maskAvaOpp;
                    avaOpp.alpha = 0.7;
                    var nameFBOpp = MQ.game.add.text(268, 298, `${MQ.nameFriendChallenge}`, {
                        font: `35px Roboto`,
                        fill: "#97919f",
                        boundsAlignH: "center",
                        boundsAlignV: "middle",
                        fontWeight: 400
                    });
                    nameFBOpp.anchor.set(0, 0.5);
                    nameFBOpp.alpha = 0.7;
                    var scoreTextOpp = MQ.game.add.text(270, 360, `Lượt của\nđối thủ`, {
                        font: `35px Roboto`,
                        fill: "white",
                        boundsAlignH: "center",
                        boundsAlignV: "middle",
                        fontWeight: 500
                    });
                    scoreTextOpp.anchor.set(0, 0.5);
                }
                if (!MQ.isChallenged) {
                    this.createBoxScoreBot();
                } else {
                    this.createBoxScoreYourChallen();
                }
            }
            // handle request
            if (MQ.isChallenged) {
                if (!MQ.isBotMode) {
                    postRequestToDB(() => {
                        // console.log(MQ.idDataChallenge);
                        console.log('postRequestToDB');
                        postRequestChallengeToFriend(() => {
                            console.log('postRequestChallengeToFriend');
                        });
                    });
                } else {
                    console.log('botMode');
                }
            } else {
                // console.log(MQ.idRequest);
                if (!MQ.isBotMode) {
                    if (MQ.idRequest !== undefined) {
                        deleteRequest(MQ.idRequest);
                    }
                } else {
                    console.log('botMode');
                }
            }
        }
        //
    },
    update: function () {

    },
    render: function () {

    },
    createBoxScoreBot: function () {
        var txt_540_234 = MQ.game.add.text(MQ.game.width / 2, 234, 'Playlist', {
            font: `36px Roboto`,
            fill: "#9d92a6",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        txt_540_234.anchor.set(0.5);
        var txt_540_668 = MQ.game.add.text(MQ.game.width / 2, 660, 'Kết quả trong tuần', {
            font: `36px Roboto`,
            fill: "#9d92a6",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        txt_540_668.anchor.set(0.5);
        var txt_540_290 = MQ.game.add.text(MQ.game.width / 2, 290, `Nhạc trẻ 2017`, {
            font: `45px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        txt_540_290.anchor.set(0.5);
        var scrollMaskBoxResult = MQ.game.add.graphics(0, 855);
        scrollMaskBoxResult.beginFill();
        scrollMaskBoxResult.drawRect(0, 0, MQ.game.width, 1065);
        scrollMaskBoxResult.endFill();
        var box_result = MQ.game.add.button(MQ.game.width / 2, 855, 'box-result-win');
        box_result.anchor.set(0.5, 0);
        box_result.mask = scrollMaskBoxResult;
        box_result.inputEnabled = true;
        box_result.input.enableDrag();
        box_result.input.allowHorizontalDrag = false;
        box_result.events.onDragStop.add(() => {
            if (box_result.position.y > 855) {
                MQ.game.add.tween(box_result).to({ y: 855 }, 300, "Linear", true);
            }
            if (box_result.position.y < (855 - box_result.height + box_result.height / 5 * 3)) {
                MQ.game.add.tween(box_result).to({ y: (855 - box_result.height + box_result.height / 5 * 3) }, 300, "Linear", true);
            }
        });
        if (MQ.score > MQ.scoreOpp) {
            var result = MQ.game.add.text(MQ.game.width / 2, 126, 'Chiến thắng !!!', {
                font: `81px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 500
            });
            result.anchor.set(0.5);
            var result_text = MQ.game.add.text(MQ.game.width / 2, 740, `0  -  1`, {
                font: `70px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 500
            });
            result_text.anchor.set(0.5);
            // box_score.addChild(result);
        } else {
            var result = MQ.game.add.text(MQ.game.width / 2, 126, 'Thua cuộc !!!', {
                font: `81px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 500
            });
            result.anchor.set(0.5);
            var result_text = MQ.game.add.text(MQ.game.width / 2, 740, `1  -  0`, {
                font: `70px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 500
            });
            result_text.anchor.set(0.5);
            // box_score.addChild(result);
        }
        for (i = 0; i < 5; i++) {
            //90, -402
            //timeAnswerSaveToDataAndScore
            let line_box_win = MQ.game.add.sprite(0, 228 + i * 228, 'line-box-win');
            line_box_win.anchor.set(0.5);
            box_result.addChild(line_box_win);
            //-261,114, 230
            let imgAlbum = MQ.game.add.sprite(-261, 114 + i * 228, 'ava-playlist');
            imgAlbum.anchor.set(0.5);
            box_result.addChild(imgAlbum);
            // console.log(MQ.songChoicedList[i]);
            let nameSong = MQ.songChoicedList[i].FileName.slice(0, -4);
            //-162, 95
            let txt_song = MQ.game.add.text(-162, 95 + i * 228, `${nameSong}`, {
                font: `40px Roboto`,
                fill: "#ffffff",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            txt_song.anchor.set(0, 0.5);
            box_result.addChild(txt_song);
            let txt_singer = MQ.game.add.text(-162, 145 + i * 228, `${MQ.songChoicedList[i].Singer}`, {
                font: `40px Roboto`,
                fill: "#93909d",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            txt_singer.anchor.set(0, 0.5);
            box_result.addChild(txt_singer);
            if (MQ.timeAnswerSaveToDataAndScore.time[i].trueORfalse) {
                let correct = MQ.game.add.sprite(405, 90 + i * 230, 'v-icon-win');
                correct.anchor.set(0.5);
                box_result.addChild(correct);
                let txt_correct = MQ.game.add.text(405, 126 + i * 230, `${MQ.timeAnswerSaveToDataAndScore.time[i].timeAnswer.toFixed(1)}s`, {
                    font: `30px Roboto`,
                    fill: "#07cf81",
                    boundsAlignH: "center",
                    boundsAlignV: "middle",
                    fontWeight: 400
                });
                txt_correct.anchor.set(0.5);
                box_result.addChild(txt_correct);
            } else {
                let wrong = MQ.game.add.sprite(405, 90 + i * 230, 'x-icon-win');
                wrong.anchor.set(0.5);
                box_result.addChild(wrong);
                let txt_wrong = MQ.game.add.text(405, 126 + i * 230, `${MQ.timeAnswerSaveToDataAndScore.time[i].timeAnswer.toFixed(1)}s`, {
                    font: `30px Roboto`,
                    fill: "#ff1d58",
                    boundsAlignH: "center",
                    boundsAlignV: "middle",
                    fontWeight: 400
                });
                txt_wrong.anchor.set(0.5);
                box_result.addChild(txt_wrong);
            }
            //dataChooseToChall
            if (!MQ.isChallenged) {
                if (MQ.dataChooseToChall.data.time[i].trueORfalse) {
                    let correct = MQ.game.add.sprite(-405, 90 + i * 230, 'v-icon-win');
                    correct.anchor.set(0.5);
                    box_result.addChild(correct);
                    let txt_correct = MQ.game.add.text(-405, 126 + i * 230, `${MQ.dataChooseToChall.data.time[i].timeAnswer.toFixed(1)}s`, {
                        font: `30px Roboto`,
                        fill: "#07cf81",
                        boundsAlignH: "center",
                        boundsAlignV: "middle",
                        fontWeight: 400
                    });
                    txt_correct.anchor.set(0.5);
                    box_result.addChild(txt_correct);
                } else {
                    let wrong = MQ.game.add.sprite(-405, 90 + i * 230, 'x-icon-win');
                    wrong.anchor.set(0.5);
                    box_result.addChild(wrong);
                    let txt_wrong = MQ.game.add.text(-405, 126 + i * 230, `${MQ.dataChooseToChall.data.time[i].timeAnswer.toFixed(1)}s`, {
                        font: `30px Roboto`,
                        fill: "#ff1d58",
                        boundsAlignH: "center",
                        boundsAlignV: "middle",
                        fontWeight: 400
                    });
                    txt_wrong.anchor.set(0.5);
                    box_result.addChild(txt_wrong);
                }
            }
        }
        var btn_pick_playlist = MQ.game.add.button(MQ.game.width / 2, MQ.game.height, 'pick-playlist-win');
        // btn_home.scale.set(MQ.configs.SCALE - 0.1);
        btn_pick_playlist.anchor.set(0.5, 1);
        btn_pick_playlist.events.onInputDown.add(() => {
            MQ.button_sound.play();
            // console.log('pick');
            MQ.game.state.start('bonus');
        });
    },
    createBoxScorePractice: function () {
        var box_score = MQ.game.add.sprite(MQ.game.world.centerX, 1170, 'box-score-win');
        box_score.anchor.set(0.5);
        var cd_win = MQ.game.add.sprite(0, -160, 'cd-win');
        cd_win.anchor.set(0.5);
        box_score.addChild(cd_win);
        var score_in_box = MQ.game.add.text(0, 121, 'Số câu đúng', {
            font: `40px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        score_in_box.anchor.set(0.5);
        box_score.addChild(score_in_box);
        var tab_score = MQ.game.add.sprite(0, 243, 'tab-highscore-win');
        tab_score.anchor.set(0.5);
        box_score.addChild(tab_score);
        var txt_score = MQ.game.add.text(0, 0, `${MQ.correctCount}`, {
            font: `84px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 500
        });
        txt_score.anchor.set(0.5);
        tab_score.addChild(txt_score);
        if (MQ.isCheckRank) {
            this.createPopupRanking();
        }
    },
    createBoxScoreFriendChallen: function () {
        var txt_540_234 = MQ.game.add.text(MQ.game.width / 2, 234, 'Playlist', {
            font: `36px Roboto`,
            fill: "#9d92a6",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        txt_540_234.anchor.set(0.5);
        var txt_540_668 = MQ.game.add.text(MQ.game.width / 2, 660, 'Kết quả trong tuần', {
            font: `36px Roboto`,
            fill: "#9d92a6",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        txt_540_668.anchor.set(0.5);
        var txt_540_290 = MQ.game.add.text(MQ.game.width / 2, 290, `Nhạc trẻ 2017`, {
            font: `45px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        txt_540_290.anchor.set(0.5);
        var scrollMaskBoxResult = MQ.game.add.graphics(0, MQ.configs.SCALE * 855);
        scrollMaskBoxResult.beginFill();
        scrollMaskBoxResult.drawRect(0, 0, MQ.game.width, MQ.configs.SCALE * 1065);
        scrollMaskBoxResult.endFill();
        var box_result = MQ.game.add.button(MQ.game.width / 2, 855, 'box-result-win');
        box_result.anchor.set(0.5, 0);
        box_result.mask = scrollMaskBoxResult;
        box_result.inputEnabled = true;
        box_result.input.enableDrag();
        box_result.input.allowHorizontalDrag = false;
        box_result.events.onDragStop.add(() => {
            if (box_result.position.y > 855) {
                MQ.game.add.tween(box_result).to({ y: 855 }, 300, "Linear", true);
            }
            if (box_result.position.y < (855 - box_result.height + box_result.height / 5 * 3)) {
                MQ.game.add.tween(box_result).to({ y: (855 - box_result.height + box_result.height / 5 * 3) }, 300, "Linear", true);
            }
        });
        if (MQ.score > MQ.scoreOpp) {
            var result = MQ.game.add.text(MQ.game.width / 2, 126, 'Chiến thắng !!!', {
                font: `81px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 500
            });
            result.anchor.set(0.5);
            var result_text = MQ.game.add.text(MQ.game.width / 2, 740, `0  -  1`, {
                font: `70px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 500
            });
            result_text.anchor.set(0.5);
            // box_score.addChild(result);
        } else {
            var result = MQ.game.add.text(MQ.game.width / 2, 126, 'Thua cuộc !!!', {
                font: `81px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 500
            });
            result.anchor.set(0.5);
            var result_text = MQ.game.add.text(MQ.game.width / 2, 740, `1  -  0`, {
                font: `70px Roboto`,
                fill: "white",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 500
            });
            result_text.anchor.set(0.5);
            // box_score.addChild(result);
        }
        for (i = 0; i < 5; i++) {
            //90, -402
            //timeAnswerSaveToDataAndScore
            let line_box_win = MQ.game.add.sprite(0, 228 + i * 228, 'line-box-win');
            line_box_win.anchor.set(0.5);
            box_result.addChild(line_box_win);
            //-261,114, 230
            let imgAlbum = MQ.game.add.sprite(-261, 114 + i * 228, 'ava-playlist');
            imgAlbum.anchor.set(0.5);
            box_result.addChild(imgAlbum);
            // console.log(MQ.songChoicedList[i]);
            let nameSong = MQ.songChoicedList[i].FileName.slice(0, -4);
            //-162, 95
            let txt_song = MQ.game.add.text(-162, 95 + i * 228, `${nameSong}`, {
                font: `40px Roboto`,
                fill: "#ffffff",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            txt_song.anchor.set(0, 0.5);
            box_result.addChild(txt_song);
            let txt_singer = MQ.game.add.text(-162, 145 + i * 228, `${MQ.songChoicedList[i].Singer}`, {
                font: `40px Roboto`,
                fill: "#93909d",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            txt_singer.anchor.set(0, 0.5);
            box_result.addChild(txt_singer);
            if (MQ.timeAnswerSaveToDataAndScore.time[i].trueORfalse) {
                let correct = MQ.game.add.sprite(405, 90 + i * 230, 'v-icon-win');
                correct.anchor.set(0.5);
                box_result.addChild(correct);
                let txt_correct = MQ.game.add.text(405, 126 + i * 230, `${MQ.timeAnswerSaveToDataAndScore.time[i].timeAnswer.toFixed(1)}s`, {
                    font: `30px Roboto`,
                    fill: "#07cf81",
                    boundsAlignH: "center",
                    boundsAlignV: "middle",
                    fontWeight: 400
                });
                txt_correct.anchor.set(0.5);
                box_result.addChild(txt_correct);
            } else {
                let wrong = MQ.game.add.sprite(405, 90 + i * 230, 'x-icon-win');
                wrong.anchor.set(0.5);
                box_result.addChild(wrong);
                let txt_wrong = MQ.game.add.text(405, 126 + i * 230, `${MQ.timeAnswerSaveToDataAndScore.time[i].timeAnswer.toFixed(1)}s`, {
                    font: `30px Roboto`,
                    fill: "#ff1d58",
                    boundsAlignH: "center",
                    boundsAlignV: "middle",
                    fontWeight: 400
                });
                txt_wrong.anchor.set(0.5);
                box_result.addChild(txt_wrong);
            }
            //dataChooseToChall
            if (MQ.dataChooseToChall.time[i].trueORfalse) {
                let correct = MQ.game.add.sprite(-405, 90 + i * 230, 'v-icon-win');
                correct.anchor.set(0.5);
                box_result.addChild(correct);
                let txt_correct = MQ.game.add.text(-405, 126 + i * 230, `${MQ.dataChooseToChall.time[i].timeAnswer.toFixed(1)}s`, {
                    font: `30px Roboto`,
                    fill: "#07cf81",
                    boundsAlignH: "center",
                    boundsAlignV: "middle",
                    fontWeight: 400
                });
                txt_correct.anchor.set(0.5);
                box_result.addChild(txt_correct);
            } else {
                let wrong = MQ.game.add.sprite(-405, 90 + i * 230, 'x-icon-win');
                wrong.anchor.set(0.5);
                box_result.addChild(wrong);
                let txt_wrong = MQ.game.add.text(-405, 126 + i * 230, `${MQ.dataChooseToChall.time[i].timeAnswer.toFixed(1)}s`, {
                    font: `30px Roboto`,
                    fill: "#ff1d58",
                    boundsAlignH: "center",
                    boundsAlignV: "middle",
                    fontWeight: 400
                });
                txt_wrong.anchor.set(0.5);
                box_result.addChild(txt_wrong);
            }
        }
        var btn_pick_playlist = MQ.game.add.button(MQ.game.width / 2, MQ.game.height, 'pick-playlist-win');
        // btn_home.scale.set(MQ.configs.SCALE - 0.1);
        btn_pick_playlist.anchor.set(0.5, 1);
        btn_pick_playlist.events.onInputDown.add(() => {
            MQ.button_sound.play();
            console.log('pick');
            MQ.game.state.start('bonus');
        });
    },
    createBoxScoreYourChallen: function () {
        var txt_540_234 = MQ.game.add.text(MQ.game.width / 2, 103, 'Playlist', {
            font: `36px Roboto`,
            fill: "#9d92a6",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        txt_540_234.anchor.set(0.5);
        var txt_540_290 = MQ.game.add.text(MQ.game.width / 2, 155, `Nhạc trẻ 2017`, {
            font: `45px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        txt_540_290.anchor.set(0.5);
        var scrollMaskBoxResult = MQ.game.add.graphics(0, 504);
        scrollMaskBoxResult.beginFill();
        scrollMaskBoxResult.drawRect(0, 0, MQ.game.width, 1140);
        scrollMaskBoxResult.endFill();
        var box_result = MQ.game.add.button(MQ.game.width / 2, 504, 'box-result-win');
        box_result.anchor.set(0.5, 0);
        box_result.mask = scrollMaskBoxResult;
        box_result.inputEnabled = true;
        box_result.input.enableDrag();
        box_result.input.allowHorizontalDrag = false;
        box_result.events.onDragStop.add(() => {
            if (box_result.position.y > 504) {
                MQ.game.add.tween(box_result).to({ y: 504 }, 300, "Linear", true);
            }
            if (box_result.position.y < (504 - box_result.height + box_result.height / 5 * 4)) {
                MQ.game.add.tween(box_result).to({ y: (504 - box_result.height + box_result.height / 5 * 4) }, 300, "Linear", true);
            }
        });
        for (i = 0; i < 5; i++) {
            let line_box_win = MQ.game.add.sprite(0, 228 + i * 228, 'line-box-win');
            line_box_win.anchor.set(0.5);
            box_result.addChild(line_box_win);
            //-261,114, 230
            let imgAlbum = MQ.game.add.sprite(-261, 114 + i * 228, 'ava-playlist');
            imgAlbum.anchor.set(0.5);
            box_result.addChild(imgAlbum);
            // console.log(MQ.songChoicedList[i]);
            let nameSong = MQ.songChoicedList[i].FileName.slice(0, -4);
            //-162, 95
            let txt_song = MQ.game.add.text(-162, 95 + i * 228, `${nameSong}`, {
                font: `40px Roboto`,
                fill: "#ffffff",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            txt_song.anchor.set(0, 0.5);
            box_result.addChild(txt_song);
            let txt_singer = MQ.game.add.text(-162, 145 + i * 228, `${MQ.songChoicedList[i].Singer}`, {
                font: `40px Roboto`,
                fill: "#93909d",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            txt_singer.anchor.set(0, 0.5);
            box_result.addChild(txt_singer);
            if (MQ.timeAnswerSaveToDataAndScore.time[i].trueORfalse) {
                let correct = MQ.game.add.sprite(405, 90 + i * 230, 'v-icon-win');
                correct.anchor.set(0.5);
                box_result.addChild(correct);
                let txt_correct = MQ.game.add.text(405, 126 + i * 230, `${MQ.timeAnswerSaveToDataAndScore.time[i].timeAnswer.toFixed(1)}s`, {
                    font: `30px Roboto`,
                    fill: "#07cf81",
                    boundsAlignH: "center",
                    boundsAlignV: "middle",
                    fontWeight: 400
                });
                txt_correct.anchor.set(0.5);
                box_result.addChild(txt_correct);
            } else {
                let wrong = MQ.game.add.sprite(405, 90 + i * 230, 'x-icon-win');
                wrong.anchor.set(0.5);
                box_result.addChild(wrong);
                let txt_wrong = MQ.game.add.text(405, 126 + i * 230, `${MQ.timeAnswerSaveToDataAndScore.time[i].timeAnswer.toFixed(1)}s`, {
                    font: `30px Roboto`,
                    fill: "#ff1d58",
                    boundsAlignH: "center",
                    boundsAlignV: "middle",
                    fontWeight: 400
                });
                txt_wrong.anchor.set(0.5);
                box_result.addChild(txt_wrong);
            }
        }
        var btn_next_playlist = MQ.game.add.button(631, 1814, 'btn-next-player-win');
        // btn_home.scale.set(MQ.configs.SCALE - 0.1);
        btn_next_playlist.anchor.set(0.5);
        btn_next_playlist.events.onInputDown.add(() => {
            MQ.button_sound.play();
            MQ.game.state.start('bonus');
        });
        var btn_rehome = MQ.game.add.button(135, 1814, 'btn-home-lose-practice');
        btn_rehome.anchor.set(0.5);
        btn_rehome.events.onInputDown.add(() => {
            MQ.button_sound.play();
            // console.log('menu');
            MQ.game.state.start('menu');
        });
        //
    },
    createPopupRanking: function () {
        // console.log(MQ.rankFake);
        this.popupRanking = MQ.game.add.group();
        var bg = MQ.game.add.sprite(0, 0, 'bg-rank');
        this.popupRanking.add(bg);
        //275
        var scrollMaskRank = MQ.game.add.graphics(0, 180);
        scrollMaskRank.beginFill();
        scrollMaskRank.drawRect(0, 0, MQ.game.width, 2645);
        scrollMaskRank.endFill();
        this.popupRanking.add(scrollMaskRank);
        var grapRank = MQ.game.add.graphics(0, 180);
        grapRank.drawRect(0, 0, MQ.game.width, 2645);
        grapRank.inputEnabled = true;
        grapRank.input.enableDrag();
        grapRank.input.allowHorizontalDrag = false;
        grapRank.mask = scrollMaskRank;
        grapRank.events.onDragUpdate.add(() => {
            if (grapRank.position.y > 180) {
                grapRank.input.disableDrag();
                grapRank.position.y = 180;
                grapRank.input.enableDrag();
            }
            if (grapRank.position.y < -(grapRank.height - 1920)) {
                grapRank.input.disableDrag();
                grapRank.position.y = -(grapRank.height - 1920);
                grapRank.input.enableDrag();
            }
        })
        this.popupRanking.add(grapRank);
        var bg_grapRank = MQ.game.add.sprite(0, 0, 'bg-rank');
        grapRank.addChild(bg_grapRank);
        var txt_reward_rank = MQ.game.add.text(MQ.game.world.centerX, 95, 'Phần thưởng', {
            font: `40px Roboto`,
            fill: "#93909c",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        txt_reward_rank.anchor.set(0.5);
        grapRank.addChild(txt_reward_rank);
        var iphoneRank = MQ.game.add.sprite(60, 150, 'iphonex-rank');
        grapRank.addChild(iphoneRank);
        var ipodeRank = MQ.game.add.sprite(390, 150, 'ipod-rank');
        grapRank.addChild(ipodeRank);
        var sonyRank = MQ.game.add.sprite(720, 150, 'sony-rank');
        grapRank.addChild(sonyRank);
        var tab_top3 = MQ.game.add.sprite(0, 616, 'tab-top3-rank');
        grapRank.addChild(tab_top3);
        //1344 - 180
        var rank4to10 = MQ.game.add.sprite(0, 1164, 'rank4to10-rank');
        var ve_reward = MQ.game.add.button(1020, 90, 've-ranking');
        ve_reward.anchor.set(1, 0.5);
        rank4to10.addChild(ve_reward);
        grapRank.addChild(rank4to10);
        for (i = 0; i < 3; i++) {
            let icon = MQ.game.add.sprite(100, 710 + i * 188, `rank${i + 1}-orange-rank`);
            icon.anchor.set(0.5);
            grapRank.addChild(icon);
            let maskAva = MQ.game.add.graphics(0, 0);
            maskAva.beginFill(0xffffff);
            maskAva.drawCircle(290, 710 + i * 188, 120);
            maskAva.anchor.set(0.5);
            grapRank.addChild(maskAva);
            let ava = MQ.game.add.sprite(230, 710 + i * 188, `${MQ.rankFake[i].ava}`);
            ava.anchor.set(0, 0.5);
            ava.mask = maskAva;
            grapRank.addChild(ava);
            let name = MQ.game.add.text(371, 710 + i * 188, `${MQ.rankFake[i].name}`, {
                font: `40px Roboto`,
                fill: "#ffffff",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            name.anchor.set(0, 0.5);
            grapRank.addChild(name);
            let circle = MQ.game.add.sprite(1020, 710 + i * 188, 'circle-stroke-ranking');
            circle.anchor.set(1, 0.5);
            let score = MQ.game.add.text(-45, 0, `${MQ.rankFake[i].score}`, {
                font: `40px Roboto`,
                fill: "#ffffff",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            score.anchor.set(0.5);
            circle.addChild(score);
            grapRank.addChild(circle);
            let line = MQ.game.add.sprite(60, 800 + i * 188, 'line_setting');
            grapRank.addChild(line);
        }
        for (i = 0; i < 6; i++) {
            let icon = MQ.game.add.sprite(60, 1440 + i * 188, `icon-rank-small-rank`);
            icon.anchor.set(0, 0.5);
            grapRank.addChild(icon);
            let number = MQ.game.add.text(132, 1440 + i * 188, `${i + 4}`, {
                font: `40px Roboto`,
                fill: "#ffffff",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            number.anchor.set(0, 0.5);
            grapRank.addChild(number);
            let maskAva = MQ.game.add.graphics(0, 0);
            maskAva.beginFill(0xffffff);
            maskAva.drawCircle(290, 1440 + i * 188, 120);
            maskAva.anchor.set(0.5);
            grapRank.addChild(maskAva);
            let ava = MQ.game.add.sprite(230, 1440 + i * 188, `${MQ.rankFake[i + 3].ava}`);
            ava.anchor.set(0, 0.5);
            ava.mask = maskAva;
            grapRank.addChild(ava);
            let name = MQ.game.add.text(371, 1440 + i * 188, `${MQ.rankFake[i + 3].name}`, {
                font: `40px Roboto`,
                fill: "#ffffff",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            name.anchor.set(0, 0.5);
            grapRank.addChild(name);
            let circle = MQ.game.add.sprite(1020, 1440 + i * 188, 'circle-stroke-ranking');
            circle.anchor.set(1, 0.5);
            let score = MQ.game.add.text(-45, 0, `${MQ.rankFake[i + 3].score}`, {
                font: `40px Roboto`,
                fill: "#ffffff",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                fontWeight: 400
            });
            score.anchor.set(0.5);
            circle.addChild(score);
            grapRank.addChild(circle);
            let line = MQ.game.add.sprite(60, 1530 + i * 188, 'line_setting');
            grapRank.addChild(line);
        }
        // var yourScore = MQ.game.add.text(MQ.game.width / 2, 2520, `Điểm của bạn:  ${MQ.practiceModeScore}`, {
        //     font: `60px Roboto`,
        //     fill: "#ffffff",
        //     boundsAlignH: "center",
        //     boundsAlignV: "middle",
        //     fontWeight: 400
        // });
        // yourScore.anchor.set(0.5);
        // grapRank.addChild(yourScore);
        var header_rank = MQ.game.add.sprite(0, 0, 'tab-header-rank');
        var arrow = MQ.game.add.button(0, 0, 'arrow-rank');
        header_rank.addChild(arrow);
        arrow.events.onInputDown.add(() => {
            MQ.button_sound.play();
            this.popupRanking.position.x = MQ.game.width;
        });
        var icon_rank_header = MQ.game.add.button(1020, 43, 'icon-rank-header-rank');
        icon_rank_header.anchor.set(1, 0);
        header_rank.addChild(icon_rank_header);
        var scoreText = MQ.game.add.text(922, 55, `${MQ.practiceModeScore}`, {
            font: `42px Roboto`,
            fill: "#ffffff",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        scoreText.anchor.set(1, 0);
        var txt_header_rank = MQ.game.add.text(540, 87, 'NHẠC TRẺ', {
            font: `55px Roboto`,
            fill: "#ffffff",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 500
        });
        txt_header_rank.anchor.set(0.5);
        header_rank.addChild(txt_header_rank);
        header_rank.addChild(scoreText);
        this.popupRanking.add(header_rank);
    }
}