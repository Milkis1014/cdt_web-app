import React from 'react'; // 👈 Add this line
import { useState, useEffect, useRef } from "react";
import "./OccupantDashboard.css"; // Import CSS for styling
import { getPanelId } from "../../services/dashboard-service";

const OccupantDashboard = () => {
  const [activeTab, setActiveTab] = useState("average");


  const occupantData = {
    average: `${window.location.origin}/grafana/d-solo/begll92csbitcd/facility01?panelId=8`,
    demand: `${window.location.origin}/grafana/d-solo/begll92csbitcd/facility01?panelId=7`
  };



  return (
    <div className="occupant-dashboard">
      {/* Tabs Section */}
      <div className="occupant-tabs">
        <div
          className={`occupant-tab ${activeTab === "average" ? "active" : ""}`}
          onClick={() => setActiveTab("average")}
        >
          Average
        </div>
        <div
          className={`occupant-tab ${activeTab === "demand" ? "active" : ""}`}
          onClick={() => setActiveTab("demand")}
        >
          Demand
        </div>
      </div>

      {/* Tab Content Section */}
    <div className="occupant-content">
    {/* Outer container controlled by flex */}
      <div className="occupant-outer-container">
        <iframe
        src={occupantData.average}
        className={`occupant-grafana-iframe-container ${activeTab === "average" ? "visible" : "hidden"}`}
        title="Grafana Panel - Average"
        ></iframe>

        <iframe
        src={occupantData.demand}
        className={`occupant-grafana-iframe-container ${activeTab === "demand" ? "visible" : "hidden"}`}
        title="Grafana Panel - Demand"
        ></iframe>
      </div>
    </div>

  </div>
  );
};

export default OccupantDashboard;
