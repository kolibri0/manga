import * as React from 'react';
import Layout from '../../components/Layout'
import styles from '../../styles/saved.module.css'
import Link from 'next/link';

const Saved = () => {

  const [selectedType, setSelectedType] = React.useState('')
  const [anime, setAnime] = React.useState<null | any[]>(null)
  const [manga, setManga] = React.useState<null | any[]>(null)

  React.useEffect(() => {
    const data = localStorage.getItem('anime')
    if (typeof data === 'string') {
      setAnime(JSON.parse(data));
    }
    const dataManga = localStorage.getItem('manga')
    if (typeof dataManga === 'string') {
      setManga(JSON.parse(dataManga));
    }
  }, [])
  return (
    <Layout title='Saved'>
      <div className={styles.container}>
        <div className={styles.mangaNav}>
          <div className={styles.navItems}>
            <div className={selectedType === 'manga' ? styles.navItemSelected : styles.navItem} onClick={() => setSelectedType('manga')}>Manga</div>
            <div className={selectedType === 'anime' ? styles.navItemSelected : styles.navItem} onClick={() => setSelectedType('anime')}>Anime</div>
          </div>
        </div>
        <div className={styles.containGrid}>
          {
            manga && selectedType === 'manga'
              ? manga.map((mangaItem) => (
                <Link key={mangaItem.id} href={`/manga/${mangaItem.id}`}>
                  <img className={styles.img} src={mangaItem.img} alt="" />
                  <div className={styles.title}>{mangaItem.title}</div>
                </Link>
              ))
              : null
          }
          {
            anime && selectedType === 'anime'
              ? anime.map((animeItem) => (
                <Link key={animeItem.id} href={`/anime/${animeItem.id}`}>
                  <img className={styles.img} src={animeItem.img} alt="" />
                  <div className={styles.title}>{animeItem.title}</div>
                </Link>
              ))
              : null
          }
        </div>
      </div>
    </Layout>
  );
}

export default Saved;