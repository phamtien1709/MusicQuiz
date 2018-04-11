MQ.timeHeart = 180;
setInterval(() => {
    if (MQ.timeHeart == 0) {
        if (MQ.heart < 20) {
            MQ.heart += 1;
            updateHeart(MQ.heart);
        }
        MQ.timeHeart = 180;
    }
    MQ.timeHeart -= 1;
    // console.log(KT.timeHeart);
}, 1000);
function subHeartOnPractice() {
    MQ.heart--;
    updateHeart(MQ.heart);
}
function updateHeart(val) {
    $.ajax(
        {
            url: `https://api.mlab.com/api/1/databases/musicquizdb/collections/users/${MQ.oidUserData}?apiKey=2q6U8mj4cR8XJyuoS4TZkUy_lR5Lu14p`,
            data: JSON.stringify({
                "$set": { "heart": val }
            }),
            type: "PUT",
            contentType: "application/json",
            success: function (data) {
                console.log(data);
            }
        });
}