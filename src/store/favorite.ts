import { createSlice } from '@reduxjs/toolkit';
interface item{
    img: string
    mal_id: number
    name: string
}

interface fav{
    favorites: item[] 
}

const initialState: fav = {
    favorites: []
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorites(state, action){
            const have = state.favorites.find((favorite) => favorite.mal_id === action.payload.mal_id)
            if(!have){state.favorites.push(action.payload)}
        },
        removeFavorites(state, action){
            const deletedItem = state.favorites.filter((favorite) => favorite.mal_id !== action.payload)
            state.favorites = deletedItem
        }
    },
})

export const { addFavorites, removeFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer