import { useState, useEffect, useRef } from "react";

export default function useWebSocket(url, onMessage) {
    const socketRef = useRef(null);
    const [connected, setConnected] = useState(false);

useEffect(() => {
    if (!url) return;
    console.log("Component using WebSocket mounted");
    console.log("🔁 Creating WebSocket");
    console.log("🔗 WebSocket URL:", url);
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
        console.log("✅ WebSocket connected:", url);
        setConnected(true);
    };

    socket.onmessage = (event) => {
        console.log("📩 WebSocket received:", event.data);
        if (onMessage) onMessage(event.data);
    };

    socket.onerror = (err) => {
        console.error("❌ WebSocket error:", err);
    };
    socket.onpong = () => {
        console.log('Received pong from server');
    };
    socket.onclose = (event) => {
        console.log("⚠️ WebSocket closed");
        console.log("Code:", event.code);
        console.log("Reason:", event.reason);
        console.log("Was clean?", event.wasClean);
        setConnected(false);
    };

    // Cleanup on unmount
    return () => {
        console.log("Component using WebSocket unmounted");
        console.log("🧹 Cleaning up WebSocket");
        if (socketRef.current && (socketRef.current.readyState === WebSocket.OPEN || socketRef.current.readyState === WebSocket.CONNECTING)) {
            socket.close();
        }
    };
}, [url, onMessage]);

const sendMessage = (msg) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(msg);
    } else {
        console.warn("WebSocket is not open. Can't send message.");
    }
};

return { sendMessage, connected };
}
