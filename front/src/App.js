import React, { useState, useEffect } from "react";
import { useWebsocket } from "./useWebsocket";
import { Link } from "react-router-dom";

const App = () => {
  const [messages, setMessages] = useState([]);

  const channel = useWebsocket((data)=>{
    setMessages(m => [...m, data]);
  });

  const handleClick = (chatChannel) => {
    if (chatChannel == null) {
      return;
    }
    chatChannel.perform("speak", {
      message: "hoge",
    });
  }

  const items = messages.map((message, i) => {
    return <li key={i}>{message}</li>;
  });

  return (
    <div>
      <Link to="/hello">Hello</Link>
      <button onClick={() => handleClick(channel)}>message</button>
      <ul>{items}</ul>
    </div>
  );
}

export default App;
