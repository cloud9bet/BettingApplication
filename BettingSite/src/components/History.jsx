import { useState, useEffect } from "react";
import { GetAllUserTransactionAsync, GetAllUserDepositAsync } from "../services/ControllerService/userApi";
import '../styles/Popup.css'
import { CSVLink } from "react-csv"

function History({ onClose }) {
    const [TransactionData, setTransactionData] = useState([]);
    const [DepositData, setDepositData] = useState([]);
    const [choice, setChoice] = useState("Transaction");



    useEffect(() => {
        async function fetchData() {
            const transactions = await GetAllUserTransactionAsync();
            const deposits = await GetAllUserDepositAsync();

            if (!transactions) {
                console.log("Error fetching transactions");
            } else {
                setTransactionData(transactions);
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

    const TrancationHeaders = [
        { label: 'Date', key: 'date' },
        { label: 'Amount', key: 'amount' },
        { label: 'Game Name', key: 'gameName' }
    ];

    const TransactionCSV = {
        filename: 'Transaction_log.csv',
        headers: TrancationHeaders,
        data: TransactionData

    };

    const DepositHeaders = [
        { label: 'Date', key: 'date' },
        { label: 'Amount', key: 'amount' }
    ]


    const DepositCSV = {
        filename: 'Deposit_log.csv',
        headers: DepositHeaders,
        data: DepositData

    };


    return (
        <div className="History-container">
            <div className="History-Button-container">
                <div className="History-choice-container">
                    <select className="picker-select" value={choice} onChange={(e) => setChoice(e.target.value)}>
                        <option>Transaction</option>
                        <option>Deposit</option>
                    </select>
                    <CSVLink
                        {...(choice === "Transaction" ? TransactionCSV : DepositCSV)}
                        className="ExportHistory-btn"
                    >
                        Export
                    </CSVLink>
                    <button className="CloseHistory-btn" onClick={HistoryCloseClicked}>x</button>

                </div>


            </div>
            {choice === "Transaction" ? (
                <div className="history-list">
                    {TransactionData.map((t, index) => (
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