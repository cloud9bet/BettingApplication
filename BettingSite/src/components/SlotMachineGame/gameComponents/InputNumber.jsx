import React from "react";
import "../gameStyles/InputNumber.css";
// ændre max senere
export default function InputNumber({ value, disabled, onChange}) {
    return (
      < input
      className = "slot-input"  
      type = "text"
      value = {value}
      disabled = {disabled}
      onChange={(e) => onChange(Number(e.target.value) || 0)}
      />  
    );
} 
