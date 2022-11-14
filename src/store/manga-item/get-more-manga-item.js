import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    characters: [],
    moreInfo: {},
    errorMore: null
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
        setMoreInfo(state, action){state.moreInfo = action.payload},
        setErrorMore(state, action){state.errorMore = action.payload}
    },
    extraReducers:{
        [getMangaItemMore.pending]: (state, action) =>{
            state.moreInfo = {}
        },
        [getMangaItemMore.fulfilled]: (state, action) =>{
            state.moreInfo = action.payload.data
        },
        [getMangaItemMore.rejected]: (state, action) =>{
            state.errorMore = action.error.message
        },
        [getMangaItemCharacters.pending]: (state, action) =>{
            state.characters = []
        },
        [getMangaItemCharacters.fulfilled]: (state, action) =>{
            state.characters = action.payload.data
        },
        [getMangaItemCharacters.rejected]: (state, action) =>{
            state.errorMore = action.error.message
        },
    }
})


export const { setCharacters, setMoreInfo, setErrorMore} = featchMangaItemMoreSlice.actions
export default featchMangaItemMoreSlice.reducer