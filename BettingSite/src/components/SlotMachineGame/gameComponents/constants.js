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
export const SYMBOLS_KEYS = ["diamond", "clover", "nine", "coin"];



export const SYMBOL_COMPONENTS = {
  diamond: GiCutDiamond,
  clover: GiClover,       
  nine: PiNumberCircleNineDuotone,     
  coin: SiBitcoinsv,
};

export const BACKEND_SYMBOL_MAP = {
  "D": "diamond",
  "CL": "clover",
  "N": "nine",
  "C": "coin",
};

