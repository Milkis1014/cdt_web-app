const express = require('express');
const router = express.Router();
const logSettings = require('../utils/logger');
const mqttClient = require('../services/mqtt'); // ✅ Import the MQTT client

router.get('/', (req, res) => {
    res.json({ message: '/ac-settings route is working' });
});

router.post('/', async (req, res) => {
  try{
    res.status(200).json({ message: 'Route ac-settings: Data Received' });
    /* INSERT MQTT COMMAND FOR CONTROL */
    const { activeParentRoom: room_id, activeType: unit_type, activeId: unit_id, power, coolingSetpoint: setpoint, fanSpeed: fan_speed, swing, mode } = req.body;
    const power_string = power ? "on" : "off";
    const swing_string = swing ? "on" : "off";


    // const formattedMessage = `power ${power_string}, mode ${mode.toLowerCase()}, setpoint ${setpoint}, fanspeed ${fan_speed.toLowerCase()}, swing ${swing_string}`;
    const formattedMessage = `power ${power_string}`; // for RDMO


    mqttClient.publish(`${room_id}/${unit_id}/control`, formattedMessage, (err) => { 
    if (err) {
      console.error(`❌ Failed to publish to ${room_id}/${unit_id}/control:`, err);
    } else {
      console.log(`📡 Published to topic: ${room_id}/${unit_id}/control`);
    }
    });
    await logSettings(req.body); // Log the settings to InfluxDB
  } catch (error) {
    console.error('Error writing AC settings to InfluxDB:', error);
    res.status(500).json({ error: 'Failed to write data to InfluxDB' });
  }
});




// Export the router to be used in the app
module.exports = router;