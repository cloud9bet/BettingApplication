import { useState, useEffect, useRef } from "react";
import { useUserBalance } from "../../../Context/BalanceContext";
import { calculateMultiplier } from "./crashUtils";
import winMP3 from "../sounds/win.mp3";
import lossMP3 from "../sounds/explosion.mp3";


export function useCrashGame() {
  const { totalBalance, setTotalBalance } = useUserBalance();
  const [balance, setBalance] = useState(0);
  const [bet, setBet] = useState(50);
  const [multiplier, setMultiplier] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [crashPoint, setCrashPoint] = useState(null);
  const [cashedOut, setCashedOut] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState([{ time: 0, multiplier: 1 }]);
  const timerRef = useRef(null);
  const winSoundRef = useRef(new Audio(winMP3));
  const lossSoundRef = useRef(new Audio(lossMP3));


  const isBetValid = () => {
    return bet > 0 && bet <= totalBalance;
  };

  const startGame = () => {
    if (isPlaying) return;
    
    if (!isBetValid()) {
      setMessage("Not enough balance to play!");
      return;
    }

    const newCrash = 5;
    setIsPlaying(true);
    setMultiplier(1);
    setCashedOut(false);
    setBalance((b) => b - bet);
    setTotalBalance((b) => b - bet);
    setCrashPoint(newCrash);
    setData([{ time: 0, multiplier: 1 }]);
    setMessage("The game is on... Press STOP before it crashes!");
  };


  const stopGame = () => {
    if (!isPlaying || cashedOut) return;
    
    setCashedOut(true);
    const payout = Math.floor(bet * multiplier);
    setBalance((b) => b + payout);
    setTotalBalance((b) => b + payout);
    
    winSoundRef.current.play();
    
    setMessage(`You stopped at ${multiplier.toFixed(2)}x and won ${payout}`);
    setIsPlaying(false);
  };


  const handleBetChange = (newBet) => {
    if (newBet <= totalBalance) {
      setBet(newBet);
    }
  };


  useEffect(() => {
    if (!isPlaying || crashPoint == null) return;

    const start = performance.now();
    const growthRate = 0.3;
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
      if (newMult >= crashPoint) {
        cancelAnimationFrame(frameId);
        
        if (!cashedOut) {
          setData((prev) => [
            ...prev,
            { time: elapsed, multiplier: crashPoint },
            { time: elapsed + 0.05, multiplier: 0 },
          ]);

          lossSoundRef.current.play();
          setMessage(`Crash at ${crashPoint.toFixed(2)}x! You lost`);
          setIsPlaying(false);
        }
        return;
      }

      frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, crashPoint, cashedOut]);

  return {
    balance,
    bet,
    multiplier,
    isPlaying,
    cashedOut,
    message,
    data,
    totalBalance,
    startGame,
    stopGame,
    handleBetChange,
  };
}
