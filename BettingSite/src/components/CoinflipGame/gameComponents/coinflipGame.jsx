import { useState } from 'react';
import '../gameStyles/mainStyles.css';
import headImg from '../images/heads_monopoly.png';
import tailImg from '../images/tails_monopoly.png';
import { useUserBalance } from '../../../Context/BalanceContext';

function CoinflipGame() {
  const {totalBalance, setTotalBalance } = useUserBalance();
  const [anim, setAnim] = useState("");
  const [balance, setBalance] = useState(0);
  const [choice, setChoice] = useState("");
  const [bet, setBet] = useState(0);
  const [currentSide, setCurrentSide] = useState("heads");
  const [flipResult, setFlipResult] = useState(null);



  const flipCoin = () => {
    if (anim || !choice || bet <= 0) return; // forhindrer ugyldige spins

    const isHeads = Math.random() > 0.5;
    const newSide = isHeads ? "spin-heads" : "spin-tails";
    setAnim(newSide);
    setCurrentSide(isHeads ? "heads" : "tails");
    setFlipResult(isHeads);
  };

  const handleAnimationEnd = () => {
    setAnim("");
    setBet(0);

    // først her — når animationen er færdig — opdaterer vi balancen
    if ((choice === "head" && flipResult) || (choice === "tail" && !flipResult)) {
      setBalance(prev => prev + bet * 1.5);
      setTotalBalance(prev => prev + bet * 1.5)
    } else {
      setBalance(prev => prev - bet);
      setTotalBalance(prev => prev + bet * 1.5)
    }

  };

  function OnHeadClicked() {
    setChoice("head");
  }

  function OnTailClicked() {
    setChoice("tail");
  }

  return (
    <div className="game-container">
      <div className="game-input">
        <label htmlFor="Session Balance" id="session">Session Balance</label>
        <label htmlFor="Amount" id="balance">{balance}$</label>

        <div className="Coin-btns">
          <button className={choice === "head" ? "selected" : ""} onClick={OnHeadClicked}>
            Head
          </button>
          <button className={choice === "tail" ? "selected" : ""} onClick={OnTailClicked}>
            Tail
          </button>
        </div>

        <div className="placeBet-container">
          <button className={`spin-btn ${anim ? "button-disabled" : "button-enable"}`} onClick={flipCoin} disabled={!!anim}>Spin</button>
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
        <div className={`coin ${anim} ${!anim ? currentSide + '-result' : ''}`} onAnimationEnd={handleAnimationEnd}>

          <div className="heads">
            <img src={headImg} alt="head" />
          </div>
          <div className="tails">
            <img src={tailImg} alt="tail" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoinflipGame;