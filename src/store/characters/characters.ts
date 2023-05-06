import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { ICharacterImg } from '../../../interface/ICharacterImg'
import { ICharacterInfo } from '../../../interface/ICharacterInfo'

interface IInit {
  characterInfo: ICharacterInfo | null
  image: ICharacterImg[]
  error: null | string
}

const initialState: IInit = {
  characterInfo: null,
  image: [],
  error: null,
}

export const getCharacter = createAsyncThunk(
  'character/getCharacter',
  async (id: number) => {
    const res = await axios.get(`https://api.jikan.moe/v4/characters/${id}`)
    return res.data
  }
)

export const getCharacterImg = createAsyncThunk(
  'character/getCharacterImg',
  async (id: number) => {
    const res = await axios.get(`https://api.jikan.moe/v4/characters/${id}/pictures`)
    return res.data
  }
)

const featchCharacterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setErrorCharacter(state, action: PayloadAction<null>) { state.error = action.payload }
  },
  extraReducers: (builder) => {
    builder.addCase(getCharacter.pending, (state, action) => {
      state.characterInfo = null
    })
    builder.addCase(getCharacter.fulfilled, (state, action) => {
      state.characterInfo = action.payload.data
    })
    builder.addCase(getCharacter.rejected, (state, action) => {
      if (action.error.message) { state.error = action.error.message }
    })
    //=================================================================\\
    builder.addCase(getCharacterImg.pending, (state, action) => {
      state.image = []
    })
    builder.addCase(getCharacterImg.fulfilled, (state, action) => {
      state.image = action.payload.data
    })
    builder.addCase(getCharacterImg.rejected, (state, action) => {
      if (action.error.message) { state.error = action.error.message }
    })
  }
})

export const { setErrorCharacter } = featchCharacterSlice.actions
export default featchCharacterSlice.reducer