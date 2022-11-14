import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { setError, signInUser,} from "../store/auth/auth";

import './auth.css'

export const SignIn = () =>{
    const dispatch = useDispatch()
    const {
        register,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
    } = useForm({mode: 'onChange'})
    const error = useSelector(state => state.userSlice.error)

    if(error){
        alert(error)
        dispatch(setError(null))
    }

    const signIn = (e) =>{
        dispatch(signInUser(e))
    }

    return(
        <div className="contain-form">
            <form className="form" onSubmit={handleSubmit(signIn)}>
                <h1>Sign in</h1>
                <input className="email input-item" placeholder="email..." {...register('email', {
                    required: {
                        value: true, 
                        message: 'поле обяз'
                    },
                    pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: 'please enter correct email'
                    },
                })}/>
                {errors.email && <p>{errors.email.message}</p>}

                <input className="password input-item" placeholder="password..." {...register('password', {
                    required: {
                        value: true, 
                        message: 'поле обяз'
                    },
                    minLength: {
                        value: 8,
                        message: "Min length 8"
                    }
                })}/>
                {errors.password && <p>{errors.password.message}</p>}

                <input className="submit" value='submit' type={'submit'}/>
            </form>
        </div>
    )   
}