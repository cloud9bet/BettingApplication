import React from "react";
import "../gameStyles/InputNumber.css";
// ændre max senere
export default function InputNumber({ value, min = 1, max = 5000, disabled, onChange}) {
    return (
      < input
      className = "slot-input"  
      type = "text"
      value = {value}
      min = {min}
      max = {max}
      disabled = {disabled}
      onChange={(e) => onChange(Number(e.target.value) || 0)}
      />  
    );
} 
