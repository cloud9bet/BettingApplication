import { useState, useEffect, useRef } from "react";
import { useUserBalance } from "../../../Context/BalanceContext";
import { connection } from "./signalrConnection";
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


const startGame = async () => {
  if (isPlaying) return;
  if (!isBetValid()) {
    setMessage("Not enough balance to play!");
    return;
  }

  setMultiplier(1);
  setCashedOut(false);
  setBalance(b => b - bet);
  setTotalBalance(b => b - bet);
  setData([{ time: 0, multiplier: 1 }]);
  setMessage("Waiting for server...");

  try {
    const userId = 1; // test-id, senere fra auth context
    const cashoutMultiplier = 1.0;
    await connection.invoke("StartGame", bet, cashoutMultiplier, userId);
    setMessage("The game is on... Press STOP before it crashes!");
  } catch (err) {
    console.error("Failed to start game:", err);
    setMessage("Connection error");
  }

  setIsPlaying(true);
};


const stopGame = async () => {
  if (!isPlaying || cashedOut) return;

  setCashedOut(true);
  try {
    await connection.invoke("CashOut", userId);
  } catch (err) {
    console.error("Failed to cash out:", err);
  }
};


const handleBetChange = (newBet) => {
  if (newBet <= totalBalance) {
    setBet(newBet);
  }
};

useEffect(() => {
  // Når SignalR forbinder
  connection.start().catch((err) => console.error("SignalR error:", err));

  // Lyt på beskeder fra serveren
  connection.on("GameStarted", () => {
    setMessage("Game started!");
    setIsPlaying(true);
    setMultiplier(1);
    setData([{ time: 0, multiplier: 1 }]);
  });

  connection.on("MultiplierUpdate", (newMult) => {
    setMultiplier(newMult);
    setData((prev) => [...prev, { time: prev.length * 0.1, multiplier: newMult }]);
  });

  connection.on("AutoCashedOut", (mult, winnings) => {
    winSoundRef.current.play();
    setMessage(`Auto cashed out at ${mult.toFixed(2)}x! Won ${winnings}$`);
    setIsPlaying(false);
  });

  connection.on("Crashed", (crashPoint) => {
    lossSoundRef.current.play();
    setMessage(`Crash at ${crashPoint.toFixed(2)}x! You lost`);
    setIsPlaying(false);
  });

  return () => {
    connection.off("GameStarted");
    connection.off("MultiplierUpdate");
    connection.off("AutoCashedOut");
    connection.off("Crashed");
  };
}, []);


// useEffect(() => {
//   if (!isPlaying || crashPoint == null) return;

//   const start = performance.now();
//   const growthRate = 0.3;
//   let frameId;

//   function tick(now) {
//     const elapsed = (now - start) / 1000;
//     const newMult = calculateMultiplier(elapsed, growthRate);

//     setMultiplier(newMult);

//     // Add a data point approximately every 0.05 seconds
//     setData((prev) => {
//       if (prev.length && elapsed - prev[prev.length - 1].time < 0.05) {
//         return prev;
//       }
//       return [...prev, { time: elapsed, multiplier: newMult }];
//     });

//     // Check if crashed
//     if (newMult >= crashPoint) {
//       cancelAnimationFrame(frameId);

//       if (!cashedOut) {
//         setData((prev) => [
//           ...prev,
//           { time: elapsed, multiplier: crashPoint },
//           { time: elapsed + 0.05, multiplier: 0 },
//         ]);

//         lossSoundRef.current.play();
//         setMessage(`Crash at ${crashPoint.toFixed(2)}x! You lost`);
//         setIsPlaying(false);
//       }
//       return;
//     }

//     frameId = requestAnimationFrame(tick);
//   }

//   frameId = requestAnimationFrame(tick);

//   return () => cancelAnimationFrame(frameId);
// }, [isPlaying, crashPoint, cashedOut]);

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
