import { configureStore } from '@reduxjs/toolkit'
import mangaSlice from './manga-items/manga-home'
import featchMangaSlice from './featch-manga.js/featch-manga';
import featchMangaItemSlice from './manga-item/get-manga-item';
import featchMangaItemMoreSlice from './manga-item/get-more-manga-item';
import featchCharacterSlice from './characters/characters'

export const store = configureStore({
    reducer: {
        mangaSlice,
        featchMangaSlice,
        featchMangaItemSlice,
        featchMangaItemMoreSlice,
        featchCharacterSlice,
    },
})

export default store;