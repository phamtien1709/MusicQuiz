function statusChangeCallback(response, callback) {
    // console.log('statusChangeCallback');
    // console.log(response);
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        MQ.accessToken = response.authResponse.accessToken;
        // console.log(response);
        //socket
        MQ.checkConnect = response.status;
        testAPI();
        callback();
    } else {
        console.log('not connected');
    }
}
function checkLoginState(callback) {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response, callback);
        // callback();
    });
}

window.fbAsyncInit = function () {
    FB.init({
        appId: '709969695863741',
        cookie: true,
        xfbml: true,
        version: 'v2.8'
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/vi_VN/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
function testAPI() {
    FB.api(
        '/me',{ locale: 'vi_VN', fields: 'name, email' }, function (response) {
            // console.log(response.id, response.name);
            MQ.checkId = response.id;
            MQ.nameFB = response.name;
            MQ.emailUser = response.email;
            // MQ.game.state.start('load');
        });
    FB.api(
        '/me/invitable_friends', function (response) {
            
        });
    FB.api(
        '/me/friends', function (response) {
            MQ.installed_friend = response.data;
            // console.log(response.data);
        });
    return MQ.checkId, MQ.nameFB, MQ.installed_friend;
}
