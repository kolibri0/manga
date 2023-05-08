import * as React from 'react';
import axios from 'axios'
import { GetServerSideProps } from 'next/types';
import styles from '../../styles/CardItem.module.css'
import '../../types.d.ts'
import Link from 'next/link'
import Menu from '../../components/Menu';
import { useRouter } from 'next/router';
import { BiSearchAlt2 } from 'react-icons/bi'


const Home = ({ manga }) => {
  const router = useRouter()
  // console.log(router)

  const redirectToType = (type) => {
    router.push(`/${type}`)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log('do validate')
    }
  }

  return (<div className={styles.container}>
    <Menu redirectToType={redirectToType} />
    <div className={styles.containManga}>

      <div className={styles.mangaNav}>
        <div className={styles.hr} />
        <div className={styles.navItems}>
          <div className={styles.containSearch}>
            <input className={styles.searchInput} type="text" placeholder='Search...' onKeyDown={handleKeyDown} />
            <button className={styles.searchBtn}><BiSearchAlt2 className={styles.searchIcon} /></button>
          </div>
          <div className={styles.navItem}>Genres</div>
          <div className={styles.navItem}>Top manga</div>
          <div className={styles.navItem}>Random manga</div>
          <div className={styles.navItem}>Top character</div>
        </div>
      </div>
      <div className={styles.containGrid}>
        {
          manga
            ? manga.map((mangaItem) => (
              <Link className={styles.CardItem} key={mangaItem.mal_id} href={`/manga/${mangaItem.mal_id}`}>
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
              </Link>
            ))
            : null
        }
      </div>
    </div>

  </div>)
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let res;
  // const {data} = await axios.get(`https://api.jikan.moe/v4/manga?page=${selectedPage}&letter=${letter}&type=${selected}&genres_exclude=12,28,26&limit=24`)
  const { data } = await axios.get(`https://api.jikan.moe/v4/manga?page=1&genres_exclude=12,28,26&limit=24`)
  // console.log(query)
  return {
    props: {
      manga: data.data
    }
  }

}