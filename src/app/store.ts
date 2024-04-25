import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; 
import gamesReducer from '../features/games/gamesSlice'; 

export const store = configureStore({
    reducer: {
        auth: authReducer,
        games: gamesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
