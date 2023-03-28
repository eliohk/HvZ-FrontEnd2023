import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGameById , postKill, updatePlayer} from '../../states/dataSlice';
import "../../css/playerListComponent.css";
import squadIcon from "../../resources/squadIcon.svg";
import addIcon from "../../resources/addIcon.svg";
import retIcon from "../../resources/retIcon.svg";
import editIcon from "../../resources/editIcon.svg";
import addButtonW from "../../resources/addButtonW.svg";
import Popup from 'reactjs-popup';
import keycloak from '../../keycloak';

const KillsListComponent = ( props ) => {
    const [addGameClicked, setaddGameClicked] = useState(false)
    const [inputVal, setInputVal] = useState("")
    const [story, setStory] = useState("")
    const dispatch = useDispatch();

    const matchingPlayers = props.players.map((player, i) => {
        console.log("MATCHING PLAYERS")
        if (inputVal === player.biteCode){
            return (
                <div className="playerItem" key={i}>
                <p>Player:  {player.id}</p>
                <p>Bite code: {player.biteCode}</p>
                </div>
            )
        }
    })


    const handleDelete = (event) => {
        console.log("Test handleDelete");
    }       
    
    const kills = props.kills.map((kill, i) => {
        console.log(kill)
        return (
            <div className="playerItem" key={i}>
                <p>{kill.id ? kill.id : kill.playerRef}</p>
                <p>{kill.timeOfDeath ? kill.timeOfDeath : kill.time_of_death}</p>
                <p>{kill.story}</p>
                <p>{Math.floor(kill.lat)} - {Math.floor(kill.lng)}</p>
                <div>
                    <a onClick={handleDelete} id="smallBtn" className="button"><img id="smallBtnImg" src={editIcon} alt="Edit user button"/></a>
                    <a id="smallBtn" className="button"><img id="smallBtnImg" src={retIcon} alt="Remove user button"/></a> 
                </div>
            </div>            
        )
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
        let currentDate = hour + ":" + minutes + " " + date + '-' + (month) + '-' + today.getFullYear();
        return currentDate;
    }

    function addKill() {
        setaddGameClicked(true)
    }

    function handleSave() {
        let currentTime = getTime()
        console.log(currentTime)
        for (let i = 0; i < props.players.length; i++){
            if (props.players[i].biteCode === inputVal){
                console.log("WE HAVE A MATCH XDD")
            
                const killObj = {
                    timeOfDeath: currentTime,
                    story: story,
                    lat: props.players[i].lat,
                    lng: props.players[i].lng,
                    playerRef : props.players[i].id,
                    gameRef: props.gameId
                }

                console.log(killObj);
                dispatch(postKill(killObj)).unwrap().then(() => {
                    dispatch(fetchGameById(props.gameId)).unwrap();
                })
                setaddGameClicked(false)
                setInputVal("")
                setStory("")

                const updatedPlayerObj = {
                    id: killObj.playerRef,
                    squadRef: props.players[i].squad ? props.players[i].squad.id : 0,
                    human: false
                }
                dispatch(updatePlayer(updatedPlayerObj)).unwrap().then(() => {
                    dispatch(fetchGameById(props.gameId)).unwrap();
                })
            }
        }
    }

    function handleCancel(e) {
        setInputVal(e.target.value)
        setaddGameClicked(false)
    }

    function handleInputChange(e) {
        setInputVal(e.target.value)
        console.log(inputVal)
    }

    function handleStoryChange(e) {
        setStory(e.target.value)
        console.log(story)
    }

    return (
        <div className='listViewContainer'>
            <h3 id="listKills">Kills</h3>
            <div className='playerContainer'>
                <div className="killerContainer">
                    {addGameClicked ?   
                    <div className='bitecodeInput'>
                    <div className='killBtns'>
                        <button id="crtKillBtn" onClick={handleSave} >Save</button>
                        <button id="cancelKillBtn" onClick={handleCancel} >Cancel</button>
                    </div>
                    <hr></hr>
                    <p className="overBitecode">Write bitecode under</p>
                    <input id="killInput" type="text" value={inputVal} onChange={handleInputChange}/>
                    <p className="overBitecode">Write kill story under</p>
                    <input id="killInput"type="text" value={story} onChange={handleStoryChange}/>
                    </div>
                    : 
                    keycloak.authenticated ?
                    <button id="crtBtn" onClick={addKill}><img src={addButtonW} alt="Add button" id="addBtn"/>Add kill</button>
                    :
                    <button id="crtBtn" onClick={() => keycloak.login()}><img src={addIcon} alt="Add button" id="addBtn"/>Log in to add kill</button>
                    }
                </div>
                {addGameClicked ?   <div className='headerContainer'>
                                        {/* Name - Faction - Squad */}
                                        <p className="title">Player id</p>
                                        <p className="title">Bite code</p>
                                    </div>
                                    : 
                                    <div className='headerContainer'>
                                        {/* Name - Faction - Squad */}
                                        <p className="title">ID</p>
                                        <p className="title">Time</p>
                                        <p className="title">Story</p>
                                        <p className="title">Location</p>
                                    </div>}

                {/* Edit player - Player Name - Faction - Squadname - Remove player */}
                {addGameClicked ? matchingPlayers : kills}
            </div>
        </div>
    )
}

export default KillsListComponent;