//import { getDashboardData } from "../../src/services/dashboard-service";
import dashboardDataCache from "../../../src/state/dashboard-cache";
import { setUnityData } from "../../../src/state/unity-cache";



// Function to store Digital Twin Data from Unity
window.GetDigitalTwinData = function (jsonData) {
    try {
        console.log("Received JSON from Unity:", jsonData);
        let parsedData = JSON.stringify(jsonData);
        parsedData = JSON.parse(parsedData);
        setUnityData(JSON.parse(parsedData)); // Store in cache using function
        console.log("Successfully stored JSON in unityDataCache", parsedData);
    } catch (error) {
        console.error("Error parsing Digital Twin JSON:", error);
    }
};