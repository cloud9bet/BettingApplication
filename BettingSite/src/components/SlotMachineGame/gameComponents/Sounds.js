import spinSound from "../Sounds/spin.mp3";
import winSound from "../Sounds/win.mp3";
import failSound from "../Sounds/fail.mp3"


class Sounds {
    constructor() {
    this.spinSound = new Audio(spinSound);
    this.winSound = new Audio(winSound);
    this.failSound = new Audio(failSound);

                
        this.spinSound.volume = 0.3;
        this.winSound.volume = 0.4;
        this.failSound.volume=0.4;
    }

    playSpin() {
        this.spinSound.currentTime = 0;
        this.spinSound.play().catch(e => console.log('Spin sound failed'));
    }

    playWin() {
        this.winSound.currentTime = 0; 
        this.winSound.play().catch(e => console.log('Win sound failed'));
    }

    playFail(){
        this.failSound.currentTime=0;
        this.failSound.play().catch(e => console.log('Fail sound failed'));
    }
}

export const Sound = new Sounds();