

export function calculateMultiplier(elapsed, growthRate = 0.3) {
  return Math.exp(growthRate * elapsed);
}


export function formatCurrency(amount) {
  return `${amount}$`;
}


export function formatMultiplier(multiplier, decimals = 2) {
  return `${multiplier.toFixed(decimals)}x`;
}
