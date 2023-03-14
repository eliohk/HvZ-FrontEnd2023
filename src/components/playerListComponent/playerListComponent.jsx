import React from 'react'
import squadIcon from "../../resources/squadIcon.svg";
import { useSelector, useDispatch } from 'react-redux';
import { fetchGameById } from '../../states/dataSlice';
import retIcon from "../../resources/retIcon.svg";
import editIcon from "../../resources/editIcon.svg";

import "../../css/playerListComponent.css";

const PlayerListComponent = ( props ) => {

    console.log(props.data.players);

    const handleDelete = (event) => {
        console.log("Test handleDelete");
    }

    const players = props.data.players.map((player, i) => {
        //<button id="smallBtn"><img id="smallBtnImg" src={editIcon} alt="Edit button"/></button>
        //<button id="smallBtn"><img id="smallBtnImg" src={retIcon} alt="Delete user button"/></button>

        return (
            <div className="playerItem" key={i}>
                <a onClick={handleDelete} id="smallBtn" className="button"><img id="smallBtnImg" src={editIcon} alt="Edit user button"/></a>
                <p>Player {player}</p>
                <p>Human</p>
                <p>Squad 1</p>
                <a id="smallBtn" className="button"><img id="smallBtnImg" src={retIcon} alt="Remove user button"/></a>
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
                <div className="playersDiv">
                    {players}
                </div>
            </div>
        </div>
    )
}

export default PlayerListComponent