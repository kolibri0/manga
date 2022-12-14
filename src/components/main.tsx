import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { signOutUser } from '../store/auth/auth';
import { useAppDispatch } from '../store/hook';

import '../styles/main.css'


export const Main = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const random = () =>{
        axios.get(`https://api.jikan.moe/v4/random/manga`)
        .then((res)=> navigate(`/${res.data.data.mal_id}`))
    }

    
    const signOut = () =>{
        dispatch(signOutUser())
    }

    return (
        <div className='navigate-footer'>
            <Link className='navigate-footer-item' to='/'>Home</Link>
            <Link className='navigate-footer-item' to='/top'>Top</Link>
            <div className='navigate-footer-item' onClick={() => random()}>Random manga</div>
            <Link className='navigate-footer-item' to='/favorite'>Favorite</Link>
            <Link className='navigate-footer-item' to='/login'>Login</Link>
            <div className='navigate-footer-item' onClick={() => signOut()}>Sign out</div>
        </div>
    )
}