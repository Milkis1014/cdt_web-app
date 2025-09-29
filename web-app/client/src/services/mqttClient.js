import mqtt from "mqtt";

const brokerUrl = "wss://192.168.0.104:9001"; // Replace with your RPi IP and WebSocket Port
//const client = mqtt.connect(brokerUrl);

//client.on("connect", () => {
  //  console.log("Connected to MQTT Broker");
//});

//export const sendCommand = (topic, message) => {
   // const payload = typeof message === "string" ? message : JSON.stringify(message);
   // client.publish(topic, payload);
   // console.log(`Sent: ${payload} to topic: ${topic}`);
//};
