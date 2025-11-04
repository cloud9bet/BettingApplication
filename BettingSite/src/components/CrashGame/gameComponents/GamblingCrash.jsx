import "../gameStyles/Crash.css";
import React, { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useUserBalance } from "../../../Context/BalanceContext";
import winMP3 from "../sounds/win.mp3"
import lossMP3 from "../sounds/explosion.mp3"

function GamblingCrash() {
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

  let winSound = new Audio(winMP3);
  let lossSound = new Audio(lossMP3);

  function startGame() {
    if (isPlaying) return;
    if (bet <= 0 || bet > totalBalance) {
      setMessage("Not enough balance to play!");
      return;
    }
    const newCrash = generateCrashPoint();
    setIsPlaying(true);
    setMultiplier(1);
    setCashedOut(false);
    setBalance((b) => b - bet);
    setTotalBalance((b) => b - bet);
    setCrashPoint(newCrash);
    setData([{ time: 0, multiplier: 1 }]);
    setMessage("The game is on... Press STOP before it crashes!");
  }

  function generateCrashPoint() {
    const bias = 1;
    const r = Math.random();
    const val = -Math.log(1 - r) / bias;
    return Math.max(1.03, Math.round(val * 10) / 10);
  }

  function stopGame() {
    if (!isPlaying || cashedOut) return;
    setCashedOut(true);
    const payout = Math.floor(bet * multiplier);
    setBalance((b) => b + payout);

    winSound.play();

    setTotalBalance((b) => b + payout);
    setMessage(`You stopped at ${multiplier.toFixed(2)}x and won ${payout}`);
    clearInterval(timerRef.current);
    setIsPlaying(false);
  }

  useEffect(() => {
    if (!isPlaying || crashPoint == null) return;

    const start = performance.now();
    const growthRate = 0.3;
    let frameId;

    function tick(now) {
      const elapsed = (now - start) / 1000;
      const newMult = Math.exp(growthRate * elapsed);

      setMultiplier(newMult);

      // tilføj et punkt ca. hver 0.05 s
      setData((prev) => {
        if (prev.length && elapsed - prev[prev.length - 1].time < 0.05)
          return prev;
        return [...prev, { time: elapsed, multiplier: newMult }];
      });

      if (newMult >= crashPoint) {
        cancelAnimationFrame(frameId);
        if (!cashedOut) {
          setData((prev) => [
            ...prev,
            { time: elapsed, multiplier: crashPoint },
            { time: elapsed + 0.05, multiplier: 0 },
          ]);

          lossSound.play();

          setMessage(`Crash at ${crashPoint.toFixed(2)}x! You lost`);
          setIsPlaying(false);
        }
        return;
      }

      frameId = requestAnimationFrame(tick);
    }

    // start
    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, crashPoint, cashedOut]);

  return (
    <div className="CrashGamePage-container">
      <div className="crash-container">

        <div className="crash-main">
          <div className="crash-stats">
            <label htmlFor="Session Balance" id="session">
              Session Balance
            </label>
            <label
              htmlFor="Amount"
              id="balance"
              className={balance >= 0 ? "positiv" : "negativ"}
            >
              {balance}$
            </label>
            <div className="stat-card">
              <div className="stat-label">Multiplier</div>
              <div className="stat-value">{multiplier.toFixed(2)}x</div>
            </div>

            <div className="bet-row">
              <label className="bet-label">Bet:</label>
              <input
                type="text"
                value={bet}
                disabled={isPlaying}
                className="bet-input"
                onChange={(e) => {
                  const newBet = Number(e.target.value);
                  if(newBet <= totalBalance) 
                  {
                    setBet(newBet);
                  }
                }}
              />
            </div>

            {/* Start and Stop buttons moved below the graph */}
            <div className="control-row">
              <button
                onClick={() => {
                  if (!isPlaying) startGame();
                  else stopGame();
                }}
                className="btn-toggle"
                disabled={isPlaying && cashedOut}
              >
                {isPlaying ? (cashedOut ? "Cashed" : "Stop") : "Start"}
              </button>
            </div>
          </div>

          <div className="crash-graph">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  type="number"
                  domain={[0, (dataMax) => Math.max(3, dataMax)]}
                  tickFormatter={(val) => val.toFixed(1) + "s"}
                />
                <YAxis
                  dataKey="multiplier"
                  type="number"
                  domain={[1, (multiMax) => Math.max(3, multiMax)]}
                  tickFormatter={(val) => val.toFixed(2) + "x"}
                />
                <Line
                  type="monotone"
                  dataKey="multiplier"
                  stroke="#f90b0bff"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="crash-message">{message}</div>

        <div className="rules">
          <i>
            <strong>Regler: </strong>
            Placer en indsats og tryk <strong>Start</strong>. Multiplieren
            stiger — tryk <strong>Stop</strong> inden den crasher! Hvis du når
            at stoppe før crash, vinder du indsats × multiplier. Dette er kun et
            spil med virtuelle mønter.
          </i>
        </div>
      </div>
    </div>
  );
}

export default GamblingCrash;
