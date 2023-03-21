import './App.css';
import TopNavbar from "./components/navigationComponent/TopNavbar";

import { useDispatch } from 'react-redux';
import { fetchGames } from './states/dataSlice';

function App() {
  
  const dispatch = useDispatch();
  dispatch(fetchGames());

  return (
    <div className="App">
      <TopNavbar/>
    </div>
  );
}

export default App;
