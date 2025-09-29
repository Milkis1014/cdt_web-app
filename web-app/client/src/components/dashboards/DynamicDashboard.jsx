import React from 'react'; // 👈 Add this line
import "./DynamicDashboard.css";
import { useEffect, useState } from "react";
import { flattenedData } from "../../utils/AttachIframeURL";
import AcControls from "../actuators/cooling/AcControls"; // AC Controls
import LightControls from "../actuators/light/LightControls"; // Light Controls
//import { sendCommand } from "../services/mqttClient";
const DynamicDashboard = ({ activeId, isDashboardExpanded, activeParentRoom }) => {
  const [iframeUrls, setIframeUrls] = useState([]);
  const [showIframes, setShowIframes] = useState(false);
  const [showAcControls, setShowAcControls] = useState(false);
  const [showLightControls, setShowLightControls] = useState(false);
  const [activeType, setActiveType] = useState(null);

  const lookupKey = `${activeId}-${activeParentRoom}`;
  console.log("activeId: ", activeId);
  console.log("activeParentRoom: ", activeParentRoom);
  useEffect(() => {
    
    if (!activeId || !activeParentRoom) return;
    console.log("flattenedData[lookupKey]: ", flattenedData[lookupKey]);

    // Load iframe URLs and limit to 3
    const activeItem = flattenedData[lookupKey];
    if (!activeItem) return;
    console.log("activeItem.type: ", activeItem.type);
    let urls = Array.isArray(activeItem.url) ? activeItem.url : (activeItem.url ? [activeItem.url] : []);
    setIframeUrls(urls.slice(0, 3)); // Limit to 3 iframes

    // Show the correct control panel based on type
    setShowAcControls(activeItem.type === "cooling");
    setShowLightControls(activeItem.type === "light");

    setActiveType(activeItem.type); // Store the type for later use

    // Delay iframe visibility for smooth transition
    setShowIframes(false);
    const visibilityTimeout = setTimeout(() => {
      setShowIframes(true);
    }, 1000);

    return () => clearTimeout(visibilityTimeout);
  }, [activeId, activeParentRoom]);

  {/* AC SETTINGS */ }
  const handleExecuteACSettings = (acSettings) => {
    console.log("Executing AC settings:", acSettings);
    console.log("Update reflected in CloudFlare?")
    const { power, coolingSetpoint, fanSpeed, swing, mode } = acSettings;
    const data = { activeParentRoom, activeType, activeId, power, coolingSetpoint, fanSpeed, swing, mode };
    console.log(`URL: ${import.meta.env.VITE_API_BASE_URL}/api/ac-settings`)
    // ${import.meta.env.VITE_API_BASE_URL} for development and ${window.location.origin} for production
    { /* CONTROL && LOG */}
    fetch(`${window.location.origin}/api/ac-settings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(response => response.json())
    .then(data => {
      console.log("Backend response in ac-settings route:", data);
    }).catch(error => {
      console.error("Error sending AC settings:", error);
    });
    /*
    // Convert boolean values to "on"/"off"
    const powerStr = power ? "on" : "off";
    const swingStr = swing ? "on" : "off";
  
    // Construct the string message
    const formattedMessage = `power ${powerStr}, mode ${mode.toLowerCase()}, setpoint ${coolingSetpoint}, fanspeed ${fanSpeed.toLowerCase()}, swing ${swingStr}`;
  
    // Construct the topic
    const dynamicCommandPath = `${activeParentRoom}/${activeId}/control`;
  
    // Send the message via MQTT
    //sendCommand(dynamicCommandPath, formattedMessage);
  
    console.log(`AC control sent to ${dynamicCommandPath}: ${formattedMessage}`);
    */
  };


  {/* LIGHT SETTINGS */ }
  const handleExecuteLightSettings = (lightSettings) => {
    console.log("Executing Light settings:", lightSettings.power);
    
    // Create the dynamic path for the command
    //const dynamicCommandPath = `${activeParentRoom}/${activeId}`;
    const data = { activeParentRoom, activeType, activeId, power: lightSettings.power };
    
    { /* CONTROL && LOG */}
    fetch(`${window.location.origin}/api/light-settings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(response => response.json())
    .then(data => {
      console.log("Backend response in light-settings route:", data);
    }).catch(error => {
      console.error("Error sending light settings:", error);
    });
    // TODO: API call to update Light settings
    /*if (lightSettings.power === true) {
      sendCommand(dynamicCommandPath, 0);
      console.log(`${dynamicCommandPath}`, "on");
    } else if (lightSettings.power === false) {
      sendCommand(dynamicCommandPath, 1);
      console.log(`${dynamicCommandPath}`, "off");
    }*/
  };
  
  return (
    <div className={`dynamicDashboard-container ${isDashboardExpanded ? "expanded" : ""}`}>
      {isDashboardExpanded ? (
        <div className="dynamicDashboard-content">
          <div className="dynamicDashboard-title">{activeId || "Loading..."}</div>
          
          <div className="dynamicDashboard-outer-container">
            {/* Render iframes dynamically */}
            {showIframes ? (
              iframeUrls.map((url, index) => (
                <iframe
                  key={index}
                  src={url}
                  className="grafana-iframe-container"
                  title={`${activeId.charAt(0).toUpperCase() + activeId.slice(1)} - ${activeParentRoom}`}
                ></iframe>
              ))
            ) : (
              <p>Loading dashboard...</p>
            )}

            {/* Show AC Controls if type is "cooling" */}
            {showAcControls && <AcControls onExecute={handleExecuteACSettings} />}

            {/* Show Light Controls if type is "light" */}
            {showLightControls && <LightControls onExecute={handleExecuteLightSettings} />}
          </div>
        </div>
      ) : (
        <div className="dynamicDashboard-title">Select an Element</div>
      )}
    </div>
  );
};

export default DynamicDashboard;
