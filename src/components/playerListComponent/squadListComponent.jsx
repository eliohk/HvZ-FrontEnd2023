import squadIcon from "../../resources/squadIcon.svg";
import { useSelector, useDispatch } from 'react-redux';
import addButtonW from "../../resources/addButtonW.svg";
import { useEffect, useState } from 'react';
import addIcon from "../../resources/addIcon.svg";
import "../../css/playerListComponent.css";
import retIcon from "../../resources/retIcon.svg";
import { updatePlayer, deletePlayerFromSquad, fetchGameById, postSquad } from "../../states/dataSlice";
import keycloak from "../../keycloak";


// All players list
const AllPlayersComponent = ( props ) => {
    const [ chosenPlayers, setChosenPlayers ] = useState([]);
    const data = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleChosenPlayers = (event) => {
        if (chosenPlayers.includes(event.target.innerHTML)) {
            let tempArr = [];
            chosenPlayers.map((player, i) => {
                if (player != event.target.innerHTML) {
                    tempArr.push(player)
                }
            });
            setChosenPlayers(tempArr);

        } else {
            setChosenPlayers([...chosenPlayers, event.target.innerHTML])
        }
    }

    const players = data.data.currGame.players.map((player, i) => {
        if (!player.squad && chosenPlayers.includes("Player " + player.id)) {
            return <p key={i} id="playerTagged" onClick={handleChosenPlayers}>Player {player.id}</p>
        } else if (!player.squad) {
            return <p key={i} id="playerTag" onClick={handleChosenPlayers}>Player {player.id}</p>
        }
    })

    const handleRet = () => {
        props.callback(true);
    }

    const handleSave = (event) => {
        data.data.currGame.players.map((player, i) => {  
            console.log("sjekker om det virker her")
            if (chosenPlayers.includes("Player " + player.id)) {
                dispatch(updatePlayer({
                    aPlayer: player,
                    aSquad: props.squad,
                }));
            }
        })

        handleRet();
    }

    return (
        <div className="tempMainList">
            <div className='listViewContainer'>
                <div className="rightAlignRet">
                    <a onClick={handleRet} id="retBtn" className="button"><img id="exitIcon2" src={retIcon} alt="Return button" /></a>
                </div>
                <div className="alignSquadTitle">
                    <div className="alignTitleAndSave">
                        <h3 id="savePlayerSquadTitle">Player list</h3>
                        {chosenPlayers.length > 0 ?
                        <button id="savePlayerSquad" type="button" onClick={handleSave}>Save</button>
                        :
                        <button id="savePlayerSquadHidden" type="button" onClick={handleSave}>Save</button>
                        }
                    </div>
                    
                    <hr className="hrTitle"></hr>
                </div>
                <div className='playerContainer'>
                    {players}
                </div>
            </div>
        </div>
    )
}

// ADD NEW SQUADS HERE
const SquadRegisterComponent = ( props ) => {
    const rd = useSelector((state) => state);
    const [ chosenPlayers, setChosenPlayers ] = useState([]);
    const [ squadName, setSquadName ] = useState("");
    const dispatch = useDispatch();

    const handleSave = () => {

        let tempArr = [];
        let playerArr = [];

        rd.data.currGame.players.map((player, i) => {
            if (chosenPlayers.includes("Player " + player.id)) {
                tempArr.push(player.id);
                playerArr.push(player);
            }
        });

        const squadObj = {
            name: squadName,
            gameRef: props.gameId,
            playerIds: tempArr,
            players: playerArr
        };

        dispatch(postSquad(squadObj))
        props.state("list");
    }

    const handleSquadName = (event) => {
        setSquadName(event.target.value);
    }

    const handleChoosePlayer = (event) => {
        if (chosenPlayers.includes(event.target.innerHTML)) {
            let tempArr = [];
            chosenPlayers.map((player, i) => {
                if (player != event.target.innerHTML) {
                    tempArr.push(player)
                }
            });
            setChosenPlayers(tempArr);

        } else {
            setChosenPlayers([...chosenPlayers, event.target.innerHTML])
        }
    }

    const players = rd.data.currGame.players.map((player, i) => {
        if (!player.squad && chosenPlayers.includes("Player " + player.id)) {
            return <p key={player.id} onClick={handleChoosePlayer} id="playerTagged">Player {player.id}</p>
        } else if (!player.squad) {
            return <p key={player.id} onClick={handleChoosePlayer} id="playerTag">Player {player.id}</p>
        }
    });

    const handleRet = () => {
        props.state("list")
    }

    return (
        <div className="tempMainList">
            <div className="rightAlignRet">
                <a onClick={handleRet} id="retBtn" className="button"><img id="exitIcon2" src={retIcon} alt="Return button" /></a>
            </div>
            <div className="alignSquadHeader">
                <h3 id="sqTitleReg"> Create a new squad</h3>
                <button id="sqRegSave" type="button" onClick={handleSave}>Save</button>
            </div>
            <input id="sqNameInput" type="text" onChange={handleSquadName} placeholder="Enter squad name here .." name="name"/>
            <p id="randomText">Select members to add to your team</p>
            <div className="alignSquadPlayers">
            <h4>List of players</h4>
                {players}
            </div>
        </div>
    )
}

