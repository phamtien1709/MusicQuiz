function getSongToQuiz(data, callback) {
    // console.log('Ge')
    var arr = [];
    // add new array of dataType
    for (i = 0; i < data.length; i++) {
        arr[i] = data[i];
    };
    // splice songChoiced Previous
    for (i = 0; i < MQ.indexSongChoiced.length; i++) {
        // if(MQ.indexSongChoiced[i])
        // console.log(arr[MQ.indexSongChoiced[i]]);
        arr.splice(MQ.indexSongChoiced[i], 1);
    };
    //get song to ask
    let random = Math.floor(Math.random() * (data.length - MQ.indexSongChoiced.length));
    MQ.songChoiced = arr[random];
    MQ.indexSongChoiced.push(random);
    // arr.splice(random, 1);
    var arrNotRandom = [
        {
            "answer": MQ.songChoiced.Answer1
        },
        {
            "answer": MQ.songChoiced.Answer2
        },
        {
            "answer": MQ.songChoiced.Answer3
        },
        {
            "answer": MQ.songChoiced.Answer4
        }
    ];
    MQ.songRandomChoiced = [];
    for (i = 0; i < 3; i++) {
        let randomChoiced = Math.floor(Math.random() * arrNotRandom.length);
        let obj = arrNotRandom[randomChoiced];
        arrNotRandom.splice(randomChoiced, 1);
        MQ.songRandomChoiced[i] = obj;
        if (i == 2) {
            MQ.songRandomChoiced[3] = arrNotRandom[0];
        }
    }
    // console.log(MQ.songChoiced);
    // console.log(MQ.timeAnswerSaveToData);
    MQ.songChoicedList.push(MQ.songChoiced);
    MQ.songRandomChoicedList.push(MQ.songRandomChoiced);
    // if(random)
    callback();
}
function getChallengeByFriend(callback) {
    FB.api(
        `/${MQ.checkId}/apprequests`,
        function (response) {
            if (response && !response.error) {
                var countInvite = [];
                // console.log(response);
                // console.log()
                // console.log(response.data[0]);
                if (response.data[0] !== undefined) {
                    // console.log(response.data[0].data.idData);
                    console.log(response.data[0].message);
                    MQ.responseChallen = response.data;
                    for (i = 0; i < MQ.responseChallen.length; i++) {
                        if (MQ.responseChallen[i].message == "Come and play MusicQuiz with me!") {
                            deleteRequest(response.data[i].id);
                            countInvite.push(i);
                        }
                        if (MQ.responseChallen[i].message == "Challenge") {
                            MQ.responseChallen[i].data = JSON.parse(MQ.responseChallen[i].data);
                        }
                        // console.log(MQ.responseChallen[i].data);
                    }
                    // console.log(countInvite);
                    for (i = 0; i < countInvite.length; i++) {
                        MQ.responseChallen.splice(countInvite[i] - i, 1);
                    }
                    callback();
                } else {
                    callback();
                }
            }
        }
    );
}
function postRequestChallengeToFriend(callback) {
    FB.ui({
        method: 'apprequests',
        message: 'Challenge',
        to: MQ.idFriendChallenge,
        data: {
            "idData": MQ.idDataChallenge.$oid,
            "scoreTheir": MQ.scoreYour,
            "scoreYour": MQ.scoreTheir,
            "isChallenge": true
        }
    }, function (response) {
        console.log(response);
    });
    callback();
}
function postRequestToDB(callback) {
    $.ajax({
        url: "https://api.mlab.com/api/1/databases/musicquizdb/collections/requests?apiKey=2q6U8mj4cR8XJyuoS4TZkUy_lR5Lu14p",
        type: "POST",
        data: JSON.stringify({
            "data": MQ.timeAnswerSaveToDataAndScore
        }),
        contentType: "application/json",
        success: function (data) {
            console.log(data._id);
            MQ.idDataChallenge = data._id;
            callback();
        }
    })
}
function getDataChallengeFromDB(callback) {
    $.ajax({
        url: "https://api.mlab.com/api/1/databases/musicquizdb/collections/requests?apiKey=2q6U8mj4cR8XJyuoS4TZkUy_lR5Lu14p",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            if (MQ.responseChallen !== undefined) {
                for (i = 0; i < MQ.responseChallen.length; i++) {
                    // console.log(JSON.parse(MQ.responseChallen[i].data).idData);
                    let dataFilter = data.filter(ele => ele._id.$oid == MQ.responseChallen[i].data.idData);
                    // console.log(dataFilter.length);
                    // console.log(dataFilter);
                    if (dataFilter.length > 0) {
                        MQ.dataChallenge[i] = dataFilter[0].data;
                    }
                }
                // console.log(MQ.dataChallenge);
                // console.log(data);
            }
            callback();
        }
    })
    // callback();
}
function getSongToChallenge(data, callback) {
    var arr = [];
    // add new array of dataType
    for (i = 0; i < data.length; i++) {
        arr[i] = data[i];
    };
    // splice songChoiced Previous
    for (i = 0; i < MQ.indexSongChoiced.length; i++) {
        // if(MQ.indexSongChoiced[i])
        // console.log(arr[MQ.indexSongChoiced[i]]);
        arr.splice(MQ.indexSongChoiced[i], 1);
    };
    var songFiltered = arr.filter(ele => ele.ID == MQ.dataChooseToChall.time[MQ.getSongChall].ID);
    MQ.songChoiced = songFiltered[0];
    // console.log(MQ.dataChooseToChall.time[MQ.getSongChall].answer);
    MQ.songChoiced.answer = MQ.dataChooseToChall.time[MQ.getSongChall].answer;
    MQ.songChoiced.timingFriendChallenged = MQ.dataChooseToChall.time[MQ.getSongChall].timeAnswer;
    // console.log(MQ.songChoiced.timingFriendChallenged);
    // console.log(MQ.songChoiced);
    var arrNotRandom = [
        {
            "answer": MQ.songChoiced.Answer1
        },
        {
            "answer": MQ.songChoiced.Answer2
        },
        {
            "answer": MQ.songChoiced.Answer3
        },
        {
            "answer": MQ.songChoiced.Answer4
        }
    ];
    MQ.songRandomChoiced = [];
    for (i = 0; i < 3; i++) {
        let randomChoiced = Math.floor(Math.random() * arrNotRandom.length);
        let obj = arrNotRandom[randomChoiced];
        arrNotRandom.splice(randomChoiced, 1);
        // console.log(obj);
        MQ.songRandomChoiced[i] = obj;
        if (i == 2) {
            // console.log(arrNotRandom[0]);
            MQ.songRandomChoiced[3] = arrNotRandom[0];
        }
    }
    // console.log(MQ.songRandomChoiced);
    // console.log(MQ.timeAnswerSaveToData);
    // if(random)
    MQ.songChoicedList.push(MQ.songChoiced);
    MQ.songRandomChoicedList.push(MQ.songRandomChoiced);
    MQ.getSongChall++;
    callback();
}
function deleteRequest(requestId) {
    FB.api(requestId, 'delete', function (response) {
        console.log(response);
    });
}
function getBotChallenge(callback) {
    MQ.botChallenges = [];
    $.ajax({
        url: "https://api.mlab.com/api/1/databases/musicquizdb/collections/bots?apiKey=2q6U8mj4cR8XJyuoS4TZkUy_lR5Lu14p",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            // console.log(data);
            let random = Math.floor(Math.random()*(MQ.randomBotList.length - 0.1));
            // console.log(Math.floor(Math.random()*(MQ.randomBotList.length + 0.9)));
            // console.log(random);
            // console.log(MQ.randomBotList[random]);
            var botList = MQ.randomBotList[random];
            for(index in botList){
                // console.log(data[botList[index]]);
                MQ.botChallenges[index] = data[botList[index]];
            }
            callback();
        }
    });
}
function getSongToBotChallenge(data, callback) {
    var arr = [];
    // add new array of dataType
    for (i = 0; i < data.length; i++) {
        arr[i] = data[i];
    };
    // splice songChoiced Previous
    for (i = 0; i < MQ.indexSongChoiced.length; i++) {
        // if(MQ.indexSongChoiced[i])
        // console.log(arr[MQ.indexSongChoiced[i]]);
        arr.splice(MQ.indexSongChoiced[i], 1);
    };
    // console.log(MQ.dataChooseToChall.data.time[MQ.getSongChall]);
    var songFiltered = arr.filter(ele => ele.ID == MQ.dataChooseToChall.data.time[MQ.getSongChall].ID);
    MQ.songChoiced = songFiltered[0];
    // console.log(MQ.dataChooseToChall.data.time[MQ.getSongChall]);
    MQ.songChoiced.answer = MQ.dataChooseToChall.data.time[MQ.getSongChall].answer;
    MQ.songChoiced.timingFriendChallenged = MQ.dataChooseToChall.data.time[MQ.getSongChall].timeAnswer;
    // console.log(MQ.songChoiced.timingFriendChallenged);
    // console.log(MQ.songChoiced);
    var arrNotRandom = [
        {
            "answer": MQ.songChoiced.Answer1
        },
        {
            "answer": MQ.songChoiced.Answer2
        },
        {
            "answer": MQ.songChoiced.Answer3
        },
        {
            "answer": MQ.songChoiced.Answer4
        }
    ];
    MQ.songRandomChoiced = [];
    for (i = 0; i < 3; i++) {
        let randomChoiced = Math.floor(Math.random() * arrNotRandom.length);
        let obj = arrNotRandom[randomChoiced];
        arrNotRandom.splice(randomChoiced, 1);
        // console.log(obj);
        MQ.songRandomChoiced[i] = obj;
        if (i == 2) {
            // console.log(arrNotRandom[0]);
            MQ.songRandomChoiced[3] = arrNotRandom[0];
        }
    }
    // console.log(MQ.songRandomChoiced);
    // console.log(MQ.timeAnswerSaveToData);
    // if(random)
    MQ.songChoicedList.push(MQ.songChoiced);
    MQ.songRandomChoicedList.push(MQ.songRandomChoiced);
    MQ.getSongChall++;
    callback();
}