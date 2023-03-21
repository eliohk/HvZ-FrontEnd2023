import { useEffect, useRef } from "react";

const ChatViewComponent = (props) => {
    const messageRef = useRef();

    useEffect(() => {
        const chat = messageRef.current;
        if (chat) {
            chat.scrollTop = chat.scrollHeight - chat.clientHeight;
        }
    })

    if (!props.msg.chat) {
        return (
            <div className="chatbox" ref={messageRef}>
                <p className="msg">Adam: I can see 3 zombies at location X. Be careful!</p>
                <p className="msg">Fatima: Thanks, Adam! Me and Khoi will hide.</p>
                <p className="msg">Naughty boy: Come at me brah</p>
                <p className="selfMsg">Thanks Adam, need backup?</p>
                <p className="msg">Khoi: Let's do this!</p>
                <p className="selfMsg">Thanks Adam, need backup?</p>
                <p className="msg">Khoi: Let's do this!</p>
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