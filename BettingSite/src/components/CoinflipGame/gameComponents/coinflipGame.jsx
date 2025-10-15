import '../gameStyles/mainStyles.css'
 

function CoinflipGame() {
    
  
//muligvis add toggle sound knap
  return ( 
      <div className="game-container"> 
        <div className="game-input">
          <label htmlFor="Session Balance" id ="session" >Session Balance</label>
          <label htmlFor="Amout" id ="balance">100$</label>

          
          <label htmlFor="Bet">Bet</label>
          <input type="text" className="indsats" placeholder="0"/>
          <button>
            Spin
          </button>
        </div>
        <div className="game-coin">

        </div>
      </div>
  )
}

export default CoinflipGame