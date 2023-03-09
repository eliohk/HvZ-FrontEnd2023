import 'reactjs-popup/dist/index.css';
import "../../css/modal.css";

const GameDetails = ( props ) => {
    return (
        <div className='mainContainer'>
            <div className="header">
                <h5 id="removeMargin">Administrator</h5>
                <button>X</button>
            </div>
            <div className="liftToHeader">
                <h2 id="removeMargin">Kids @ Noroff</h2>
                <h4 id="removeMargin">"Hide & Seek"</h4>
            </div>
            
            <p id="removeMargin" className="desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            <div className="secondaryContainer">
                <div>
                    {/* map + squad list here */}
                </div>
                <div>
                    {/* chat + buttons here */}
                </div>
                <div>
                    {/* chat toggle + chat input here */}
                </div>
            </div>
        </div>
    )
}

export default GameDetails;