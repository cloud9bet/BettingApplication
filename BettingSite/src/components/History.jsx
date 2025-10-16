import { useState } from "react";
import '../styles/Popup.css'


function History({ onClose }) {

    const transactions = [
        { date: "12-10-2025", amount: +150 },
        { date: "14-10-2025", amount: -150 },
        { date: "14-10-2025", amount: -3350 },
        { date: "14-10-2025", amount: -50 },
        { date: "14-10-2025", amount: -150 },
        { date: "14-10-2025", amount: -510 },
        { date: "14-10-2025", amount: -250 },
        { date: "14-10-2025", amount: -50 },
        { date: "14-10-2025", amount: -150 },

    ];
    function HistoryCloseClicked() {
        onClose();
    }

    return (
        <div className="History-container">
            <div className="History-btn-container">
            <button className="CloseHistory-btn" onClick={HistoryCloseClicked}>x</button>
            </div>
            <div className="transactions-list">
                {transactions.map((t, index) => (
                    <div key={index} className="transaction">
                        <h2>{t.date}</h2>
                        <p className={t.amount > 0 ? "positive" : "negative"}>
                            {t.amount > 0 ? `+${t.amount}$` : `${t.amount}$`}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default History