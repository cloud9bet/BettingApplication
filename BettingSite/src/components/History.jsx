import { useState, useEffect } from "react";
import { GetAllUserTransactionAsync } from "../services/ControllerService/userApi";
import '../styles/Popup.css'


function History({ onClose }) {
    const [data, setData] = useState([]);

    const transactions = [
        { date: "12-10-2025", amount: +150, name: "slots" },
        { date: "14-10-2025", amount: -150, name: "slots"},
        { date: "14-10-2025", amount: -3350, name: "coinFlip" },
        { date: "14-10-2025", amount: -50, name: "coinFlip" },
        { date: "14-10-2025", amount: -150, name: "coinFlip" },
        { date: "14-10-2025", amount: -250 ,name: "crash"},
        { date: "14-10-2025", amount: -150, name: "crash"},
    ];

    useEffect(() => {
        async function fetchTransaction() {
                const data = await GetAllUserTransactionAsync();

                if (!data) {
                    console.log("Error fetching transations");
                    return;
                }
                setData(data);
            }
        fetchTransaction();
    }, []);
    
    function HistoryCloseClicked() {
        onClose();
    }

    
    return (
        <div className="History-container">
            <div className="History-btn-container">
            <button className="CloseHistory-btn" onClick={HistoryCloseClicked}>x</button>
            </div>
            <div className="transactions-list">
                {data.map((t, index) => (
                    <div key={index} className="transaction">
                        <h2>{t.date}</h2>
                        <p className={t.amount > 0 ? "positive" : "negative"}>
                            {t.amount > 0 ? `+${t.amount}$` : `${t.amount}$`}   
                        </p>
                        <h3>{t.gameName}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default History