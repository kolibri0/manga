import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { signInUser,} from "../store/auth/auth";

export const SignIn = () =>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {
        register,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
    } = useForm()

    const signIn = (e) =>{
        dispatch(signInUser(e))
    }

    return(
        <>
        <h1>Sign in</h1>
        <div>
            <form onSubmit={handleSubmit(signIn)}>
                <input className="email" {...register('email', {
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

                <input className="password" {...register('password', {
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
            </form>
        </div>
        </>
    )   
}