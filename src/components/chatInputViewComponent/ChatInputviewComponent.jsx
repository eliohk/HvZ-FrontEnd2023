import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import sendMsgIcon from "../../resources/sendMsgIcon.svg";
import { useState, useEffect } from 'react';
import { putGlobalChat } from '../../states/dataSlice';
import { useSelector, useDispatch } from 'react-redux';
import keycloak from '../../keycloak';
// import Pusher from "pusher-js";

const ChatInputViewComponent = (props) => {
    const [ chat, setChat ] = useState("Global chat");
    const [ currentMessage, setCurrentMessage ] = useState("");
    const dispatch = useDispatch();
    const data = useSelector((state) => state);

    const handleChatView = (event) => {
        setChat(event.target.innerHTML);

        /*
        if (event.target.innerHTML == "Global chat") {
            // TODO: Change form hvz-noroff to "global-chat" later
            console.log("Am i doing something?")
            props.channel = props.pusher.subscribe("hvz-noroff");
        } else {
            console.log("Am i doing something? pt2")
            props.pusher.unsubscribe("hvz-noroff");
        }
        */
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

    function getTime() {
        let today = new Date()
        let month, date, minutes, hour;
        minutes = today.getMinutes()
        hour = today.getHours()
        if ((today.getMonth() + 1) < 10){
            month = "0".concat(today.getMonth() + 1)
        } else {
            month = today.getMonth() + 1
        }

        if ((today.getDate()) < 10){
            date = "0".concat(today.getDate())
        } else {
            date = today.getDate()
        }
        let currentDate = hour + ":" + minutes;
        return currentDate;
    }

    const handleSendMsg = (event) => {
        let name = keycloak.tokenParsed.given_name + " " + keycloak.tokenParsed.family_name
        let time = getTime()
        let message =name+"&"+time+"&"+currentMessage
        
        dispatch(putGlobalChat({
            id: props.currGame.id,
            chat: message
        }))

        setCurrentMessage("")
    }
    
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