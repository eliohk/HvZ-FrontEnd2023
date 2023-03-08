import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux'

const apiKey = 'allenteforever';
const apiUrl = 'https://snapdragon-reliable-badge.glitch.me/translations/';

export const fetchUserByName = createAsyncThunk(
  'users/fetchByName',
  async (name) => {
    const response = await fetch(
      `${apiUrl}?username=${name}`
    )

    let result = await response.json()

    if (result.length != 0) {
      if (result.length > 1) {
        return result[0];
      }
      console.log("Found user in API! :D ")
      console.log(result);
      return {
        id: result[0].id,
        username: result[0].username,
        translations: result[0].translations
      };
    }

    const resp = await fetch(apiUrl, {
      method: 'POST',
      headers: {
          'X-API-Key': apiKey,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username: name,
          translations: []
      })
    });

    if (resp.ok) {
        const result = await resp.json();
        console.log("Added new user to API! :D ");
        console.log(result);
        return {
          id: result.id, 
          username: result.username,
          translations: result.translations
      };
    }
  }
)

export const addTranslationToUser = createAsyncThunk(
	'users/addTranslation',
	async (payload) => {

    if (payload.translation.length > 10) {
      console.log("Shifting array: " );
      console.log(payload.translation);
      payload.translation.shift();
    }

    const resp = await fetch(`${apiUrl}/${payload.id}`, {
      method: 'PATCH',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        translations: payload.translation
      }),
    }).then(response => {
      if (!response.ok) {
        throw new Error('Could not update translations history')
      }
      return response.json()
    })
    .then(updatedUser => {
      // updatedUser is the user with the Patched data
    })
    .catch(error => {
      console.log(error);
    })

	}
);

export const deleteTranslations = createAsyncThunk(
	'users/deleteTranslations',
	async (payload) => {
		const resp = await fetch(`${apiUrl}${payload.id}`, {
			method: 'PATCH',
			headers: {
        'X-API-Key': apiKey,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ 
        translations: []
      }),
		}).then(response => {
      if (!response.ok) {
        throw new Error('Could not delete translations history')
      }
      return response.json()
    })
    .then(updatedUser => {
      // updatedUser is the user with the Patched data
    })
    .catch(error => {
      console.log(error);
    })
	}
);

// TODO: Remove deleteUser from redux

export const deleteUser = createAsyncThunk(
	'users/resetAPI',
	async (payload) => {
		const resp = await fetch(`${apiUrl}/${payload}`, {
			method: 'DELETE',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      }
		});

		if (resp.ok) {
			return { 
          id: payload 
      };
		}
	}
);

export const translationSlice = createSlice({
  name: "translation",
  initialState: {
    id: null,
    username: null,
    translations: [],
  },
  reducers: {
    loggedIn: (state, payload) => {
      state.username = payload;
    },
    loggedOut: (state) => {
      state.username = null;
      state.id= null;
      state.translations = [];
    },
    setTranslation: (state, payload) => {
      //state.translations.push(payload.payload);
    },
  },
  extraReducers: {
    [fetchUserByName.fulfilled]:(state,action)=>{
      state.id = action.payload.id;
      state.username = action.payload.username;      
      action.payload.translations.map((item) => {
        state.translations.push(item);
      });
      
      console.log("Added data: " + action.payload.username + " -> " + action.payload.translations);
      console.log("Current data: " + state.username + " -> " + state.translations);
    },
    [addTranslationToUser.fulfilled] : (state, action) => {
      console.log(action);
      //state.translations.push(action.meta.arg.translation[state.translations.length]);
      state.translations = action.meta.arg.translation;
    },
    [deleteTranslations.fulfilled] : (state, action) => {
      state.translations = [];
    },
    [deleteUser.fulfilled] : (state, action) => {
      console.log(`User deleted! ${action}`)
    }
  },
});

export const { loggedOut, loggedIn, setTranslation} =
translationSlice.actions;

export default translationSlice.reducer;