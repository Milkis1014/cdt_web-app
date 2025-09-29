import React from 'react'; // 👈 Add this line
import { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is installed
import "./LightControls.css"; // Import CSS

const LightControls = ({ onExecute }) => {
  const [power, setPower] = useState(false); // Default to false

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get("/api/light-settings");
        const data = response.data;
        setPower(data?.power ?? false); // Ensure defined value
      } catch (error) {
        console.error("Error fetching Light settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const handleExecute = () => {
    const settings = { power };
    onExecute(settings);
  };

  return (
    <div className="light-controls-panel">
      <h3>Light Controls</h3>
      <div className="light-grid">
        <label className="light-toggle">
          <input type="checkbox" checked={power} onChange={() => setPower(!power)} />
          <span className="slider"></span>
          <span className="toggle-label">Power</span>
        </label>

        <button className="light-execute-button" onClick={handleExecute}>Execute</button>
      </div>
    </div>
  );
};

export default LightControls;
