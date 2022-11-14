import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    mangaItem: {},
    recomendation: [],
    errorItem: null
}

export const getMangaItem = createAsyncThunk(
    'mangaItem/getMangaItem',
    async ({id}) =>{
        const res = await axios.get(`https://api.jikan.moe/v4/manga/${id}`)
        return res.data
    }
)

export const getMangaRecomendation = createAsyncThunk(
    'recomendation/getMangaRecomendation',
    async ({id}) =>{
        const res = await axios.get(`https://api.jikan.moe/v4/manga/${id}/recommendations`)
        return res.data
    }
)

const featchMangaItemSlice = createSlice({
    name: 'mangaItem',
    initialState,
    reducers: {
        setErrorItem(state, action){ state.errorItem = action.payload}
    },
    extraReducers:{
        [getMangaItem.pending]: (state, action) =>{
            state.mangaItem = {}
        },
        [getMangaItem.fulfilled]: (state, action) =>{
            state.mangaItem = action.payload.data
        },
        [getMangaItem.rejected]: (state, action) =>{
            state.errorItem = action.error.message
        },
        [getMangaRecomendation.pending]: (state, action) =>{
            state.recomendation = []
        },
        [getMangaRecomendation.fulfilled]: (state, action) =>{
            state.recomendation = action.payload.data
        },
        [getMangaRecomendation.rejected]: (state, action) =>{
            state.errorItem = action.error.message
        },
    }
})

export const { setErrorItem } = featchMangaItemSlice.actions
export default featchMangaItemSlice.reducer