FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy the publisher script
COPY dummy-sensor.py .

# Install dependencies
RUN pip install --no-cache-dir paho-mqtt

# Wait for broker to be ready before starting
CMD ["sh", "-c", "sleep 5 && python dummy-sensor.py"]
