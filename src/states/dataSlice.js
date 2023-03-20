import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import keycloak from "../keycloak";

//TODO: change to hosted url in deployment
const baseUrl = 'http://localhost:8080/api/v1/'
export const fetchGames = createAsyncThunk(
    'games/fetchGames',
    async () => {

      console.log(keycloak)

      const response = await fetch(
        `${baseUrl}games` , {
          headers: {
              'Authorization': `Bearer ${keycloak.token}`,
          },
      }
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
        `${baseUrl}games/${gameId + 1}`, {
          headers: {
              'Authorization': `Bearer ${keycloak.token}`,
          },
      }
      )
    
      let result = await response.json()
  
      if (result.length != 0) {
        return result;
      }
    }
  )   
    
    
  //TODO HAR IKKE LAGET REDUX SHIT FOR THIS SHIT
  export const postPlayer = createAsyncThunk(
    'players',
    async (postObj) => {
      const response = await fetch('//localhost:8080/api/v1/players' , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            biteCode: postObj.biteCode,
            patientZero: postObj.patientzero,
            human: postObj.human
        })
      }).then(response => {
        if (!response.ok) {
          throw new Error('Post player not working')
        }
      })
    }
  )

  export const postGame = createAsyncThunk(
    'games',
    async (postObj) => {
      const response = await fetch('//localhost:8080/api/v1/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: postObj.title,
          description: postObj.description,
          gameType: postObj.gameType,
          maxPlayers: postObj.maxPlayers
        })
      }).then(response => {
        if (!response.ok) {
          throw new Error('Post game not workerino')
        }
      })
    }
  )

  export const postSquad = createAsyncThunk(
    'squads',
    async (postObj) => {
      const response = await fetch('//localhost:8080/api/v1/squad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: postObj.name,
          gameRef: postObj.gameRef
        })
      }).then(response => {
        if (!response.ok) {
          throw new Error('Post squad not workering')
        }
      })
    }
  )

  export const postCheckIn = createAsyncThunk(
    'games/postCheckIn',
    async (checkInObj) => {
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
      })
      .catch(error => {
        console.log(error);
      })
    }
  )
  
  export const putGameObject = createAsyncThunk(
    'games/postGame',
    async (gameObj) => {
      console.log(`${baseUrl}games/${gameObj.id}`);
      const response = await fetch(`//localhost:8080/api/v1/games/${gameObj.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
           // 'Authorization': `Bearer ${keycloak.token}`
        },
        body: JSON.stringify({
          id: gameObj.id,
          title: gameObj.title,
          status: gameObj.status,
          description: gameObj.description,
          gameType: gameObj.gameType,
          maxPlayers: gameObj.players
        })
      }).then(response => {
        if (!response.ok) {
          throw new Error('Could not post game object to id: ' + gameObj.id);
        }
      })
      .then(updatedUser => {
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
    token: null,
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
    },
    login: (state, payload) => {
      state.token = payload.payload;
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
          state.markers.push(player);
        })

        localStorage.setItem("currGame", JSON.stringify(action.payload));
    },
    [postCheckIn.fulfilled]:(state, action) => {
      state.markers.map((marker, i) => {
        if (i == action.meta.arg.id) {
          state.markers[i] = action.meta.arg;
        }
      })
    },
    [postGame.fulfilled]:(state, action) => {
      console.log("Game has been posted :)")
      console.log(action.meta.arg)
      action.meta.arg.players = []
      let today = new Date()
      let month, date;
      if ((today.getMonth() + 1) < 10){
        month = "0".concat(today.getMonth() + 1)
      } else {
        month = today.getMonth() + 1
      }

      if ((today.getDate()) < 10){
        date = "0".concat(today.getDate())
      } else {
        date = today.getDate()
      }
      let currentDate = date + '-' + (month) + '-' + today.getFullYear();
      action.meta.arg.date = currentDate
      state.gamesArray.push(action.meta.arg)
    },
    [postSquad.fulfilled]:(state,action) => {
      console.log("Squad has been posted, not updated in redux");
      console.log(action.meta.arg)
    },
    [putGameObject.fulfilled]:(state, action) => {
      console.log("FUCK YES MOTHERFUCKER")
      console.log(action);
    }
  },
});

export const { setFirstName, setLastName, setGamesArray, setMarkers} =
dataSlice.actions;

export default dataSlice.reducer;