//import { OpenRoomDashboard as OpenRoomDashboardFunction } from "../../public/Build/ExternalPlugin.js";
import { GenerateIframeURL } from "./generateIframeURL.js";
import { unityDataCache } from "../state/unity-cache.js";


export function setupRoomDashboard(setActiveId, setActiveParentRoom, setIsDashboardExpanded) {
  window.OpenRoomDashboard = async (id, parentRoom) => {
    try {
      //await OpenRoomDashboardFunction(id, parentRoom); // ✅ Calls the correct function
      setIsDashboardExpanded(true);
      setActiveId(id);
      setActiveParentRoom(parentRoom); // ✅ Update the activeParentRoom state
      console.log("ID: ", id);
      console.log("Parent Room: ", parentRoom);
      console.log(`Generated Iframe URL: ${GenerateIframeURL(id, parentRoom)}`);
      //console.log(`Unity Data Cache: ${unityDataCache}`);
    } catch (error) {
      console.error("Error in OpenRoomDashboard:", error);
    }
  };

  window.CloseRoomDashboard = () => {
    console.log("Closing Dashboard");
    setIsDashboardExpanded(false);
    setActiveId(null);
    setActiveParentRoom(null); // ✅ Update the activeParentRoom state
  };

  return () => {
    delete window.OpenRoomDashboard;
    delete window.CloseRoomDashboard;
  };
}
