import React from 'react'; // 👈 Add this line
import { useState } from "react";
import "./SensorDashboard.css"; // Import CSS for styling

const SensorDashboard = () => {
  const [activeTab, setActiveTab] = useState("average");

  // Data Mapping for Each Tab and Sensor Type (Variable iframe counts)
  const sensorData = {
    average: {
      temperature: `${window.location.origin}/grafana/d-solo/ded7weu2gepdsa/rdmo?panelId=29`,
      humidity: `${window.location.origin}/grafana/d-solo/ded7weu2gepdsa/rdmo?panelId=15`,
      co2: `${window.location.origin}/grafana/d-solo/ded7weu2gepdsa/rdmo?panelId=14`,
    },
    histogram: {
      temperature: `${window.location.origin}/grafana/d-solo/ded7weu2gepdsa/rdmo?panelId=12`,
      humidity: `${window.location.origin}/grafana/d-solo/ded7weu2gepdsa/rdmo?panelId=18`,
      co2: `${window.location.origin}/grafana/d-solo/ded7weu2gepdsa/rdmo?panelId=16`,
    },
    range: {
      temperature: `${window.location.origin}/grafana/d-solo/ded7weu2gepdsa/rdmo?panelId=13`,
      humidity: `${window.location.origin}/grafana/d-solo/ded7weu2gepdsa/rdmo?panelId=19`,
      co2: `${window.location.origin}/grafana/d-solo/ded7weu2gepdsa/rdmo?panelId=20`,
    },
  };

  return (
    <div className="sensor-dashboard">
      {/* Tabs Section */}
      <div className="sensor-tabs">
        {Object.keys(sensorData).map((tab) => (
          <div
            key={tab}
            className={`sensor-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </div>
        ))}
      </div>

      {/* Tab Content Section */}
      <div className="sensor-content">
        <div className="sensor-outer-container">
          {Object.keys(sensorData).map((tab) => (
            <div
              key={tab}
              className={`sensor-grafana-panel ${activeTab === tab ? "visible" : "hidden"}`}
            >
              {/* Dynamically generate iframes based on available keys in sensorData[tab] */}
              {Object.keys(sensorData[tab]).map((sensorType) => (
                <iframe
                  key={sensorType}
                  src={sensorData[tab][sensorType]}
                  className="sensor-grafana-iframe-container"
                  title={`${sensorType.charAt(0).toUpperCase() + sensorType.slice(1)} - ${tab}`}
                ></iframe>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SensorDashboard;
