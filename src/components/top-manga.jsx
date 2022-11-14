import axios from "axios"
import React from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { getMangaTop, setMangaError } from "../store/featch-manga.js/featch-manga";
import { setAllPage, setSelectedPage } from "../store/manga-items/manga-home";

import '../components/home.css'


 export const TopManga = () => {
    const dispatch = useDispatch()

    const items = useSelector(state => state.featchMangaSlice.manga)
    const selectedPage = useSelector(state => state.mangaSlice.selectedPage)
    const allPage = useSelector(state => state.featchMangaSlice.allPage)
    const error = useSelector(state => state.featchMangaSlice.mangaError)


    React.useEffect(() => {
        dispatch(getMangaTop({selectedPage}))
    }, [selectedPage])

    React.useEffect(()=>{
        dispatch(setSelectedPage(1)) 
    },[])
    
    const handlePageClick = (event) => {
        dispatch(setSelectedPage(event.selected + 1)) 
    };

    if(error){
        alert(error)
        dispatch(setMangaError(null))
    }

    return (
        <div className="container">
            <div className="contain-items">
                {items && items.map((res, i) => (
                    <div className="contain-item" key={i}>
                        <div className="name-item">
                            <Link to={'/' + res.mal_id}>
                                <img className="img-item" src={res.images.jpg.image_url} alt="" />
                            </Link> 
                        </div>
                        <div className="description-item">
                            
                            <Link to={'/' + res.mal_id} className="name-item">
                                {res?.title.length > 40 ? res?.title.slice(0,40) + '...' : res?.title}
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
                ))}
            </div>

            <ReactPaginate
            className="pagination"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={8}
            pageCount={allPage}
            previousLabel="<"
            renderOnZeroPageCount={null}
            />
        </div>

    )
}