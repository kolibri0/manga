import React from "react"
import { useParams } from "react-router-dom"

import Slider from "react-slick";
import { LoadingSpinner } from "./spiner";

import { getCharacter, getCharacterImg, setErrorCharacter } from "../store/characters/characters";
import { useAppDispatch, useAppSelector } from "../store/hook";

import '../styles/character.css'

export const Character = () => {
    const settings = {
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500
    }
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const characterInfo = useAppSelector(state => state.featchCharacterSlice.characterInfo)
    const image = useAppSelector(state => state.featchCharacterSlice.image)
    const error = useAppSelector(state => state.featchCharacterSlice.error)

    React.useEffect(()=>{
        dispatch(getCharacter(Number(id)))
        dispatch(getCharacterImg(Number(id)))
    },[])

    if(error){
        alert(error)
        dispatch(setErrorCharacter(null))
    }

    return(
        <div className="container">
            
            {characterInfo && <h2 className="person-name">{characterInfo.name}</h2>}

            {!image[2] ? <div className="loader"><LoadingSpinner /></div>:
                <Slider {...settings} className='character-slider'>
                    {image && image.map((res) => <img className="character-img" key={res.jpg.image_url} src={res?.jpg.image_url}/>)}
                </Slider>
            }
            {characterInfo && <div className="character-description">{characterInfo.about}</div>}
        </div>
    )
}