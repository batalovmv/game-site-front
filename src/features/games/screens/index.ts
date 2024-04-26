import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../../app/store";



interface ScreensState {
    loading: boolean;
    error: string | null;
    screens: { [gameId: number]: string[] }
}


const initialState: ScreensState = {
    loading: false,
    error: null,
    screens: {}

};


export const fetchScreens = createAsyncThunk(
    'screens/fetchScreens',
    async (gameId: number, { getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const params = { key: 'b4489d7e7e6148dea33055ddcaf86898' };
        if (state.screens.screens[gameId]) {
            return state.screens.screens[gameId];
        }
        try {
            const response = await axios.get(`https://api.rawg.io/api/games/${gameId}/screenshots`, { params });
            return response.data.results.map((s: { image: string; }) => s.image);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Unknown error");
        }
    }
);


const screensSlice = createSlice({
    name: 'screens',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchScreens.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchScreens.fulfilled, (state, action) => {
                state.loading = false;
                state.screens[action.meta.arg] = action.payload;
                state.error = null;
            })
            .addCase(fetchScreens.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            
    },
});

export default screensSlice.reducer;