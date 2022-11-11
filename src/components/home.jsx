import axios from "axios"
import React from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import '../components/home.css'
import '../components/paginate.css'


 export const Home = () => {

    const options = [
        { value: '', label: 'All' },
        { value: 'manga', label: 'Manga' },
        { value: 'novel', label: 'Novel' },
        { value: 'lightnovel', label: 'Lightnovel' },
        { value: 'oneshot', label: 'Oneshot' },
        { value: 'doujin', label: 'Doujin' },
        { value: 'manhwa', label: 'Manhwa' },
        { value: 'manhua', label: 'Manhua' }
    ]

    const [items, setItems] = React.useState([])
    const [letter, setLetter] = React.useState('')
    const [select, setSelect] = React.useState('') 
    const [pages, setPages] = React.useState(0)
    const [pagesSelect, setPagesSelect] = React.useState(1)


    React.useEffect(() => {
      axios.get(`https://api.jikan.moe/v4/manga?page=${pagesSelect}&letter=${letter}&type=${select}&genres_exclude=12,28,26&limit=24`).then((res) => {
        setItems(res.data.data)
        setPages(res.data.pagination.last_visible_page)
        })

    }, [pagesSelect, letter, select])
    
    const searchManga = (e) => {
        setLetter(e.target.value)
    }


    const handlePageClick = (event) => {
        setPagesSelect(event.selected + 1)
    };


    return (
        <div className="container">
            <input className="search-input" type="text" placeholder="Enter manga name..." onChange={(e) => searchManga(e)}/>

            <select className="select" value={select} defaultValue={options[1]} onChange={(e) => setSelect(e.target.value)}>
                {options.map((res)=> <option key={res.label} value={res.value}>{res.label}</option>)}
            </select>

            <div className="contain-items">
                {items && items.map((res, i) => (
                    <div className="contain-item" key={i}>
                        <div className="name-item">
                        <Link to={'/' + res.mal_id}><img className="img-item" src={res.images.jpg.image_url} alt="" /></Link> 
                        </div>
                        <div className="description-item">
                            <Link to={'/' + res.mal_id}>
                                <div className="name-item">
                                    {res?.title.length > 40 ? res?.title.slice(0,40) + '...' : res?.title}
                                </div>
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
            pageCount={pages}
            previousLabel="<"
            renderOnZeroPageCount={null}
            />

        </div>

    )
}