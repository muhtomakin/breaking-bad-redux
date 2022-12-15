import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCharacters = createAsyncThunk(
    'characters/getCharacters',
    async () => {
        const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/characters?limit=12`)
        return res.data;
    }
)

export const characterSlice = createSlice({
    name: 'character',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchCharacters.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchCharacters.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.items = action.payload;
        },
        [fetchCharacters.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },
    }
});

export default characterSlice.reducer;