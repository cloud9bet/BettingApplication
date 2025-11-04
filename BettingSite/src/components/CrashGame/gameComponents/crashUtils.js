
export function generateCrashPoint() {
  const bias = 1;
  const r = Math.random();
  const val = -Math.log(1 - r) / bias;
  return Math.max(1.03, Math.round(val * 10) / 10);
}


export function calculateMultiplier(elapsed, growthRate = 0.3) {
  return Math.exp(growthRate * elapsed);
}


export function formatCurrency(amount) {
  return `${amount}$`;
}


export function formatMultiplier(multiplier, decimals = 2) {
  return `${multiplier.toFixed(decimals)}x`;
}
