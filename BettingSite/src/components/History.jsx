import { useState, useEffect } from "react";
import { GetAllUserTransactionAsync, GetAllUserDepositAsync } from "../services/ControllerService/userApi";
import { FaDownload } from "react-icons/fa";
import { CSVLink } from "react-csv";
import { formatCompactNumber } from "../utils/MathCompacter";
import '../styles/Popup.css'

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
                setTransactionData([...transactions].reverse());
            }

            if (!deposits) {
                console.log("Error fetching deposits");
            } else {
                setDepositData([...deposits].reverse());
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
                         data-testid="csv-link"
                    >
                        <FaDownload/>
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
                                {t.amount > 0 ? `+${formatCompactNumber(t.amount)}$` : `${formatCompactNumber(t.amount)}$`}
                            </p>
                            <h3>{t.gameName}</h3>
                        </div>
                    ))}
                </div>
            ) : ( 
                <div className="history-list">
                    {DepositData.map((t, index) => (
                        <div key={index} className="deposit">
                            <h2>{t.date}</h2>
                            <p className={t.amount > 0 ? "positive" : "negative"}>
                                {t.amount > 0 ? `+ ${formatCompactNumber(t.amount)}$` : `${formatCompactNumber(t.amount)}$`}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
export default History