import { useState, useEffect, useRef } from "react";
import { useUserInfo } from "../../../Context/UserContext";
import { calculateMultiplier } from "./crashUtils";
import winMP3 from "../sounds/win.mp3";
import lossMP3 from "../sounds/explosion.mp3";
import lobbySound from "../sounds/lobby.mp3";
import { playCrash } from "../../../services/ControllerService/gameApi";

export function useCrashGame() {
  const { totalBalance, setTotalBalance } = useUserInfo();

  const [balance, setBalance] = useState(0); // session-balance
  const [bet, setBet] = useState(50);
  const [autoStop, setAutoStop] = useState("1.04"); 
  const [multiplier, setMultiplier] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [crashPoint, setCrashPoint] = useState(null);
  const [cashedOut, setCashedOut] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState([{ time: 0, multiplier: 1 }]);

  const winSoundRef = useRef(null);
  const lossSoundRef = useRef(null);
  const lobbySoundRef = useRef(null);

  // -----------------------
  //  AUDIO SETUP
  // -----------------------
  useEffect(() => {
    lobbySoundRef.current = new Audio(lobbySound);
    lobbySoundRef.current.volume = 0.3;
    lobbySoundRef.current.loop = true;
    lobbySoundRef.current.play();

    winSoundRef.current = new Audio(winMP3);
    winSoundRef.current.volume = 1.0;

    lossSoundRef.current = new Audio(lossMP3);
    lossSoundRef.current.volume = 0.5;

    return () => {
      lobbySoundRef.current?.pause();
      winSoundRef.current?.pause();
      lossSoundRef.current?.pause();
    };
  }, []);


  const isBetValid = () => bet > 0 && bet <= totalBalance;

  // -----------------------
  //  START GAME
  // -----------------------
  const startGame = async () => {
    if (isPlaying) return;

    const normalizedAutoStop = String(autoStop).replace(",", ".");
    const stopValue = parseFloat(normalizedAutoStop);

    if (isNaN(stopValue) || stopValue < 1.04) {
      setMessage("Auto stop must be over 1.03x");
      return;
    }

    if (!isBetValid()) {
      setMessage("Not enough balance to play!");
      return;
    }

    const crashResult = await playCrash(bet, stopValue);
    if (!crashResult) {
      setMessage("Error connecting to server!");
      return;
    }

    const crash = crashResult.crashPoint;

    // INGEN ændringer af balance ved start
    // Session + global balance skal først ændres efter spillet er SLUT

    setIsPlaying(true);
    setCrashPoint(crash);
    setCashedOut(false);
    setMultiplier(1);

    setData([{ time: 0, multiplier: 1 }]);
    setMessage("The game is on...");
  };

  // -----------------------
  //  STOP GAME (WIN)
  // -----------------------
  const stopGame = () => {
    if (!isPlaying || cashedOut) return;

    const normalized = String(autoStop).replace(",", ".");
    const stopValue = parseFloat(normalized);

    const payout = Math.floor(bet * stopValue);

    setCashedOut(true);

    //GIVE WINNINGS HERE
    setBalance((b) => b + payout);
    setTotalBalance((b) => b + payout);

    winSoundRef.current.currentTime = 0;
    winSoundRef.current.play();

    setMessage(`You stopped at ${stopValue.toFixed(2)}x and won ${payout}`);
    setIsPlaying(false);
  };

  // -----------------------
  //  INPUT HANDLERS
  // -----------------------
  const handleBetChange = (newBet) => {
    if (newBet <= totalBalance) setBet(newBet);
  };

  const handleAutoStopChange = (rawValue) => {
    setAutoStop(rawValue); // ingen blokering
  };

  const handleToggle = () => {
    isPlaying ? stopGame() : startGame();
  };

  // -----------------------
  //  GAME LOOP (ANIMATION)
  // -----------------------
  useEffect(() => {
    if (!isPlaying || crashPoint == null) return;

    const start = performance.now();
    const growthRate = 0.2;
    let frameId;

    const tick = (now) => {
      const elapsed = (now - start) / 1000;
      const newMult = calculateMultiplier(elapsed, growthRate);

      setMultiplier(newMult);

      setData((prev) =>
        elapsed - prev[prev.length - 1].time >= 0.05
          ? [...prev, { time: elapsed, multiplier: newMult }]
          : prev
      );

      const stopValue = parseFloat(String(autoStop).replace(",", "."));

      // AUTOSTOP WIN
      if (!isNaN(stopValue) && newMult >= stopValue && !cashedOut) {
        stopGame();
        cancelAnimationFrame(frameId);
        return;
      }

      // CRASH / LOSE
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

          //SUBTRACT BET ONLY ON LOSS
          setBalance((b) => b - bet);
          setTotalBalance((b) => b - bet);

          setMessage(`Crash at ${crashPoint.toFixed(2)}x! You lost`);
          setIsPlaying(false);
        }
        return;
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, crashPoint, cashedOut, autoStop]);

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