/**
 * Calculate total payout and highlight map for 5x3 grid
 * @param {string[][]} grid - 3 rows x 5 columns
 * @param {number} bet
 * @param {object} payouts
 * @param {array} paylines - array of { coords, type }
 * @returns {object} { totalPayout, highlightMap }
 */

export function CalculatePayout({ grid, bet, payouts, paylines }) {
    let totalPayout = 0;
    

    for (const line of paylines) {
        const symbolsOnLine = line.coords.map(([r, c]) => grid[r][c]);
        const first = symbolsOnLine[0];
        const isWin = first && symbolsOnLine.every(s => s === first);

        if (isWin) {
            const multiplier = payouts[first]?.[line.type] || 0;
            const linePayout = Math.round(multiplier * (bet/10));

            totalPayout += linePayout;
        }
    }
    console.log('Total payout:', totalPayout);
    return {totalPayout};
}
