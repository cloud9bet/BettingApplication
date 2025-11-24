import spinSound from "../Sounds/spin.mp3";
import winSound from "../Sounds/win.mp3";
import failSound from "../Sounds/fail.mp3"
import lobbySound from "../Sounds/lobby.mp3";


class Sounds {
    constructor() {
    this.spinSound = new Audio(spinSound);
    this.winSound = new Audio(winSound);
    this.failSound = new Audio(failSound);
    this.lobbySound = new Audio(lobbySound);

        this.spinSound.volume = 0.9;
        this.winSound.volume = 1.0;
        this.failSound.volume=0.3;
        this.lobbySound.volume=0.4;
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

    playLobby(){
        this.lobbySound.currentTime=0;
        this.lobbySound.play().catch(e => console.log('Lobby sound failed'));
    }
}

export const Sound = new Sounds();