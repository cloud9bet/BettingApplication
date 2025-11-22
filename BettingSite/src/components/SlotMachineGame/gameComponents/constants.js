import { GiCutDiamond  ,GiClover  } from "react-icons/gi";
import { PiNumberCircleNineDuotone  } from "react-icons/pi";
import { SiBitcoinsv } from "react-icons/si";

/*
    D = DIAMOND
    CL = CLOVER
    N = NINE
    C = COIN
*/

// Available symbols
//export const SYMBOLS = ["🍒", "🍀", "9️⃣", "🪙"];
export const SYMBOLS_KEYS = ["diamond", "clover", "nine", "coin"];



export const SYMBOL_COMPONENTS = {
  diamond: GiCutDiamond  ,
  clover: GiClover,       // fx 4-leaf clover vibe
  nine: PiNumberCircleNineDuotone,     // eller et andet "9" ikon hvis du vil
  coin: SiBitcoinsv,
};

export const BACKEND_SYMBOL_MAP = {
  "D": "diamond",
  "CL": "clover",
  "N": "nine",
  "C": "coin",
};



// Payout table (per symbol, per match type)
/*export const PAYOUTS = {
    "🍒": { horizontal3: 15, vertical3: 16, diagonal3: 12}, // hvordan skal jeg fortå dette
    "🍀": { horizontal3: 12, vertical3: 15, diagonal3: 14},
    "9️⃣": { horizontal3: 50, vertical3: 60, diagonal3: 55},
    "🪙": { horizontal3: 25, vertical3: 30, diagonal3: 28},
};*/



// Payline definitions with explicit type
export const PAYLINES = [
    
    // Horizontal linjer
    { coords: [[0, 0], [0, 1], [0, 2]], type: "horizontal3" },
    { coords: [[1, 0], [1, 1], [1, 2]], type: "horizontal3" },
    { coords: [[2, 0], [2, 1], [2, 2]], type: "horizontal3" },

    // Vertical linjer
    { coords: [[0, 0], [1, 0], [2, 0]], type: "vertical3" },
    { coords: [[0, 1], [1, 1], [2, 1]], type: "vertical3" },
    { coords: [[0, 2], [1, 2], [2, 2]], type: "vertical3" },

    // Diagonal linjer
    { coords: [[0, 0], [1, 1], [2, 2]], type: "diagonal3" },
    { coords: [[0, 2], [1, 1], [2, 0]], type: "diagonal3" },

];
