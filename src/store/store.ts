import { combineReducers, configureStore, } from '@reduxjs/toolkit'
import mangaSlice from './manga-items/manga-home'
import featchMangaSlice from './manga-items/featch-manga';
import featchMangaItemSlice from './manga-item/get-manga-item';
import featchMangaItemMoreSlice from './manga-item/get-more-manga-item';
import featchCharacterSlice from './characters/characters'
import userSlice from './auth/auth'
import { 
    persistReducer, 
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import favoritesSlice from './favorite';


const persistConfig = {
    key: "root",
    storage,
    version: 1
}

const reducer = combineReducers({
    favorites: favoritesSlice
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: {
        mangaSlice,
        featchMangaSlice,
        featchMangaItemSlice,
        featchMangaItemMoreSlice,
        featchCharacterSlice,
        userSlice,
        persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    
})

export default store;
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch




