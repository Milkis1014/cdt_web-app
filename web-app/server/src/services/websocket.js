const WebSocket = require('ws');

// Start WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('✅ Client connected');

    ws.on('message', (message) => {
        console.log('📨 Received from client:', message);

        // Broadcast to other clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('pong', () => {
        console.log('💓 Client responded to ping');
    });

    ws.on('close', (code, reason) => {
        console.warn(`❌ Client disconnected. Code: ${code}, Reason: ${reason}`);
    });

    ws.on('error', (err) => {
        console.error('🛑 WebSocket error:', err);
    });
});

// Ping every 30 seconds to keep connection alive
setInterval(() => {
    wss.clients.forEach((ws) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.ping();
        }
    });
}, 30000);

// Function to send log updates from external module
function broadcastLogUpdate(log, bucket) {
    console.log(`📢 Broadcasting log update (Bucket: ${bucket}):`, log);
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(log);
        }
    });
}

module.exports = { broadcastLogUpdate };

