import * as React from 'react';
import Slider from 'react-slick';
import settings from './settingSlider';
import Link from 'next/link';



const SlidersBlock = ({ recommendations, selectedType, styles, images, characters, pathName }) => {
  return (<>
    {recommendations && selectedType === "Recommendations"
      ? <Slider {...settings} className={styles.slider}>
        {recommendations.map((contentItem) => (
          <Link className={styles.cardItemRec} href={`/${pathName}/${contentItem.entry.mal_id}`}>
            <img className={styles.sliderImg} src={contentItem.entry.images.jpg.image_url} alt="" />
            <div className={styles.cardTitleRec}>{contentItem.entry.title}</div>
          </Link>
        ))}
      </Slider>
      : null
    }
    {
      images && selectedType === 'Pictures'
        ? <Slider {...settings} className={styles.slider}>
          {images.map((img) => (
            <div>
              <img className={styles.sliderImg} src={img.jpg.image_url} alt="" />
            </div>
          ))}
        </Slider>
        : null
    }
    {
      characters && selectedType === 'Characters'
        ? <Slider {...settings} className={styles.slider}>
          {characters.map((character) => (
            <div>
              <img className={styles.sliderImg} src={character.character.images.jpg.image_url} alt="" />
              <div className={styles.cardTitleRec}>{character.character.name}</div>
            </div>
          ))}
        </Slider>
        : null
    }
  </>);
}

export default SlidersBlock;