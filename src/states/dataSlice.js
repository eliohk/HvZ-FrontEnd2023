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

  export const postCheckIn = createAsyncThunk(
    'games/postCheckIn',
    async (checkInObj) => {
      console.log("Within REDUX:")
      console.log(checkInObj.lat);
      const response = await fetch(`//localhost:8080/api/v1/players/${checkInObj.id}/checkIn`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            lastCheckInTime: checkInObj.lastCheckInTime,
            lat: checkInObj.lat,
            lng: checkInObj.lng
        })
      }).then(response => {
        if (!response.ok) {
          throw new Error('Could not do stuff')
        }
      })
      .then(updatedUser => {
        console.log("Sup?")
      })
      .catch(error => {
        console.log(error);
      })
    }
  )

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    id: null,
    firstName: null,
    lastName: null,
    gamesArray: [],
    markers: [],
    currGame: {},
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
    },
    setMarkers: (state, payload) => {
      state.markers = (payload.payload)
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

        action.payload.players.map((player, i) => {
          console.log("Pushing player to marker Array in Redux");
          console.log(player)
          state.markers.push(player);
        })

        localStorage.setItem("currGame", JSON.stringify(action.payload));
    },
    [postCheckIn.fulfilled]:(state, action) => {
      console.log(`Check-in posted! :D`)

      state.markers.map((marker, i) => {
        if (i == action.meta.arg.id) {
          console.log("postCheckin");
          console.log(action.meta.arg)
          state.markers[i] = action.meta.arg;
        }
      })
    }
  },
});

export const { setFirstName, setLastName, setGamesArray, setMarkers} =
dataSlice.actions;

export default dataSlice.reducer;