import Map from "../../resources/tempMap.jpg";
import playerIcon from "../../resources/numOfPlayerIcon.svg";
import dateIcon from "../../resources/dateIcon.svg";
import "../../css/gameList.css";
import { useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../../css/modal.css";
import GameDetails from "../gameDetailsComponent/GameDetails";
import GameDetailsPage from "../../pages/gameDetailsPage/GameDetailsPage";
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchGameById } from "../../states/dataSlice";

const GameList = ( props ) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGameClick = (i) => (event) => {

        /*
        if (!props.game) {
            navigate("/game/1");
        } else {
            //dispatch(fetchGameById(i)).unwrap().then(() => navigate(`/game/${i}`))
        }
        
        // **** uncomment this line below and delete if above when in prod with db ****
        */

        dispatch(fetchGameById(i)).unwrap().then(() => navigate(`/game/${i}`))
    };
    
    // **** REMOVE THIS WHEN PUSHING TO PROD WITH FUNCTIONAL DB. ****
    return (
        <div className="mainGameContainer">
            <div className="innerMapContainer">
                <img src={Map} alt="Map" className="mapImgList"/>
            </div>
            <div className="innerDataContainer">
                <div className="innerTitleContainer">
                    <div className="mostInnerTitleContainer">
                        <h3 id="title">{props.game.title}</h3>
                        <p id="gameMode">{props.game.gameType}</p>
                    </div>
                    <p id="loremIpsum">{props.game.description}</p>
                    <button id="gamedtBtn" onClick={handleGameClick} href={`game/${props.game.id-1}`}>Game details</button>
                </div>
                <div className="innerStatisticsContainer">
                    <p id="status" className="statusComponent">{props.game.status}</p>
                    <div className="playerCounter">
                        <div id="dt">
                            <img className="image-tag-gamelist" src={dateIcon} alt="playerIcons"></img>
                            <p className="dateText">{props.game.date}</p>
                        </div>
                        <div id="cntr">
                            <img className="image-tag-gamelist" src={playerIcon} alt="playerIcons"></img>
                            <p className="playerCountText">{props.game.players.length }/{props.game.maxPlayers} players</p>
                        </div>
                    </div>
                </div>     
            </div>
 
        </div>
    )
}

export default GameList;