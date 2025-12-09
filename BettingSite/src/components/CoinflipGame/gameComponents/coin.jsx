import headImg from "../images/heads_monopoly.png";
import tailImg from "../images/tails_monopoly.png";
import '../gameStyles/coin.css';

function Coin({onAnimationEnd, anim, currentSide}) {
  return (
    <div data-testid="coin-id"
      className={`coin ${anim} ${!anim ? currentSide + "-result" : ""}`}
      onAnimationEnd={onAnimationEnd}>
      <div className="heads">
        <img src={headImg} alt="head" />
      </div>
      <div className="tails">
        <img src={tailImg} alt="tail" />
      </div>
    </div>
  );
}

export default Coin;
