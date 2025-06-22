'use client'; // required if you're using Next.js app router

import { useEffect, useState } from 'react';

export default function Home() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latestMsg, setLatestMsg] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000');

    ws.onopen = () => {
      console.log('WebSocket connected');
      setSocket(ws);
    };

    ws.onmessage = (message: MessageEvent) => {
      console.log('Message received:', message.data);
      setLatestMsg(message.data);
    };

    ws.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(inputValue);
      setInputValue('');
    }
  };

  if (!socket) {
    return <div>Connecting to the server...</div>;
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>WebSocket Chat</h1>
      <input
        type="text"
        placeholder="Type a message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>

      <div style={{ marginTop: '1rem' }}>
        <strong>Latest Message from Server:</strong>
        <p>{latestMsg}</p>
      </div>
    </main>
  );
}
