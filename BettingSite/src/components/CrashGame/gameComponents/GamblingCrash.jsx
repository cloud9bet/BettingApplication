import "../gameStyles/Crash.css";
import React from "react";
import { useCrashGame } from "./useCrashGame";
import CrashStats from "./CrashStats";
import CrashControls from "./CrashControls";
import CrashChart from "./CrashChart";
import CrashMessage from "./CrashMessage";
import CrashRules from "./CrashRules";


function GamblingCrash() {
  const {
    balance,
    bet,
    autoStop,
    multiplier,
    isPlaying,
    cashedOut,
    message,
    data,
    startGame,
    stopGame,
    handleBetChange,
    handleAutoStopChange,
  } = useCrashGame();

  const handleToggle = () => {
    if (!isPlaying) {
      startGame();
    } else {
      stopGame();
    }
  };

  return (
    <div className="CrashGamePage-container">
      <div className="crash-container">
        <div className="crash-main">
          <div className="crash-stats">
            <CrashStats balance={balance} multiplier={multiplier} />
            <CrashControls
              bet={bet}
              autoStop={autoStop}
              isPlaying={isPlaying}
              cashedOut={cashedOut}
              onBetChange={handleBetChange}
              onAutoStopChange={handleAutoStopChange}
              onToggle={handleToggle}
            />
          </div>
          <CrashChart data={data} />
        </div>

        <CrashMessage message={message} />
        <CrashRules />
      </div>
    </div>
  );
}

export default GamblingCrash;
