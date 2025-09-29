console.log('Logger module loaded');
const client = require('../../influxClient');
const { Point } = require('@influxdata/influxdb-client');
const { broadcastLogUpdate } = require('../services/websocket'); // Import the broadcast function

const org = process.env.INFLUX_ORG;
const bucket = process.env.INFLUX_BUCKET;

const writeClient = client.getWriteApi(org, bucket, 'ms'); // Use nanoseconds precision

const logSettings = async (data) => {
    console.log('Can I load this before failing?');
    let settings_point; // Declare point variable outside the if block
    let message_point;
    let message;
    const timestamp = new Date(); // Get the current timestamp
    
    { /* Type: COOLING */ }
    if (data.activeType === "cooling") {
    const { activeParentRoom: room_id, activeType: unit_type, activeId: unit_id, power, coolingSetpoint: setpoint, fanSpeed: fan_speed, swing, mode } = data;
    //console.log("Can I access data.activeType?", data.activeType);
    // Format your log message as needed
    message = `Command sent for ${room_id}-${unit_type}-${unit_id}: power - ${power}, setpoint - ${setpoint}, fan speed - ${fan_speed}, swing - ${swing}, mode - ${mode}`;

    // Create a new point for InfluxDB
    settings_point = new Point('ac-settings-test')
        .tag('room', room_id)
        .tag('unit_type', unit_type)
        .tag('unit_id', unit_id)
        .booleanField('power', power)
        .intField('setpoint', setpoint)
        .stringField('fan_speed', fan_speed)
        .booleanField('swing', swing)
        .stringField('mode', mode)
        .timestamp(timestamp);
    
    message_point = new Point('log-message-test')
        .tag('room', room_id)
        .tag('unit_type', unit_type)
        .tag('unit_id', unit_id)
        .stringField('message', message)
        .timestamp(timestamp);
    }
    
    { /* Type: LIGHT */ }
    if (data.activeType === "light") {
        const { activeParentRoom: room_id, activeType: unit_type, activeId: unit_id, power } = data;
        // Format your log message as needed
        message = `Command sent for ${room_id}-${unit_type}-${unit_id}: power - ${power ? 'on' : 'off'}`;

        // Create a new point for InfluxDB
        settings_point = new Point('light-settings-test-v3')
            .tag('room', room_id)
            .tag('unit_type', unit_type)
            .tag('unit_id', unit_id)
            .stringField('power', power ? 'on' : 'off')
            .timestamp(timestamp);
        
        message_point = new Point('log-message-test')
            .tag('room', room_id)
            .tag('unit_type', unit_type)
            .tag('unit_id', unit_id)
            .stringField('message', message)
            .timestamp(timestamp);
    }
    try {
        if (!settings_point || !message_point) {
            console.error('Settings point or message point is undefined');
            return;
        }
        await writeClient.writePoint(settings_point);
        await writeClient.writePoint(message_point);
        await writeClient.flush(); // Ensure the data is written immediately
        console.log(`Logged to InfluxDB: (Message) `, message);

        broadcastLogUpdate(`${new Date().toISOString()}: ${message}`, `${bucket}`); // Broadcast the log message to all clients
    } catch (err) {
        console.error('InfluxDB write failed:', err); // Server-side error handling
        broadcastLogUpdate(`${new Date().toISOString()}: InfluxDB write failed, message not sent`); // Broadcast the error message to all clients
    }
};

module.exports = logSettings;
