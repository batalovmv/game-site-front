import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; 
import gamesReducer from '../features/games/list/slice'; 
import screensReducer from '../features/games/screens/index'; 

export const store = configureStore({
    reducer: {
        auth: authReducer,
        games: gamesReducer,
        screens: screensReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
