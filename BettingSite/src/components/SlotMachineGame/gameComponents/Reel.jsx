import React, { useEffect, useState } from "react";
import "../gameStyles/Reel.css";
import { SYMBOL_COMPONENTS } from "./constants";

export default function Reel({
  index,
  spinning,
  symbols,
  finalSymbols = ["cherry", "clover", "coin",],
  totalRandom = 30,
  onStop
}) {
  const [reelSymbols, setReelSymbols] = useState(finalSymbols);
  const [style, setStyle] = useState({});

  useEffect(() => {
    
    if (!spinning) {
      setReelSymbols(finalSymbols);
      setStyle({});
      return;
    }

    
    const fillers = Array.from({ length: totalRandom }, () =>
      symbols[Math.floor(Math.random() * symbols.length)]
    );

    const allSymbols = [...fillers, ...finalSymbols];
    setReelSymbols(allSymbols);

    const duration = 2 + index * 0.5;
    const symbolHeight = 52;
    const totalDistance = symbolHeight * totalRandom;

    
    requestAnimationFrame(() => {
      setStyle({
        transform: `translateY(-${totalDistance}px)`,
        transition: `transform ${duration}s cubic-bezier(0.25,0.1,0.25,1)`
      });
    });

    // Stop animation efter duration
    const stopTimer = setTimeout(() => {
      setStyle({
        transform: `translateY(-${totalDistance}px)`,
        transition: "none"
      });
      
     
      setTimeout(() => {
        setReelSymbols(finalSymbols);
        setStyle({});
        onStop(index, finalSymbols);
      }, 100);
      
    }, duration * 1000);

    return () => clearTimeout(stopTimer);
  }, [spinning, index, symbols, totalRandom, finalSymbols, onStop]);

  return (
    <div className="reel col">
      <div className="symbols" style={style}>
        {reelSymbols.map((symbolKey, i) => {
          const Icon = SYMBOL_COMPONENTS[symbolKey];
          return (
            <div key={i} className={`symbol symbol-${symbolKey}`}>
              {Icon ? <Icon className="icon" /> : symbolKey}
            </div>
          );
        })}
      </div>
    </div>
  );
}