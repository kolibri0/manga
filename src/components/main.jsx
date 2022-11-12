import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";



export const Main = () => {
    const navigate = useNavigate();

    const random = () =>{
        axios.get(`https://api.jikan.moe/v4/random/manga`)
        .then((res)=> navigate(`/${res.data.data.mal_id}`))
    }

    return (
        <div className='navigate-footer'>
            <Link className='navigate-footer-item' to='/'>Home</Link>
            <Link className='navigate-footer-item' to='/top'>Top</Link>
            <div className='navigate-footer-item' onClick={() => random()}>Random manga</div>
        </div>
    )
}