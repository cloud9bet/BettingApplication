import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";
import { SYMBOLS } from "./constants";   // only need symbols for reel animation
import { Sound } from "./Sounds";
import Reel from "./Reel";
import InputNumber from "./InputNumber";
import { useUserInfo } from "../../../Context/UserContext";
import { playSlot } from "../../../services/ControllerService/gameApi";
import { formatCompactNumber } from "../../../utils/MathCompacter";
import "../gameStyles/SlotMachine.css";

export default function SlotMachine() {

    const { totalBalance, setTotalBalance } = useUserInfo();

    const [bet, setBet] = useState(20);
    const [credits, setCredits] = useState(0);
    const [spinning, setSpinning] = useState(false);
    const [message, setMessage] = useState("");
    const [finalGrid, setFinalGrid] = useState([
        ["🍒", "🍀", "🪙"],
        ["9️⃣", "🍀", "🍀"],
        ["🪙", "9️⃣", "🍒"]
    ]);

    const resultsRef = useRef(Array(3).fill(null));
    const backendPayoutRef = useRef(0);

    //Lobby lyd
    useEffect(() => {
        Sound.lobbySound.loop = true;
        Sound.playLobby();

        return () => {
            Sound.lobbySound.pause();
            Sound.lobbySound.currentTime = 0;

            Sound.failSound.pause();
            Sound.failSound.currentTime = 0;

            Sound.winSound.pause();
            Sound.winSound.currentTime = 0;

            Sound.spinSound.pause();
            Sound.spinSound.currentTime = 0;

        };
    }, []);



    const startSpin = async () => {
        if (spinning) return;

        if (bet <= 0 || bet > totalBalance) {
            setMessage("You dont got the facilities fam, you need to top up your wallet");
            return;
        }

        setSpinning(true);
        Sound.playSpin();
        setMessage("Spinning");

        // Fetch backend spin
        const gameResult = await playSlot(bet);

        if (!gameResult) {
            setMessage("Server error");
            setSpinning(false);
            return;
        }

        // Store backend results
        backendPayoutRef.current = gameResult.payout;
        setFinalGrid(gameResult.finalGrid);

        // Reset reel results
        resultsRef.current = Array(3).fill(null);
    };

    const stopSpin = (colIndex, visibleArray) => {
        resultsRef.current[colIndex] = visibleArray;

        const allReelsStopped = resultsRef.current.every(r => r !== null && r.length === 3);
        if (!allReelsStopped) return;

        const payout = backendPayoutRef.current;

        // update balances (backend has already calculated net result)
        setTotalBalance(prev => prev + payout);
        setCredits(c => c + payout);

        if (payout > 0) {
            setMessage(`You won ${payout}$`);
            Sound.playWin();
        } else {
            setMessage("No winning lines. Try again!");
            Sound.playFail();
        }

        setSpinning(false);
    };


    return (
        <div className="slot-machine-container">

            <div className="slot-machine big">

                <div className="slot-game-input-container">
                    <div className="grid">
                        {[0, 1, 2].map(colIndex => (
                            <Reel
                                key={colIndex}
                                index={colIndex}
                                spinning={spinning}
                                symbols={SYMBOLS}
                                finalSymbols={(finalGrid ?? []).map(row => row?.[colIndex] ?? null)}
                                totalRandom={24}
                                onStop={stopSpin}
                            />
                        ))}
                    </div>
                    <div className="info">
                        <div className="info-container">
                            <div>
                                <div className="balance-label">Session Balance</div>
                                <div className={`balance-amount ${credits >= 0 ? "positiv" : "negativ"}`}>
                                    {formatCompactNumber(credits)}$
                                </div>
                            </div>

                            <div>
                                <div className="bet">Bet</div>
                                <InputNumber
                                    value={bet}
                                    disabled={spinning}
                                    onChange={(val) => {
                                        const newBet = Number(val);
                                        if (newBet <= totalBalance) {
                                            setBet(newBet);
                                        }
                                    }}
                                />

                            </div>

                            <Button
                                onClick={startSpin}
                                disabled={spinning || bet <= 0 || bet > totalBalance}
                            >
                                Spin
                            </Button>
                        </div>

                        <div className="message-container">
                            <p className="message">{message}</p>
                        </div>
                    </div>


                </div>
                <p className="slot-rules">
                    <i>
                        <strong>Rules:</strong><br />
                        Match symbols across the reel. The more symbols match, the higher your win!
                    </i>
                </p>
            </div>
        </div>
    );


}
