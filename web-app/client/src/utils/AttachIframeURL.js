import { GenerateIframeURL } from "./generateIframeURL";
import { unityDataCache, setUnityData } from "../state/unity-cache";
import { flattenData } from "./flattenData";

// ✅ Create a variable to hold flattened data
export let flattenedData = {}; 
export function attachIframeURLs() {
    if (!unityDataCache) {
        console.error("Unity data cache is empty or invalid", unityDataCache);
        return;
    } else if (!unityDataCache.rooms){
        console.log("Unity data cache already flattened", unityDataCache);
        return;
    }
    console.log("unityDataCache: ", unityDataCache);
    unityDataCache.rooms.forEach(room => {
    if(!room.url) {
        room.url = GenerateIframeURL(room.id, room.parentRoom); // Attach URL to room
        }
        room.devices.forEach(device => {
            /*const urls = GenerateIframeURL(device.id, device.parentRoom);
            device.url = Array.isArray(urls) && urls.length > 1 ? urls : urls[0]; // Store single string if only one URL */
            device.url = GenerateIframeURL(device.id, device.parentRoom);
        }); 
    });
    flattenedData = flattenData(unityDataCache);
    console.log("Updated unityDataCache with URLs:", unityDataCache);
    //console.log("Updated Stringified unityDataCache with URLs:", JSON.stringify(unityDataCache, null, 2));
    //console.log("Updated Flattened data:", JSON.stringify(flattenedData, null, 2));
    //console.log("Flattened data:", flattenedData);
    //console.log("Flattened data stringify:", JSON.stringify(flattenedData, null, 2));
    //console.log("Flattened data Specific URL:", JSON.stringify(flattenedData["sensor01-room01"]["url"], null, 2));
    setUnityData(flattenData(unityDataCache));
}
