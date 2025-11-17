import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";
import { SYMBOLS, PAYLINES, PAYOUTS } from "./constants";
import { CalculatePayout } from "./CalculatePayout";
import { Sound } from "./Sounds";
import Reel from "./Reel";
import InputNumber from "./InputNumber";
import "../gameStyles/SlotMachine.css";

import  {useUserInfo}  from "../../../Context/UserContext";


function generateFinalGrid() {
    const grid = [[], [], []];
    for (let row = 0; row < 3; row++) {
        grid[row] = [];
        for (let col = 0; col < 3; col++) {
            grid[row][col] = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        }
    }
    return grid;
}


export default function SlotMachine() {

    const { totalBalance, setTotalBalance } = useUserInfo();

    const [bet, setBet] = useState(20);
    const [credits, setCredits] = useState(0);
    const [spinning, setSpinning] = useState(false);
    const [message, setMessage] = useState("");
    const [finalGrid, setFinalGrid] = useState(generateFinalGrid());

    // ResultsRef holder på kolonner
    const resultsRef = useRef(Array(3).fill(null));

    useEffect(()=>{

    },[]);

    const startSpin = () => {
        if (spinning) {
            console.log('Already spinning, ignoring...');
            return;
        }
        if (bet <= 0 || bet > totalBalance) {
            setMessage("You dont got the facilities fam, you need to top up your wallet");
            return;
        }

        console.log('Starting spin...'); //HUSK AT FJERNE ALT LOGGING
        setSpinning(true);
        Sound.playSpin();
        setMessage("Spinning");
        //setCredits(c => c - bet);

        //setTotalBalance(prev => prev - bet);

        resultsRef.current = Array(3).fill(null);
        setFinalGrid(generateFinalGrid());
    };

    const stopSpin = (colIndex, visibleArray) => {
        console.log(`Reel ${colIndex} stopped with:`, visibleArray);
        resultsRef.current[colIndex] = visibleArray;

        const allReelsStopped = resultsRef.current.every(r => r !== null && r.length === 3);
        console.log('All reels stopped?', allReelsStopped, resultsRef.current); // Debug log

        // Tjek om alle reels er stoppet
        if (!allReelsStopped) {
            return;
        }

        // Byg grid fra results
        const grid = [[], [], []];
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                grid[row][col] = resultsRef.current[col][row];
            }
        }

        console.log('Final grid:', grid);

        const { totalPayout } = CalculatePayout({ grid, bet, payouts: PAYOUTS, paylines: PAYLINES });
        console.log('Payout:', totalPayout);

        //setCredits(c => c + totalPayout);

        //setTotalBalance(prev => prev + totalPayout);


        if (totalPayout > 0) {
            setMessage(`You won ${totalPayout}$`);
            setTotalBalance(prev => prev + totalPayout - bet);
            setCredits(c => c + totalPayout - bet);
            Sound.playWin();
        } else {
            setMessage("No winning lines. Try again!");
            setTotalBalance(prev => prev - bet);
            setCredits(c => c - bet);
            Sound.playFail();
        }

        // VIGTIGT: Reset spinning state EFTER alt er færdigt
        setSpinning(false);

        resultsRef.current = Array(3).fill(null);
    };

    return (
        <div className="slot-machine-container">
            <div className="slot-machine big">

                <div className="grid">
                    {[0, 1, 2].map(colIndex => (
                        <Reel
                            key={colIndex}
                            index={colIndex}
                            spinning={spinning}
                            symbols={SYMBOLS}
                            finalSymbols={finalGrid.map(row => row[colIndex])}
                            totalRandom={24}
                            onStop={stopSpin}
                        />
                    ))}
                </div>

                <div className="info">
                    <div>
                        <div className="balance-label">Session Balance</div>
                        <div className={`balance-amount ${credits >= 0 ? "positiv" : "negativ"}`}>
                            {credits}$
                        </div>
                    </div>

                    <div>
                        <div className="bet">Bet</div>
                        <InputNumber
                            value={bet}
                            onChange={val => setBet(val)}
                            min={1}
                            max={credits}
                            disabled={spinning}
                        />
                    </div>

                    <Button
                        onClick={startSpin}
                        disabled={spinning || bet <= 0 || bet > totalBalance}
                    >
                        Spin
                    </Button>
                </div>

                <p className="message" >{message}</p>

            </div>
        </div>
    );
}