function updateDiamond(val) {
    $.ajax(
        {
            url: `https://api.mlab.com/api/1/databases/musicquizdb/collections/users/${MQ.oidUserData}?apiKey=2q6U8mj4cR8XJyuoS4TZkUy_lR5Lu14p`,
            data: JSON.stringify({
                "$set": { "diamond": val }
            }),
            type: "PUT",
            contentType: "application/json",
            success: function (data) {
                console.log(data);
            }
        });
}