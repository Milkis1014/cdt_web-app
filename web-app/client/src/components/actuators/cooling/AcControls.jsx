import React from 'react'; // 👈 Add this line
import { useState } from "react";
import "./AcControls.css"; // Optional: Move related styles here

const AcControls = ({ onExecute }) => {
  const [power, setPower] = useState(false);
  const [coolingSetpoint, setCoolingSetpoint] = useState(24);
  const [fanSpeed, setFanSpeed] = useState("Medium");
  const [swing, setSwing] = useState(false);
  const [mode, setMode] = useState("Cool");

  const handleExecute = () => {
    const acSettings = { power: power, coolingSetpoint, fanSpeed, swing: swing, mode };
    console.log("Converting True to On and False to Off");
    onExecute(acSettings); // Pass settings back to parent
    
  };

  return (
    <div className="ac-controls-panel">
      <h3>AC Controls</h3>
      <div className="ac-grid">
        {/* Power Toggle Switch */}
        <label className="ac-toggle">
          <input type="checkbox" checked={power} onChange={() => setPower(!power)} />
          <span className="slider"></span>
          <span className="toggle-label">Power</span>
        </label>

        <label>
          Cooling Setpoint: 
          <input type="number" min="16" max="30" value={coolingSetpoint} onChange={(e) => setCoolingSetpoint(e.target.value)} />°C
        </label>

        <label>
          Fan Speed:
          <select value={fanSpeed} onChange={(e) => setFanSpeed(e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Auto</option>
          </select>
        </label>

        <label className="ac-toggle">
          <input type="checkbox" checked={swing} onChange={() => setSwing(!swing)} />
          <span className="slider"></span>
          <span className="toggle-label">Swing</span>
        </label>

        <label>
          Mode:
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option>Cool</option>
            <option>Fan</option>
            <option>Dry</option>
            <option>Heat</option>
            <option>Auto</option>
          </select>
        </label>

        <button className="ac-execute-button" onClick={handleExecute}>Execute</button>
      </div>
    </div>
  );
};

export default AcControls;
