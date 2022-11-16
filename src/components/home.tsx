import React from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { setLetter, setSelected, setSelectedPage } from "../store/manga-items/manga-home";
import { getMangaHome, setMangaError } from "../store/manga-items/featch-manga";
import { useAppDispatch, useAppSelector } from '../store/hook';

import '../components/home.css'
import '../components/paginate.css'

interface option{
    value: string,
    label: string
}

export const Home = () => {
    //selected option (manga type)
    const selected = useAppSelector(state => state.mangaSlice.selected)
    //for search manga by words
    const letter = useAppSelector(state => state.mangaSlice.letter)
    //all page count
    const allPage = useAppSelector(state => state.featchMangaSlice.allPage)
    //selected page
    const selectedPage = useAppSelector(state => state.mangaSlice.selectedPage)
    //res manga
    const items = useAppSelector(state => state.featchMangaSlice.manga)
    //error
    const error = useAppSelector(state => state.featchMangaSlice.mangaError)
    //just dispatch)
    const dispatch = useAppDispatch()
    //manga type
    const options: option[] = [
        { value: '', label: 'All' },
        { value: 'manga', label: 'Manga' },
        { value: 'novel', label: 'Novel' },
        { value: 'lightnovel', label: 'Lightnovel' },
        { value: 'oneshot', label: 'Oneshot' },
        { value: 'douji n', label: 'Doujin' },
        { value: 'manhwa', label: 'Manhwa' },
        { value: 'manhua', label: 'Manhua' }
    ]
    //request at api
    React.useEffect(() => {
        dispatch(getMangaHome({selected, selectedPage, letter}))
    }, [selectedPage, selected, letter ])
    //reset selected page on first boot
    React.useEffect(() => {
        dispatch(setSelectedPage(1))
    }, [])
    
    //dispatch logic/////////////////////////////////////////////////////
    //search manga by word
    const searchManga = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setLetter(e.target.value))
    }
    //check page 
    const handlePageClick = (event: any) => {
        dispatch(setSelectedPage(event.selected + 1))
    };
    //select option 
    const setSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>{  
        dispatch(setSelected(e.target.value))
    } 
    if(error){
        alert(error)
        dispatch(setMangaError(null))
    }
    //dispatch logic end/////////////////////////////////////////////////////
    return (
        <div className="container">
            <input className="search-input" type="text" placeholder="Enter manga name..." onChange={e =>searchManga(e)}/>
            
            <select className="select" defaultValue={options[1].value} onChange={(e) => setSelect(e)}>
                {options.map((res)=> <option key={res.label} value={res.value}>{res.label}</option>)}
            </select>

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