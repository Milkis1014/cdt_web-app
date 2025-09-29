import { useState } from "react";

let unityDataCache = null;
let setUnityDataFn = () => {}; // Placeholder function

export function useUnityData() {
  const [data, setData] = useState(null);
  unityDataCache = data;
  setUnityDataFn = setData;
  return [data, setData];
}

export function getUnityData() {
  return unityDataCache;
}

export function setUnityData(newData) {
    console.log("setUnityData is working", newData);
  setUnityDataFn(newData); // ✅ Updates React state
}

// Keep the window function name as GetDigitalTwinData to match Unity's setup
window.GetDigitalTwinData = function (jsonData) {
  try {
    //console.log("Received JSON from Unity:", jsonData);
    let parsedData = JSON.stringify(jsonData);
    parsedData = JSON.parse(parsedData); // Parse the stringified JSON to avoid errors
    setUnityData(JSON.parse(parsedData)); // Store the parsed data using your existing function
    //console.log("Successfully stored JSON in unityDataCache", parsedData);
  } catch (error) {
    console.error("Error parsing Digital Twin JSON:", error);
  }
}

// Export the unityDataCache (optional, if you need direct access)
export { unityDataCache };
