import * as React from 'react';
import { useRouter } from 'next/router'
import styles from '../../styles/itemPage.module.css'
import '../../types.d.ts'
import axios from 'axios';
import { GetServerSideProps } from 'next/types';
import Slider from 'react-slick';
import settings from '../../components/settingSlider';
import Link from 'next/link';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Menu from '../../components/Menu';


const AnimeItemPage = ({ anime, recommendations, images }) => {
  const router = useRouter()
  const { id } = router.query
  const [characters, setCharacters] = React.useState<any[] | null>(null)
  const [selectedType, setSelectedType] = React.useState<string>('Recommendations')

  const changeType = (type) => {
    setSelectedType(type)
    getCharacters()
  }

  const getCharacters = async () => {
    const { data } = await axios.get(`https://api.jikan.moe/v4/anime/${id}/characters`)
    if (data) setCharacters(data.data.slice(0, 20))
  }

  const redirectToType = (type) => {
    router.push(`/${type}`)
  }

  React.useEffect(() => {
    setCharacters(null)
  }, [])

  return (<>
    <Menu redirectToType={redirectToType} />
    <div className={styles.bodyPage}>
      {images
        ? <><img className={styles.backImage} src={images[0].jpg.large_image_url} />
          <div className={styles.wrap} /> </>
        : null}

      <div className={styles.containTitle}>
        <div className={styles.up}>
          <div className={styles.containImg}>
            <img className={styles.img} src={anime.images.jpg.image_url} alt="" width={200} />
          </div>
          <div className={styles.infoTitle}>
            <div className={styles.title}>{anime.title}</div>
            <div className={styles.genres}>{anime.genres.map((genre) => <div className={styles.genre}>{genre.name}</div>)}</div>
            <div className={styles.synopsis}>{anime.synopsis}</div>
          </div>
        </div>
        <div className={styles.down}>
          <div className={styles.left}>
            <div className={styles.card}>
              <div className={styles.cardItem}>Type: {anime.type}</div>
              <div className={styles.cardItem}>{anime.status}</div>
              <div className={styles.cardItem}>Favorites: {anime.favorites}</div>
              <div className={styles.cardItem}>Episodes: {anime.episodes ?? 'No info'}</div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.type}>
              <div className={'Recommendations' === selectedType ? styles.typeItemActive : styles.typeItem} onClick={() => setSelectedType('Recommendations')}>Recommendations</div>
              <div className={'Pictures' === selectedType ? styles.typeItemActive : styles.typeItem} onClick={() => setSelectedType('Pictures')}>Pictures</div>
              <div className={'Characters' === selectedType ? styles.typeItemActive : styles.typeItem} onClick={() => changeType('Characters')}>Characters</div>


            </div>
            {recommendations && selectedType === "Recommendations"
              ? <Slider {...settings} className={styles.slider}>
                {recommendations.map((mangaItem) => (
                  <Link className={styles.cardItemRec} href={`/anime/${mangaItem.entry.mal_id}`}>
                    <img className={styles.sliderImg} src={mangaItem.entry.images.jpg.image_url} alt="" />
                    <div>
                      <div className={styles.cardTitleRec}>{mangaItem.entry.title}</div>
                    </div>
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
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default AnimeItemPage




export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const anime = await axios.get(`https://api.jikan.moe/v4/anime/${query.id}`)
  const images = await axios.get(`https://api.jikan.moe/v4/anime/${query.id}/pictures`)
  const recommendations = await axios.get(`https://api.jikan.moe/v4/anime/${query.id}/recommendations`)
  return {
    props: {
      anime: anime.data.data,
      images: images.data.data || null,
      recommendations: recommendations.data.data.slice(0, 20)
    }
  }

}