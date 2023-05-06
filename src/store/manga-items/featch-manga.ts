import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { mangaHome } from '../../../interface/interfaceMangaHome';

interface mangaAll {
  manga: mangaHome[],
  allPage: number,
  mangaError: null | string,
  loading: boolean
}

interface params {
  selected: string,
  selectedPage: number,
  letter: string
}

const initialState: mangaAll = {
  manga: [],
  allPage: 0,
  mangaError: null,
  loading: false
}

export const getMangaHome = createAsyncThunk(
  'manga/getMangaHome',
  // async (selected: string, selectedPage: number, letter: string) =>{
  async (params: params) => {
    // const selected: string = params.selected
    // const selectedPage: number = params.selectedPage
    // const letter: string = params.letter
    const selected = params.selected
    const selectedPage = params.selectedPage
    const letter = params.letter
    const res = await axios.get(`https://api.jikan.moe/v4/manga?page=${selectedPage}&letter=${letter}&type=${selected}&genres_exclude=12,28,26&limit=24`)
    return res.data
  }
)
export const getMangaTop = createAsyncThunk(
  'manga/getMangaTop',
  async (selectedPage: number) => {
    const res = await axios.get(`https://api.jikan.moe/v4/top/manga?page=${selectedPage}&limit=24&`)
    return res.data
  }
)

const featchMangaSlice = createSlice({
  name: 'manga',
  initialState,
  reducers: {
    setAllPage(state, action: PayloadAction<number>) { state.allPage = action.payload },
    setMangaError(state, action: PayloadAction<null>) { state.mangaError = action.payload }
  },
  extraReducers: (builder) => {
    builder.addCase(getMangaHome.pending, (state, action) => {
      state.loading = false
      state.allPage = 0
      state.manga = []
    })
    builder.addCase(getMangaHome.fulfilled, (state, action) => {
      state.manga = action.payload.data
      state.allPage = action.payload.pagination.last_visible_page
      state.loading = true
    })
    builder.addCase(getMangaHome.rejected, (state, action) => {
      if (action.error.message) {
        state.mangaError = action.error.message
        state.loading = false
      }
    })
    //=================================================================\\
    builder.addCase(getMangaTop.pending, (state, action) => {
      state.manga = []
      state.loading = false
    })
    builder.addCase(getMangaTop.fulfilled, (state, action) => {
      state.manga = action.payload.data
      state.loading = true
    })
    builder.addCase(getMangaTop.rejected, (state, action) => {
      if (action.error.message) {
        state.mangaError = action.error.message
        state.loading = false
      }
    })
  }
})


export const { setAllPage, setMangaError } = featchMangaSlice.actions
export default featchMangaSlice.reducer