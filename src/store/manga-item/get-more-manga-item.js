import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    characters: [],
    moreInfo: {}
}

export const getMangaItemMore = createAsyncThunk(
    'moreInfo/getMangaItemMore',
    async ({id}) =>{
        const res = await axios.get(`https://api.jikan.moe/v4/manga/${id}/moreinfo`)
        return res.data
    }
)

export const getMangaItemCharacters = createAsyncThunk(
    'characters/getMangaItemCharacters',
    async ({id}) =>{
        const res = await axios.get(`https://api.jikan.moe/v4/manga/${id}/characters`)
        return res.data
    }
)

const featchMangaItemMoreSlice = createSlice({
    name: 'mangaItemMore',
    initialState,
    reducers: {
        setCharacters(state, action){state.characters = action.payload},
        setMoreInfo(state, action){state.moreInfo = action.payload}
    },
    extraReducers:{
        [getMangaItemMore.pending]: (state, action) =>{
            state.moreInfo = {}
        },
        [getMangaItemMore.fulfilled]: (state, action) =>{
            state.moreInfo = action.payload.data
        },
        [getMangaItemCharacters.pending]: (state, action) =>{
            state.characters = []
        },
        [getMangaItemCharacters.fulfilled]: (state, action) =>{
            state.characters = action.payload.data
        }
    }
})


export const { setCharacters, setMoreInfo} = featchMangaItemMoreSlice.actions
export default featchMangaItemMoreSlice.reducer