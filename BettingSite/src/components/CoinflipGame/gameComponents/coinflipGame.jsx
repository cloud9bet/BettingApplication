import { useState } from "react";
import "../gameStyles/mainStyles.css";
import  {useUserInfo}  from "../../../Context/UserContext";
import winMP3 from "../sounds/level-win-6416.mp3"
import lossMP3 from "../sounds/lose-sfx-365579.mp3"
import gameMusicMP3 from "../sounds/game-music-loop-7-145285.mp3"
import Coin from "./coin";

function CoinflipGame() {
  const { totalBalance, setTotalBalance } = useUserInfo();
  const [anim, setAnim] = useState("");
  const [balance, setBalance] = useState(0);
  const [choice, setChoice] = useState("");
  const [bet, setBet] = useState(0);
  const [currentSide, setCurrentSide] = useState("heads");
  const [flipResult, setFlipResult] = useState(null);

  // let gameSound = new Audio(gameMusicMP3);
  // gameSound.volume = 0.1;
  // gameSound.play();
  let winSound = new Audio(winMP3);
  let lossSound = new Audio(lossMP3);

  const flipCoin = () => {
    if (anim || !choice || bet <= 0 || bet > totalBalance ) return; // forhindrer ugyldige spins 

    const isHeads = Math.random() > 0.5;
    const newSide = isHeads ? "spin-heads" : "spin-tails";
    setAnim(newSide);
    setCurrentSide(isHeads ? "heads" : "tails");
    setFlipResult(isHeads);
  };

  const handleAnimationEnd = () => {
    setAnim("");
    // setBet(0);

    // først her — når animationen er færdig — opdaterer vi balancen
    if (
      (choice === "head" && flipResult) ||
      (choice === "tail" && !flipResult)
    ) {
      winSound.play();
      setBalance((prev) => prev + bet);
      setTotalBalance((prev) => prev + bet);
    } else {
      lossSound.play();
      setBalance((prev) => prev - bet);
      setTotalBalance((prev) => prev - bet);
    }
  };

  function OnHeadClicked() {
    if(anim) return;
    setChoice("head");
  }

  function OnTailClicked() {
    if(anim) return;
    setChoice("tail");
  }

  return (
    <div className="game-container">
      <div className="game-input">
        <label htmlFor="Session Balance" id="session">
          Session Balance
        </label>
        <label htmlFor="Amount" data-testid="balance-label"  id="balance" className={balance >= 0 ? "positiv" : "negativ"}>
          {balance}$
        </label>

        <div className="Coin-btns">
          <button
            className={choice === "head" ? "selected" : ""}
            onClick={OnHeadClicked}
          >
            Head
          </button>
          <button
            className={choice === "tail" ? "selected" : ""}
            onClick={OnTailClicked}
          >
            Tail
          </button>
        </div>

        <div className="placeBet-container">
          <button
            className={`spin-btn ${anim ? "button-disabled" : "button-enable"}`}
            onClick={flipCoin}
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

      <div className="game-action">
        <Coin
          onAnimationEnd={handleAnimationEnd}
          anim={anim}
          currentSide={currentSide}
        />
      </div>
    </div>
  );
}

export default CoinflipGame;
