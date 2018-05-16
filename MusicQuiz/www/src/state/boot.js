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
    // showConsole("Boot screen");
    // console.log(MQ.game.width, MQ.game.height);
    // this.game.stage.smoothed = true;
    MQ.data = [];
    MQ.dataChoosed = [];
    MQ.listPlaylist = [
      {
        "name": "Nhạc trẻ 2017",
        "img": 'Nhactre',
        "namePlaylist": "new2017Data"
      },
      {
        "name": "Sơn Tùng MTP",
        "img": 'Mtp',
        "namePlaylist": "mtpData"
      },
      {
        "name": "Noo Phước Thịnh",
        "img": 'Noo',
        "namePlaylist": "nooData"
      },
      {
        "name": "Tiên Cookie",
        "img": 'Cookie',
        "namePlaylist": "cookieData"
      },
      {
        "name": "Nhạc Indie",
        "img": 'Indie',
        "namePlaylist": "indieData"
      }
    ]
    MQ.playListFree = [
      {
        imgPlaylist: "img/assets/popup/playlist-1.png",
        namePlaylist: "new2017Data"
      },
      {
        imgPlaylist: "img/assets/popup/playlist-2.png",
        namePlaylist: "mtpData"
      },
      {
        imgPlaylist: "img/assets/popup/playlist-3.png",
        namePlaylist: "indieData"
      },
      {
        imgPlaylist: "img/assets/popup/playlist-more.png",
        namePlaylist: "cookieData"
      }
    ];
    MQ.mailDemo = [
      {
        avaUrl: 'img/assets/mail/ava_01.png',
        avaName: 'ava-micro-mail',
        name: 'System',
        mess: 'Playlist Mỹ Tâm mới ra lò hôm nay',
        date: '18/05',
        isReceived: false
      },
      {
        avaUrl: 'img/assets/avaDemo/Ava_01.png',
        avaName: 'avaDemo1',
        name: 'Bích Phương',
        mess: 'Hi! Bạn ở Sài Gòn hay Hà Nội vậy',
        date: '18/05',
        isReceived: false
      },
      {
        avaUrl: 'img/assets/avaDemo/Ava_02.png',
        avaName: 'avaDemo2',
        name: 'Quỳnh Lan',
        mess: 'Quỳnh Lan vừa tặng bạn một món quà',
        date: '18/05',
        isReceived: false
      },
      {
        avaUrl: 'img/assets/avaDemo/Ava_03.png',
        avaName: 'avaDemo3',
        name: 'Đan Đan',
        mess: 'Hi! Làm quen nhé bạn',
        date: '17/05',
        isReceived: false
      },
      {
        avaUrl: 'img/assets/avaDemo/Ava_04.png',
        avaName: 'avaDemo4',
        name: 'Khởi My',
        mess: 'Bạn cũng thích Mỹ Tâm à? Hôm nào rảnh mình g..',
        date: '17/05',
        isReceived: false
      },
      {
        avaUrl: 'img/assets/avaDemo/Ava_05.png',
        avaName: 'avaDemo5',
        name: 'Kim Trang',
        mess: 'Ngọt mới ra bài này hay quá nè :)',
        date: '16/05',
        isReceived: false
      }
    ]
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
    MQ.posDotPractice = [
      {
        num: 1,
        x: -15,
        y: -15
      },
      {
        num: 2,
        x: -15,
        y: -15
      },
      {
        num: 3,
        x: 358,
        y: 500
      },
      {
        num: 4,
        x: 438,
        y: 500
      },
      {
        num: 5,
        x: -15,
        y: -15
      },
      {
        num: 6,
        x: 651,
        y: 500
      },
      {
        num: 7,
        x: 731,
        y: 500
      },
      {
        num: 8,
        x: -15,
        y: -15
      },
      {
        num: 9,
        x: 832,
        y: 565
      },
      {
        num: 10,
        x: 832,
        y: 600
      },
      {
        num: 11,
        x: 832,
        y: 635
      },
      {
        num: 12,
        x: -15,
        y: -15
      },
      {
        num: 13,
        x: 762,
        y: 695
      },
      {
        num: 14,
        x: 724,
        y: 695
      },
      {
        num: 15,
        x: 686,
        y: 695
      },
      {
        num: 16,
        x: 648,
        y: 695
      },
      {
        num: 17,
        x: 610,
        y: 695
      },
      {
        num: 18,
        x: -15,
        y: -15
      },
      {
        num: 19,
        x: 476,
        y: 695
      },
      {
        num: 20,
        x: 443,
        y: 695
      },
      {
        num: 21,
        x: 410,
        y: 695
      },
      {
        num: 22,
        x: 377,
        y: 695
      },
      {
        num: 23,
        x: 344,
        y: 695
      },
      {
        num: 24,
        x: 311,
        y: 695
      },
      {
        num: 25,
        x: -15,
        y: -15
      },
      {
        num: 26,
        x: 250,
        y: 745
      },
      {
        num: 27,
        x: 250,
        y: 762
      },
      {
        num: 28,
        x: 250,
        y: 779
      },
      {
        num: 29,
        x: 250,
        y: 796
      },
      {
        num: 30,
        x: 250,
        y: 813
      },
      {
        num: 31,
        x: 250,
        y: 830
      },
      {
        num: 32,
        x: 250,
        y: 847
      },
      {
        num: 33,
        x: -15,
        y: -15
      },
      {
        num: 34,
        x: 297,
        y: 893
      },
      {
        num: 35,
        x: 316,
        y: 893
      },
      {
        num: 36,
        x: 335,
        y: 893
      },
      {
        num: 37,
        x: 354,
        y: 893
      },
      {
        num: 38,
        x: 373,
        y: 893
      },
      {
        num: 39,
        x: 392,
        y: 893
      },
      {
        num: 40,
        x: 411,
        y: 893
      },
      {
        num: 41,
        x: 430,
        y: 893
      },
      {
        num: 42,
        x: 449,
        y: 893
      },
      {
        num: 43,
        x: 468,
        y: 893
      },
      {
        num: 44,
        x: 487,
        y: 893
      },
      {
        num: 45,
        x: -15,
        y: -15
      },
      {
        num: 46,
        x: 592,
        y: 893
      },
      {
        num: 47,
        x: 613,
        y: 893
      },
      {
        num: 48,
        x: 634,
        y: 893
      },
      {
        num: 49,
        x: 655,
        y: 893
      },
      {
        num: 50,
        x: 676,
        y: 893
      },
      {
        num: 51,
        x: 697,
        y: 893
      },
      {
        num: 52,
        x: 718,
        y: 893
      },
      {
        num: 53,
        x: 739,
        y: 893
      },
      {
        num: 54,
        x: 761,
        y: 893
      },
      {
        num: 55,
        x: 782,
        y: 893
      },
      {
        num: 56,
        x: -15,
        y: -15
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
    MQ.shopLoader = [
      {
        name: 'diamond-playlist-shop',
        url: 'img/assets/shop/playlist/Diamond.png'
      },
      {
        name: 'diamond-active-playlist-shop',
        url: 'img/assets/shop/playlist/Diamond_active.png'
      },
      {
        name: 'gif-playlist-shop',
        url: 'img/assets/shop/playlist/Gif.png'
      },
      {
        name: 'gif-active-playlist-shop',
        url: 'img/assets/shop/playlist/Gif_active.png'
      },
      {
        name: 'line1-playlist-shop',
        url: 'img/assets/shop/playlist/Line_01.png'
      },
      {
        name: 'line2-playlist-shop',
        url: 'img/assets/shop/playlist/Line_02.png'
      },
      {
        name: 'line3-playlist-shop',
        url: 'img/assets/shop/playlist/Line_03.png'
      },
      {
        name: 'playlist-playlist-shop',
        url: 'img/assets/shop/playlist/Playlist.png'
      },
      {
        name: 'playlist-active-playlist-shop',
        url: 'img/assets/shop/playlist/Playlist_active.png'
      },
      {
        name: 'search-box-playlist-shop',
        url: 'img/assets/shop/playlist/Search_box.png'
      },
      {
        name: 'search-icon-playlist-shop',
        url: 'img/assets/shop/playlist/Search_Icon.png'
      },
      {
        name: 'search-tab-playlist-shop',
        url: 'img/assets/shop/playlist/Search_tab.png'
      },
      {
        name: 'shadow-playlist-shop',
        url: 'img/assets/shop/playlist/Shadow.png'
      },
      {
        name: 'tab1-playlist-shop',
        url: 'img/assets/shop/playlist/Tab_01.png'
      },
      {
        name: 'tab1-header-playlist-shop',
        url: 'img/assets/shop/playlist/tab1-header-shop.png'
      },
      {
        name: 'tab2-header-playlist-shop',
        url: 'img/assets/shop/playlist/tab2-header-shop.png'
      },
      {
        name: 'tab2-playlist-shop',
        url: 'img/assets/shop/playlist/Tb_02.png'
      },
      {
        name: 'vip-playlist-shop',
        url: 'img/assets/shop/playlist/Vip.png'
      },
      {
        name: 'vip-active-playlist-shop',
        url: 'img/assets/shop/playlist/Vip_active.png'
      },
      {
        name: 'btn-tien-resource-shop',
        url: 'img/assets/shop/resource/Button_Tien.png'
      },
      {
        name: 'diamond-resource-shop',
        url: 'img/assets/shop/resource/Diamond.png'
      },
      {
        name: 'heart-color-resource-shop',
        url: 'img/assets/shop/resource/Heart_Color.png'
      },
      {
        name: 'line-resource-shop',
        url: 'img/assets/shop/resource/Line.png'
      },
      {
        name: 'line2-resource-shop',
        url: 'img/assets/shop/resource/Line_02.png'
      },
      {
        name: 'small-diamond-resource-shop',
        url: 'img/assets/shop/resource/Small_Diamond.png'
      },
      {
        name: 'small-diamond-active-resource-shop',
        url: 'img/assets/shop/resource/Small_Diamond_Active.png'
      },
      {
        name: 'small-heart-resource-shop',
        url: 'img/assets/shop/resource/Small_Heart.png'
      },
      {
        name: 'small-heart-active-resource-shop',
        url: 'img/assets/shop/resource/Small_Heart_Active.png'
      },
      {
        name: 'small-ticket-resource-shop',
        url: 'img/assets/shop/resource/Small_Ticket.png'
      },
      {
        name: 'small-ticket-active-resource-shop',
        url: 'img/assets/shop/resource/Small_Ticket_Active.png'
      },
      {
        name: 'tab-menu2-resource-shop',
        url: 'img/assets/shop/resource/Tab_Menu_02.png'
      },
      {
        name: 'ticket-color-playlist-shop',
        url: 'img/assets/shop/resource/Ticket_Color.png'
      },
      {
        name: 'watch-video-playlist-shop',
        url: 'img/assets/shop/resource/XemVIdeo.png'
      },
      {
        name: 'ava1-playlist-shop',
        url: 'img/assets/shop/playlist/01.png'
      },
      {
        name: 'ava11-playlist-shop',
        url: 'img/assets/shop/playlist/11.png'
      },
      {
        name: 'ava2-playlist-shop',
        url: 'img/assets/shop/playlist/02.png'
      },
      {
        name: 'ava3-playlist-shop',
        url: 'img/assets/shop/playlist/03.png'
      },
      {
        name: 'ava4-playlist-shop',
        url: 'img/assets/shop/playlist/04.png'
      },
      {
        name: 'ava5-playlist-shop',
        url: 'img/assets/shop/playlist/05.png'
      },
      {
        name: 'ava6-playlist-shop',
        url: 'img/assets/shop/playlist/06.png'
      },
      {
        name: 'ava7-playlist-shop',
        url: 'img/assets/shop/playlist/07.png'
      },
      {
        name: 'ava8-playlist-shop',
        url: 'img/assets/shop/playlist/08.png'
      },
      {
        name: 'ava9-playlist-shop',
        url: 'img/assets/shop/playlist/09.png'
      },
      {
        name: 'ava10-playlist-shop',
        url: 'img/assets/shop/playlist/10.png'
      },
      {
        name: 'ava12-playlist-shop',
        url: 'img/assets/shop/playlist/12.png'
      },
      {
        name: 'bg-chude-playlistdetail-shop',
        url: 'img/assets/shop/playlistdetail/BG_Chude.png'
      },
      {
        name: 'btn-yourplaylist-playlistdetail-shop',
        url: 'img/assets/shop/playlistdetail/Button_PLaylistCuaBan.png'
      },
      {
        name: 'btn-xemtatca-playlistdetail-shop',
        url: 'img/assets/shop/playlistdetail/Button_XemTatCa.png'
      },
      {
        name: 'line-playlistdetail-shop',
        url: 'img/assets/shop/playlistdetail/Line.png'
      },
      {
        name: 'search-playlistdetail-shop',
        url: 'img/assets/shop/playlistdetail/Search.png'
      },
      {
        name: 'tab-chude-playlistdetail-shop',
        url: 'img/assets/shop/playlistdetail/Tab_Chude.png'
      },
      {
        name: 'tab-chude-nhactre-playlistdetail-shop',
        url: 'img/assets/shop/playlistdetail/Nhactre.png'
      },
      {
        name: 'tab-chude-nhacdance-playlistdetail-shop',
        url: 'img/assets/shop/playlistdetail/Nhacdance.png'
      },
      {
        name: 'tab-chude-nhactrutinh-playlistdetail-shop',
        url: 'img/assets/shop/playlistdetail/Nhactrutinh.png'
      },
      {
        name: 'tab-chude-nhacindie-playlistdetail-shop',
        url: 'img/assets/shop/playlistdetail/Nhacindie.png'
      },
      {
        name: 'tab-diamond-playlistdetail-shop',
        url: 'img/assets/shop/playlistdetail/Tab_Diamond.png'
      },
      {
        name: 'tab-diamond-top-playlistdetail-shop',
        url: 'img/assets/shop/playlistdetail/Tab_Diamond_Top.png'
      },
      {
        name: 'tab-nhac-playlistdetail-shop',
        url: 'img/assets/shop/playlistdetail/Tab_Nhac.png'
      },
      {
        name: 'tab-nhac-active-playlistdetail-shop',
        url: 'img/assets/shop/playlistdetail/Tab_Nhac_Active.png'
      },
      {
        name: 'header-playlistdetail-shop',
        url: 'img/assets/shop/playlistdetail/Header.png'
      },
      {
        name: 'fieldDrag-playlistdetail-shop',
        url: 'img/assets/shop/playlistdetail/fieldDragHorizontal.png'
      },
      {
        name: 'fieldDragPhobien-playlistdetail-shop',
        url: 'img/assets/shop/playlistdetail/fieldDragHorizontalPhobien.png'
      },
      {
        name: 'fieldDragMoi-playlistdetail-shop',
        url: 'img/assets/shop/playlistdetail/fieldDragHorizontalMoi.png'
      },
      {
        name: 'fieldDragNoibat-playlistdetail-shop',
        url: 'img/assets/shop/playlistdetail/fieldDragHorizontalNoibat.png'
      }
    ];
    MQ.settingLoader = [
      {
        name: 'arrow_setting',
        url: 'img/assets/setting/Arrow.png'
      },
      {
        name: 'btn_fb_setting',
        url: 'img/assets/setting/Button_FB.png'
      },
      {
        name: 'btn_logout_setting',
        url: 'img/assets/setting/Button_LOgout.png'
      },
      {
        name: 'line_setting',
        url: 'img/assets/setting/Line.png'
      },
      {
        name: 'tab_header_setting',
        url: 'img/assets/setting/Tab_header.png'
      },
    ];
    MQ.listSetting = [
      {
        text: 'Tài khoản',
        btn: 'arrow_setting'
      },
      {
        text: 'Thông báo',
        btn: 'arrow_setting'
      },
      {
        text: 'Thiết lập game',
        btn: 'arrow_setting'
      },
      {
        text: 'Bảo mật',
        btn: 'arrow_setting'
      },
      {
        text: 'Chọn ngôn ngữ',
        btn: 'arrow_setting'
      },
      {
        text: 'Điều khoản',
        btn: 'arrow_setting'
      },
      {
        text: 'Trợ giúp',
        btn: 'arrow_setting'
      },
      {
        text: 'Kết nối với chúng tôi',
        btn: 'btn_fb_setting'
      }
    ]
    // rank Loader
    MQ.rankLoader = [
      {
        name: 'arrow-rank',
        url: 'img/assets/Practice/rank/Arrow.png'
      },
      {
        name: 'bg-rank',
        url: 'img/assets/Practice/rank/bg-rank-practice.png'
      },
      {
        name: 'box-rank',
        url: 'img/assets/Practice/rank/Box.png'
      },
      {
        name: 'icon-rank-header-rank',
        url: 'img/assets/Practice/rank/Icon_Rank_Header.png'
      },
      {
        name: 'icon-rank-small-rank',
        url: 'img/assets/Practice/rank/Icon_Rank_Small.png'
      },
      {
        name: 'ipod-rank',
        url: 'img/assets/Practice/rank/Ipod.png'
      },
      {
        name: 'iphonex-rank',
        url: 'img/assets/Practice/rank/Iphonex.png'
      },
      {
        name: 'rank1-orange-rank',
        url: 'img/assets/Practice/rank/Rank_01_Orange.png'
      },
      {
        name: 'rank1-white-rank',
        url: 'img/assets/Practice/rank/Rank_01_White.png'
      },
      {
        name: 'rank2-orange-rank',
        url: 'img/assets/Practice/rank/Rank_02_Orange.png'
      },
      {
        name: 'rank2-white-rank',
        url: 'img/assets/Practice/rank/Rank_02_White.png'
      },
      {
        name: 'rank3-orange-rank',
        url: 'img/assets/Practice/rank/Rank_03_Orange.png'
      },
      {
        name: 'rank3-white-rank',
        url: 'img/assets/Practice/rank/Rank_03_White.png'
      },
      {
        name: 'sony-rank',
        url: 'img/assets/Practice/rank/Snony.png'
      },
      {
        name: 'tab1-rank',
        url: 'img/assets/Practice/rank/Tab_01.png'
      },
      {
        name: 'tab2-rank',
        url: 'img/assets/Practice/rank/Tab_02.png'
      },
      {
        name: 'tab3-rank',
        url: 'img/assets/Practice/rank/Tab_03.png'
      },
      {
        name: 'tab-header-rank',
        url: 'img/assets/Practice/rank/Tab_Header.png'
      },
      {
        name: 'tab-top3-rank',
        url: 'img/assets/Practice/rank/tab-top3.png'
      },
      {
        name: 'rank4to10-rank',
        url: 'img/assets/Practice/rank/rank4-10.png'
      }
    ]
    MQ.listChude = [{
      name: 'Nhạc trẻ',
      img: 'tab-chude-nhactre-playlistdetail-shop'
    }, {
      name: 'Nhạc trữ tình',
      img: 'tab-chude-nhactrutinh-playlistdetail-shop'
    }, {
      name: 'Nhạc Dance',
      img: 'tab-chude-nhacdance-playlistdetail-shop'
    }, {
      name: 'Nhạc Indie',
      img: 'tab-chude-nhacindie-playlistdetail-shop'
    },];
    MQ.listPhobien = ['Sơn Tùng M-TP', 'Hồ Ngọc Hà', 'Bằng Kiều', 'ERIK'];
    MQ.listMoi = ['Noo Phước\nThịnh', 'Mỹ Tâm', 'Soobin Hoàng\nSơn', 'Up to you'];
    MQ.listNoibat = ['Bảo Anh', 'Lệ Quyên', 'Bích Phương', 'Thùy Chi'];
    MQ.listResource = [
      {
        text: 'Free Diamond',
        diamond: '15',
        price: 'Watch'
      },
      {
        text: 'Small Diamond',
        diamond: '99',
        price: '1,99'
      },
      {
        text: 'Medium Diamond',
        diamond: '250',
        price: '2,99'
      },
      {
        text: 'Big Diamond',
        diamond: '1250',
        price: '9,99'
      },
      {
        text: 'Rich Diamond',
        diamond: '5250',
        price: '49,99'
      }
    ];
    MQ.rankFake = [
      {
        name: 'Bích Phương',
        ava: 'ava-rank1',
        url: 'img/assets/Practice/rank/ava/1.png',
        score: 56
      },
      {
        name: 'Min',
        ava: 'ava-rank2',
        url: 'img/assets/Practice/rank/ava/2.png',
        score: 52
      },
      {
        name: 'Chi Pu',
        ava: 'ava-rank3',
        url: 'img/assets/Practice/rank/ava/3.png',
        score: 45
      },
      {
        name: 'Bi Rain',
        ava: 'ava-rank4',
        url: 'img/assets/Practice/rank/ava/4.png',
        score: 42
      },
      {
        name: 'Hà Anh Tuấn',
        ava: 'ava-rank5',
        url: 'img/assets/Practice/rank/ava/5.png',
        score: 40
      },
      {
        name: 'Hồ Ngọc Hà',
        ava: 'ava-rank6',
        url: 'img/assets/Practice/rank/ava/6.png',
        score: 32
      },
      {
        name: 'Tuấn Hưng',
        ava: 'ava-rank7',
        url: 'img/assets/Practice/rank/ava/7.png',
        score: 27
      },
      {
        name: 'Đức Phúc',
        ava: 'ava-rank8',
        url: 'img/assets/Practice/rank/ava/8.png',
        score: 26
      },
      {
        name: 'Hương Tràm',
        ava: 'ava-rank9',
        url: 'img/assets/Practice/rank/ava/9.png',
        score: 25
      }
    ];
    MQ.randomBotList = [[0, 1, 2, 3], [2, 6, 0, 4], [3, 5, 1, 0], [2, 6, 3, 0], [1, 3, 5, 6], [4, 5, 6, 0], [5, 1, 0, 2], [6, 4, 2, 1], [5, 3, 1, 10], [2, 6, 1, 2], [8, 6, 9, 7], [11, 12, 13, 14], [9, 14, 10, 1], [11, 6, 3, 14], [14, 3, 2, 1], [9, 6, 13, 12], [12, 10, 6, 1], [14, 1, 3, 10], [6, 7, 8, 9], [13, 14, 6, 5]];
    // console.log(MQ.playListFree.length);
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
        // postDBUser(MQ.accessToken, MQ.checkId);
        // showConsole("Loading....");
        // MQ.button_sound.stop();
        MQ.game.state.start('load');
      })
    });
    this.term_txt = MQ.game.add.text(MQ.game.world.centerX, 1848, 'Để bắt đầu game, bạn phải đồng ý với Điều khoản sử dụng', {
      font: "40px Roboto",
      fill: "white",
      boundsAlignH: "center",
      boundsAlignV: "middle",
      fontWeight: 400
    });
    this.term_txt.anchor.set(0.5);
    // this.term_txt.addColor("#ffffff",0);
    this.term_txt.addColor("#ffa33a", 37);
  },
  update: function () {
    if (MQ.checkConnect == 'connected') {
      MQ.btn_fb.destroy();
    }
  },
  render: function () {

  }
}