export const flattenData = (unityDataCache) => {
    if (!unityDataCache || !unityDataCache.rooms) {
      return {};
    }
  
    return unityDataCache.rooms.reduce((acc, room) => {
      // Add room as an object property
      acc[`${room.id}-${room.parentRoom}`] = {
        type: "room",
        url: room.url || []
      };
  
      // Add each device as an object property
      (room.devices || []).forEach(device => {
        acc[`${device.id}-${device.parentRoom}`] = {
          type: device.type,
          url: device.url || []
        };
      });
  
      return acc;
    }, {});
  };
  