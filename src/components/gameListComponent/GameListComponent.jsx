import Map from "../../resources/tempMap.jpg";
// MAPS 
// Nes = 16/59.8674/10.5263
// Noroff = 19/59.92988/10.75583
// Slottsparken = 18/59.91761/10.72530
import Noroff from "../../resources/Noroff.png";
import Nes from "../../resources/Nes.png";
import Slottsparken from "../../resources/Slottet.png";

import playerIcon from "../../resources/numOfPlayerIcon.svg";
import dateIcon from "../../resources/dateIcon.svg";
import "../../css/gameList.css";
import { useEffect, useState } from "react";
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

    const mapArray = [Noroff, Nes, Slottsparken];
    const map = mapArray.map((item, i) => {
        if (item.includes(props.game.map)) {
            return <img src={item} key={i} alt="Map" className="mapImgList"/>
        } 
    })

    /*
const mapArray = [{map: Nes, x: "16", y: "59.8674", z: "10.5263"}, {map: Noroff,x: "19", y: "59.92988", z: "10.75583"}, {map: Slottet, x: "18", y: "59.91761", z: "10.72530"}]
    
    const mapItem = mapArray.map((item, i) => {
        if (item.includes(props.game.title)) {
            return item;
        }
    })
    */

    const handleGameClick = (i) => (event) => {
        dispatch(fetchGameById(i)).unwrap().then(() => navigate(`/game/${i}`)).unwrap().then(props.move(false))
    };
    
    return (
        
        <div className="mainGameContainer">
            <div className="innerMapContainer">
                {map}
            </div>
            <div className="innerDataContainer">
                <div className="innerTitleContainer">
                    <div className="mostInnerTitleContainer">
                        <h3 id="title">{props.game.title}</h3>
                        <p id="gameMode">[{props.game.gameType}]</p>
                    </div>
                    <p id="loremIpsum">{props.game.description}</p>
                    <button id="gamedtBtn" onClick={handleGameClick} href={`game/${props.game.id-1}`}>Game details</button>
                </div>
                <div className="innerStatisticsContainer">
                    <p id="status" className="statusComponent">{props.game.status}</p>
                    <div className="playerCounter">
                        <div id="dt">
                            <img className="image-tag-gamelist" id="dtimg" src={dateIcon} alt="playerIcons"></img>
                            <p className="dateText">{props.game.date}</p>
                        </div>
                        <div id="cntr">
                            <img className="image-tag-gamelist" id="pcimg" src={playerIcon} alt="playerIcons"></img>
                            <p className="playerCountText">{props.game.players.length }/{props.game.maxPlayers} players</p>
                        </div>
                    </div>
                </div>     
            </div>
 
        </div>
    )
}

export default GameList;