// DETAILED VIEW OF SQUAD W/ ALL PLAYERS
const SquadDetailsComponent = ( props ) => {
    const [ addState, setAddState ] = useState(true);
    const data = useSelector((state) => state);
    const game = data.data.currGame;
    const dispatch = useDispatch();

    const handleDelete = (player, squad) => {
        dispatch(deletePlayerFromSquad({
            aPlayer: player,
            aSquad: squad
        }))
    }

    let squads = [];

    const squad = game.squads.find(squad => squad.id == props.squad.id);
    if (squad.players) {
        squads = squad.players.map((player, i) => {
            return (
                <div className="playerItem" key={i}>
                    <p>Player {player.id}</p>
                    <p>Pussy</p>
                    <p>{player.human ? "Alive" : "Dead"}</p>
                    {keycloak.hasRealmRole("ADMIN") ?
                        <button className="delSquadBtn" onClick={() => handleDelete(player, squad)}><img key={player.id} id="smallBtnImg" src={retIcon} alt="Remove user button"/></button>
                        :
                        null
                    }
                </div>
            );
        });
    } else {
        squads = <p>No players in squad.</p>
    }
    
    
    const handleRet = () => {
        props.state("list")
    }

    const handleAdd = (event) => {
        if (addState) {
            setAddState(false)
        } else {
            setAddState(true)
        }
    }

    return (
        addState?
        <div className='listViewContainer'>
            {/*<h3 id="listTitle"><img src={squadIcon} style={{ width: "40px" }} alt="Squad icon" /> Player list</h3>*/}
            <div className="rightAlignRet">
                <a onClick={handleRet} id="retBtn" className="button"><img id="exitIcon2" src={retIcon} alt="Return button" /></a>
            </div>
            <div className="alignSquadTitle">
                <h3 id="squadTitleStupidRetBtn">{squad.name}</h3>
            </div>
            <div className='playerContainer'>
                {keycloak.authenticated ?
                    <button id="crtBtn" onClick={handleAdd}><img id="plusImg" src={addIcon} alt="Add member to squad button"/>Add player</button>
                    :
                    <button id="crtBtn" onClick={() => keycloak.login()}><img id="plusImg" src={addIcon} alt="Add member to squad button"/>Login to add player</button>
                }
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
        :
        <AllPlayersComponent players={props.players} squad={props.squad} callback={setAddState}></AllPlayersComponent>
    )

    
}

// START/DEFAULT SQUAD VIEW
const SquadListComponent = ( props ) => {
    // list, register, 
    const [ squadState, setSquadState ] = useState("list");
    const [ currSquad, setCurrSquad ] = useState({});
    const data = useSelector((state) => state);
    const game = data.data.currGame;

    const handleNewSquad = () => {
        setSquadState("register")
    }

    const handleSquadDetails = (event) => {
        game.squads.map((squad, i) => {
            if (squad.name === event.target.innerHTML) {
                setCurrSquad(squad);
            }
        });
        setSquadState("add");
    }

    const squads = game.squads.map((squad, i) => {
        return (
            <div className="squadItem" key={i}>
                <p id="squadName" onClick={handleSquadDetails}>{squad.name}</p>
            </div>
        );
    });

    return (
        <div className="mainListCon">
            {(squadState === "list") ?
                <div className='listViewContainer'>
                    {/*<h3 id="listTitle"><img src={squadIcon} style={{ width: "40px" }} alt="Squad icon" /> Squad list</h3>*/}
                    <div className="alignSquadTitle">
                        <h3 id="squadTitle">Squad list</h3>
                        <hr className="hrTitle"></hr>
                    </div>
                    <div className='playerContainer'>
                        {keycloak.authenticated ?
                            <button id="crtBtn" onClick={handleNewSquad}><img src={addButtonW} alt="Add button" id="addBtn"/>Create a Squad</button>
                            :
                            <button id="crtBtn" onClick={() => keycloak.login()}><img src={addIcon} alt="Add button" id="addBtn"/>Login to create squad</button>
                        }
                        {squads}
                    </div>
                </div>
                :
                (squadState === "register") ?
                <div className='listViewContainer'>
                    <SquadRegisterComponent state={setSquadState} gameId={game.id}></SquadRegisterComponent>
                </div>
                :
                (squadState === "add") ?
                <div className='listViewContainer'>
                    <SquadDetailsComponent gameId={game.id} squad={currSquad} state={setSquadState} players={game.players}></SquadDetailsComponent>
                </div>
                :
                null
            }
        </div>
    )

    
}

export default SquadListComponent;
