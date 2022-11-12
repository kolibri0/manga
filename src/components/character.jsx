import React from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import Slider from "react-slick";

import './character.css'



export const Character = () => {
    const {id} = useParams()
    const settings = {
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500
      }
      const [characterInfo, setCharacterInfo] = React.useState({})
      const [image, setImage] = React.useState([])


    React.useEffect(()=>{
        setCharacterInfo({})
        setImage([])
        axios.get(`https://api.jikan.moe/v4/characters/${id}`).then((res) => setCharacterInfo(res.data.data))
        axios.get(`https://api.jikan.moe/v4/characters/${id}/pictures`).then((res) => setImage(res.data.data))
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