import React from "react";
import "../gameStyles/Button.css";



export default function Button({ onClick, disabled, children}) {
    return (
        <button className="slot-button" onClick={onClick} disabled={disabled}>
            {children}
        </button>
);
}