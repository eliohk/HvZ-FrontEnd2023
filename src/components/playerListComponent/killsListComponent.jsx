import React from 'react'
import squadIcon from "../../resources/squadIcon.svg";
import { useSelector, useDispatch } from 'react-redux';
import { fetchGameById } from '../../states/dataSlice';
import addIcon from "../../resources/addIcon.svg";
import "../../css/playerListComponent.css";

const KillsListComponent = ( props ) => {
    const kills = props.data.kills.map((kill, i) => {
        return (
            <div className="playerItem" key={i}>
                <p>Player {kill}</p>
                <p>Squad 1</p>
                <p>69420</p>
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