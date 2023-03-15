import React from 'react'
import squadIcon from "../../resources/squadIcon.svg";
import { fetchGameById } from '../../states/dataSlice';
import retIcon from "../../resources/retIcon.svg";
import editIcon from "../../resources/editIcon.svg";
import { useState, useEffect } from 'react';
import saveIcon from "../../resources/saveIcon.svg";

import "../../css/playerListComponent.css";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useSelector, useDispatch } from 'react-redux';


const PlayerRow = ( props) => {
    // States for variables
    const [ name, setName ] = useState("");
    const [ faction, setFaction ] = useState("");
    const [ squad, setSquad ] = useState("");
    const [ showPlayerType , setShowPlayerType] = useState(true)
    const [ showSquadP , setShowSquadP] = useState(true)



    // State(s) for edit && delete
    const [ action, setAction ] = useState("");

    const handleDelete = (event) => {
        console.log("Test handleDelete")
    }

    const handleEdit = (event) => {
        if (action == "edit") {
            setAction("");
            setShowPlayerType(true);
            setShowSquadP(true);
        } else {
            setAction("edit")
            setShowPlayerType(false);
            setShowSquadP(false);
        }
    }

    const handleSave = (event) => {
        console.log("HandleSave works!");
        setAction("")
    }

    const PlayerType = () => (
        <p id="playerType">{props.player.human ? "Human" : "Zombie"}</p>
    )

    const SquadP = () => (
        <p>{props.player.squadMember ? props.player.squadMember : "N/A"}</p>

    )

    useEffect(() => {
        setName("Player " + props.player.id);
        setFaction(props.player.human ? "Human" : "Zombie");
        setSquad(props.player.squadMember ? props.player.squadMember : "N/A");
    }, []);

    if (action == "edit") {
        return (
            <div className="playerItem">
                {/*<a onClick={handleEdit} id="smallBtn" className="button"><img id="smallBtnImg" src={editIcon} alt="Edit user button"/></a>*/}
                <p>Player {props.player.id}</p>
                { showPlayerType ? <PlayerType /> : null }
                { showSquadP ? <SquadP /> : null }

                <DropdownButton id="dropdown-item-button" title={faction} className="dropdownBtn">
                    <Dropdown.Item as="button">Human</Dropdown.Item>
                    <Dropdown.Item as="button">Zombie</Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="dropdown-item-button" title={squad} className="dropdownBtn">
                    <Dropdown.Item as="button">Action</Dropdown.Item>
                    <Dropdown.Item as="button">Another action</Dropdown.Item>
                    <Dropdown.Item as="button">Something else</Dropdown.Item>
                </DropdownButton>
                {/*}
                <p>Player {props.player.id}</p>
                <p>{props.player.human ? "Human" : "Zombie"}</p>
                <p>{props.player.squadMember ? props.player.squadMember : "N/A"}</p>
                */}
                <a onClick={handleDelete} id="smallBtn" className="button"><img id="smallBtnImg" src={retIcon} alt="Remove user button"/></a>
            </div>
        )
    } else {
        return (
            <div className="playerItem" onClick={handleEdit}>
                {/*<a onClick={handleEdit} id="smallBtn" className="button"><img id="smallBtnImg" src={editIcon} alt="Edit user button"/></a>*/}
                <p>Player {props.player.id}</p>
                <p>{props.player.human ? "Human" : "Zombie"}</p>
                <p>{props.player.squadMember ? props.player.squadMember : "N/A"}</p>
                <a onClick={handleDelete} id="smallBtn" className="button"><img id="smallBtnImg" src={retIcon} alt="Remove user button"/></a>
            </div>
        )
    }
    
};

const PlayerListComponent = ( props ) => {
    const players = props.data.map((player, i) => {
        return (
            <PlayerRow player={player} key={i}/>
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