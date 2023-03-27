import './App.css';
import TopNavbar from "./components/navigationComponent/TopNavbar";
import keycloak from './keycloak';
import { useDispatch } from 'react-redux';
import { fetchGames, fetchUserByToken } from './states/dataSlice';

function App() {
  
  const dispatch = useDispatch();
  dispatch(fetchGames());

  if (keycloak.authenticated) {
    const userObj = {
      userToken: keycloak.idTokenParsed.sub,
      userName: keycloak.tokenParsed.preferred_username
    }
    dispatch(fetchUserByToken(userObj))
  }

  const height = window.innerHeight;
  const width = window.innerWidth;

  if (height > width) {
    console.log("Phone view!")
  } else {
    console.log("Desktop view!")
  }
  
  return (
    <div className="App">
      <TopNavbar/>
    </div>
  );
}

export default App;
