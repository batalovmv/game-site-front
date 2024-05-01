import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse, FilterParams } from "../types";
import axios from "axios";


interface GameState {
    games: ApiResponse | null;
    loading: boolean;
    error: string | null;
    currentPage: number;  
    totalCount: number;
}


const initialState: GameState = {
    games: null,
    loading: false,
    error: null,
    currentPage: 1,
    totalCount: 0,
};

export const fetchGames = createAsyncThunk(
    'games/fetchGames',
    async (filters: FilterParams, { rejectWithValue }) => {
        const params = { ...filters, key: 'b4489d7e7e6148dea33055ddcaf86898' };
        try {
            const response = await axios.get(`https://api.rawg.io/api/games`, { params });
            console.log(`response.data`, response.data);
            
            const newResults = response.data.results.map((result) => {
                // Создание поля thumb
                const thumb = result.background_image ? result.background_image.replace('media/', 'media/resize/640/-/') : null;

                // Преобразование поля short_screenshots
                const screens = result.short_screenshots.map((screenshot: {id:number, image: string; }) => ({
                    full: screenshot.image,
                    thumb: screenshot.image.replace('media/', 'media/resize/640/-/')
                }));

                return { ...result, thumb, screens };
            });

            return { ...response.data, results: newResults };
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
                state.games = action.payload;
                state.totalCount = action.payload.count;
                state.error = null;
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            
    },
});

export default gameSlice.reducer;