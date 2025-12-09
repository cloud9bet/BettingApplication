
// Komponent til diverse knapper

function CrashControls({ 
  bet,
  autoStop, 
  isPlaying,  
  onBetChange,
  onAutoStopChange, 
  onToggle 
}) {
  const handleBetInput = (e) => { // Handler til betinput
    const newBet = Number(e.target.value);
    onBetChange(newBet);
  };

    const handleAutoStopInput = (e) => { // Handler til Autostopinput
    const newAutoStop = e.target.value;
    if (newAutoStop === "" || /^\d*\.?\d*$/.test(newAutoStop))
    {
      onAutoStopChange(newAutoStop);
    }
  };

  const isAutoStopValid = !isNaN(autoStop) && autoStop > 1;

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

        <label className="bet-label">Auto Stop at:</label>
        <input
          type="text"
          value={autoStop}
          disabled={isPlaying}
          className="bet-input"
          onChange={handleAutoStopInput}
          />
      </div>

      <div className="control-row">
        <button
          onClick={onToggle}
          className="btn-toggle"
          disabled={isPlaying || !isAutoStopValid}
        > 
          Start
        </button>
      </div>
    </>
  );
}

export default CrashControls;
