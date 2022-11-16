import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface userChange {
    selected: string,
    selectedPage: number,
    letter: string
}

const initialState: userChange = {
    selected: '',
    selectedPage: 1,
    letter: '',
}

const mangaSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setSelected(state, action: PayloadAction<string>){ state.selected = action.payload },
        setLetter(state, action: PayloadAction<string>){ state.letter = action.payload },
        setSelectedPage(state, action: PayloadAction<number>){ state.selectedPage = action.payload },
    }
})

export const { setSelected, setLetter, setSelectedPage } = mangaSlice.actions
export default mangaSlice.reducer