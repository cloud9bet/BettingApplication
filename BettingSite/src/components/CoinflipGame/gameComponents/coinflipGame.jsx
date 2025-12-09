import { useState, useEffect, useRef } from "react";
import { useUserInfo } from "../../../Context/UserContext";
import winSound from "../sounds/level-win-6416.mp3"
import lossSound from "../sounds/lose-sfx-365579.mp3"
import lobbySound from "../sounds/lobby.mp3"
import Coin from "./coin";
import { PlayCoinflip } from "../../../services/ControllerService/gameApi";
import { formatCompactNumber } from "../../../utils/MathCompacter";
import "../gameStyles/mainStyles.css";

function CoinflipGame() {
  const { totalBalance, setTotalBalance } = useUserInfo();
  const [anim, setAnim] = useState("");
  const [balance, setBalance] = useState(0);
  const [choice, setChoice] = useState("");
  const [bet, setBet] = useState(0);
  const [payout, setPayout] = useState(0);
  const [currentSide, setCurrentSide] = useState("heads");
  const [flipResult, setFlipResult] = useState(null);

  const gameSoundRef = useRef(null);
  const winSoundRef = useRef(null);
  const loseSoundRef = useRef(null);

  useEffect(() => {
    gameSoundRef.current = new Audio(lobbySound);
    gameSoundRef.current.volume = 0.2;
    gameSoundRef.current.loop = true;
    gameSoundRef.current.play();

    winSoundRef.current = new Audio(winSound);
    winSoundRef.current.volume = 1.0;

    loseSoundRef.current = new Audio(lossSound);
    loseSoundRef.current.volume = 0.5;

    return () => {
      gameSoundRef.current.pause();
      loseSoundRef.current.pause();
      winSoundRef.current.pause();

      gameSoundRef.current = null;
      winSoundRef.current = null;
      loseSoundRef.current = null;
    };
  }, [])

  async function Flip(betAmount, betChoice){
    const gameResult = await PlayCoinflip(betAmount, betChoice);
    if(!gameResult){
      alert("An Error Occured Doing The Game");
      return false;
    }
   
    setPayout(gameResult.payout);
    return gameResult.result;  
  }


  async function flipCoin() {
    if (anim || !choice || bet <= 0 || bet > totalBalance) return;
  
    const game = await Flip(bet, choice);

    if(!game) return;

    const newSide = (game === "heads" ? "spin-heads" : "spin-tails");
    setAnim(newSide);
    setCurrentSide((game === "heads" ? "heads" : "tails"));
    setFlipResult((game === "heads" ? true : false));
  };

  const handleAnimationEnd = () => {
    setAnim("");

    if (
      (choice === "heads" && flipResult) ||
      (choice === "tails" && !flipResult)
    ) {
      winSoundRef.current.play();
      setBalance((prev) => prev + payout);
      setTotalBalance((prev) => prev + payout);
    } else {
      loseSoundRef.current.play();
      setBalance((prev) => prev + payout);
      setTotalBalance((prev) => prev + payout);
    }
  };

  function OnHeadClicked() {
    if (anim) return;
    setChoice("heads");
  }

  function OnTailClicked() {
    if (anim) return;
    setChoice("tails");
  }

  return (
    <div className="game-container">
      
        <div className="game-input">
          <label htmlFor="Session Balance" id="session">
            Session Balance
          </label>
          <label htmlFor="Amount" data-testid="balance-label" id="balance" className={balance >= 0 ? "positiv" : "negativ"}>
            {formatCompactNumber(balance)}$
          </label>

          <div className="Coin-btns">
            <button
              className={choice === "heads" ? "selected" : ""}
              onClick={OnHeadClicked}
            >
              Head
            </button>
            <button
              className={choice === "tails" ? "selected" : ""}
              onClick={OnTailClicked}
            >
              Tail
            </button>
          </div>

          <div className="placeBet-container">
            <button
              className={`spin-btn ${anim ? "button-disabled" : "button-enable"}`}
              onClick={() => {flipCoin();}}
              disabled={!!anim}
            >
              Spin
            </button>
            <input
              type="text"
              value={bet}
              onChange={(e) => {
                const newBet = Number(e.target.value);
                if (newBet <= totalBalance) {
                  setBet(newBet);
                }
              }}
            />
          </div>
        </div>
        <div className="coinflipgame-container">
        <div className="game-action">
          <Coin
            onAnimationEnd={handleAnimationEnd}
            anim={anim}
            currentSide={currentSide}
          />
        </div>
      <div className="coinflip-rules">
        <i>
          <strong>Rules:</strong><br/>
          Choose <strong>Heads</strong> or <strong>Tails</strong>, place your bet, and press Flip.
          if it lands on your choice you win your bet × 2.
        </i>
      </div>
      </div>

    </div>
  );
}

export default CoinflipGame;
