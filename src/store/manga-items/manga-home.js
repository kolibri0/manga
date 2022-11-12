import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selected: '',
    selectedPage: 1,
    letter: '',
}

const mangaSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setSelected(state, action){ state.selected = action.payload },
        setLetter(state, action){ state.letter = action.payload },
        setSelectedPage(state, action){ state.selectedPage = action.payload },
    }
})

export const { setSelected, setLetter, setAllPage, setSelectedPage } = mangaSlice.actions
export default mangaSlice.reducer