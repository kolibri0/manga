import { configureStore } from '@reduxjs/toolkit'
import mangaSlice from './manga-items/manga-home'
import featchMangaSlice from './featch-manga.js/featch-manga';

export const store = configureStore({
    reducer: {
        mangaSlice,
        featchMangaSlice,
    },
})

export default store;