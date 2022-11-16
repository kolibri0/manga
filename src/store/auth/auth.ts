import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from "firebase/auth";
import { auth } from '../../components/firebase';

interface IauthProp{
    email: string
    password: string
}

interface IInit{
    user: User | null  
    error: null | string
}

const initialState: IInit = {
    user: null,
    error: null
}

export const loginUser = createAsyncThunk(
    'user/login',
    async (e: IauthProp) =>{
        const res = await createUserWithEmailAndPassword(auth, e.email, e.password)
        return res
    }
)

export const signInUser = createAsyncThunk(
    'user/signIn',
    async (e: IauthProp) =>{
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
        setError(state, action: PayloadAction<null>){state.error = action.payload}
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state, action) =>{
            state.error = null
        })
        builder.addCase(loginUser.fulfilled, (state, action) =>{
            state.user = action.payload.user 
        })
        builder.addCase(loginUser.rejected, (state, action) =>{
            if(action.error.message){state.error = action.error.message}
        })
        //================================================================\\
        builder.addCase(signInUser.fulfilled, (state, action) =>{
            state.user = action.payload.user 
        })
        builder.addCase(signInUser.rejected, (state, action) =>{
            if(action.error.message){state.error = action.error.message}
        })
        //================================================================\\
        builder.addCase(signOutUser.fulfilled, (state, action) =>{
            state.user = null
        })
    },
})

export const {setError} = userSlice.actions
export default userSlice.reducer