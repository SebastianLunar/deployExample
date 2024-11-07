import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { moviesReducer } from "./slices/movies";

export const store = configureStore({
  reducer: combineReducers({
    user: userReducer.reducer,
    movies: moviesReducer.reducer
  }),
})
