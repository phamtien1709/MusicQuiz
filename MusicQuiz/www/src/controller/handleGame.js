function getSongToQuiz(callback) {
    var arr = [];
    // add new array of dataType
    for (i = 0; i < MQ.data.length; i++) {
        arr[i] = MQ.data[i];
    };
    // console.log(arr);
    // splice songChoiced Previous
    for (i = 0; i < MQ.indexSongChoiced.length; i++) {
        arr.splice(MQ.indexSongChoiced[i], 1);
    };
    //get song to ask
    let random = Math.floor(Math.random() * (MQ.configs.SONG_NUMBER - MQ.indexSongChoiced.length));
    MQ.songChoiced = arr[random];
    MQ.indexSongChoiced.push(random);
    // arr.splice(random, 1);
    var arrNotRandom = [
        {
            "song": MQ.songChoiced.Song1,
            "singer": MQ.songChoiced.Singer1
        },
        {
            "song": MQ.songChoiced.Song2,
            "singer": MQ.songChoiced.Singer2
        },
        {
            "song": MQ.songChoiced.Song3,
            "singer": MQ.songChoiced.Singer3
        },
        {
            "song": MQ.songChoiced.Song4,
            "singer": MQ.songChoiced.Singer4
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
                    // console.log(MQ.responseChallen);
                    // let dataFilter = data.filter(ele => ele._id.$oid == MQ.responseChallen[i].data.idData);
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
            "scoreYour": MQ.scoreTheir
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
function getSongToChallenge(callback) {
    var arr = [];
    // add new array of dataType
    for (i = 0; i < MQ.data.length; i++) {
        arr[i] = MQ.data[i];
    };
    // console.log(arr);
    // splice songChoiced Previous
    for (i = 0; i < MQ.indexSongChoiced.length; i++) {
        arr.splice(MQ.indexSongChoiced[i], 1);
    };
    var songFiltered = arr.filter(ele => ele.ID == MQ.dataChooseToChall.time[MQ.getSongChall].ID);
    MQ.songChoiced = songFiltered[0];
    MQ.songChoiced.typeAnswer = MQ.dataChooseToChall.time[MQ.getSongChall].typeAnswer;
    MQ.songChoiced.answer = MQ.dataChooseToChall.time[MQ.getSongChall].answer;
    MQ.songChoiced.timingFriendChallenged = MQ.dataChooseToChall.time[MQ.getSongChall].timeAnswer;
    // console.log(MQ.songChoiced.timingFriendChallenged);
    // console.log(MQ.songChoiced);
    var arrNotRandom = [
        {
            "song": MQ.songChoiced.Song1,
            "singer": MQ.songChoiced.Singer1
        },
        {
            "song": MQ.songChoiced.Song2,
            "singer": MQ.songChoiced.Singer2
        },
        {
            "song": MQ.songChoiced.Song3,
            "singer": MQ.songChoiced.Singer3
        },
        {
            "song": MQ.songChoiced.Song4,
            "singer": MQ.songChoiced.Singer4
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