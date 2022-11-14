import React from "react"
import { Link, useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../components/manga-item.css'
import { getMangaItem, getMangaRecomendation, setErrorItem } from "../store/manga-item/get-manga-item";
import { getMangaItemCharacters, getMangaItemMore, setCharacters, setErrorMore, setMoreInfo } from "../store/manga-item/get-more-manga-item";





export const MangaItem = () => {
    const dispatch = useDispatch()

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 2
            }
          }
        ]
    };

    let { id } = useParams()
    const item = useSelector(state => state.featchMangaItemSlice.mangaItem)
    const recomendation = useSelector(state => state.featchMangaItemSlice.recomendation)
    const characters = useSelector(state => state.featchMangaItemMoreSlice.characters)
    const moreInfo = useSelector(state => state.featchMangaItemMoreSlice.moreInfo)
    const error = useSelector(state => state.featchMangaItemSlice.errorItem)
    const errorMore = useSelector(state => state.featchMangaItemMoreSlice.errorMore)
    
    React.useEffect(()=>{
        dispatch(setCharacters([]))
        dispatch(setMoreInfo({}))
        dispatch(getMangaItem({id}))
        dispatch(getMangaRecomendation({id}))
    }, [id])
    
   const getMoreInfo = () =>{
        dispatch(getMangaItemMore({id}))
        dispatch(getMangaItemCharacters({id}))
   }

   if(error){
    alert(error)
    dispatch(setErrorItem(null))
   }
   if(errorMore){
    alert(errorMore)
    dispatch(setErrorMore(null))
   }
    return ( 
        
        <div className='manga-item'>
            <div className='manga-item-content'>
                <img className='manga-img-item' src={item.images?.jpg?.image_url} alt="" />
                <div>
                    <div className="name">{item.title_english}</div>
                    <div className="name">{item.title_japanese}</div>
                    <div className="score">Score: {item.score}</div>
                    <div>{item.chapters &&  <div>Chapters: {item.chapters}</div>}</div>
                    <div className="status">{item.status}</div>
                    <div className="year">Published {item?.published?.prop.from.day}.{item.published?.prop.from.month}.{item.published?.prop.from.year}</div>
                    <div className='type'>{item.genres && item.genres.map((res) => <div className='type-item' key={res.name}>{res.name}</div>)}</div>
                    <div className="description">Description:</div>
                    <div className="description-title">{item.synopsis}</div>
                    <hr />
                </div>
            </div>

            <div>
                {recomendation[0] && <div className="another">Another</div>}
                <Slider {...settings} className='slider'>
                    { recomendation &&
                        recomendation.map((res, i) => i <25? (
                            <div className="card">
                                <div className="card-top">
                                <Link className="name-item" to={'/' + res.entry.mal_id}>
                                        <img className="recomendation-img" src={res.entry?.images.jpg.image_url} alt="" />
                                </Link>
                                </div>
                                <div className="card-bottom">
                                    <Link className="name-item" to={'/' + res.entry.mal_id}>{res.entry.title}</Link> 
                                </div>
                            </div>
                        ): null)
                    }
                </Slider>
            </div>    
            <button className="more" onClick={() => getMoreInfo()}>More info</button>  
            <div>
                <div className="more-info">
                    {moreInfo.moreinfo}
                </div>
                <div>
                {characters && characters[0] &&<div className="character-text">Characters</div>}
                    <div className="characters">
                        {characters ? characters.map((res)=> 
                            <div className="character">
                                <div>
                                    <img className="img-character" src={res.character?.images.jpg.image_url} alt="" />
                                </div>
                                <div className="character-first-name">
                                    {Array(res.character.name).map((res) => res.split(',').join(' '))}
                                </div>
                                <div>Role: {res.role}</div>
                                <Link to={'/character/' + res.character.mal_id }>
                                    <div className="character-name">More</div>
                                </Link>
                            </div>
                        ): null}
                    </div>    
                </div>
                
            </div>
        </div>
    )
}

//.filter((res) => res.role == 'Main')