import * as React from 'react';
import { useRouter } from 'next/router'
import styles from '../../styles/itemPage.module.css'
import '../../types.d.ts'
import axios from 'axios';
import { GetServerSideProps } from 'next/types';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Menu from '../../components/Menu';
import ItemStatistic from '../../components/ItemStatistic';
import ItemUpContent from '../../components/ItemUpContent';
import SelectedTypeBlock from '../../components/SelectedTypeBlock';
import SlidersBlock from '../../components/SlidersBlock';
import Layout from '../../components/Layout';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const type = ['Recommendations', 'Pictures', 'Characters']

const AnimeItemPage = ({ anime, recommendations, images }) => {
  const router = useRouter()
  const { id } = router.query
  const [characters, setCharacters] = React.useState<any[] | null>(null)
  const [selectedType, setSelectedType] = React.useState<string>('Recommendations')
  const [savedAnime, setSavedAnime] = React.useState<null | any[]>(null)

  const getCharacters = async () => {
    const { data } = await axios.get(`https://api.jikan.moe/v4/anime/${id}/characters`)
    if (data) setCharacters(data.data.slice(0, 20))
  }

  const redirectToType = (type) => {
    router.push(`/${type}`)
  }
  const redirectToGenres = (genreId) => {
    router.push({
      pathname: '/anime/genres',
      query: {
        genres: genreId,
        type: '',
        order_by: '',
        sort: '',
        letter: '',
        page: 0,
      }
    })
  }
  React.useEffect(() => {
    setCharacters(null)
    setTimeout(() => {
      getCharacters()
    }, 1500);
    const dataAnime = localStorage.getItem('anime')
    if (typeof dataAnime === 'string') {
      setSavedAnime(JSON.parse(dataAnime));
    }
  }, [id])


  const savedToMe = (id: string, img: string, title: string): void => {
    const data = {
      id,
      img,
      title
    }
    if (savedAnime !== null || false) {
      if (savedAnime.filter(manga => manga.id == id).length > 0) {
        setSavedAnime(savedAnime.filter((element) => element.id != id))
        localStorage.setItem("anime", JSON.stringify(savedAnime.filter((element) => element.id != id)))
      } else {
        setSavedAnime([...new Set([...savedAnime, data])])
        localStorage.setItem("anime", JSON.stringify([...new Set([...savedAnime, data])]))
      }
    }
    else {
      localStorage.setItem("anime", JSON.stringify([data]))
    }
  }




  return (<>
    <Layout title={anime.title}>
      <div className={styles.bodyPage}>
        {images
          ? <><img className={styles.backImage} src={images[0].jpg.large_image_url} />
            <div className={styles.wrap} /></>
          : null}

        <div className={styles.containTitle}>
          <div className={styles.up}>
            <ItemUpContent styles={styles} content={anime} redirectToGenres={redirectToGenres} />
            {savedAnime &&
              savedAnime.filter(manga => manga.id == id).length > 0
              ? <AiFillStar className={styles.starIcon} onClick={() => savedToMe(anime.mal_id, anime.images.jpg.image_url, anime.title)} />
              : <AiOutlineStar className={styles.starIcon} onClick={() => savedToMe(anime.mal_id, anime.images.jpg.image_url, anime.title)} />
            }
          </div>
          <div className={styles.down}>
            <div className={styles.left}>
              <ItemStatistic styles={styles} content={anime} contentType='anime' />
            </div>
            <div className={styles.right}>
              <SelectedTypeBlock styles={styles} selectedType={selectedType} setSelectedType={setSelectedType} type={type} />
              <SlidersBlock
                pathName={'anime'}
                styles={styles}
                selectedType={selectedType}
                recommendations={recommendations}
                characters={characters}
                images={images}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
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