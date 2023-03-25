import React from 'react'
import squadIcon from "../../resources/squadIcon.svg";
import { fetchGameById, updatePlayer } from '../../states/dataSlice';
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
    const [ squadObj, setSquadObj ] = useState({})

    const handleDelete = (event) => {
        props.delCallback(props.player.id);
    }

    const handleEdit = () => {
        if (props.editVal) {
            props.setPlayer({
                id: props.player.id,
                username: name,
                squadRef: squad,
                squad: squadObj,
                human: faction
            });
            props.edit(false)
        } else {
            props.edit(true)
        }
    }

    useEffect(() => {
        setName(props.player.username);
        setFaction(props.player.human);
        setSquad(props.player.squad ? props.player.squad.name : "N/A");
        setSquadObj(props.player.squad);
    }, [props.player]);

    return (
        <div className="playerContainer">
            <div className="playerMainContainer">
                <div className="staticHeaderContainer">
                    <p id="headerText">Name: {name}</p>
                    <p id="headerText">Faction: {faction ? "Human":"Zombie"}</p>
                    <p id="headerText">Squad: {squad}</p>
                </div>
                {keycloak.hasRealmRole("ADMIN") ?
                    <div className="staticPlayerBtn">
                        <button className="playerBtn" onClick={handleDelete}><img src={retIcon} className="playerBtnImg" alt="Delete player button"/></button>
                        <button className="playerBtn" onClick={handleEdit}><img src={editIcon} className="playerBtnImg" alt="Edit player button"/></button>
                    </div>
                    :
                    (keycloak.authenticated && keycloak.tokenParsed.preferred_username === name ? 
                    <div className="staticDeletePlayerBtn">
                        <button className="playerBtn" onClick={handleEdit}><img src={editIcon} className="playerBtnImg" alt="Edit player button"/></button>
                    </div>
                    :
                    null)
                }
            </div>
            <hr id="playerSepHr"></hr>
        </div>
    );
};

const PlayerListComponent = ( props ) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state);
    const [ editable, setEditable ] = useState(true);
    const [ player, setPlayer ] = useState({username:"Error occured. Try again"});
    const [ squadObj, setSquadObj ] = useState();

    // states for actual datachange
    const [ name, setName ] = useState("");
    const [ squad, setSquad ] = useState("");
    const [ faction, setFaction ] = useState("");
    const [ changes, setChanges ] = useState(false);

    const handleName = (event) => {
        setName(event.target.value);

        if (event.target.value == player.username) {
            setChanges(false);
        } else {
            setChanges(true);
        }    
    }

    const handleSquad = (event) => {
        data.data.currGame.squads.map((squad, i) => {
            if (squad.name == event.target.value) {
                setSquad(squad.name);
                setSquadObj(squad);
            }
        })
    
        if (event.target.value == player.squadRef) {
            setChanges(false);
        } else {
            setChanges(true);
        }
    }

    const handleFaction = (event) => {
        setFaction(event.target.value == "Human" ? true : false);
        const val = player.human ? "Human":"Zombie";
        if (event.target.value == val) {
            setChanges(false);
        } else {
            setChanges(true);
        }
    }

    const handleSave = () => {
        handleEdit();
        player.human = faction;
        player.squad = squad;
        player.username = name;
        dispatch(updatePlayer({
            aPlayer: player,
            aSquad: squadObj
        }));
    }

    const handleDelete = (data) => {    
        dispatch(deletePlayer(data));
    }

    const handleEdit = () => {
        if (editable) {
            setEditable(false);
        } else {
            setEditable(true);
        }
    }

    const players = data.data.currGame.players.map((thisPlayer, i) => {
        console.log("Checking all players over again, Index: " + i)
        console.log(thisPlayer);
        return (
            <PlayerRow player={thisPlayer} saveCallback={handleSave} delCallback={handleDelete} edit={setEditable} editVal={editable} setPlayer={setPlayer}/>
        )
    });

    const allSquads = data.data.currGame.squads.map((squad, i) => {
        return (
            <Dropdown.Item as="button" onClick={handleSquad} value={squad.name} key={i}>{squad.name}</Dropdown.Item>
        )
    })

    useEffect(() => {
        if (player) {
            setName(player.username);
            setFaction(player.human);
            setSquad(player.squadRef);

            if (data) {
                data.data.currGame.squads.map((squad, i) => {
                    if (squad.name == player.squadRef) {
                        setSquadObj(squad);
                    }
                })
            }
        }
    }, [player]);
    
    return (
        editable?
        <div className='listViewContainer'>
            <h3 id="listTitle">List of players</h3>
            <hr id="playerListHr"></hr>
            <div className='playerContainer'>
                <div className="playersDiv">
                    {players}
                </div>
            </div>
        </div>
        :
        <div className='listViewContainer'>
            <div className="rightAlignRet">
                <a id="retBtn" onClick={handleEdit} className="button"><img id="exitIcon2" src={retIcon} alt="Return button" /></a>
            </div>
            <h3 id="listTitle">Edit player</h3>
            <hr id="playerListHr"></hr>
            {changes ?
            <div className='confirmChanges'>
                <p>Confirm changes?</p>
                <button onClick={handleSave}>Save</button>
            </div>
            : 
            <div className='confirmChangesHidden'>
                <p>Confirm changes?</p>
                <button>Save</button>
            </div>
            }
            <div className='editPlayerContainer'>
                <div className="editPlayersDiv">
                    <div className="nameHeader">
                        <p id="staticHeader">Name: </p>
                        <input type="text" defaultValue={player.username} onChange={handleName}></input>
                    </div>
                    <div className="squadHeader">
                        <p id="staticHeader">Squad: </p>
                        <DropdownButton id="dropdown-basic-button" title={squad}>
                            {allSquads}
                            <Dropdown.Item as="button" onClick={handleSquad} value="N/A">N/A</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <p id="staticHeader">Faction: </p>
                    {player.human ? 
                        <div className="mainEditPlayerFactions">
                            <div className="editPlayerFactions">
                                <input type="radio" onClick={handleFaction} value="Zombie" id="zombie" name="faction" />
                                <label htmlFor="zombie">Zombie</label>
                            </div>
                            <div className="editPlayerFactions">
                                <input type="radio" onClick={handleFaction} value="Human" id="human" name="faction" defaultChecked/>
                                <label htmlFor="human">[Human]</label>
                            </div>
                        </div>
                        :
                        <div className="mainEditPlayerFactions">
                            <div className="editPlayerFactions">
                                <input type="radio" onClick={handleFaction} value="Zombie" id="zombie" name="faction" defaultChecked/>
                                <label htmlFor="zombie">[Zombie]</label>
                            </div>
                            <div className="editPlayerFactions">
                                <input type="radio" onClick={handleFaction} value="Human" id="human" name="faction"/>
                                <label htmlFor="human">Human</label>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default PlayerListComponent