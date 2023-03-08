import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";

import AdminPage from "../pages/adminPage/AdminPage";
import GameDetailsPage from "../pages/gameDetailsPage/GameDetailsPage";
import LandingPage from "../pages/landingPage/LandingPage";


const RouterComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />}/>
                <Route path="/games" element={<GameDetailsPage />}/>
                <Route path="/admin" element={<AdminPage />}/>
            </Routes>
        </BrowserRouter>
        
    )
}

export default RouterComponent;