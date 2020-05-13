import { useState, useEffect} from "react"
import Actioncable from "actioncable";

export const useWebsocket = (handler) => {
    const endpoint = "ws:localhost:3000/cable";

    const [channel, setChannel] = useState(null);

    useEffect(() => {
        const cable = Actioncable.createConsumer(endpoint);
        const c = cable.subscriptions.create(
            {
                channel: "BroadcastChannel",
            },
            {
                connected: () => {
                    console.log("connected.");
                },
                received: (data) => {
                    handler(data);
                },
            }
        )
        setChannel(c);
        return () => {
            c.unsubscribe();
        }
    },[]);

    return channel;
}
