import { formatMultiplier } from "./crashUtils";
import { formatCompactNumber } from "../../../utils/MathCompacter";

// Komponent til statistikker

function CrashStats({ balance, multiplier }) 
{
  return (
    <div className="crash-stats">
      <label htmlFor="Session Balance" id="session">
        Session Balance
      </label>
      <label
        htmlFor="Amount"
        id="balance"
        className={balance >= 0 ? "positiv" : "negativ"}
      >
        {formatCompactNumber(balance)}$ 
      </label>
      <div className="stat-card">
        <div className="stat-label">Multiplier</div>
        <div className="stat-value">{formatMultiplier(multiplier)}</div>
      </div>
    </div>
  );
}

export default CrashStats;
