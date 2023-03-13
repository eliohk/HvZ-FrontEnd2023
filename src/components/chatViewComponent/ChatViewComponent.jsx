import { useEffect, useRef } from "react";

const ChatViewComponent = (props) => {

    const messageRef = useRef();

    useEffect(() => {
        const chat = messageRef.current;
        if (chat) {
            chat.scrollTop = chat.scrollHeight - chat.clientHeight;
        }
    })


    return (
        <div>
        <div className="chatbox" >
            <p className="msg">Adam: I can see 3 zombies at location X. Be careful!</p>
            <p className="msg">Fatima: Thanks, Adam! Me and Khoi will hide.</p>
            <p className="selfMsg">Naughty boy: Come at me brah</p>
            <p className="msg">You: Thanks Adam, need backup?</p>
            <p className="msg">Khoi: Let's do this!</p>
            <p className="msg">You: Thanks Adam, need backup?</p>
            <p className="msg">You: Thanks Adam, need backup?</p>
            <p className="msg">You: Thanks Adam, need backup?</p>
            <p className="msg">You: Thanks Adam, need backup?</p>
            <p className="msg">You: Thanks Adam, need backup?</p>
            <p className="msg">Khoi: Let's do this!</p>
        </div>
    </div>
    )
}

export default ChatViewComponent;