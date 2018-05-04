function createSoundDefault() {
    MQ.button_sound = new Howl({
        src: ['./img/assets/sound/button.mp3'],
        onload: () => {
            // console.log('Load done!');
        }
    });
    MQ.sound = new Howl({
        src: ['./img/assets/mp3Song/edm.mp3'],
        onload: () => {
            // console.log('Load done!');
        }
    });
}