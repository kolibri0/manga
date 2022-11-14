import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    manga: [],
    allPage: 0,
    mangaError: null
}

export const getMangaHome = createAsyncThunk(
    'manga/getMangaHome',
    async ({selected, selectedPage, letter}) =>{
        const res = await axios.get(`https://api.jikan.moe/v4/manga?page=${selectedPage}&letter=${letter}&type=${selected}&genres_exclude=12,28,26&limit=24`)
        return res.data
    }
)
export const getMangaTop = createAsyncThunk(
    'manga/getMangaTop',
    async ({selectedPage}) =>{
        const res = await axios.get(`https://api.jikan.moe/v4/top/manga?page=${selectedPage}&limit=24&`)
        return res.data
    }
)

const featchMangaSlice = createSlice({
    name: 'manga',
    initialState,
    reducers: {
        setAllPage(state, action){ state.allPage = action.payload },
        setMangaError(state, action){state.mangaError = action.payload}
    },
    extraReducers:{
        [getMangaHome.pending]: (state, action) =>{
            state.allPage = 0
            state.manga = []   
        },
        [getMangaHome.fulfilled]: (state, action) =>{
            state.manga = action.payload.data
            state.allPage = action.payload.pagination.last_visible_page
        },
        [getMangaHome.rejected]: (state, action) =>{
            state.mangaError = action.error.message
        },
        [getMangaTop.pending]: (state, action) =>{
            state.allPage = 0
            state.manga = []
        },
        [getMangaTop.fulfilled]: (state, action) =>{
            state.manga = action.payload.data
            state.allPage = action.payload.pagination.last_visible_page
        },
        [getMangaTop.rejected]: (state, action) =>{
            state.mangaError = action.error.message
        },
    }
})

 
export const { setAllPage, setMangaError } = featchMangaSlice.actions
export default featchMangaSlice.reducer