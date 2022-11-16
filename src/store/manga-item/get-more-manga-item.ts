import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { ICharacter } from '../../interface/ICharacter'
import { IMoreInfo } from '../../interface/IMoreInfo'

interface IInit{
    characters: ICharacter[]
    moreInfo: IMoreInfo | null
    errorMore: null | string
}

const initialState: IInit = {
    characters: [],
    moreInfo: null,
    errorMore: null
}

export const getMangaItemMore = createAsyncThunk(
    'moreInfo/getMangaItemMore',
    async (id: number) =>{
        const res = await axios.get(`https://api.jikan.moe/v4/manga/${id}/moreinfo`)
        return res.data
    }
)

export const getMangaItemCharacters = createAsyncThunk(
    'characters/getMangaItemCharacters',
    async (id: number) =>{
        const res = await axios.get(`https://api.jikan.moe/v4/manga/${id}/characters`)
        return res.data
    }
)

const featchMangaItemMoreSlice = createSlice({
    name: 'mangaItemMore',
    initialState,
    reducers: {
        setCharacters(state, action: PayloadAction<[]>){state.characters = action.payload},
        setMoreInfo(state, action: PayloadAction<null>){state.moreInfo = action.payload},
        setErrorMore(state, action: PayloadAction<null>){state.errorMore = action.payload}
    },
    extraReducers: (builder) => {
        builder.addCase(getMangaItemMore.pending, (state, action) =>{
            state.moreInfo = null
        })
        builder.addCase(getMangaItemMore.fulfilled, (state, action) =>{
            state.moreInfo = action.payload.data
            console.log(state.moreInfo)
        })
        builder.addCase(getMangaItemMore.rejected, (state, action) =>{
            if(action.error.message){state.errorMore = action.error.message}
        })
        builder.addCase(getMangaItemCharacters.pending, (state, action) =>{
            state.characters = []
        })
        builder.addCase(getMangaItemCharacters.fulfilled, (state, action) =>{
            state.characters = action.payload.data
            console.log(state.characters)
        })
        builder.addCase(getMangaItemCharacters.rejected, (state, action) =>{
            if(action.error.message){state.errorMore = action.error.message}
        })
    }
})


export const { setCharacters, setMoreInfo, setErrorMore} = featchMangaItemMoreSlice.actions
export default featchMangaItemMoreSlice.reducer