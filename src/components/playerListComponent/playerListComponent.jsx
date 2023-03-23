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
import { deletePlayer } from '../../states/dataSlice';
import keycloak from '../../keycloak';


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
        props.delCallback(props.player.id);
    }

    const handleEdit = () => {
        if (editable) {
            setEditable(false);
            props.edit(false);
        } else {
            setEditable(true)
            props.edit(true);
        }
    }

    /**
     * Hook that alerts clicks outside of the passed ref
     */
    function useOutsideAlerter(ref, props, data) {
        useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                if (event.target.value == "Save") {
                    props.saveCallback({
                        pName: data.nName,
                        pFaction: data.nFaction,
                        pSquad: data.nSquad
                    });
                } else {
                    setFaction(props.player.human ? "Human" : "Zombie");
                    setSquad(props.player.squad ? "Squad " + props.player.squad.id : "N/A");
                }
                props.edit(false);
                setEditable(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
        }, [ref, data]);
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
    }, []);
    
    let allSquads = "";

    if (squads) {
        allSquads = squads.map((squad, i) => {
            if (!(squad == `Squad ${squad}`)) {
                return (
                    <Dropdown.Item as="button" onClick={handleSquad} key={i} >Squad {squad.id}</Dropdown.Item>
                )
            } 
        })
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, props, {nName:name, nFaction: faction, nSquad: squad});

    return (
        (keycloak.hasRealmRole("ADMIN") || keycloak.tokenParsed.preferred_username == name) && editable? 
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
                {squad ? 
                    <Dropdown.Item as="button" onClick={handleSquad}>N/A</Dropdown.Item>
                    :
                    null
                }
                {allSquads}
            </DropdownButton>
            <a onClick={handleDelete} id="smallBtn" className="button"><img id="smallBtnImg" src={retIcon} alt="Remove user button"/></a>
        </button>
        :
        <button className="playerItem" onClick={handleEdit}>
            <p>{name}</p>
            <p>{faction}</p>
            <p>{squad}</p>
        </button>
    );
};

const PlayerListComponent = ( props ) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state);
    const [ editable, setEditable ] = useState(false);

    const handleSave = (data) => {
        console.log("SAVED!")
        console.log(data);
    }

    const handleDelete = (data) => {    
        dispatch(deletePlayer(data));
    }

    const players = data.data.currGame.players.map((player, i) => {
        return (
            <PlayerRow player={player} squad={props.squad} key={player.id} saveCallback={handleSave} delCallback={handleDelete} edit={setEditable}/>
        )
    });

    return (
        <div className='listViewContainer'>
            <h3 id="listTitle">List of players</h3>
            {keycloak.hasRealmRole("ADMIN") && editable ?
                <button id="savePlayer" onClick={handleSave} value="Save">Save</button>
                :
                null
            }
            <div className='playerContainer'>
                <div className='headerContainer'>
                    <p className="title">Name</p>
                    <p className="title">Faction</p>
                    <p className="title">Squad</p>
                </div>
                <hr id="playerListHr" className="hrTitle"></hr>
                <div className="playersDiv">
                    {players}
                </div>
            </div>
        </div>
    )
}

export default PlayerListComponent