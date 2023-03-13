import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux'
import { userSlice } from "../users/UserSlice";

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
gamesSlice.actions;

export default gamesSlice.reducer;