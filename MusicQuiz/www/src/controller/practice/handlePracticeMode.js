function getSongToPractice(data, callback) {
    // console.log(data);
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
    callback();
}
function updatePracticeMode(val) {
    $.ajax(
        {
            url: `https://api.mlab.com/api/1/databases/musicquizdb/collections/users/${MQ.oidUserData}?apiKey=2q6U8mj4cR8XJyuoS4TZkUy_lR5Lu14p`,
            data: JSON.stringify({
                "$set": { "practiceModeScore": val }
            }),
            type: "PUT",
            contentType: "application/json",
            success: function (data) {
                console.log(data);
            }
        });
}
function checkRankPracticeMode(name, ava, url, score) {
    var Swap = {
        name: name,
        ava: ava,
        url: url,
        score: score
    };
    for (i = 0; i < MQ.rankFake.length; i++) {
        if (MQ.rankFake[i].score < Swap.score) {
            [MQ.rankFake[i], Swap] = [Swap, MQ.rankFake[i]];
        }
    };
}