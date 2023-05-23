import * as React from 'react';
import axios from 'axios'
import { GetServerSideProps } from 'next/types';
import styles from '../../styles/CardItem.module.css'
import '../../types.d.ts'
import { useRouter } from 'next/router';
import { BiSearchAlt2 } from 'react-icons/bi'
import ReactPaginate from 'react-paginate';
import debounce from 'lodash.debounce'
import ContentItem from '../../components/ContentItem';
import Layout from '../../components/Layout';


const TypeManga = ['default', 'top']

const Home = ({ manga, pagination }) => {
  const router = useRouter()
  const [serchMangaText, setSerachMangaText] = React.useState('')
  const [value, setValue] = React.useState('')
  const [page, setPage] = React.useState(1)
  const [mangaType, setMangaType] = React.useState(TypeManga[0])

  React.useEffect(() => {
    if (mangaType === 'default' && (serchMangaText.length || serchMangaText.length == 0) && page) {
      router.push({
        pathname: '/manga',
        query: {
          page: page,
          search: serchMangaText
        },
      });
    } else if (mangaType === 'top' && page) {
      router.push({
        pathname: '/manga',
        query: {
          type: TypeManga[1],
          page: page
        }
      })
    }
  }, [page, serchMangaText])


  const redirectToGenres = () => {
    router.push(`/manga/genres`)
  }
  const redirectToItem = (id: string) => {
    router.push(`/manga/${id}`)
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      serchManga()
    }
  }

  const onChangeInput = (e) => {
    setValue(e.target.value)
    MyDebounce(e)
  }

  const MyDebounce = React.useCallback(
    debounce((e) => {
      setSerachMangaText(e.target.value)
    }, 1000), []
  )

  const handlePageClick = (event: any) => {
    setPage(event.selected + 1)
  }

  const serchManga = () => {
    router.push({
      pathname: '/manga',
      query: {
        page: page,
        search: serchMangaText
      },
    });
    setSerachMangaText('')
  }

  const changeMangaType = () => {
    setMangaType(mangaType == TypeManga[0] ? TypeManga[1] : TypeManga[0])
    if (mangaType === 'default') {
      router.push({
        pathname: '/manga',
        query: {
          type: TypeManga[1],
          page: 1,
        }
      })
    } else if (mangaType === 'top') {
      router.push({
        pathname: '/manga',
        query: {
          page: 1,
          search: serchMangaText
        },
      });
    }
  }

  const getRandomManga = async () => {
    const { data } = await axios.get(`https://api.jikan.moe/v4/random/manga`)
    router.push(`/manga/${data.data.mal_id}`)
  }



  const checkMangaTypeUrl = () => router.query.type ? true : false
  return (
    <Layout title='Manga'>
      <div className={styles.container}>
        <div className={styles.containManga}>
          <div className={styles.mangaNav}>
            <div className={styles.hr} />
            <div className={styles.navItems}>
              <div className={styles.containSearch}>
                <input className={styles.searchInput}
                  type="text" placeholder='Search...'
                  value={value} onKeyDown={handleKeyDown}
                  onChange={(e) => onChangeInput(e)}
                  disabled={checkMangaTypeUrl()}
                />
                <button className={styles.searchBtn} onClick={() => serchManga()} disabled={checkMangaTypeUrl()}><BiSearchAlt2 className={styles.searchIcon} /></button>
              </div>
              <div className={styles.navItem} onClick={() => redirectToGenres()}>Genres</div>
              <div className={styles.navItem} onClick={() => changeMangaType()}>{checkMangaTypeUrl() ? 'Manga' : 'Top manga'}</div>
              <div className={styles.navItem} onClick={() => getRandomManga()}>Random manga</div>
            </div>
          </div>
          <div className={styles.containGrid}>
            {
              manga
                ? manga.map((mangaItem) => <ContentItem styles={styles} contentItem={mangaItem} redirectToItem={redirectToItem} />)
                : null
            }
          </div>
        </div>
        {pagination && pagination.last_visible_page &&
          <ReactPaginate
            className={styles.pagination}
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={pagination.last_visible_page}
            previousLabel="<"
          />
        }
      </div>
    </Layout>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let res;
  let page = query.page ?? 1
  if (query.search) {
    res = await axios.get(`https://api.jikan.moe/v4/manga?page=${query.page}&letter=${query.search}&genres_exclude=12,28,26&limit=24`)
  } else if (query.type) {
    res = await axios.get(`https://api.jikan.moe/v4/top/manga?page=${query.page}&genres_exclude=12,28,26&limit=24`)
  } else {
    res = await axios.get(`https://api.jikan.moe/v4/manga?page=${page}&genres_exclude=12,28,26&limit=24`)
  }
  return {
    props: {
      manga: res.data.data || null,
      pagination: res.data.pagination || null,
    }
  }

}