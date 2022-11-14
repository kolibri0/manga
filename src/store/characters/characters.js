import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    characterInfo: {},
    image: [],
    error: null,
}

export const getCharacter = createAsyncThunk(
    'character/getCharacter',
    async ({id}) =>{
        const res = await axios.get(`https://api.jikan.moe/v4/characters/${id}`)
        return res.data
    }
)

export const getCharacterImg = createAsyncThunk(
    'character/getCharacterImg',
    async ({id}) =>{
        const res = await axios.get(`https://api.jikan.moe/v4/characters/${id}/pictures`)
        return res.data
    }
)

const featchCharacterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {
        setErrorCharacter(state, action){state.error = action.payload}
    },
    extraReducers:{
        [getCharacter.pending]: (state, action) =>{
            state.characterInfo = {}
        },
        [getCharacter.fulfilled]: (state, action) =>{
            state.characterInfo = action.payload.data
        },
        [getCharacter.rejected]: (state, action) =>{
            state.error = action.error.message
        },
        [getCharacterImg.pending]: (state, action) =>{
            state.image = []
        },
        [getCharacterImg.fulfilled]: (state, action) =>{
            state.image = action.payload.data
        },
        [getCharacterImg.rejected]: (state, action) =>{
            state.error = action.error.message
        },
    }
})

export const { setErrorCharacter } = featchCharacterSlice.actions
export default featchCharacterSlice.reducer