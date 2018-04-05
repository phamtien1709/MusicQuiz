var bootState = {
  preload: function () {
    MQ.game.scale.pageAlignHorizontally = true;
    MQ.game.time.advancedTiming = true;
    MQ.game.stage.disableVisibilityChange = true;
    MQ.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    MQ.game.load.image('bg', 'img/assets/bg.png');
    MQ.game.load.image('btn-fb', 'img/assets/fb-login.png');
  },
  create: function () {
    showConsole("Boot screen");
    MQ.game.stage.backgroundColor = "#ffffff";
    var bg = MQ.game.add.sprite(0, 0, 'bg');
    bg.width = MQ.game.width;
    bg.height = MQ.game.height;
    MQ.btn_fb = MQ.game.add.button(MQ.game.width / 2, MQ.game.height / 2, 'btn-fb');
    MQ.btn_fb.anchor.set(0.5);
    MQ.btn_fb.scale.set(MQ.configs.SCALE);
    MQ.btn_fb.events.onInputDown.add(() => {
      console.log('fb login');
      FB.login(function (response) {
        // console.log(response);
        if (response.status == 'unknown') {
          alert("Đăng nhập lỗi, hãy đăng nhập lại! :'(");
        }
        if (response.status == 'connected') {
          MQ.game.state.start('boot');
        }
      }, { scope: 'user_likes,email, user_location, user_birthday, publish_actions, user_friends,read_custom_friendlists' });
    });
    checkLoginState(() => {
      getUserID(() => {
        showConsole("Loading....");
        MQ.game.state.start('load');
      })
    });
  },
  update: function () {
    if (MQ.checkConnect == 'connected') {
      MQ.btn_fb.destroy();
    }
  },
  render: function () {

  }
}