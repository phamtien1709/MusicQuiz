function getUserID(callback) {
    $.ajax({
        url: "https://api.mlab.com/api/1/databases/musicquizdb/collections/users?apiKey=2q6U8mj4cR8XJyuoS4TZkUy_lR5Lu14p",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            // console.log(data);
            var arr = data;
            var obj = arr.find(function (obj) {
                // obj.userID = KT.checkId;
                return obj.idFB == MQ.checkId;
            });
            // console.log(obj);
            if (obj == undefined) {
                if (MQ.checkConnect == "connected") {
                    $.ajax({
                        url: "https://api.mlab.com/api/1/databases/musicquizdb/collections/users?apiKey=2q6U8mj4cR8XJyuoS4TZkUy_lR5Lu14p",
                        data: JSON.stringify({
                            "userName": MQ.nameFB,
                            "idFB": MQ.checkId,
                            "level": 1,
                            "heart": 20,
                            "diamond": 0,
                            "ticket":0,
                            "yourTurn": [],
                            "yourChallenge": [],
                            "email": MQ.emailUser,
                            "items": [],
                            "albums": [],
                            "friends": [],
                            "practiceModeScore": 0,
                            "partyModeScore": 0,
                            "achievements": [],
                            "weeklyHighscore": 0,
                            "allTimeHighScore": 0
                        }),
                        type: "POST",
                        contentType: "application/json",
                        success: function (data) {
                            console.log(data);
                            MQ.game.state.restart();
                        }
                    });
                }
            } else {
                MQ.playLists = obj.playLists;
                MQ.achievements = obj.achievements;
                MQ.weeklyHighscore = obj.weeklyHighscore;
                MQ.allTimeHighScore = obj.allTimeHighScore;
                MQ.level = obj.level;
                MQ.heart = obj.heart;
                MQ.diamond = obj.diamond;
                MQ.ticket = obj.ticket;
                MQ.items = obj.items;
                MQ.albums = obj.albums;
                MQ.practiceModeScore = obj.practiceModeScore;
                MQ.partyModeScore = obj.partyModeScore;
                MQ.oidUserData = obj._id.$oid;
                // console.log(MQ.practiceModeScore);
                // console.log(MQ.oidUserData);
                callback();
            }
        }
    });
}
function getJSONFile(callback) {
    $.ajax({
        url: 'img/assets/json/excelExport.json',
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            var obj = data;
            MQ.data = obj;
            // console.log(MQ.data)
            callback();
        }
    })
}