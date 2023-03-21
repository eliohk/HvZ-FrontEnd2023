import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import sendMsgIcon from "../../resources/sendMsgIcon.svg";
import { useState, useEffect } from 'react';
import { putGlobalChat } from '../../states/dataSlice';
import { useSelector, useDispatch } from 'react-redux';
import Pusher from "pusher-js";
import keycloak from '../../keycloak';
import { current } from 'immer';

const ChatInputViewComponent = (props) => {
    const [ chat, setChat ] = useState([]);
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
        let currentDate = hour + ":" + minutes + " " + date + '-' + (month) + '-'
        return currentDate;
    }

    const handleSendMsg = (event) => {
        let name = keycloak.tokenParsed.given_name + " " + keycloak.tokenParsed.family_name
        let time = getTime()
        let message =name+"&"+time+"&"+currentMessage
        console.log("KUUUK")
        console.log(props.currGame)
        dispatch(putGlobalChat({
            id: props.currGame.id,
            chat: message
        }))
    }

    useEffect(() => {
        const pusher = new Pusher("12be8984736013be627b", {
          cluster: "eu",
        });    
        const channel = pusher.subscribe("hvz-noroff");
        channel.bind("chat-event", function (data) {
            console.log(data.message)
            setChat(...chat, data.message)
        });    
        return () => {
          pusher.unsubscribe("chat");
        };
        
      }, []);
    
    return (
        <>
            <DropdownButton id="dropdown-basic-button" title="helo">
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