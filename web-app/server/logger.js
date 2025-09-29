const writeClient = require('./influx');  // Import the write client from influx.js
const { Point } = require('@influxdata/influxdb-client');

// Function to log events
const logEvent = (level, message, service, status) => {
  // Create a new log point
  const point = new Point('application_logs')
    .tag('level', level)        // log level: 'info', 'error', 'debug'
    .tag('service', service)    // service/component name, e.g., 'sensor', 'ac-control'
    .tag('status', status)      // status of the log entry: 'success' or 'failure'
    .stringField('message', message)  // The actual log message (string field)
    .timestamp(new Date());     // Timestamp (current time)

  // Write the log point to InfluxDB
  writeClient.writePoint(point);
};

// Export the logEvent function so it can be used in other parts of the application
module.exports = { logEvent };
