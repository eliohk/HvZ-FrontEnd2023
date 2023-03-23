import squadIcon from "../../resources/squadIcon.svg";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { fetchGameById, postSquad } from '../../states/dataSlice';
import addIcon from "../../resources/addIcon.svg";
import "../../css/playerListComponent.css";
import retIcon from "../../resources/retIcon.svg";
const SquadRegisterComponent = ( props ) => {

    const rd = useSelector((state) => state);
    const [ chosenPlayers, setChosenPlayers ] = useState([]);

    const handleChoosePlayer = (event) => {
        if (chosenPlayers.includes(event.target.innerHTML)) {
            let tempArr = [];
            chosenPlayers.map((player, i) => {
                if (player != event.target.innerHTML) {
                    tempArr.push(player)
                }
            });
            console.log("Removing: " + event.target.innerHTML)
            console.log(tempArr);
            setChosenPlayers(tempArr);

        } else {
            console.log("Adding: " + event.target.innerHTML)
            setChosenPlayers([...chosenPlayers, event.target.innerHTML])
        }
    }

    const players = rd.data.currGame.players.map((player, i) => {
        if (chosenPlayers.includes("Player " + player.id)) {
            return <p key={player.id} onClick={handleChoosePlayer} id="playerTagged">Player {player.id}</p>
        } else {
            return <p key={player.id} onClick={handleChoosePlayer} id="playerTag">Player {player.id}</p>
        }
    });

    const handleRet = () => {
        props.state("list")
    }

    return (
        <div>
            <div className="alignSquadHeader">
                <h3 id="sqTitle"> Create a new squad</h3>
                <button id="sqRegSave" type="button">Save</button>
                <div className="rightAlignRet">
                    <a onClick={handleRet} id="retBtn" className="button"><img id="exitIcon2" src={retIcon} alt="Return button" /></a>
                </div>
            </div>
            <input id="sqNameInput" type="text" placeholder="Enter name here .." name="name"/>
            <p id="randomText">Select members to add to your team</p>
            <div className="alignSquadPlayers">
            <h4>List of players</h4>
                {players}
            </div>
        </div>
    )
}

const SquadDetailsComponent = ( props ) => {
    console.log(props.squad);
    const squads = props.squad.players.map((player, i) => {
        return (
            <div className="playerItem" key={i}>
                <p>Player {player.id}</p>
                <p>Pussy</p>
                <p>{player.human ? "Alive" : "Dead"}</p>
            </div>
        );
    });

    const handleRet = () => {
        props.state("list")
    }

    return (
        <div className='listViewContainer'>
            {/*<h3 id="listTitle"><img src={squadIcon} style={{ width: "40px" }} alt="Squad icon" /> Player list</h3>*/}
            <div className="alignSquadTitle">
                <h3 id="squadTitle">{props.squad.name}</h3>
                <div className="rightAlignRet">
                    <a onClick={handleRet} id="retBtn" className="button"><img id="exitIcon2" src={retIcon} alt="Return button" /></a>
                </div>
            </div>
            <div className='playerContainer'>
                <button id="addToSquad"><img id="plusImg" src={addIcon} alt="Add member to squad button"/>Add player</button>
                <div className='headerContainer'>
                    {/* Name - Faction - Squad */}
                    <p className="title">Name</p>
                    <p className="title">Rank</p>
                    <p className="title">State</p>
                </div>
                <hr className="hrTest"></hr>
                {/* Edit player - Player Name - Faction - Squadname - Remove player */}
                {squads}
            </div>
        </div>
    )

    
}

const SquadListComponent = ( props ) => {
    const dispatch = useDispatch();
    // list, register, 
    const [ squadState, setSquadState ] = useState("list");
    const [ currSquad, setCurrSquad ] = useState({});

    const handleNewSquad = () => {
        setSquadState("register")
        const squadObj = {
            name: "New Squad",
            gameRef: props.gameid
        };
        console.log("Game ref:" + props.gameid)
        dispatch(postSquad(squadObj))
    }

    const handleSquadDetails = (event) => {
        console.log(event.target.innerHTML);
        props.data.map((squad, i) => {
            if ("Squad " + squad.id === event.target.innerHTML) {
                setCurrSquad(squad);
            }
        });
        setSquadState("add");
    }

    const squads = props.data.map((squad, i) => {
        return (
            <div className="squadItem" key={i}>
                <p id="squadName" onClick={handleSquadDetails}>Squad {squad.id}</p>
            </div>
        );
    });

    return (
        <div>
            {(squadState === "list") ?
                <div className='listViewContainer'>
                    {/*<h3 id="listTitle"><img src={squadIcon} style={{ width: "40px" }} alt="Squad icon" /> Squad list</h3>*/}
                    <div className="alignSquadTitle">
                        <h3 id="squadTitle">Squad list</h3>
                        <div className="rightAlignRet">
                            <a href="/" id="retBtn" className="button"><img id="exitIcon2" src={retIcon} alt="Return button" /></a>
                        </div>
                    </div>
                    <div className='playerContainer'>
                        <button id="crtBtn" onClick={handleNewSquad}><img src={addIcon} alt="Add button" id="addBtn"/>Create a Squad</button>
                        {squads}
                    </div>
                </div>
                :
                (squadState === "register") ?
                <div className='listViewContainer'>
                    <SquadRegisterComponent state={setSquadState}></SquadRegisterComponent>
                </div>
                :
                (squadState === "add") ?
                <div className='listViewContainer'>
                    <SquadDetailsComponent squad={currSquad} state={setSquadState}></SquadDetailsComponent>
                </div>
                :
                null
            }
        </div>
    )

    
}

export default SquadListComponent;
