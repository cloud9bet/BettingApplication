import { useState } from 'react';
import '../gameStyles/mainStyles.css';
import headImg from '../images/heads_monopoly.png';
import tailImg from '../images/tails_monopoly.png';

function CoinflipGame() {
  const [anim, setAnim] = useState("");
  const [balance, setBalance] = useState(100);
  const [currentSide, setCurrentSide] = useState("heads");

  const flipCoin = () => {
    if (anim) return;
    const isHeads = Math.random() > 0.5;
    const newSide = isHeads ? "spin-heads" : "spin-tails";
    setAnim(newSide);
    setCurrentSide(isHeads ? "heads" : "tails");
  };

  const handleAnimationEnd = () => {
    setAnim("");
  };

  return ( 
    <div className="game-container"> 
      <div className="game-input">
        <label htmlFor="Session Balance" id="session">Session Balance</label>
        <label htmlFor="Amount" id="balance">{balance}$</label>

        <label htmlFor="Bet">Bet</label>
        <input type="text" className="indsats" placeholder="0"/>
        <button className={anim ? "button-disabled" : "button-enable"} onClick={flipCoin} disabled={!!anim}>Spin</button>
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