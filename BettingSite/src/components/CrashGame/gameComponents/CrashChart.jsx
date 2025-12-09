import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";


// Komponent til grafen 

function CrashChart({ data }) { 
  return (
    <div className="crash-graph">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            type="number"
            domain={[0, (dataMax) => Math.max(3, dataMax)]}
            tickFormatter={(val) => val.toFixed(1) + "s"}
          />
          <YAxis
            dataKey="multiplier"
            type="number"
            domain={[1, (multiMax) => Math.max(3, multiMax)]}
            tickFormatter={(val) => val.toFixed(2) + "x"}
          />
          <Line
            type="monotone"
            dataKey="multiplier"
            stroke="#f90b0bff"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CrashChart;
