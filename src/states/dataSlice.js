import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

//TODO: change to hosted url in deployment
const baseUrl = 'http://localhost:8080/api/v1/'
export const fetchGames = createAsyncThunk(
    'games/fetchGames',
    async () => {
      const response = await fetch(
        `${baseUrl}games`
      )
    
      let result = await response.json()
  
      if (result.length != 0) {
        return result;
      }
    }
  )

  export const fetchGameById = createAsyncThunk(
    'games/fetchGameById',
    async (gameId) => {
      const response = await fetch(
        `${baseUrl}games/${gameId + 1}`
      )
    
      let result = await response.json()
  
      if (result.length != 0) {
        return result;
      }
    }
  )

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    id: null,
    firstName: null,
    lastName: null,
    gamesArray: [],
    currGame: {}
  },
  reducers: {
    setFirstName: (state, payload) => {
      state.firstName = state;
    },
    setLastName: (state, payload) => {
      state.lastName = state;
    },
    setGamesArray: (state, payload) => {
        state.gamesArray.push(payload);
    }
  },
  extraReducers: {
    [fetchGames.fulfilled]:(state,action)=>{
        console.log("Games have been fetched!");
        state.gamesArray = action.payload;
    },
    [fetchGameById.fulfilled]:(state,action)=>{
        console.log(`Game with id: ${action.payload.id} has been fetched!`);
        state.currGame = action.payload;
        localStorage.setItem("currGame", JSON.stringify(action.payload));
    },
  },
});

export const { setFirstName, setLastName, setGamesArray} =
dataSlice.actions;

export default dataSlice.reducer;