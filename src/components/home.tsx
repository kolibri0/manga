import React  from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { setLetter, setSelected, setSelectedPage } from "../store/manga-items/manga-home";
import { getMangaHome, setMangaError } from "../store/manga-items/featch-manga";
import { useAppDispatch, useAppSelector } from '../store/hook';
import { addFavorites, removeFavorites } from '../store/favorite';

import { Skeleton } from './skeleton';
import ReactPaginate from 'react-paginate';

import { FiStar } from "react-icons/fi";

import '../styles/home.css'
import '../styles/paginate.css'
interface option{
    value: string,
    label: string
}

export const Home = () => {
    const navigate = useNavigate();
    //just dispatch)
    const dispatch = useAppDispatch()
    const styleBlack = {
        color: 'black',
    }
    const styleGold ={
        color: '#8B2F20',
    }

    const user = useAppSelector(state => state.userSlice.user)

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

    const loading = useAppSelector(state => state.featchMangaSlice.loading)

    const favoriteManga = useAppSelector(state => state.persistedReducer.favorites.favorites)
    
    
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
    
    const isFav = favoriteManga.map(res => res.mal_id)
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

    //dispatch logic end/////////////////////////////////////////////////////
    return (
        <div className="container">
            <input className="search-input" type="text" placeholder="Enter manga name..." onChange={e =>searchManga(e)}/>
            
            <select className="select" defaultValue={options[1].value} onChange={(e) => setSelect(e)}>
                {options.map((res)=> <option key={res.label} value={res.value}>{res.label}</option>)}
            </select>

            <div className="contain-items">
                {items && loading ? items.map((res, i) => (
                    <div className="contain-item" key={res.mal_id}>
                        <div className="name-item favorite">
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
                        {res.type && <p className="type-home">{res.type}</p>}
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
{/* <>{load ? <div className="contain-items">{[...Array(9)].map(() => <div className="contain-item"><Skeleton /></div>)}</div>: null}</> */}