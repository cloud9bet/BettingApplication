import { useState, useEffect } from "react";
import { GetAllUserTransactionAsync, GetAllUserDepositAsync } from "../services/ControllerService/userApi";
import '../styles/Popup.css'


function History({ onClose }) {
    const [TrancationData, setTrancationData] = useState([]);
    const [DepositData, setDepositData] = useState([]);
    const [choice, setChoice] = useState("Transaction");
    // const transactions = [
    //     { date: "12-10-2025", amount: +150, name: "slots" },
    //     { date: "14-10-2025", amount: -150, name: "slots" },
    //     { date: "14-10-2025", amount: -3350, name: "coinFlip" },
    //     { date: "14-10-2025", amount: -50, name: "coinFlip" },
    //     { date: "14-10-2025", amount: -150, name: "coinFlip" },
    //     { date: "14-10-2025", amount: -250, name: "crash" },
    //     { date: "14-10-2025", amount: -150, name: "crash" },
    // ];

    useEffect(() => {
        async function fetchData() {
            const transactions = await GetAllUserTransactionAsync();
            const deposits = await GetAllUserDepositAsync();

            if (!transactions) {
                console.log("Error fetching transactions");
            } else {
                setTrancationData(transactions);
            }

            if (!deposits) {
                console.log("Error fetching deposits");
            } else {
                setDepositData(deposits);
            }
        }

        fetchData();

    }, []);

    function HistoryCloseClicked() {
        onClose();
    }


    return (
        <div className="History-container">
            <div className="History-btn-container">
                <select className="picker-select" value={choice} onChange={(e) => setChoice(e.target.value)}>
                    <option>Transaction</option>
                    <option>Deposit</option>
                </select>
                {/* <button className="Export-btn" onClick={HistoryCloseClicked}>Export</button> */}
                <button className="CloseHistory-btn" onClick={HistoryCloseClicked}>x</button>


            </div>
            {choice === "Transaction" ? (
                <div className="history-list">
                    {TrancationData.map((t, index) => (
                        <div key={index} className="transaction">
                            <h2>{t.date}</h2>
                            <p className={t.amount > 0 ? "positive" : "negative"}>
                                {t.amount > 0 ? `+${t.amount}$` : `${t.amount}$`}
                            </p>
                            <h3>{t.gameName}</h3>
                        </div>
                    ))}
                </div>
            ) : null}

            {choice === "Deposit" ? (
                <div className="history-list">
                    {DepositData.map((t, index) => (
                        <div key={index} className="deposit">
                            <h2>{t.date}</h2>
                            <p className={t.amount > 0 ? "positive" : "negative"}>
                                {t.amount > 0 ? `+${t.amount}$` : `${t.amount}$`}
                            </p>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    )
}
export default History