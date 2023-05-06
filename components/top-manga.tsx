import React from 'react';
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from 'react-router-dom';

import { getMangaTop, setMangaError } from "../store/manga-items/featch-manga";
import { setSelectedPage } from "../store/manga-items/manga-home";

import { useAppDispatch, useAppSelector } from "../store/hook";
import { Skeleton } from './skeleton';
import { FiStar } from "react-icons/fi";
import { addFavorites, removeFavorites } from '../store/favorite';

import '../styles/home.css'

 export const TopManga = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const styleBlack = {
        color: 'black',
    }
    const styleGold ={
        color: '#8B2F20',
    }

    const items = useAppSelector(state => state.featchMangaSlice.manga)
    const selectedPage = useAppSelector(state => state.mangaSlice.selectedPage)
    const allPage = useAppSelector(state => state.featchMangaSlice.allPage)
    const error = useAppSelector(state => state.featchMangaSlice.mangaError)
    const loading = useAppSelector(state => state.featchMangaSlice.loading)
    const favoriteManga = useAppSelector(state => state.persistedReducer.favorites.favorites)
    const isFav = favoriteManga.map(res => res.mal_id)
    const user = useAppSelector(state => state.userSlice.user)

    React.useEffect(() => {
        dispatch(getMangaTop(selectedPage))
    }, [selectedPage])

    React.useEffect(()=>{
        dispatch(setSelectedPage(1)) 
    },[])
    
    const handlePageClick = (event: any) => {
        dispatch(setSelectedPage(event.selected + 1)) 
    };

    if(error){
        alert(error)
        dispatch(setMangaError(null))
    }

    const addFav = (mal_id: number, img: string,  name: string) =>{
        const data = {mal_id, img, name}
        dispatch(addFavorites(data))
    }

    const deleteFav = (item_id: number) =>{
        dispatch(removeFavorites(item_id))
    }

    
    const checkFav = (item_id: number, mal_id: number, img: string, name: string) =>{
        if(user){
            isFav.includes(item_id) ? deleteFav(item_id) : addFav(mal_id, img, name) 
        }else{
            navigate('/login')
        }
        
    }


    return (
        <div className="container">
            <div className="contain-items">
                {items && loading ? items.map((res) => (
                    <div className="contain-item" key={res.mal_id}>
                        <div className="name-item">
                            <Link to={'/' + res.mal_id}>
                                <img className="img-item" src={res.images.jpg.image_url} alt="" />
                            </Link> 
                            <div className='favorit' 
                              style={isFav.includes(res.mal_id) ? styleGold : styleBlack} 
                              onClick={() =>  checkFav(res.mal_id, res.mal_id, res.images.jpg.image_url, res.title)}
                            >
                            <FiStar />
                             </div>
                        </div>
                        <div className="description-item">
                            
                            <Link to={'/' + res.mal_id} className="name-item">
                                {res?.title.length > 25 ? res?.title.slice(0,25) + '...' : res?.title}
                            </Link>
                            
                            <div className="genres">
                                {res.genres[0] && <p className="genre">{res.genres[0]?.name}</p>}
                                {res.genres[1] && <p className="genre">{res.genres[1]?.name}</p>}
                            </div>
                        {res.chapters && <p className="chapters">Chapters: {res.chapters}</p>}
                        {res.type && <p className="type">{res.type}</p>}
                        {res.score && <p className="score">Score: {res.score}</p>}
                    </div>
                </div>
                )):
                null
                }
            </div>
            <>{!loading ? <div className="contain-items">{[...Array(12)].map(() => <div className="contain-item"><Skeleton /></div>)}</div>: null}</>

            <ReactPaginate
            className="pagination"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={8}
            pageCount={allPage}
            previousLabel="<"
            />
            </div> 

    )
}