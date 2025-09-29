require('dotenv').config()
const { InfluxDB } = require('@influxdata/influxdb-client')

const token = process.env.INFLUX_TOKEN
const url = 'http://localhost:8086'

const client = new InfluxDB({ url, token })
console.log('InfluxDB client created')
module.exports = client
// Go to logger.js