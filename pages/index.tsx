import * as React from 'react';
import axios from 'axios'
import { GetServerSideProps } from 'next/types';
import styles from '../styles/CardItem.module.css'
import '../types.d.ts'


const Home = ({ manga }) => {

  console.log(manga)

  return (<div className={styles.container}>
    {/* <div className={styles.cardItem}>
      <div className={styles.containImg}>
        <img className={styles.img} src={manga[0]?.images.jpg.image_url} alt="" />
        <div className={styles.descriptionBody}>
          <div className={styles.info}>
            <div>{manga[0].status}</div>
            <div>{manga[0].score}</div>
          </div>
          <div className={styles.synopsis}>{manga[0].synopsis.slice(0, 200) + '...'}</div>
        </div>
      </div>
      <div>
        <div className={styles.cardTitle}>{manga[0]?.title}</div>
      </div>
    </div>
    <div className={styles.cardItem}>
      <div className={styles.containImg}>
        <img className={styles.img} src={manga[1]?.images.jpg.image_url} alt="" />
        <div className={styles.descriptionBody}>
          <div className={styles.info}>
            <div>{manga[1].status}</div>
            <div>{manga[1].score}</div>
          </div>
          <div className={styles.synopsis}>{manga[1].synopsis.slice(0, 200) + '...'}</div>
        </div>
      </div>
      <div>
        <div className={styles.cardTitle}>{manga[1]?.title}</div>
      </div>
    </div> */}
    {
      manga
        ? manga.map((mangaItem) => (
          <div className={styles.cardItem}>
            <div className={styles.containImg}>
              <img className={styles.img} src={mangaItem?.images.jpg.image_url} alt="" />
              <div className={styles.descriptionBody}>
                <div className={styles.info}>
                  <div>{mangaItem.status}</div>
                  <div className={styles.score}>{mangaItem.score}</div>
                </div>
                <div className={styles.type}>{mangaItem.type}</div>
                <div className={styles.synopsis}>{mangaItem.synopsis.slice(0, 200) + '...'}</div>
              </div>
            </div>
            <div>
              <div className={styles.cardTitle}>{mangaItem?.title}</div>
            </div>
          </div>
        ))
        : null
    }
  </div>)
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // const {data} = await axios.get(`https://api.jikan.moe/v4/manga?page=${selectedPage}&letter=${letter}&type=${selected}&genres_exclude=12,28,26&limit=24`)
  const { data } = await axios.get(`https://api.jikan.moe/v4/manga?page=1&genres_exclude=12,28,26&limit=24`)
  return {
    props: {
      manga: data.data
    }
  }

}