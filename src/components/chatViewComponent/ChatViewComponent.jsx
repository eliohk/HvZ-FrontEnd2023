import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Pusher from "pusher-js";
import { setChat, setChats } from "../../states/dataSlice";
import keycloak from "../../keycloak";

const ChatViewComponent = (props) => {
    const messageRef = useRef();
    const chatsState = useSelector((state) => state)
    const [ channel, setChannel ] = useState(null);
    const [ chattie, setChattie ] = useState(null)
    const dispatch = useDispatch();

    useEffect(() => {
        props.pusher.subscribe("hvz-noroff").bind("chat-event", function (data) {
            const myName = keycloak.tokenParsed.given_name + " " + keycloak.tokenParsed.family_name;
            if (data.message.split("&")[0] != myName) {
                console.log("Dispatching message to state")
                dispatch(setChat(data.message));
            }
        });    

        const chat = messageRef.current;
        if (chat) {
            chat.scrollTop = chat.scrollHeight - chat.clientHeight;
        }
    }, [])

    let chats = [];

    if (chatsState.data.currGame) {
        chats = chatsState.data.currGame.chat.chats.map((item, i) => {
            const arr = item.split("&");
            const name = arr[0];
            const timestamp = arr[1];
            const chat = arr[2];
    
            const selfName = keycloak.tokenParsed.given_name + " " + keycloak.tokenParsed.family_name;
            if (name == selfName) {
                return (
                    <p className="selfMsg" key={i}>{chat}</p>
                )
            } else {
                return (
                    <p className="msg" key={i}>[{timestamp}]{name}: {chat}</p>
                )
            }
            
        });
    } 

    if (chatsState.data.currGame.chat.chats.length > 0) {
        return (
            <div className="chatbox" ref={messageRef}>
                {chats}
            </div>  
        )
    } else {
        // TODO: loop through msg and display em down like above
        return (
            <div className="chatbox" ref={messageRef}>
                <p>There are no chats yet, start chatting buddy!</p>
            </div>
        )
    }

    
}

export default ChatViewComponent;