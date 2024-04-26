import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse, platform} from "../types";
import axios from "axios";


interface PlatformState {
    platforms: platform[]|null;
    loading: boolean;
    error: string | null;
}


const initialState: PlatformState = {
    platforms: [],
    loading: false,
    error: null,
};

export const fetchPlatforms = createAsyncThunk(
    'platforms/fetchplatforms',
    async (_, { rejectWithValue }) => {
        const params = { key: 'b4489d7e7e6148dea33055ddcaf86898' };
        try {
            const response = await axios.get(`https://api.rawg.io/api/platforms`, { params });
            return response.data.results.map(s => {
                return {
                    id: s.id,
                    name: s.name,
                    count: s.count
                };
            });
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Unknown error");
        }
    }
);


const platformsSlice = createSlice({
    name: 'platforms',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlatforms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPlatforms.fulfilled, (state, action) => {
                state.loading = false;
                console.log(`action.payload`, action.payload);
                state.platforms = action.payload;
                state.error = null;
            })
            .addCase(fetchPlatforms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            
    },
});

export default platformsSlice.reducer;