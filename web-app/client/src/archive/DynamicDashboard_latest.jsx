import "./DynamicDashboard.css";
import { useEffect, useState } from "react";
import { unityDataCache } from "../state/unity-cache"; // ✅ Import unityDataCache
import { flattenedData } from "../utils/AttachIframeURL";

const DynamicDashboard = ({ activeId, isDashboardExpanded, activeParentRoom}) => {

  const lookupKey = `${activeId}-${activeParentRoom}`;
  console.log(`LookupKey: ${lookupKey}`);
  console.log("heyo flattenedData in DynamicDashboard:", flattenedData);
  /*useEffect(() => {
    if (flattenedData){
      console.log("rerunning dynamic dashboard because flattenedData is updated", flattenedData);
    } 
    
  }, [flattenedData]); */
  if(!flattenedData || flattenedData.rooms) {
    console.log("heyo don't move forward");
    return;
  }

  return (
    <div className={`dynamicDashboard-container ${isDashboardExpanded ? "expanded" : ""}`}>
          <div className="dynamicDashboard-title">{activeId || "Loading..."}</div>
          <div className={`dynamicDashboard-outer-container ${isDashboardExpanded ? "expanded" : "collapsed"}`}>
            {
            Object.keys(flattenedData).map((id) => (
                <div
                    key={id}
                    className={`object-grafana-panel ${lookupKey === id ? "visible":"hidden"}`}
                >
                    {/* Dynamically generate iframes based on available keys in sensorData[tab] */}
                    {flattenedData[id].url.map((url, index) => (
                        <iframe
                          key={index}
                          src={url}
                          className="grafana-iframe-container"
                        ></iframe>
                    ))}
                </div>
            ))  
            }
          </div>
        </div>
  );
};

export default DynamicDashboard;
