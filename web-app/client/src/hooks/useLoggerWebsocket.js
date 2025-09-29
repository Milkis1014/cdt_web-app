import { useCallback, useEffect, useState } from "react";
import useWebSocket from "./useWebSocket";

const MAX_LOGS = 20;

export default function useLoggerWebSocket(containerRef) {
  const [logs, setLogs] = useState([]);

  const handleWebSocketMessage = useCallback((message) => {
    if (message instanceof Blob) return;

    setLogs((prevLogs) => {
      const updated = [...prevLogs, message];
      return updated.length > MAX_LOGS ? updated.slice(-MAX_LOGS) : updated;
    });
  }, []);

  const getWebSocketUrl = () => {
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const host = protocol === "wss" ? "techtalk-digitaltwin.org" : "localhost";
    return `${protocol}://${host}/ws`;
  };

  const { sendMessage, connected } = useWebSocket(getWebSocketUrl(), handleWebSocketMessage);

  useEffect(() => {
    if (connected) sendMessage("Hello from the client!");
  }, [connected]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return logs;
}
