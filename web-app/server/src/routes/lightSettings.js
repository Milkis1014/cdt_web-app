const express = require('express');
const router = express.Router();
const logSettings = require('../utils/logger');
const mqttClient = require('../services/mqtt'); // ✅ Import the MQTT client

router.get('/', (req, res) => {
    res.json({ message: '/light-settings route is working' });
});
router.post('/', async (req, res) => {
  try {
    const { activeParentRoom: room_id, activeType: unit_type, activeId: unit_id, power } = req.body;

    // Convert boolean power to string "1"/"0"
    const command = power ? '1' : '0';

    // Publish to MQTT topic
    mqttClient.publish(`${room_id}/${unit_id}`, command, async (err) => {
      if (err) {
        console.error(`❌ Failed to publish to ${room_id}/${unit_id}:`, err);
        return res.status(500).json({ error: 'Failed to publish MQTT message' });
      }

      console.log(`📡 Published ${command} to topic: ${room_id}/${unit_id}`);

      try {
        await logSettings(req.body); // Log the settings to InfluxDB
        res.status(200).json({ message: 'Route light-settings: Data Received' });
      } catch (influxError) {
        console.error('Error writing light settings to InfluxDB:', influxError);
        res.status(500).json({ error: 'Failed to write data to InfluxDB' });
      }
    });

  } catch (error) {
    console.error('General error in / route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export the router to be used in the app
module.exports = router;