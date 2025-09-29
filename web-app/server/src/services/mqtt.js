// mqtt.js
const mqtt = require('mqtt');

// ✅ List of topics to subscribe to
const topics = [
    'room01/cooling01/status',
];

// Connect to the MQTT broker
const client = mqtt.connect('mqtt://192.168.0.104:1883');

client.on('connect', () => {
    console.log('✅ Connected to MQTT broker at 192.168.0.104:1883');

    // Subscribe to each topic in the list
    topics.forEach((topic) => {
        client.subscribe(topic, (err) => {
            if (err) {
                console.error(`❌ Failed to subscribe to ${topic}:`, err);
            } else {
                console.log(`📡 Subscribed to topic: ${topic}`);
            }
        });
    });
});

client.on('message', (topic, message) => {
    const log = message.toString();
    console.log(`📥 MQTT message received [${topic}]:`, log);

    // Optionally broadcast via WebSocket
    // broadcastLogUpdate(log, topic);
});

client.on('error', (error) => {
    console.error('❌ MQTT Connection Error:', error);
});

module.exports = client;