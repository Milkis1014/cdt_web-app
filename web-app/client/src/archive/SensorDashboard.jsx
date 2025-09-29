import { useState } from "react";
import "./SensorDashboard.css"; // Import CSS for styling

const SensorDashboard = () => {
  const [activeTab, setActiveTab] = useState("average");

  // Data Mapping for Each Tab and Sensor Type
  const sensorData = {
    average: {
      temperature: "http://localhost/grafana/d-solo/begll92csbitcd/facility01?orgId=1&from=1742618130355&to=1742639730355&timezone=browser&panelId=11",
      humidity: "http://localhost/grafana/d-solo/begll92csbitcd/facility01?orgId=1&from=1742618130355&to=1742639730355&timezone=browser&panelId=15",
      co2: "http://localhost/grafana/d-solo/begll92csbitcd/facility01?orgId=1&from=1742618130355&to=1742639730355&timezone=browser&panelId=14",
    },
    histogram: {
      temperature: "http://localhost/grafana/d-solo/begll92csbitcd/facility01?orgId=1&from=1742618130355&to=1742639730355&timezone=browser&panelId=12",
      humidity: "http://localhost/grafana/d-solo/begll92csbitcd/facility01?orgId=1&from=1742618130355&to=1742639730355&timezone=browser&panelId=18",
      co2: "http://localhost/grafana/d-solo/begll92csbitcd/facility01?orgId=1&from=1742618130355&to=1742639730355&timezone=browser&panelId=16",
    },
    range: {
      temperature: "http://localhost/grafana/d-solo/begll92csbitcd/facility01?orgId=1&from=1742618130355&to=1742639730355&timezone=browser&panelId=13",
      humidity: "http://localhost/grafana/d-solo/begll92csbitcd/facility01?orgId=1&from=1742618130355&to=1742639730355&timezone=browser&panelId=19",
      co2: "http://localhost/grafana/d-solo/begll92csbitcd/facility01?orgId=1&from=1742618130355&to=1742639730355&timezone=browser&panelId=17",
    },
  };

  return (
    <div className="sensor-dashboard">
      {/* Tabs Section */}
      <div className="sensor-tabs">
        {["average", "histogram", "range"].map((tab) => (
          <div
            key={tab}
            className={sensor-tab ${activeTab === tab ? "active" : ""}}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </div>
        ))}
      </div>

      {/* Tab Content Section */}
      <div className="sensor-content">
        {/* Outer container for iframes */}
        <div className="sensor-outer-container">
          {Object.keys(sensorData).map((tab) => (
            <div
              key={tab}
              className={sensor-grafana-panel ${activeTab === tab ? "visible" : "hidden"}}
            >
              <iframe
                src={sensorData[tab].temperature}
                className="sensor-grafana-iframe-container"
                title={Temperature - ${tab}}
              ></iframe>

              <iframe
                src={sensorData[tab].humidity}
                className="sensor-grafana-iframe-container"
                title={Humidity - ${tab}}
              ></iframe>

              <iframe
                src={sensorData[tab].co2}
                className="sensor-grafana-iframe-container"
                title={CO2 - ${tab}}
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SensorDashboard;