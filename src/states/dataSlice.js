import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import keycloak from "../keycloak";
import Pusher from "pusher-js";
import { useDispatch } from "react-redux";

//TODO: change to hosted url in deployment
const azureUrl = process.env.REACT_APP_AZURE_APP_API
const baseUrl = 'http://localhost:8080/api/v1'
export const fetchGames = createAsyncThunk(
    'games/fetchGames',
    async () => {
      const response = await fetch(
        `${azureUrl}/games` , {
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
        `${azureUrl}/games/${gameId}`, {
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
        `${azureUrl}/user/token/${userObj.userToken}`, {
          headers : {
          },
        }
      )
      console.log(response.status)
      if (response.status === 400){
        console.log("hei på deg")

        const response2 = await fetch (
          `${azureUrl}/user` , {
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
        `${azureUrl}/user` , {
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

        const response = await fetch(`${azureUrl}/players`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userTokenRef: postObj.userTokenRef,
            gameRef: postObj.gameRef,
            biteCode: postObj.biteCode,
            patientZero: postObj.patientzero,
            human: postObj.human,
            username: postObj.username
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
        const  response = await fetch(`${azureUrl}/kills`, {
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
      //const response = await fetch('//localhost:8080/api/v1/games', {
      const response = await fetch(`${azureUrl}/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: postObj.title,
          description: postObj.description,
          gameType: postObj.gameType,
          maxPlayers: postObj.maxPlayers,
          lat: postObj.lat,
          lng: postObj.lng,
          map: postObj.map
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

//      const response = await fetch('//localhost:8080/api/v1/squads', {

        const response = await fetch(`${azureUrl}/squads`, {
      
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
//      const response = await fetch(`//localhost:8080/api/v1/players/${checkInObj.id}/checkIn`, {


        const reponse = await fetch(`${azureUrl}/players${checkInObj.id}/checkIn`, {
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
        console.log(response)
        if (!response.ok) {
          throw new Error('Could not do stuff')
        }
      })
      .catch(error => {
        console.log(error);
      })
    }
  )
  
  export const putGameObject = createAsyncThunk(
    'games/putGameObject',
    async (gameObj) => {

      console.log(`${azureUrl}/games/${gameObj.id}`);
//      const response = await fetch(`//localhost:8080/api/v1/games/${gameObj.id}`, {

        const response = await fetch(`${azureUrl}/games/${gameObj.id}`,{
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
//      const response = await fetch(`${azureUrl}chat/${chatObj.id}`, {

        const response = await fetch(`${azureUrl}/chat/${chatObj.id}`, {
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
      // const response = await fetch(`${azureUrl}players/${id}`, {

        const response = await fetch(`${azureUrl}/players/${id}`, {
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

  export const deletePlayerByToken = createAsyncThunk(
    'players/token/delete',
    async (deleteObj) => {
      //const response = await fetch(`${azureUrl}players/deleteByToken/${deleteObj.token}`, {

        const response = await fetch(`${azureUrl}/players/deleteByToken/${deleteObj.token}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        if (!response.ok){
          throw new Error("Could not delete player by token lol")
        }
      })
    }
  )

  export const updatePlayer = createAsyncThunk(
    'squad/putPlayer',
    async (playerObj) => {
      console.log("Putting the following object: " )
      console.log(azureUrl + "/players/" + playerObj.aPlayer.id)
      console.log(`${azureUrl}/players/${playerObj.aPlayer.id}`)
      console.log("player objekt", playerObj);
        const response = await fetch(`${azureUrl}/players/${playerObj.aPlayer.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: playerObj.aPlayer.id,
            squadRef: playerObj.aPlayer.squadRef,
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
      const response = await fetch(`${azureUrl}/players/${playerObj.aPlayer.id}`, {
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
      const response = await fetch(
        `${azureUrl}/games` , {
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
      console.log(action)
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
      state.currGame.players.map((player, i) => {
        if (action.meta.arg.id == player.id) {
          player.lastCheckInTime = action.meta.arg.lastCheckInTime;
          player.lat = action.meta.arg.lat;
          player.lng = action.meta.arg.lng;
        }
      })
    },
    [postGame.fulfilled]:(state, action) => {
      console.log("Game has been posted :)")
      window.location.reload(false);
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
      state.currGame.description = action.meta.arg.description
      state.currGame.gameType = action.meta.arg.gameType
      state.currGame.id = action.meta.arg.id
      state.currGame.player = action.meta.arg.player
      state.currGame.title = action.meta.arg.title
      state.currGame.status = action.meta.arg.status

      state.gamesArray.map((game, i) => {
        if (game.id == action.meta.arg.id) {
          state.gamesArray[i] = action.meta.arg
        }
      })
    },
    [postPlayer.fulfilled]:(state, action) => {
      console.log("Player has been posted")
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
    [deletePlayerByToken.fulfilled]:(state, action) => {
      let tempArr = []

      state.currGame.players.map((player) => {
        if (player.userTokenRef != action.meta.arg.token) {
          console.log("Adding: " + player.id)
          tempArr.push(player);
        }
      });
      state.currGame.players = tempArr;
      action.meta.arg.callback(false)
    },
    [deletePlayer.fulfilled]:(state, action) => {
      console.log("PLAYER HAS BEEN DELETED MATEYYYY ARGGGGG")

      let tempArr = [];

      state.currGame.players.map((player) => {
          if (player.id != action.meta.arg) {
            console.log("Adding: " + player.id)
            tempArr.push(player);
          }
      });
      console.log(tempArr)
      state.currGame.players = tempArr;

    },
    [updatePlayer.fulfilled]:(state, action) => {
      console.log("PLAYER PUT IN SQUAD SUCCESSFULL MATEY!!!! :D ")  
      console.log(action.meta.arg);

      state.currGame.squads.map((squad, i) => {
        if (action.meta.arg.aPlayer.squad == action.meta.arg.aPlayer.squadRef && squad.name == action.meta.arg.aPlayer.squadRef) {
            let temp = [];
            squad.players.map((player, i) => {
              if (player.id != action.meta.arg.aPlayer.id) {
                temp.push(player);
              }
            });

            squad.players = temp;
        }
        if (squad.id == action.meta.arg.aSquad.id) {
            squad = action.meta.arg.aSquad;
        }
      })

      console.log(action.meta.arg)
      
      state.currGame.players.map((player, i) => {
        if (player.id == action.meta.arg.aPlayer.id) {
          player.human = action.meta.arg.aPlayer.human;
          player.squad = action.meta.arg.aSquad;
          player.squadRef = action.meta.arg.aPlayer.squadRef;
          console.log(player)
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