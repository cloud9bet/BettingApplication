import { useState, useEffect, useRef, use } from "react";
import {useUserInfo}  from "../../../Context/UserContext";
import { calculateMultiplier } from "./crashUtils";
import winMP3 from "../sounds/win.mp3";
import lossMP3 from "../sounds/explosion.mp3";
import lobbySound from "../sounds/game-music-loop-7-145285.mp3"
import { playCrash } from "../../../services/ControllerService/gameApi";

export function useCrashGame() {
  const { totalBalance, setTotalBalance } = useUserInfo();
  const [balance, setBalance] = useState(0);
  const [bet, setBet] = useState(50);
  const [autoStop, setAutoStop] = useState(2)
  const [multiplier, setMultiplier] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [crashPoint, setCrashPoint] = useState(null);
  const [cashedOut, setCashedOut] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState([{ time: 0, multiplier: 1 }]);
  const timerRef = useRef(null);
  
  const winSoundRef = useRef(null);
  const lossSoundRef = useRef(null);
  const lobbySoundRef = useRef(null);


  useEffect(() => {
    lobbySoundRef.current = new Audio(lobbySound);
    lobbySoundRef.current.volume = 0.3;
    lobbySoundRef.current.loop = true;
    lobbySoundRef.current.play();

    winSoundRef.current = new Audio(winMP3);
    winSoundRef.current.volume = 0.5;

    lossSoundRef.current = new Audio(lossMP3);
    lossSoundRef.current.volume = 0.5;

    return () => {
      lobbySoundRef.current.pause();
      winSoundRef.current.pause();
      lossSoundRef.current.pause();
      
      lobbySoundRef.current = null;
      winSoundRef.current = null;
      lossSoundRef.current = null;
    };
  }, []);



  const isBetValid = () => {
    return bet > 0 && bet <= totalBalance;
  };

  const startGame = async () => {
    if (isPlaying) return;
    if (!isBetValid()) {
      setMessage("Not enough balance to play!");
      return;
    }

    const crashResult = await playCrash(bet, autoStop);

    if (!crashResult) {
    setMessage("Error connecting to server!");
    return;
    }

    const newCrash = crashResult.crashPoint;

    setIsPlaying(true);
    setMultiplier(1);
    setCashedOut(false);
    setCrashPoint(newCrash);

    setTotalBalance((b) => b - bet);

    setData([{ time: 0, multiplier: 1 }]);
    setMessage("The game is on...");
  };


  const stopGame = () => {
    if (!isPlaying || cashedOut) return;
    
    setCashedOut(true);
    const autoStopNumber = Number(autoStop)
    const payout = Math.floor(bet * autoStopNumber);
    setBalance((b) => b + payout);
    setTotalBalance((b) => b + payout);
    
    winSoundRef.current.currentTime = 0;
    winSoundRef.current.play();
    
    //setBalance((b) => b - bet);
    setMessage(`You stopped at ${Number(autoStop).toFixed(2)}x and won ${payout}`);
    setIsPlaying(false);
  };


  const handleBetChange = (newBet) => {
    if (newBet <= totalBalance) {
      setBet(newBet);
    }
  };

    const handleAutoStopChange = (newAutoStop) => {
      if(newAutoStop === "" || (!isNaN(newAutoStop) && newAutoStop >= 1)){
        setAutoStop(newAutoStop);
      }
  };

  
  const handleToggle = () => {
    if (!isPlaying) {
      startGame();
    } else {
      stopGame();
    }
  };


  useEffect(() => {
    if (!isPlaying || crashPoint == null) return;

    const start = performance.now();
    const growthRate = 0.2;
    let frameId;

    function tick(now) {
      const elapsed = (now - start) / 1000;
      const newMult = calculateMultiplier(elapsed, growthRate);

      setMultiplier(newMult);

      //Seeder data til grafen
      setData((prev) => {
        if (prev.length && elapsed - prev[prev.length - 1].time < 0.05) {
          return prev;
        }
        return [...prev, { time: elapsed, multiplier: newMult }];
      });

      // Check if crashed
      if (newMult >= autoStop - 0.001 && !cashedOut) {
        cancelAnimationFrame(frameId);
        stopGame();
        return
      }

      if (newMult >= crashPoint) {
        cancelAnimationFrame(frameId);

        if (!cashedOut) {
          setData((prev) => [
            ...prev,
            { time: elapsed, multiplier: crashPoint },
            { time: elapsed + 0.05, multiplier: 0 },
          ]);

          lossSoundRef.current.currentTime = 0;
          lossSoundRef.current.play();

          setBalance((b) => b - bet);
          setMessage(`Crash at ${Number(crashPoint).toFixed(2)}x! You lost`);
          setIsPlaying(false);
        }
        return;
      }

      frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, crashPoint, cashedOut, Number(autoStop)]);

  return {
    balance,
    bet,
    autoStop,
    multiplier,
    isPlaying,
    cashedOut,
    message,
    data,
    totalBalance,
    startGame,
    stopGame,
    handleBetChange,
    handleAutoStopChange,
    handleToggle,
  };
}
