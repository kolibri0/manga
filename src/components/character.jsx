import React from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import Slider from "react-slick";

import './character.css'
import { useDispatch, useSelector } from "react-redux";
import { getCharacter, getCharacterImg } from "../store/characters/characters";



export const Character = () => {
    const settings = {
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500
    }
    const dispatch = useDispatch()
    const {id} = useParams()
    const characterInfo = useSelector(state => state.featchCharacterSlice.characterInfo)
    const image = useSelector(state => state.featchCharacterSlice.image)


    React.useEffect(()=>{
        dispatch(getCharacter({id}))
        dispatch(getCharacterImg({id}))
    },[])

    console.log(characterInfo)

    return(
        <div className="container">
            {characterInfo.name && <h2 className="person-name">{characterInfo.name}</h2>}

            {image[2] ?
                <Slider {...settings} className='character-slider'>
                    {image.map((res) => <img className="character-img" key={toString(res?.jpg.image_url)} src={res?.jpg.image_url}/>)}
                </Slider>:
            <div>loading... or skellet</div>
            }
            {characterInfo.about && <div className="character-description">{characterInfo.about}</div>}
        </div>
    )
}