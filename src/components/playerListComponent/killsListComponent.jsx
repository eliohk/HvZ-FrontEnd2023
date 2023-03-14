import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchGameById } from '../../states/dataSlice';
import "../../css/playerListComponent.css";
import squadIcon from "../../resources/squadIcon.svg";
import addIcon from "../../resources/addIcon.svg";

import retIcon from "../../resources/retIcon.svg";
import editIcon from "../../resources/editIcon.svg";

const KillsListComponent = ( props ) => {
    const handleDelete = (event) => {
        console.log("Test handleDelete");
    }
    const kills = props.data.map((kill, i) => {
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

    return (
        <div className='listViewContainer'>
            <h3 id="listTitle">Kills</h3>
            <div className='playerContainer'>
                <div className="buttonContainer">
                    <button id="crtBtn"><img src={addIcon} alt="Add button" id="addBtn"/>Add kill</button>
                </div>
                <div className='headerContainer'>
                    {/* Name - Faction - Squad */}
                    <p className="title">Name</p>
                    <p className="title">Squad</p>
                    <p className="title">Bite code</p>
                </div>
                <hr></hr>
                {/* Edit player - Player Name - Faction - Squadname - Remove player */}
                {kills}
            </div>
        </div>
    )
}

export default KillsListComponent;