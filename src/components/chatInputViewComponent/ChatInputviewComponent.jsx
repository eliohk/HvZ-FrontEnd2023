import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import sendMsgIcon from "../../resources/sendMsgIcon.svg";
import { useState, useEffect } from 'react';
import { putGlobalChat } from '../../states/dataSlice';
import { useSelector, useDispatch } from 'react-redux';
import Pusher from "pusher-js";

const ChatInputViewComponent = (props) => {
    const [ chat, setChat ] = useState("Global chat");
    const [ currentMessage, setCurrentMessage ] = useState("");
    const dispatch = useDispatch();
    const data = useSelector((state) => state);

    const handleChatView = (event) => {
        setChat(event.target.innerHTML);
    }

    const handleCurrentMessage = (event) => {
        setCurrentMessage(event.target.value);
    }

    const handleEnter = (event) => {
        if (event.key == 'Enter') {
            handleSendMsg();
        }
    }

    let chatType = ["Global chat", "Human chat", "Zombie chat"];
    const chats = chatType.map((value, i) => {
        if (value != chat) {
            return (<Dropdown.Item onClick={handleChatView} key={i}>{value}</Dropdown.Item>);
        }
    });

    const handleSendMsg = (event) => {
        console.log("Curr message: " + currentMessage);
        dispatch(putGlobalChat({
            id: props.currGame.id,
            chat: currentMessage
        }))
    }

    useEffect(() => {
        const pusher = new Pusher("12be8984736013be627b", {
          cluster: "eu",
        });

        console.log(pusher);
    
        const channel = pusher.subscribe("hvz-noroff");
        
        console.log(channel);

        channel.bind("chat-event", function (data) {
          setChat((prevState) => [
            ...prevState,
            { sender: data.sender, message: data.message },
          ]);
         console.log("in function")
         console.log(data);
        });

        console.log(chat);
    
        return () => {
          pusher.unsubscribe("chat");
        };
      }, []);
    
    return (
        <>
            <DropdownButton id="dropdown-basic-button" title={chat}>
                {chats}
            </DropdownButton>
            <div className="actualInput">
                <input id="input" type="text" name="name" onKeyDown={handleEnter} onChange={handleCurrentMessage} placeholder='Enter message here ...'/>
                <button className='sendMsgBtn' onClick={handleSendMsg}><img src={sendMsgIcon} alt="Send message button" className="msgIcon"></img></button>
            </div>
        </>
    )
}

export default ChatInputViewComponent;