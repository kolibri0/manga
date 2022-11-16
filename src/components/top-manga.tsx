import React from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

import { getMangaTop, setMangaError } from "../store/manga-items/featch-manga";
import { setSelectedPage } from "../store/manga-items/manga-home";

import '../components/home.css'
import { useAppDispatch, useAppSelector } from "../store/hook";


 export const TopManga = () => {
    const dispatch = useAppDispatch()

    const items = useAppSelector(state => state.featchMangaSlice.manga)
    const selectedPage = useAppSelector(state => state.mangaSlice.selectedPage)
    const allPage = useAppSelector(state => state.featchMangaSlice.allPage)
    const error = useAppSelector(state => state.featchMangaSlice.mangaError)

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
            />
        </div>

    )
}