import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGameById } from '../../states/dataSlice';
import "../../css/playerListComponent.css";
import squadIcon from "../../resources/squadIcon.svg";
import addIcon from "../../resources/addIcon.svg";
import retIcon from "../../resources/retIcon.svg";
import editIcon from "../../resources/editIcon.svg";
import Popup from 'reactjs-popup';

const KillsListComponent = ( props ) => {
    const [addGameClicked, setaddGameClicked] = useState(false)
    const [inputVal, setInputVal] = useState("")

    const matchingPlayers = props.players.map((player, i) => {
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
        return (
            <div className="playerItem" key={i}>
                <a onClick={handleDelete} id="smallBtn" className="button"><img id="smallBtnImg" src={editIcon} alt="Edit user button"/></a>
                <p>Player {kill.id}</p>
                <p>{kill.time_of_death}</p>
                <p>{kill.lat} - {kill.lng}</p>
                <a id="smallBtn" className="button"><img id="smallBtnImg" src={retIcon} alt="Remove user button"/></a>
            </div>
        )
    });

    function addKill() {
        console.log("Hello")
        setaddGameClicked(true)
    }

    function handleSave() {
        for (let i = 0; i < props.players.length; i++){
            if (props.players[i].biteCode === inputVal){
                console.log("WE HAVE A MATCH XDD")
                return null;
            }
        }
        console.log("KYS")
    }

    function handleCancel(e) {
        console.log("cancelled")
        setInputVal(e.target.value)
        setaddGameClicked(false)
    }

    function handleInputChange(e) {
        setInputVal(e.target.value)
        console.log(inputVal)
    }

    return (
        <div className='listViewContainer'>
            <h3 id="listTitle">Kills</h3>
            <div className='playerContainer'>
                <div className="killerContainer">
                    {addGameClicked ?   <div className='bitecodeInput'>
                                        <div className='killBtns'>
                                            <button id="crtKillBtn" onClick={handleSave} >Save</button>
                                            <button id="cancelKillBtn" onClick={handleCancel} >Cancel</button>
                                        </div>
                                        <p className="overBitecode">Write bitecode here</p>
                                        <input type="text" value={inputVal} onChange={handleInputChange}/>
                                        </div>
                    : <button id="crtBtn" onClick={addKill}><img src={addIcon} alt="Add button" id="addBtn"/>Add kill</button>}
                </div>
                {addGameClicked ?   <div className='headerContainer'>
                                        {/* Name - Faction - Squad */}
                                        <p className="title">Player id</p>
                                        <p className="title">Bite code</p>
                                    </div>
                                    : 
                                    <div className='headerContainer'>
                                        {/* Name - Faction - Squad */}
                                        <p className="title">Name</p>
                                        <p className="title">Squad</p>
                                        <p className="title">Bite code</p>
                                    </div>}

                <hr></hr>
                {/* Edit player - Player Name - Faction - Squadname - Remove player */}
                {addGameClicked ? matchingPlayers : kills}
            </div>
        </div>
    )
}

export default KillsListComponent;