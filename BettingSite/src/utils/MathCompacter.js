export function formatCompactNumber(number) {
  const isNegative = number < 0;
  const n = Math.abs(number);

  let formatted;

  if (n < 1000) {
    formatted = n.toString();
  } else if (n < 1_000_000) {
    formatted = (n / 1000).toFixed(1) + "K";
  } else if (n < 1_000_000_000) {
    formatted = (n / 1_000_000).toFixed(1) + "M";
  }

  return isNegative ? "-" + formatted : formatted;
}
