import './App.css';
import TopNavbar from "./components/navigationComponent/TopNavbar";

import { useDispatch } from 'react-redux';
import { fetchGames } from './states/dataSlice';
import keycloak from './keycloak';
import { fetchUserByToken } from './states/dataSlice';

function App() {
  
  const dispatch = useDispatch();
  dispatch(fetchGames());

  const userObj = {
    userToken: keycloak.idTokenParsed.sub,
    userName: keycloak.tokenParsed.preferred_username
  }
  dispatch(fetchUserByToken(userObj))

  return (
    <div className="App">
      <TopNavbar/>
    </div>
  );
}

export default App;
