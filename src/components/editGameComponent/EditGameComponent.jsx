import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Popup from 'reactjs-popup';
import "../../css/editGame.css"
import { useDispatch, useSelector } from "react-redux";
import { putGameObject } from '../../states/dataSlice';

const EditGameComponent = (props) => {
    const dispatch = useDispatch();
    const [ title, setTitle ] = useState();
    const [ status, setStatus ] = useState();
    const [ description, setDescription ] = useState();
    const [ gameType, setGameType ] = useState();
    const [ players, setPlayers ] = useState();

    // temp vars for saving
    const [ tempTitle, tempSetTitle ] = useState();
    const [ tempStatus, tempSetStatus ] = useState();
    const [ tempDescription, tempSetDescription ] = useState();
    const [ tempGameType, tempSetGameType ] = useState();
    const [ tempPlayers, tempSetPlayers ] = useState();

    const handleSave = () => {
        /*
            console.log(`Title: ${tempTitle}`)
            console.log(`Status: ${tempStatus}`)
            console.log(`Description: ${tempDescription}`)
            console.log(`Gametype: ${tempGameType}`)
            console.log(`Players: ${tempPlayers}`)
        */

        dispatch(putGameObject({
            id: props.game.id,
            title: tempTitle ? `${tempTitle}` : `${title}`,
            status: tempStatus ? `${tempStatus}` : `${status}`,
            description: tempDescription ? `${tempDescription}` : `${description}`,
            gameType: tempGameType ? `${tempGameType}` : `${gameType}`,
            players: tempPlayers ? `${tempPlayers}` : `${players}`
        }))

        props.edit();
    }

    const handleStatus = (event) => {
        tempSetStatus(event.target.value);
    } 

    const handleGameType = (event) => {
        tempSetGameType(event.target.value);
    }

    const handleTitle = (event) => {
        tempSetTitle(event.target.value);
    }

    const handleDesc = (event) => {
        tempSetDescription(event.target.value);
    }

    const handlePlayers = (event) => {
        tempSetPlayers(event.target.value);
    }

    const types = ["Registration", "In progress", "Completed"];
    const statusTypes = types.map((type, i) => {
        if (type == status) {
            return (
                <div className="radioDiv" key={i}>
                    <input type="radio" value={type} id={`r${i}`} onClick={handleStatus} name="status" defaultChecked/> <label htmlFor={`r${i}`}>[{type}]</label>
                </div>
            )
        } else {
            return (
                <div className="radioDiv" key={i}>
                    <input type="radio" value={type} id={`r${i}`} onClick={handleStatus} name="status"/> <label htmlFor={`r${i}`}>{type}</label>
                </div>
            )
        }
    });

    const modes = ["King of The Hill", "Hide and seek", "Capture the flag"];
    const gameModes = modes.map((mode, i) => {
        if (mode == gameType) {
            return (
                <div className='radioDiv' key={i}>
                    <input type="radio" value={mode} id={`gm${i}`} onClick={handleGameType} name="gameType" defaultChecked/> <label htmlFor={`gm${i}`}>[{mode}]</label>
                </div>
            )
        } else {
            return (
                <div className='radioDiv' key={i}>
                    <input type="radio" value={mode} id={`gm${i}`} onClick={handleGameType} name="gameType" /> <label htmlFor={`gm${i}`} >{mode}</label>
                </div>
            )
        }
    });

    useEffect(() => {
        setTitle(props.game.title);
        setStatus(props.game.status);
        setDescription(props.game.description);
        setGameType(props.game.gameType);
        setPlayers(props.game.maxPlayers);
    }, []);

    return (
        <div className="mainPopUpContainer">
            <div className="popUpTitle">
                <h3 id="titlePopup">Edit {title}</h3>
                <hr style={{backgroundColor:"white", color:"white", marginTop:"0"}}></hr>
            </div>
            <div className="popUpInfo">
                <div className="edits">
                    <label htmlFor="titleInput">Title</label>
                    <input id="titleInput" type="text" name="title" onChange={handleTitle} defaultValue={title} placeholder='Enter new title here'/>
                </div>
                <div className="dropdownEdits">
                    <p>Status type:</p>
                    <div className="dividerRadio">
                        {statusTypes}
                    </div>
                </div>
                <div className="edits">
                    <label htmlFor="descInput">Description</label>
                    <textarea id="descInput" type="text" name="desc" onChange={handleDesc} defaultValue={description} placeholder='Enter new description here'/>
                </div>
                <div className='dropdownEdits'>
                    <p>Game type:</p>
                    <div className="dividerRadio">
                        {gameModes}
                    </div>
                </div>
                <div className="edits">
                    <p style={{margin:"0"}}>Max players</p>
                    <input type="number" id="numInput" onChange={handlePlayers} defaultValue={players}></input>
                </div>
            </div>
            <button id="editSaveBtn" onClick={handleSave}>Save</button>

            {/* <div className="borderSaveBtn">
                <button id="editSaveBtn">Save</button>
            </div> */}
        </div>
      )
}

export default EditGameComponent;