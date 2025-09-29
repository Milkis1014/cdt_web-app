import React, { useRef, useCallback, useEffect, useState } from "react";
import "./App.css";
import UnityLoader from "../utils/unityLoader.jsx";
import { setupRoomDashboard } from "../utils/setupRoomDashboard";
import EnergyDashboard from "./dashboards/EnergyDashboard";
import OccupantDashboard from "./dashboards/OccupantDashboard";
import SensorDashboard from "./dashboards/SensorDashboard";
import DynamicDashboard from "./dashboards/DynamicDashboard";
import { fetchAndCacheAllDashboards } from "../services/dashboard-service";
import { getUnityData, unityDataCache } from "../state/unity-cache";
import { attachIframeURLs } from "../utils/AttachIframeURL";
import { useUnityData } from "../state/unity-cache";
import useWebSocket from "../hooks/useWebSocket.js";
import LoginForm from "./LoginForm"; // 👈 ADDED FOR LOGIN

function App() {
  const [isUnityLoaded, setIsUnityLoaded] = useState(false);
  const [isDashboardExpanded, setIsDashboardExpanded] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [activeParentRoom, setActiveParentRoom] = useState(null);
  const [unityData] = useUnityData();

  // 👇 ADDED FOR LOGIN
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 👈 ADDED FOR LOGIN
  const [username, setUsername] = useState(""); // 👈 ADDED FOR LOGIN
  const handleLogin = (user) => {
    setUsername(user); // 👈 ADDED FOR LOGIN
    setIsLoggedIn(true); // 👈 ADDED FOR LOGIN
  }; // 👈 ADDED FOR LOGIN

  /* LOG SECTION */
  const [logs, setLogs] = useState([]);
  const logsContainerRef = useRef(null);
  const MAX_LOGS = 20;

  const handleWebSocketMessage = useCallback((message) => {
    console.log("WebSocket message from backend:", message);
    if (message instanceof Blob) return;
    setLogs((prevLogs) => {
      const updatedLogs = [...prevLogs, message];
      if (updatedLogs.length > MAX_LOGS) updatedLogs.shift();
      return updatedLogs;
    });
  }, []);

  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const getWebSocketUrl = () => {
    const protocol = window.location.protocol === "https:" ? "wss://techtalk-digitaltwin.org" : "ws://localhost";
    return `${protocol}/ws`;
  };

  const { sendMessage, connected } = useWebSocket(getWebSocketUrl(), handleWebSocketMessage);

  useEffect(() => {
    if (connected) sendMessage("Hello from the client!");
  }, [connected]);

  /* LOG SECTION */

  useEffect(() => {
    if (unityData) {
      console.log("Using data from unityDataCache:", unityData);
      console.log("The unityDataCache:", unityDataCache);
      attachIframeURLs();
    }
  }, [unityData]);

  useEffect(() => {
    fetchAndCacheAllDashboards().then(() => {
      console.log("All Grafana dashboards fetched successfully!");
    });
  }, []);

  useEffect(() => {
    const cleanup = setupRoomDashboard(setActiveId, setActiveParentRoom, setIsDashboardExpanded);
    return cleanup;
  }, []);

  return (
    <div className="unity-container">
      {/* 👇 ADDED FOR LOGIN */}
      {!isLoggedIn ? (
        <div className="login-background">
        <LoginForm onLogin={handleLogin} />
        </div>
      ) : (
        <>
          <UnityLoader onUnityLoaded={setIsUnityLoaded} />

          {isUnityLoaded && (
            <>
              <DynamicDashboard
                activeId={activeId}
                activeParentRoom={activeParentRoom}
                isDashboardExpanded={isDashboardExpanded}
              />
              <div className="staticDashboard-container">
                <EnergyDashboard />
                <OccupantDashboard />
                <SensorDashboard />
              </div>

              <div className="logs-container" ref={logsContainerRef}>
                <div className="logs-content">
                  {logs.map((msg, index) => (
                    <div key={index} className="log-entry">{msg}</div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
