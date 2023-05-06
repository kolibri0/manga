import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { IMangaItem } from '../../../interface/IMangaItem'
import { IRecomendation } from '../../../interface/IRecomendation'

interface IInitItem {
  mangaItem: IMangaItem | null
  recomendation: IRecomendation[]
  errorItem: string | null
  loading: boolean
}

const initialState: IInitItem = {
  mangaItem: null,
  recomendation: [],
  errorItem: null,
  loading: false
}

export const getMangaItem = createAsyncThunk(
  'mangaItem/getMangaItem',
  async (id: number) => {
    const res = await axios.get(`https://api.jikan.moe/v4/manga/${id}`)
    return res.data
  }
)

export const getMangaRecomendation = createAsyncThunk(
  'recomendation/getMangaRecomendation',
  async (id: number) => {
    const res = await axios.get(`https://api.jikan.moe/v4/manga/${id}/recommendations`)
    return res.data
  }
)

const featchMangaItemSlice = createSlice({
  name: 'mangaItem',
  initialState,
  reducers: {
    setErrorItem(state, action: PayloadAction<null>) { state.errorItem = action.payload }
  },
  extraReducers: (builder) => {

    builder.addCase(getMangaItem.pending, (state, action) => {
      state.mangaItem = null
      state.loading = false
    })
    builder.addCase(getMangaItem.fulfilled, (state, action) => {
      state.mangaItem = action.payload.data
      state.loading = true
    })
    builder.addCase(getMangaItem.rejected, (state, action) => {
      if (action.error.message) { state.errorItem = action.error.message }
      state.loading = false
    })
    //=================================================================\\
    builder.addCase(getMangaRecomendation.pending, (state, action) => {
      state.recomendation = []
    })
    builder.addCase(getMangaRecomendation.fulfilled, (state, action) => {
      state.recomendation = action.payload.data
    })
    builder.addCase(getMangaRecomendation.rejected, (state, action) => {
      if (action.error.message) { state.errorItem = action.error.message }
    })
  }
})

export const { setErrorItem } = featchMangaItemSlice.actions
export default featchMangaItemSlice.reducer