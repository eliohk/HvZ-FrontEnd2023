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


const PlayerRow = ( props ) => {
    // States for variables
    const [ name, setName ] = useState("");
    const [ faction, setFaction ] = useState("");
    const [ squad, setSquad ] = useState("");
    const [ squads, setSquads ] = useState([]);

    // Old states for variables to keep track of new && old
    const [ oldFaction, setOldFaction ] = useState("");
    const [ oldSquad, setOldSquad ] = useState("");

    // CSS-states
    const [ editable, setEditable ] = useState(false);

    const handleDelete = (event) => {
        setEditable(false);
        console.log("THIS IS FROM THE ROW")
        console.log(props.player)
        props.delCallback(props.player.id);
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
    function useOutsideAlerter(ref, props) {

        useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {

                if (event.target.value == "Save") {
                    console.log("YOOO THIS SHOULD SAVE MAAYN")
                    props.saveCallback({
                        pName: "Player " + props.player.id,
                        pFaction: props.human ? "Human" : "Zombie",
                        pSquad: "Squad " + props.player.squad.id,
                    });
                } else {
                    console.log("THIS SHOULD POP OFF")
                    setFaction(props.player.human ? "Human" : "Zombie");
                    setSquad(props.player.squad ? "Squad " + props.player.squad.id : "N/A");
                }
                
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

    const handleFaction = (event) => {
        setFaction(event.target.innerHTML);
    }

    const handleSquad = (event) => {
        setSquad(event.target.innerHTML);
    }

    useEffect(() => {
        setName("Player " + props.player.id);
        setFaction(props.player.human ? "Human" : "Zombie");
        setSquad(props.player.squad ? "Squad " + props.player.squad.id : "N/A");
        setSquads(props.squad);
    }, [props]);
    
    let allSquads = "";

    if (squads) {
        allSquads = squads.map((squad, i) => {
            if (!(squad == `Squad ${squad}`)) {
                return (
                    <Dropdown.Item as="button" onClick={handleSquad} key={i} >Squad {squad}</Dropdown.Item>
                )
            } 
        })
    }
    

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, props);

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

    const [ playersInGame, setPlayersInGame ] = useState(props.data);

    const handleSave = (data) => {
        console.log(data);
    }

    const handleDelete = (data) => {
        let tempArr = [];

        playersInGame.map((player) => {
            if (player.id != data) {
                tempArr.push(player);
            }
        });

        setPlayersInGame(tempArr);
    }

    const players = playersInGame.map((player, i) => {
        return (
            <PlayerRow player={player} squad={props.squad} key={i} saveCallback={handleSave} delCallback={handleDelete}/>
        )
    });

    return (
        <div className='listViewContainer'>
            <h3 id="listTitle">List of players</h3>
            <button id="crtBtn" onClick={handleSave} value="Save">Save</button>
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