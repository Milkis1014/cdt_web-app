import React from 'react'; // 👈 Add this line
import { useState } from "react";
import "./EnergyDashboard.css"; // Import CSS for styling

const EnergyDashboard = () => {
  const [activeTab, setActiveTab] = useState("cumulative");

  const energyData = {
    cumulative: `${window.location.origin}/grafana/d-solo/begll92csbitcd/facility01?panelId=9`,
    demand: `${window.location.origin}/grafana/d-solo/begll92csbitcd/facility01?panelId=10`
  };

  return (
    <div className="energy-dashboard">
      {/* Tabs Section */}
      <div className="energy-tabs">
        <div
          className={`energy-tab ${activeTab === "cumulative" ? "active" : ""}`}
          onClick={() => setActiveTab("cumulative")}
        >
          Cumulative
        </div>
        <div
          className={`energy-tab ${activeTab === "demand" ? "active" : ""}`}
          onClick={() => setActiveTab("demand")}
        >
          Demand
        </div>
      </div>

      {/* Tab Content Section */}
      <div className="energy-content">
        <div className="energy-outer-container">
          <iframe
          src={energyData.cumulative}
          className={`occupant-grafana-iframe-container ${activeTab === "cumulative" ? "visible" : "hidden"}`}
          title="Grafana Panel - Cumulative"
          ></iframe>

          <iframe
          src={energyData.demand}
          className={`occupant-grafana-iframe-container ${activeTab === "demand" ? "visible" : "hidden"}`}
          title="Grafana Panel - Demand"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default EnergyDashboard;
