import { Link } from "react-router-dom"
import { FiStar } from "react-icons/fi";

import { useAppDispatch, useAppSelector } from "../store/hook"
import { removeFavorites } from "../store/favorite";

import '../styles/favorite.css'


export const Favorites = () => {
    const favorites = useAppSelector(state => state.persistedReducer.favorites.favorites)
    const dispatch = useAppDispatch()
    console.log(favorites)
    const deleteFav = (mal_id: number) => {
        dispatch(removeFavorites(mal_id))
    }

    return(
    <div>
        <div className="favorites">
            {favorites[0] ? favorites.map((favorite) => (
            <div key={favorite.mal_id} className="favorite-item">
                <div className="favorite-top">
                    <Link className="favorite-name" to={'/' + favorite.mal_id}>
                        <img className="favorite-img" src={favorite.img} alt="" />
                    </Link>
                </div>
                <div className="favorite-bottom">
                    <Link className="favorite-name" to={'/' + favorite.mal_id}>{favorite.name}</Link> 
                    <div className="favorite-star" onClick={() => deleteFav(favorite.mal_id)}><FiStar /></div>
                </div>
            </div>
            )): null}
        </div>  
        {!favorites[0] ? <div>
            <h1 className="warn-fav">Please add favorite manga!</h1>
        </div>: null}
    </div>
    )
}