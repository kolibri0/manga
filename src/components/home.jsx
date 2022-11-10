import axios from "axios"
import React from 'react';
import '../components/home.css'


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


    React.useEffect(() => {
      axios.get(`https://api.jikan.moe/v4/manga?page=1&letter=${letter}&type=${select}&genres_exclude=12,28,26&limit=24`).then((res) => {
        setItems(res.data.data)
        })

    }, [letter, select])
    
    const searchManga = (e) => {
        setLetter(e.target.value)
    }


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
                            <img className="img-item" src={res.images.jpg.image_url} alt="" />
                        </div>
                        <div className="description-item">
                            <div>
                                <div className="name-item">
                                {res?.title.length > 40 ? res?.title.slice(0,40) + '...' : res?.title}
                            </div>
                            </div>
                            
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

        </div>

    )
}