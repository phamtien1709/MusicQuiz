function createSoundDefault() {
    MQ.button_sound = new Howl({
        src: ['./img/assets/sound/button.mp3'],
        onload: () => {
            // console.log('Load done!');
        }
    });
    MQ.soundCountDown = new Howl({
        src: ['./img/assets/sound/PipCountDown.mp3'],
        onload: () => {
            
        }
    });
}