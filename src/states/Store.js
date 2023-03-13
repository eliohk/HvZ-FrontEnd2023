import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users/UserSlice';
import gamesReducer from "./games/GamesSlice"

export default configureStore({
	reducer: {
		user: userReducer,
		games: gamesReducer,
	},
});