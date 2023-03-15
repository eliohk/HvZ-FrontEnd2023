import React from 'react'
import squadIcon from "../../resources/squadIcon.svg";
import { fetchGameById } from '../../states/dataSlice';
import retIcon from "../../resources/retIcon.svg";
import editIcon from "../../resources/editIcon.svg";
import { useState, useEffect, useRef } from 'react';
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
    const [ squads, setSquads ] = useState([]);

    // State(s) for edit && delete
    const [ action, setAction ] = useState(true);

    // CSS-states
    const [ editable, setEditable ] = useState(false);

    const handleDelete = (event) => {
        console.log("Test handleDelete")
    }

    const handleEdit = () => {
        if (editable) {
            setEditable(false);
        } else {
            setEditable(true)
        }
    }

    /**
     * Hook that alerts clicks outside of the passed ref
     */
    function useOutsideAlerter(ref) {
        useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                props.callback({
                    pName: name,
                    pFaction: faction,
                    pSquad: squad
                });
                setEditable(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
        }, [ref]);
    }

<<<<<<< HEAD
    const handleFaction = (event) => {
        setFaction(event.target.innerHTML);
    }

    const handleSquad = (event) => {
        setSquad(event.target.innerHTML);
    }
=======
    const PlayerType = () => (
        <p id="playerType">{props.player.human ? "Human" : "Zombie"}</p>
    )

    const SquadP = () => (
        <p>{props.player.squadMember ? props.player.squadMember : "N/A"}</p>

    )
>>>>>>> 2f84d3164965f327c21ee812dfbef29e07a25cd4

    useEffect(() => {
        setName("Player " + props.player.id);
        setFaction(props.player.human ? "Human" : "Zombie");
        setSquad(props.player.squadMember ? props.player.squadMember : "N/A");
        setSquads(props.squad);
    }, []);
    
    let allSquads = "";

    if (squads) {
        console.log(squads);
        allSquads = squads.map((squad, i) => {
            if (!(squad == `Squad ${squad}`)) {
                return (
                    <Dropdown.Item as="button" onClick={handleSquad}>Squad {squad}</Dropdown.Item>
                )
            } 
        })
    }
    

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
        editable? 
        <button className="playerItemEdit" ref={wrapperRef}>
            <p>{name}</p>
            <DropdownButton id="dropdown-item-button" title={faction} className="dropdownBtn">
                {faction == "Zombie" ? 
                <Dropdown.Item as="button" onClick={handleFaction}>Human</Dropdown.Item>
                :
                <Dropdown.Item as="button" onClick={handleFaction}>Zombie</Dropdown.Item>
                }
            </DropdownButton>
            <DropdownButton id="dropdown-item-button" title={squad} className="dropdownBtn">
                {allSquads}
            </DropdownButton>
            <a onClick={handleDelete} id="smallBtn" className="button"><img id="smallBtnImg" src={retIcon} alt="Remove user button"/></a>
        </button>
        :
        <button className="playerItem" onClick={handleEdit}>
            <p>{name}</p>
            <p>{faction}</p>
            <p>{squad}</p>
            <a onClick={handleDelete} id="smallBtn" className="button"><img id="smallBtnImg" src={retIcon} alt="Remove user button"/></a>
        </button>
    );
};

const PlayerListComponent = ( props ) => {
    const handleSave = (data) => {
        callMeBackBaby();
    }

    const callMeBackBaby = ( data ) => {
        console.log(data);
    }

    const players = props.data.map((player, i) => {
        return (
            <PlayerRow player={player} squad={props.squad} key={i} callback={callMeBackBaby}/>
        )
    });
    
    return (
        <div className='listViewContainer'>
            <h3 id="listTitle">List of players</h3>
            <button id="crtBtn" onClick={handleSave}>Save</button>
            <div className='playerContainer'>
                <div className='headerContainer'>
                    <p className="title">Name</p>
                    <p className="title">Faction</p>
                    <p className="title">Squad</p>
                </div>
                <hr></hr>
                <div className="playersDiv">
                    {players}
                </div>
            </div>
        </div>
    )
}

export default PlayerListComponent