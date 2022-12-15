import { configureStore } from '@reduxjs/toolkit';

import characterSlice from './characterSlice';
import quotesSlice from './quotesSlice';


export const store = configureStore({
    reducer: {
        characters: characterSlice,
        quotes: quotesSlice,
    },
})