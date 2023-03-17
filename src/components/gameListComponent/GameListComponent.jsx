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
        dispatch(fetchGameById(i)).unwrap().then(() => navigate(`/game/${i}`))
    };


    return (
        <div className="mainGameContainer">
            <div className="innerMapContainer">
                <img src={Map} width="250" height="175" alt="Map" className="mapImgList"/>
            </div>
            <div className="innerDataContainer">
                <div className="innerTitleContainer">
                    <div className="mostInnerTitleContainer">
                        <h3 id="title">{props.game.title}</h3>
                        <p id="gameMode">{props.game.gameType}</p>
                    </div>
                    <p id="loremIpsum">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <button id="gamedtBtn" onClick={handleGameClick} href={`game/${props.game.id-1}`}>Game details</button>
                </div>
                <div className="innerStatisticsContainer">
                    <p id="status" className="statusComponent">{props.game.status}</p>
                    <div className="playerCounter">
                        <div id="dt" className="alignStats">
                            <img src={dateIcon} alt="playerIcons" width="30"></img>
                            <p className="dateText">{props.game.date}</p>
                        </div>
                        <div id="cntr" className="alignStats">
                            <img src={playerIcon} alt="playerIcons" width="30"></img>
                            <p className="playerCountText">{props.game.players.length }/{props.game.maxPlayers} players</p>
                        </div>
                    </div>
                </div>     
            </div>
 
        </div>
    )
}

export default GameList;