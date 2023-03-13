import React from 'react'
import squadIcon from "../../resources/squadIcon.svg";


const GameListPlayerComponent = () => {
    return (
        <div>
            <h3 id="listTitle"><img src={squadIcon} style={{ width: "40px" }} alt="Squad icon" /> Player list</h3>
            <ul>
                <li>Adam</li>
                <li>David</li>
                <li>Fatima</li>
                <li>Khoi</li>
                <li>Mostafa</li>
                <li>Player</li>
                <li>Player</li>
                <li>Player</li>
                <li>Player</li>
                <li>Player</li>
                <li>Player</li>
                <li>Player</li>
            </ul>
        </div>
    )
}

export default GameListPlayerComponent