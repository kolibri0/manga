import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../../components/firebase';

const initialState = {
    user: null
}

export const loginUser = createAsyncThunk(
    'user/login',
    async (e) =>{
        const res = await createUserWithEmailAndPassword(auth, e.email, e.password)
        return res
    }
)

export const signInUser = createAsyncThunk(
    'user/signIn',
    async (e) =>{
        const res = await signInWithEmailAndPassword(auth, e.email, e.password)
        return res
    }
)

export const signOutUser = createAsyncThunk(
    'user/signOutIn',
    async () =>{
        const res = await signOut(auth)
        return res
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers:{
        [loginUser.fulfilled]: (state, action)=>{
            state.user = action.payload.user 
            console.log(state.user)
        },
        [signInUser.fulfilled]: (state, action)=>{
            state.user = action.payload.user
            console.log(state.user)
        },
        [signOutUser.fulfilled]: (state, action)=>{
            state.user = null
        }
    },
})

export default userSlice.reducer