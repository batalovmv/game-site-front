import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse, FilterParams } from "./types";
import axios from "axios";


interface GameState {
    games: ApiResponse | null;
    filters: FilterParams;
    loading: boolean;
    error: string | null;
}


const initialState: GameState = {
    games: null,
    filters: {},
    loading: false,
    error: null
};

export const fetchGames = createAsyncThunk(
    'games/fetchGames',
    async (filters: FilterParams, { rejectWithValue }) => {
        const params = { ...filters, key: 'b4489d7e7e6148dea33055ddcaf86898' };
        try {
            const response = await axios.get(`https://api.rawg.io/api/games`, { params });
            console.log(`response.data`, response.data);
            const responseData = response.data
            return { responseData,filters};
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Unknown error");
        }
    }
);


const gameSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGames.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.loading = false;
                state.games = action.payload.responseData;
                console.log("state.filters", state.filters)
                console.log("action.payload.filters", action.payload.filters)
                if (state.filters !== action.payload.filters) {
                    state.filters = action.payload.filters
                }
                console.log("state.filters", state.filters)
                console.log("action.payload.filters", action.payload.filters)
                state.error = null;
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default gameSlice.reducer;