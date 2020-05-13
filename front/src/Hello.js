import React, { useState } from "react";
import { useWebsocket } from "./useWebsocket";
import { Link } from "react-router-dom";

const Hello = (props) => {
    const [messages, setMessages] = useState([]);
    
    const channel = useWebsocket((data) => {
        setMessages(m => [...m, data]);
    });

    const handleClick = (chatChannel) => {
        if (chatChannel == null) {
            return;
        }
        chatChannel.perform("speak", {
            message: "hello",
        });
    }
    const items = messages.map((message, i) => {
        return <li key={i}>{message}</li>;
    });

    return(
        <div>
            Hello
            <Link to="/app">App</Link>
            <button onClick={() => handleClick(channel)}>message</button>
            <ul>{items}</ul>
        </div>
    );
}

export default Hello;
