import React from "react"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiStar } from "react-icons/fi";
import Slider from "react-slick";
import { SkeletonItem } from "./skeleton-item";
import { SkeletonCharacters } from "./skeleton-characters";

import { getMangaItem, getMangaRecomendation, setErrorItem } from "../store/manga-item/get-manga-item";
import { getMangaItemCharacters, getMangaItemMore, setCharacters, setErrorMore, setMoreInfo } from "../store/manga-item/get-more-manga-item";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { addFavorites, removeFavorites } from "../store/favorite";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../styles/manga-item.css';

export const MangaItem = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

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
    const styleBlack = {
        color: 'black',
    }
    const styleGold ={
        color: '#8B2F20',
    }

    let { id } = useParams()
    const item = useAppSelector(state => state.featchMangaItemSlice.mangaItem)
    const recomendation = useAppSelector(state => state.featchMangaItemSlice.recomendation)
    const characters = useAppSelector(state => state.featchMangaItemMoreSlice.characters)
    const moreInfo = useAppSelector(state => state.featchMangaItemMoreSlice.moreInfo)
    const error = useAppSelector(state => state.featchMangaItemSlice.errorItem)
    const errorMore = useAppSelector(state => state.featchMangaItemMoreSlice.errorMore)
    const loading = useAppSelector(state => state.featchMangaItemSlice.loading)
    const loadingMore = useAppSelector(state => state.featchMangaItemMoreSlice.loadingMore)
    const favoriteManga = useAppSelector(state => state.persistedReducer.favorites.favorites)
    const isFav = favoriteManga.map(res => res.mal_id)
    const user = useAppSelector(state => state.userSlice.user)
    
    React.useEffect(()=>{
        dispatch(setCharacters([]))
        dispatch(setMoreInfo(null))
        dispatch(getMangaItem(Number(id)))
        dispatch(getMangaRecomendation(Number(id)))
    }, [id])
    
   const getMoreInfo = () =>{
        dispatch(getMangaItemMore(Number(id)))
        dispatch(getMangaItemCharacters(Number(id)))
   }

    if(error){
        alert(error)
        dispatch(setErrorItem(null))
   }
    if(errorMore){
        alert(errorMore)
        dispatch(setErrorMore(null))
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
        
        <div className='manga-item'>
            { item && loading ? <div className='manga-item-content'>
                <img className='manga-img-item' src={item?.images?.jpg?.image_url} alt="" />
                <div className='favorit-item' 
                    style={isFav.includes(item.mal_id) ? styleGold : styleBlack} 
                    onClick={() =>  checkFav(item.mal_id, item.mal_id, item.images.jpg.image_url, item.title)}
                    >
                    <FiStar />
                </div>
                <div>
                    <div className="name">{item.title_english}</div>
                    <div className="name">{item.title_japanese}</div>
                    <div className="score">Score: {item.score}</div>
                    <div>{item.chapters &&  <div className="chapter-item">Chapters: {item.chapters}</div>}</div>
                    <div className="status">{item.status}</div>
                    <div className="year">Published {item?.published?.prop.from.day}.{item.published?.prop.from.month}.{item.published?.prop.from.year}</div>
                    <div className='type'>{item.genres && item.genres.map((res) => <div className='type-item' key={res.name}>{res.name}</div>)}</div>
                    <div className="description">Description:</div>
                    <div className="description-title">{item.synopsis}</div>
                    <hr />
                </div>
            </div>: null}

        <div>{!loading ? <><SkeletonItem /></>: null}</div>


            <div>
                {recomendation[0] && <div className="another">Another</div>}
                <Slider {...settings} className='slider'>
                    { recomendation && loading ?
                        recomendation.map((res: any, i: number) => i <25 ? 
                        (
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
                        )
                        :null)
                    :null }
                </Slider>      
            </div> 
            
            {loading ? <button className="more" onClick={() => getMoreInfo()}>More info</button>: null  }
             <div>
                <div className="more-info">
                    {moreInfo && moreInfo.moreinfo}
                </div>
                <div>{characters && characters[0] &&<div className="character-text">Characters</div>}
                <div className="characters">
                    {characters && loadingMore ? characters.map((res)=> 
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
                {!characters && !loadingMore && loading ? <div className="character-text">Characters</div>: null}
                {!characters && !loadingMore && loading ? <div className="characters skelet">{[...Array(12)].map(() => <div className="character"> <SkeletonCharacters /></div>)}</div>: null}    
                </div>
            </div>
        </div>
    )
}
