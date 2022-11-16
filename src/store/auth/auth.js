import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../../components/firebase';

const initialState = {
    // user: null,
    user: true,
    error: null
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
    reducers: {
        setError(state, action){state.error = action.payload}
    },
    extraReducers:{
        [loginUser.pending]: (state, action)=>{
            state.error = null
        },
        [loginUser.fulfilled]: (state, action)=>{
            state.user = action.payload.user 
        },
        [loginUser.rejected]: (state, action)=>{
            state.error = action.error.message
        },
        //////////////////////////////////////////
        [signInUser.fulfilled]: (state, action)=>{
            state.user = action.payload
            console.log(state.user)
        },
        [signInUser.rejected]: (state, action)=>{
            state.error = action.error.message
        },
        ////////////////////////////////////////////
        [signOutUser.fulfilled]: (state, action)=>{
            state.user = null
        }
    },
})

export const {setError} = userSlice.actions
export default userSlice.reducer