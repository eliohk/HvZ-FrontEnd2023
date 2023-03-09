import Map from "../../resources/tempMap.jpg";
import playerIcon from "../../resources/userIcon.svg";
import "../../css/gameList.css";

const GameDetailsPage = (props) => {
    console.log(props.game);
    return (
        <div className="mainGameContainer">
            <div className="innerMapContainer">
                <img src={Map} width="250" height="175" alt="Map" className="mapImgList"/>
            </div>
            <div className="innerTitleContainer">
                <div className="mostInnerTitleContainer">
                    <h2 id="title">{props.game.title}</h2>
                    <p id="gameMode">{props.game.gameMode}</p>
                </div>
                <p id="status" className="statusComponent">{props.game.status}</p>
            </div>
            <div className="innerStatisticsContainer">
                <p className="playerCountText">{props.game.date}</p>
                <div className="playerCounter">
                    <img src={playerIcon} alt="playerIcons" width="30"></img>
                    <p className="playerCountText">{props.game.players}/{props.game.maxPlayers} players</p>
                </div>
            </div>                
        </div>
    )
}

export default GameDetailsPage;