function createMailDisplay() {
    this.mailGroup = MQ.game.add.group();
    this.mailGroup.position.x = MQ.game.width;
    var bg = MQ.game.add.button(0, 0, 'bg-playlist');
    this.mailGroup.add(bg);
    var scrollMaskMess = MQ.game.add.graphics(0, 350);
    scrollMaskMess.beginFill();
    scrollMaskMess.drawRect(0, 0, MQ.game.width, 1360);
    scrollMaskMess.endFill();
    this.mailGroup.add(scrollMaskMess);
    var grapMess = MQ.game.add.graphics(0, 350);
    grapMess.drawRect(0, 0, MQ.game.width, 1360);
    grapMess.mask = scrollMaskMess;
    // grapMess.inputEnabled = true;
    // grapMess.input.enabledDrag();
    // grapMess.
    for(demo in MQ.mailDemo){
        let tab_mess = MQ.game.add.sprite(MQ.game.width/2, demo*232, 'tab-mess-mail');
        tab_mess.anchor.set(0.5, 0);
        let avaDemo = MQ.game.add.sprite(-423,113, `${MQ.mailDemo[demo].avaName}`);
        avaDemo.anchor.set(0.5);
        tab_mess.addChild(avaDemo);
        let name = MQ.game.add.text(-333, 93, `${MQ.mailDemo[demo].name}`,{
            font: `45px Roboto`,
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 500
        });
        name.anchor.set(0, 0.5);
        tab_mess.addChild(name);
        let mess = MQ.game.add.text(-333, 140, `${MQ.mailDemo[demo].mess}`, {
            font: `35px Roboto`,
            fill: "#93909d",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        mess.anchor.set(0, 0.5);
        tab_mess.addChild(mess);
        let date = MQ.game.add.text(488, 84, `${MQ.mailDemo[demo].date}`, {
            font: `27px Roboto`,
            fill: "#9e47f3",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontWeight: 400
        });
        date.anchor.set(1, 0.5);
        tab_mess.addChild(date);
        grapMess.addChild(tab_mess);
    }
    this.mailGroup.add(grapMess);
}