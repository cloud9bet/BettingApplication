import React from "react";


function CrashControls({ 
  bet, 
  isPlaying, 
  cashedOut, 
  onBetChange, 
  onToggle 
}) {
  const handleBetInput = (e) => {
    const newBet = Number(e.target.value);
    onBetChange(newBet);
  };

  const getButtonText = () => {
    if (isPlaying) {
      return cashedOut ? "Cashed" : "Stop";
    }
    return "Start";
  };

  return (
    <>
      <div className="bet-row">
        <label className="bet-label">Bet:</label>
        <input
          type="text"
          value={bet}
          disabled={isPlaying}
          className="bet-input"
          onChange={handleBetInput}
        />
      </div>

      <div className="control-row">
        <button
          onClick={onToggle}
          className="btn-toggle"
          disabled={isPlaying && cashedOut}
        >
          {getButtonText()}
        </button>
      </div>
    </>
  );
}

export default CrashControls;
