import "../gameStyles/Crash.css";
import { useCrashGame } from "./useCrashGame";
import CrashStats from "./CrashStats";
import CrashControls from "./CrashControls";
import CrashChart from "./CrashChart";
import CrashMessage from "./CrashMessage";
import CrashRules from "./CrashRules";

// Hele "controlleren" i spiller

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
    handleBetChange,
    handleAutoStopChange,
    handleToggle,
  } = useCrashGame();


  return (
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
  );
}

export default GamblingCrash;
