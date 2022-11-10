import { Link } from 'react-router-dom'

export const Main = () => {

    return (
        <div className='navigate-footer'>
            <Link className='navigate-footer-item' to='/'>Главная</Link>
            <Link className='navigate-footer-item' to='/top'>Top</Link>
        </div>
    )
}