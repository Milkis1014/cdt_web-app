import time
import random
import json
from paho.mqtt.client import Client, CallbackAPIVersion

# ---------------------------
# Callback functions
# ---------------------------

def on_connect(client, userdata, flags, reasonCode, properties):
    if reasonCode == 0:
        print("Connected to MQTT broker successfully!")
    else:
        print(f"Failed to connect, reason code {reasonCode}")

def on_disconnect(client, userdata, flags, reasonCode, properties):
    print(f"Disconnected from broker, reason code {reasonCode}")

# ---------------------------
# Payload creation function
# ---------------------------

def create_payload(device_id="no-device-id", device_type="no-device-type", room_id="no-room-id"):
    """
    Creates a JSON payload for the sensor.
    """
    payload = {
        "id": device_id,
        "type": device_type,
        "room": room_id,
        "temperature": random.randint(20, 30),  # Simulated temperature
        "humidity": random.randint(40, 70),
        "co2": random.randint(400, 600),
        "timestamp": int(time.time())
    }
    return json.dumps(payload)

# ---------------------------
# MQTT Client Setup
# ---------------------------

client = Client(
    client_id="dummy-devices",
    callback_api_version=CallbackAPIVersion.VERSION2
)

client.on_connect = on_connect
client.on_disconnect = on_disconnect

# Connect to local MQTT broker
client.connect("mqtt-broker", 1883)

# Start network loop in background
client.loop_start()

# ---------------------------
# Topics / sensors setup
# ---------------------------

sensor_topics = ["room01/sensor/01", "room01/sensor/02"]  # Add as many sensors as you want

# ---------------------------
# Publish JSON temperature payloads
# ---------------------------

try:
    while True:
        for topic in sensor_topics:
            room_id, device_type, device_id = topic.split("/")[:3]  # Use sensor name as device_id
            payload = create_payload(room_id=room_id, device_type=device_type, device_id=device_id)
            client.publish(topic, payload)
            print(f"Published payload: {payload} to topic: {topic}")
        time.sleep(2)  # Wait 2 seconds before next reading

except KeyboardInterrupt:
    print("Stopping sensors...")
    client.loop_stop()
    client.disconnect()
