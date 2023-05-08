import React from "react";
import { useForm } from "react-hook-form";

import { Link } from "react-router-dom";
import { loginUser, setError } from "../store/auth/auth";

import '../styles/auth.css'
import { useAppDispatch, useAppSelector } from "../store/hook";

type FormValues = {
    email: string
    password: string
};


export const Login = () =>{
    const dispatch = useAppDispatch()
    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
    } = useForm<FormValues>({mode: 'onChange'})
    const error = useAppSelector(state => state.userSlice.error) 
    
    if(error){
        alert(error)
        dispatch(setError(null))
    }

    const login = (e: any) =>{
        dispatch(loginUser(e))
    }

    
    return(
        
        <div className="contain-form">
            <form className="form" onSubmit={handleSubmit(login)}>
                <h1>Login</h1> 
                <input defaultValue={''} className="email input-item" aria-label="name" placeholder="email..." {...register('email', {
                    required: {
                        value: true, 
                        message: 'Required field'
                    },
                    pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: 'please enter correct email'
                    },
                })}/>
                {errors.email && <p>{errors.email.message}</p>}

                <input defaultValue={''} className="password input-item" aria-label="password" placeholder="password..." {...register('password', {
                    required: {
                        value: true, 
                        message: 'Required field'
                    },
                    minLength: {
                        value: 8,
                        message: "Min length 8"
                    }
                })}/>
               {errors.password && <p>{errors.password.message}</p>}

                <input className="submit" value='submit' type={'submit'} role={'button'}/>

                <Link className="account" to={'/signIn'} role={'link'}>Have account?</Link>
            </form>
        </div>
    )   
}