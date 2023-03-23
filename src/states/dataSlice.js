import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import keycloak from "../keycloak";
import Pusher from "pusher-js";
import { useDispatch } from "react-redux";

//TODO: change to hosted url in deployment
const baseUrl = 'http://localhost:8080/api/v1/'
export const fetchGames = createAsyncThunk(
    'games/fetchGames',
    async () => {

     // console.log(keycloak)

      const response = await fetch(
        `${baseUrl}games` , {
          headers: {
              //'Authorization': `Bearer ${keycloak.token}`,
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
        `${baseUrl}games/${gameId}`, {
          headers: {
              //'Authorization': `Bearer ${keycloak.token}`,
          },
      }
      )
    
      let result = await response.json()
  
      if (result.length != 0) {
        return result;
      }
    }
  )   

  export const fetchUserByToken = createAsyncThunk(
    "ok",
    async (userObj) => {
      const response = await fetch(
        `${baseUrl}user/token/${userObj.userToken}`, {
          headers : {
          },
        }
      )
      console.log(response.status)
      if (response.status === 400){
        console.log("hei på deg")

        const response2 = await fetch (
          `${baseUrl}user` , {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: userObj.userName,
              idToken: userObj.userToken
            })
          }
        )
        if (response2.ok){
          console.log("helo")
        }
        console.log(response2)
        console.log("hei på deg 2")
      }
    }
  )

  export const postUser = createAsyncThunk(
    "sup",
    async (postObj) => {
      const response = await fetch (
        `${baseUrl}users` , {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: postObj.username,
            idToken: postObj.idToken
          })
        }.then(response => {
          if (!response.ok) {
            throw new Error('Post user not working :DDDD XXXXDDDDDDDd')
          }
        })
      )
    }
  )
    
  //TODO HAR IKKE LAGET REDUX SHIT FOR THIS SHIT
  export const postPlayer = createAsyncThunk(
    'players/postPlayer',
    async (postObj) => {
      const response = await fetch('//localhost:8080/api/v1/players' , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userTokenRef: postObj.userTokenRef,
            gameRef: postObj.gameRef,
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

  export const postKill = createAsyncThunk(
    'kill/postKill',
    async (postObj) => {
      const response = await fetch('//localhost:8080/api/v1/kills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          time_of_death: postObj.timeOfDeath,
          story: postObj.story,
          lat: postObj.lat,
          lng: postObj.lng,
          playerRef: postObj.playerRef,
          gameRef: postObj.gameRef
        })
      }).then(response => {
        if (!response.ok) {
          throw new Error("Post kill not working XDDD")
        }
      })
    }
  )

  export const postGame = createAsyncThunk(
    'games/postGame',
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
    'sqaud/postSquad',
    async (postObj) => {
      console.log(postObj);
      const response = await fetch('//localhost:8080/api/v1/squads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: postObj.name,
          gameRef: postObj.gameRef,
          playerIds: postObj.playerIds
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
      .then(updatedGame => {
      })
      .catch(error => {
        console.log(error);
      })
    }
  )

  export const putGlobalChat = createAsyncThunk(
    'games/postGlobalChat',
    async (chatObj) => {
      const response = await fetch(`${baseUrl}chat/${chatObj.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
           // 'Authorization': `Bearer ${keycloak.token}`
        },
        body: JSON.stringify({
          id: chatObj.id,
          chats: [chatObj.chat]
        })
      }).then(response => {
        if (!response.ok) {
          throw new Error('Could not post chat object to id: ' + chatObj.id);
        }
      })
      .then(updatedGame => {
      })
      .catch(error => {
        console.log(error);
      })
    }
  )
  
  
  //TODO: Add authorization token cuz only admin can do this
  export const deletePlayer = createAsyncThunk(
    'player/delete',
    async (id) => {
      const response = await fetch(`${baseUrl}players/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        if (!response.ok) {
          throw new Error('DELETE player not working')
        }
      })
    }
  )

  export const putPlayerInSquad = createAsyncThunk(
    'squad/putPlayer',
    async (playerObj) => {
      console.log("Putting the following object: " )
      console.log(playerObj);
      const response = await fetch(`${baseUrl}players/${playerObj.aPlayer.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: playerObj.aPlayer.id,
            squadRef: playerObj.aSquad.id,
            human: playerObj.aPlayer.human
        })
      }).then(response => {
        if (!response.ok) {
          throw new Error('Could not post player to squad')
        }
      })
      .then(updatedUser => {
      })
      .catch(error => {
        console.log(error);
      })
    }
  )

  export const deletePlayerFromSquad = createAsyncThunk(
    'squad/delPlayer',
    async (playerObj) => {
      console.log("Deleting the following object from squad: " )
      console.log(playerObj);
      const response = await fetch(`${baseUrl}players/${playerObj.aPlayer.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: playerObj.aPlayer.id,
            squadRef: 0,
            human: playerObj.aPlayer.human
        })
      }).then(response => {
        if (!response.ok) {
          throw new Error('Could not delete player from squad')
        }
      })
      .then(updatedUser => {
      })
      .catch(error => {
        console.log(error);
      })
    }
  )

  export const fetchPlayerByToken = createAsyncThunk(
    'player/fetchByToken',
    async () => {

     // console.log(keycloak)

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
    },
    setChat: (state, payload) => {
      console.log("PUSHING CHAT: " + payload.payload)
      state.currGame.chat.chats.push(payload.payload);
    },
    setChats: (state, payload) => {
      console.log("ASSIGNING")
      console.log(payload.payload);
      state.currGame.chat.chats = payload.payload
    }
  },
  extraReducers: {
    [fetchGames.fulfilled]:(state,action)=>{
        state.gamesArray = action.payload;
    },
    [fetchGameById.fulfilled]:(state,action)=>{
        console.log(`Game with id: ${action.payload.id} has been fetched!`);
        state.currGame = action.payload;

        action.payload.players.map((player, i) => {
          state.markers.push(player);
        })

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
      /*console.log(action.meta.arg)
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
      state.gamesArray.push(action.meta.arg)*/
    },
    [postSquad.fulfilled]:(state,action) => {
      console.log("Squad has been posted, not updated in redux");

      const squad = {
        gameRef: action.meta.arg.gameRef,
        name: action.meta.arg.name,
        players: action.meta.arg.players
      };

      state.currGame.squads.push(squad);
    },
    [putGameObject.fulfilled]:(state, action) => {
      console.log("FUCK YES MOTHERFUCKER")
      console.log(action);
    },
    [postPlayer.fulfilled]:(state, action) => {
      console.log("Player has been posted, not updated in redux yet XDD")
      console.log(action);
      state.currGame.players.push(action.meta.arg)
    },
    [postKill.fulfilled]:(state, action) => {
      console.log("Kill has been posted, not updated in redux yet LOLOLOL")
      console.log(action);
    }, 
    [putGlobalChat.fulfilled]:(state, action) => {
      console.log("@@@@@@SUCK DICK MAN@@@@@@@@")
      state.currGame.chat.chats.push(action.meta.arg.chat)
    },
    [deletePlayer.fulfilled]:(state, action) => {
      console.log("PLAYER HAS BEEN DELETED MATEYYYY ARGGGGG")
      console.log(action);

      let tempArr = [];

      state.currGame.players.map((player) => {
          console.log("Supposed to remove: " + action.meta.arg)
          console.log("Going through: " + player.id);
          if (player.id != action.meta.arg) {
            console.log("Adding: " + player.id)
            tempArr.push(player);
          }
      });
      console.log(tempArr)
      state.currGame.players = tempArr;

    },
    [putPlayerInSquad.fulfilled]:(state, action) => {
      console.log("PLAYER PUT IN SQUAD SUCCESSFULL MATEY!!!! :D ")  
      state.currGame.squads.map((squad, i) => {
        if (squad.id == action.meta.arg.aSquad.id) {
            squad.players.push(action.meta.arg.aPlayer);
        }
      })

      state.currGame.players.map((player, i) => {
        if (player.id == action.meta.arg.aPlayer.id) {
          player.squad = action.meta.arg.aSquad;
        }
      })
    },
    [deletePlayerFromSquad.fulfilled]:(state, action) => {
      console.log("Player deleted from squad cowboy!")
      state.currGame.squads.map((squad, i) => {
        if (squad.id == action.meta.arg.aSquad.id) {
            squad.players.filter((player, i) => {
                if (player.id != action.meta.arg.aPlayer.id) {
                  return player;
                }
            });
        }
      })

      state.currGame.players.map((player, i) => {
        if (player.id == action.meta.arg.aPlayer.id) {
          player.squad = null
        }
      })    
    }
  },
});

export const { setFirstName, setLastName, setGamesArray, setMarkers, setChat, setChats} =
dataSlice.actions;

export default dataSlice.reducer;