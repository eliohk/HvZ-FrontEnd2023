import React from 'react'
import squadIcon from "../../resources/squadIcon.svg";
import { useSelector, useDispatch } from 'react-redux';
import { fetchGameById, postSquad } from '../../states/dataSlice';
import addIcon from "../../resources/addIcon.svg";
import "../../css/playerListComponent.css";

const SquadListComponent = ( props ) => {
    const dispatch = useDispatch();
    
    const squads = props.data.map((squad, i) => {
        return (
            <div className="squadItem" key={i}>
                <p id="squadName">Squad {squad}</p>
            </div>
        );
    });

    const handleNewSquad = () => {
        const squadObj = {
            name: "New Squad",
            gameRef: props.gameid
        };
        console.log("Game ref:" + props.gameid)
        dispatch(postSquad(squadObj))
    }
    
    return (
        <div className='listViewContainer'>
            {/*<h3 id="listTitle"><img src={squadIcon} style={{ width: "40px" }} alt="Squad icon" /> Squad list</h3>*/}
            <h3 id="squadTitle">Squad list</h3>
            <div className='playerContainer'>
                <button id="crtBtn" onClick={handleNewSquad}><img src={addIcon} alt="Add button" id="addBtn"/>Create a Squad</button>
                {squads}
            </div>
        </div>
    )

    
}

export default SquadListComponent;
