import React from 'react'
import squadIcon from "../../resources/squadIcon.svg";
import { useSelector, useDispatch } from 'react-redux';
import { fetchGameById } from '../../states/dataSlice';

import "../../css/playerListComponent.css";

const PlayerListComponent = ( props ) => {

    console.log(props.data.players);

    const players = props.data.players.map((player, i) => {
        return (
            <div className="playerItem" key={i}>
                <p>Player {player}</p>
                <p>Human</p>
                <p>Squad 1</p>
            </div>
        )
    });

    return (
        <div className='listViewContainer'>
            {/*<h3 id="listTitle"><img src={squadIcon} style={{ width: "40px" }} alt="Squad icon" /> Player list</h3>*/}
            <h3 id="listTitle">List of players</h3>
            <div className='playerContainer'>
                <div className='headerContainer'>
                    {/* Name - Faction - Squad */}
                    <p className="title">Name</p>
                    <p className="title">Faction</p>
                    <p className="title">Squad</p>
                </div>
                <hr></hr>
                {/* Edit player - Player Name - Faction - Squadname - Remove player */}
                {players}
            </div>
        </div>
    )
}

export default PlayerListComponent