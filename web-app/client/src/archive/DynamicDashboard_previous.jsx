import "./DynamicDashboard.css";
import { useEffect, useState } from "react";
import { unityDataCache } from "../state/unity-cache"; // ✅ Import unityDataCache
import { flattenedData } from "../utils/AttachIframeURL";

const DynamicDashboard = ({ activeId, isDashboardExpanded, activeParentRoom }) => {
  const [iframeUrls, setIframeUrls] = useState([]); 

  const lookupKey = `${activeId}-${activeParentRoom}`;
  useEffect(() => {
    if (!activeId || !activeParentRoom) return;
  
    // Create the correct key format (id-parentRoom)
    
    
    // Directly get the active item from unityDataCache
    const activeItem = flattenedData[lookupKey]; 
    if (!activeItem) return;
  
    let urls = Array.isArray(activeItem.url) ? activeItem.url : (activeItem.url ? [activeItem.url] : []);
  
    setIframeUrls(urls);
  }, [activeId, activeParentRoom, unityDataCache]); // ✅ Add activeParentRoom as dependency
  
  

  return (
    <div className={`dynamicDashboard-container ${isDashboardExpanded ? "expanded" : ""}`}>
      {isDashboardExpanded ? (
        <div className="dynamicDashboard-content">
          <div className="dynamicDashboard-title">{activeId || "Loading..."}</div>
          <div className="dynamicDashboard-outer-container">
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
                          title={`${activeId.charAt(0).toUpperCase() + activeId.slice(1)} - ${activeParentRoom}`}
                        ></iframe>
                    ))}
                </div>
            ))  
            }
          </div>
        </div>
      ) : (
        <div className="dynamicDashboard-title">Select an Element</div>
      )}
    </div>
  );
};

export default DynamicDashboard;
