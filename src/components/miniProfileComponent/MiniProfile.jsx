import profilePic from "../../resources/profileIcon.svg";
import "../../css/miniProfile.css";
import keycloak from "../../keycloak";

const Profile = () => {
    return(
        <div className="alignMiniProfile">
            {keycloak.authenticated && (
                <>
                    <p className="fancyName">{keycloak.idTokenParsed.given_name} {keycloak.idTokenParsed.family_name}</p>
                    <img src={profilePic} alt="Generic profile picture" className="fancyProfilePic"></img>
                </>
            )}
            {!keycloak.authenticated && (
                <>
                    <p className="fancyNameNotLoggedIn">Login</p>
                    <img src={profilePic} alt="Generic profile picture" className="fancyProfilePic"></img>
                </>
            )}
        </div>
    )
};

export default Profile;
