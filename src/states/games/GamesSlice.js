import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux'

export const gamesSlice = createSlice({
  name: "games",
  initialState: {
    id: null,
    username: null,
  },
  reducers: {

  },
  extraReducers: {

  },
});

export const { loggedOut, loggedIn, setTranslation} =
userSlice.actions;

export default userSlice.reducer;