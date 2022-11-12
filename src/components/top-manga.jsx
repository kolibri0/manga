import axios from "axios"
import React from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';


import '../components/home.css'

 export const TopManga = () => {

    const [items, setItems] = React.useState([])
    const [pagesSelect, setPagesSelect] = React.useState(1)
    const [pages, setPages] = React.useState(0)


    React.useEffect(() => {
      axios.get(`https://api.jikan.moe/v4/top/manga?page=${pagesSelect}&limit=24&`).then((res) => {
        setItems(res.data.data)
        setPages(res.data.pagination.last_visible_page)
        })

    }, [pagesSelect])
    


    const handlePageClick = (event) => {
        setPagesSelect(event.selected + 1) 
    };


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
            pageCount={pages}
            previousLabel="<"
            renderOnZeroPageCount={null}
            />
        </div>

    )
}