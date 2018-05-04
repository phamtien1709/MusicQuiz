var bootState = {
  preload: function () {
    this.game.sound.context.resume();
    MQ.game.scale.pageAlignHorizontally = true;
    MQ.game.time.advancedTiming = true;
    MQ.game.stage.disableVisibilityChange = true;
    MQ.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    MQ.game.load.image('bg', 'img/assets/bg.png');
    MQ.game.load.image('btn-fb', 'img/assets/fb-login.png');
    MQ.game.load.image('bg-load', 'img/assets/Loading/bg.png');
    MQ.game.load.image('logo', 'img/assets/Loading/Logo.png');
    MQ.game.load.image('disc', 'img/assets/Loading/Disc.png');
    MQ.game.load.image('c-orange', 'img/assets/Loading/Circle_Orange.png');
    MQ.game.load.image('c-pink', 'img/assets/Loading/Circle_Pink.png');
    MQ.game.load.image('c-violet', 'img/assets/Loading/Circle_Violet.png');
    createSoundDefault();
  },
  create: function () {
    this.game.stage.background = MQ.game.add.sprite(0, 0, 'bg-load');
    this.logo = MQ.game.add.sprite(MQ.game.world.centerX, 222, 'logo');
    this.logo.anchor.set(0.5);
    this.term_txt = MQ.game.add.text(MQ.game.world.centerX, 1848, 'Để bắt đầu game, bạn phải đồng ý với Điều khoản sử dụng', {
      font: "40px Roboto",
      fill: "white",
      boundsAlignH: "center",
      boundsAlignV: "middle"
    });
    this.term_txt.anchor.set(0.5);
    // this.term_txt.addColor("#ffffff",0);
    this.term_txt.addColor("#ffa33a", 37);
    // showConsole("Boot screen");
    // console.log(MQ.game.width, MQ.game.height);
    // this.game.stage.smoothed = true;
    MQ.achievementPractice = [
      {
        "answer": 2,
        "reward": 10
      },
      {
        "answer": 5,
        "reward": 15
      },
      {
        "answer": 8,
        "reward": 20
      },
      {
        "answer": 12,
        "reward": 30
      },
      {
        "answer": 18,
        "reward": 50
      },
      {
        "answer": 25,
        "reward": 100
      },
      {
        "answer": 33,
        "reward": 150
      },
      {
        "answer": 45,
        "reward": 200
      },
      {
        "answer": 56,
        "reward": 500
      }
    ];
    //diamondposX 245,540,830
    //diamondposY 430,630,830
    MQ.posCirclePractice = [
      {
        "x": 246.5,
        "y": 495
      },
      {
        "x": 540,
        "y": 495
      },
      {
        "x": 831.5,
        "y": 495
      },
      {
        "x": 831.5,
        "y": 695
      },
      {
        "x": 540,
        "y": 695
      },
      {
        "x": 246.5,
        "y": 695
      },
      {
        "x": 246.5,
        "y": 893
      },
      {
        "x": 540,
        "y": 893
      },
      {
        "x": 831.5,
        "y": 893
      }
    ];
    MQ.posAchievementPractice = [
      {
        "diamondPosX": 245,
        "diamondPosY": 430,
        "answerPosX": 245,
        "answerPosY": 555
      },
      {
        "diamondPosX": 540,
        "diamondPosY": 430,
        "answerPosX": 540,
        "answerPosY": 555
      },
      {
        "diamondPosX": 830,
        "diamondPosY": 430,
        "answerPosX": 805,
        "answerPosY": 555
      },
      {
        "diamondPosX": 770,
        "diamondPosY": 630,
        "answerPosX": 830,
        "answerPosY": 760
      },
      {
        "diamondPosX": 540,
        "diamondPosY": 630,
        "answerPosX": 540,
        "answerPosY": 760
      },
      {
        "diamondPosX": 250,
        "diamondPosY": 630,
        "answerPosX": 295,
        "answerPosY": 760
      },
      {
        "diamondPosX": 345,
        "diamondPosY": 835,
        "answerPosX": 245,
        "answerPosY": 960
      },
      {
        "diamondPosX": 540,
        "diamondPosY": 835,
        "answerPosX": 540,
        "answerPosY": 960
      },
      {
        "diamondPosX": 830,
        "diamondPosY": 835,
        "answerPosX": 830,
        "answerPosY": 960
      },
    ];
    MQ.playListFree = ['Playlist 1', 'Playlist 2', 'Playlist 3'];
    MQ.game.stage.backgroundColor = "#ffffff";
    // var bg = MQ.game.add.sprite(0, 0, 'bg');
    // bg.width = MQ.game.width;
    // bg.height = MQ.game.height;
    MQ.btn_fb = MQ.game.add.button(MQ.game.world.centerX, 613, 'btn-fb');
    MQ.btn_fb.anchor.set(0.5);
    // MQ.btn_fb.scale.set(MQ.configs.SCALE);
    MQ.btn_fb.events.onInputDown.add(() => {
      // MQ.button_sound.play();
      console.log('fb login');
      FB.login(function (response) {
        // console.log(response);
        if (response.status == 'unknown') {
          alert("Đăng nhập lỗi, hãy đăng nhập lại! :'(");
        }
        if (response.status == 'connected') {
          MQ.game.state.start('boot');
        }
      }, { scope: 'user_likes,email, user_location, user_birthday, publish_actions, user_friends' });
    });
    checkLoginState(() => {
      getUserID(() => {
        // showConsole("Loading....");
        // MQ.button_sound.stop();
        MQ.game.state.start('load');
      })
    });
    // MQ.button_sound.on('end', () => {
    //   // console.log('end btn');
    //   MQ.button_sound.stop();
    // });
  },
  update: function () {
    if (MQ.checkConnect == 'connected') {
      MQ.btn_fb.destroy();
    }
  },
  render: function () {

  }
}