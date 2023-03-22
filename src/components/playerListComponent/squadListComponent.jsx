import React from 'react'
import squadIcon from "../../resources/squadIcon.svg";
import { useSelector, useDispatch } from 'react-redux';
import { fetchGameById } from '../../states/dataSlice';
import addButtonW from "../../resources/addButtonW.svg";
import "../../css/playerListComponent.css";

const SquadListComponent = ( props ) => {
    console.log("HEIII")
    
    const squads = props.data.map((squad, i) => {
        console.log("HEIIII 2")
        return (
            <div className="squadItem" key={i}>
                <p id="squadName">Squad {squad.id}</p>
            </div>
        );
    });
    
    return (
        <div className='listViewContainer'>
            {/*<h3 id="listTitle"><img src={squadIcon} style={{ width: "40px" }} alt="Squad icon" /> Squad list</h3>*/}
            <h3 id="squadTitle">Squad list</h3>
            <div className='playerContainer'>
                <button id="crtBtn1"><img src={addButtonW} alt="Add button" id="addBtn"/>Create a Squad</button>
                {console.log("KUK")}
                {squads}
            </div>
        </div>
    )

    
}

export default SquadListComponent;
