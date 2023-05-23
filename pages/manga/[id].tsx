import * as React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import axios from 'axios';
import styles from '../../styles/itemPage.module.css'
import '../../types.d.ts'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemStatistic from '../../components/ItemStatistic';
import ItemUpContent from '../../components/ItemUpContent';
import SelectedTypeBlock from '../../components/SelectedTypeBlock'
import SlidersBlock from '../../components/SlidersBlock';
import Layout from '../../components/Layout';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

const type = ['Recommendations', 'Pictures', 'Characters']

interface iProps {
  manga: any | any[],
  statistic: any | any[] | null,
  recommendations: any | any[]
}

const MangaPage: React.FC<iProps> = ({ manga, statistic, recommendations }) => {
  const router = useRouter()
  const { id } = router.query
  const [images, setImages] = React.useState<any[] | null>(null)
  const [characters, setCharacters] = React.useState<any[] | null>(null)
  const [selectedType, setSelectedType] = React.useState<string>('Recommendations')
  const [savedManga, setSavedManga] = React.useState<null | any[]>(null)

  const getImages = async () => {
    const { data } = await axios.get(`https://api.jikan.moe/v4/manga/${id}/pictures`)
    if (data) setImages(data.data)
  }
  const getCharacters = async () => {
    const { data } = await axios.get(`https://api.jikan.moe/v4/manga/${id}/characters`)
    if (data) setCharacters(data.data.slice(0, 20))
  }

  React.useEffect(() => {
    setCharacters(null)
    setImages(null)
    setTimeout(() => {
      getImages()
      getCharacters()
    }, 1500);
    const dataManga = localStorage.getItem('manga')
    if (typeof dataManga === 'string') {
      setSavedManga(JSON.parse(dataManga));
    }
  }, [id])

  const redirectToGenres = (genreId) => {
    router.push({
      pathname: '/manga/genres',
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


  const savedToMe = (id: string, img: string, title: string): void => {
    const data = {
      id,
      img,
      title
    }
    if (savedManga !== null || false) {
      if (savedManga.filter(manga => manga.id == id).length > 0) {
        setSavedManga(savedManga.filter((element) => element.id != id))
        localStorage.setItem("manga", JSON.stringify(savedManga.filter((element) => element.id != id)))
      } else {
        setSavedManga([...new Set([...savedManga, data])])
        localStorage.setItem("manga", JSON.stringify([...new Set([...savedManga, data])]))
      }
    }
    else {
      localStorage.setItem("manga", JSON.stringify([data]))
    }
  }


  return (<>
    <Layout title={manga.title} >
      <div className={styles.bodyPage}>
        {images
          ? <><img className={styles.backImage} src={images[0].jpg.large_image_url} />
            <div className={styles.wrap} /> </>
          : null}

        <div className={styles.containTitle}>
          <div className={styles.up}>
            <ItemUpContent styles={styles} content={manga} redirectToGenres={redirectToGenres} />
            {savedManga &&
              savedManga.filter(manga => manga.id == id).length > 0
              ? <AiFillStar className={styles.starIcon} onClick={() => savedToMe(manga.mal_id, manga.images.jpg.image_url, manga.title)} />
              : <AiOutlineStar className={styles.starIcon} onClick={() => savedToMe(manga.mal_id, manga.images.jpg.image_url, manga.title)} />
            }
          </div>
          <div className={styles.down}>
            <div className={styles.left}>
              <ItemStatistic styles={styles} content={manga} contentType='manga' statistic={statistic} />
            </div>
            <div className={styles.right}>
              <SelectedTypeBlock styles={styles} selectedType={selectedType} setSelectedType={setSelectedType} type={type} />
              <SlidersBlock
                pathName={'manga'}
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

export default MangaPage


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const manga = await axios.get(`https://api.jikan.moe/v4/manga/${query.id}`)
  const statistic = await axios.get(`https://api.jikan.moe/v4/manga/${query.id}/statistics`)
  let recommendations;
  const recommendationsInfo = await axios.get(`https://api.jikan.moe/v4/manga/${query.id}/recommendations`)
  if ([recommendationsInfo.data.data].length > 20) {
    recommendations = recommendationsInfo.data.data.slice(0, 20)
  } else {
    recommendations = recommendationsInfo.data.data
  }

  return {
    props: {
      manga: manga.data.data,
      recommendations: recommendations || null,
      statistic: statistic.data.data || null,
    }
  }

}