const client = require('./influxClient')
const { Point } = require('@influxdata/influxdb-client')

const org = "TechTalk"
const bucket = "log"
const writeClient = client.getWriteApi(org, bucket, 'ns')

for (let i = 0; i < 10; i++) {
    const point = new Point('measurement1')
        .tag('tagname1', 'tagvalue1')
        .intField('field1', i)
    
    setTimeout(() => {
        writeClient.writePoint(point)
    }, i * 1000) // separate points by 1 second
}
    setTimeout(() => {
    writeClient.flush()
  }, 10000)
