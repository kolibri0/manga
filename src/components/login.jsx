import React from "react";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loginUser } from "../store/auth/auth";
import { useDispatch } from "react-redux";



export const Login = () =>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {
        register,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
    } = useForm({mode: 'onChange'})

    const login = (e) =>{
        dispatch(loginUser(e))
    }

    return(
        <>
        <h1>Login</h1>
        <div>
            <form onSubmit={handleSubmit(login)}>
                <input defaultValue={''} className="email" {...register('email', {
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

                <input defaultValue={''} className="password" {...register('password', {
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

                <input type={'submit'}/>

                <Link to={'/signIn'}>Have account?</Link>
            </form>
        </div>
        </>
    )   
}