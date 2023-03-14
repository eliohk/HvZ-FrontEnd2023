import React from 'react'
import squadIcon from "../../resources/squadIcon.svg";
import { useSelector, useDispatch } from 'react-redux';
import { fetchGameById } from '../../states/dataSlice';

const SquadMemberListComponent = ( props ) => {
    const squads = props.data.squads.map((squads, i) => {
        return (
            <div className="playerItem" key={i}>
                <p>Player 1</p>
                <p>Member</p>
                <p>Dead</p>
            </div>
        );
    });

    return (
        <div className='listViewContainer'>
            {/*<h3 id="listTitle"><img src={squadIcon} style={{ width: "40px" }} alt="Squad icon" /> Player list</h3>*/}
            <h3 id="listTitle">Squad list</h3>
            <div className='playerContainer'>
                <div className='headerContainer'>
                    {/* Name - Faction - Squad */}
                    <p className="title">Name</p>
                    <p className="title">Rank</p>
                    <p className="title">State</p>
                </div>
                <hr></hr>
                {/* Edit player - Player Name - Faction - Squadname - Remove player */}
                {squads}
            </div>
        </div>
    )

    
}

export default SquadMemberListComponent;
