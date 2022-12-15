import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const char_limit = 12;

export const fetchCharacters = createAsyncThunk(
    'characters/getCharacters',
    async (page) => {
        const res = await axios(
            `${process.env.REACT_APP_API_BASE_ENDPOINT}/characters?limit=
            ${char_limit}?offset=${page*char_limit}`
        );
        return res.data;
    }
)

export const characterSlice = createSlice({
    name: 'character',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        page: 0,
        hasNextPage: true,
    },
    reducers: {},
    extraReducers: {
        [fetchCharacters.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchCharacters.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.items = [...state.items, ...action.payload];
            state.page += 1;

            if(action.payload.length < 12) {
                state.hasNextPage = false;
            }
        },
        [fetchCharacters.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
    }
});

export default characterSlice.reducer;