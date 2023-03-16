import profilePic from "../../resources/profileIcon.svg";
import "../../css/miniProfile.css";

const Profile = () => {
    return(
        <div className="alignMiniProfile">
            <p className="fancyName">Khoi</p>
            <img src={profilePic} alt="Generic profile picture" className="fancyProfilePic"></img>
        </div>
    )
};

export default Profile;
