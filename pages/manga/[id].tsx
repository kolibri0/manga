import * as React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import axios, { AxiosResponse } from 'axios';
import styles from '../../styles/mangaPage.module.css'
import Slider from "react-slick";
import settings from '../../components/settingSlider'
import '../../types.d.ts'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';

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

  const getImages = async () => {
    const { data } = await axios.get(`https://api.jikan.moe/v4/manga/${id}/pictures`)
    if (data) setImages(data.data)
  }
  const getCharacters = async () => {
    const { data } = await axios.get(`https://api.jikan.moe/v4/manga/${id}/characters`)
    if (data) setCharacters(data.data.slice(0, 20))
  }

  const changeType = (type) => {
    setSelectedType(type)
    getCharacters()
  }

  React.useEffect(() => {
    setImages(null)
    setTimeout(() => {
      getImages()
    }, 1500);
  }, [id])


  return (<>
    <div className={styles.bodyPage}>
      {images
        ? <><img className={styles.backImage} src={images[0].jpg.large_image_url} />
          <div className={styles.wrap} /> </>
        : null}

      <div className={styles.containTitle}>
        <div className={styles.up}>
          <div className={styles.containImg}>
            <img className={styles.img} src={manga.images.jpg.image_url} alt="" width={200} />
          </div>
          <div className={styles.infoTitle}>
            <div className={styles.title}>{manga.title}</div>
            <div className={styles.genres}>{manga.genres.map((genre) => <div className={styles.genre}>{genre.name}</div>)}</div>
            <div className={styles.synopsis}>{manga.synopsis}</div>
          </div>
        </div>
        <div className={styles.down}>
          <div className={styles.left}>
            <div className={styles.card}>
              <div className={styles.cardItem}>Type: {manga.type}</div>
              <div className={styles.cardItem}>{manga.status}</div>
              <div className={styles.cardItem}>Favorites: {manga.favorites}</div>
              <div className={styles.cardItem}>Chapters: {manga.chapters ?? 'No info'}</div>
              {statistic && <div className={styles.cardItem}>Read: {statistic.total}</div>}
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
                  <Link className={styles.cardItemRec} href={`/manga/${mangaItem.entry.mal_id}`}>
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

export default MangaPage


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const manga = await axios.get(`https://api.jikan.moe/v4/manga/${query.id}`)
  const statistic = await axios.get(`https://api.jikan.moe/v4/manga/${query.id}/statistics`)
  const recommendations = await axios.get(`https://api.jikan.moe/v4/manga/${query.id}/recommendations`)
  return {
    props: {
      manga: manga.data.data,
      statistic: statistic.data.data || null,
      recommendations: recommendations.data.data.slice(0, 20)
    }
  }

}