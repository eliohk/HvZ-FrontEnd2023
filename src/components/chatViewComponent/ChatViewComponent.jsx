import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";


const ChatViewComponent = (props) => {
    const messageRef = useRef();
    const chatsState = useSelector((state) => state)

    useEffect(() => {
        const chat = props.chat;
        if (chat) {
            chat.scrollTop = chat.scrollHeight - chat.clientHeight;
        }
    })
    const chats = chatsState.data.currGame.chat.chats.map((item, i) => {
        return (
            <p key={i}>{item}</p>
        )
    })  

    console.log("LOGGING CHAT")
    console.log(props.chat.chats)
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
                <p>Chats not loaded ..</p>
            </div>
        )
    }

    
}

export default ChatViewComponent;