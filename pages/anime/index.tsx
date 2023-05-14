import * as React from 'react';
import Menu from '../../components/Menu';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import { BiSearchAlt2 } from 'react-icons/bi'
import axios from 'axios';
import styles from '../../styles/CardItem.module.css'
import ContentItem from '../../components/ContentItem';
import ReactPaginate from 'react-paginate';
import debounce from 'lodash.debounce'

const TypeAnime = ['default', 'top']

const AnimeHome = ({ anime, pagination }) => {
  const router = useRouter()
  const [serchAnimeText, setSerachAnimeText] = React.useState('')
  const [value, setValue] = React.useState('')
  const [page, setPage] = React.useState(1)
  const [animeType, setAnimeType] = React.useState(TypeAnime[0])

  React.useEffect(() => {
    if (animeType === 'default' && (serchAnimeText.length || serchAnimeText.length == 0) && page) {
      router.push({
        pathname: '/anime',
        query: {
          page: page,
          search: serchAnimeText
        },
      });
    } else if (animeType === 'top' && page) {
      router.push({
        pathname: '/anime',
        query: {
          type: TypeAnime[1],
          page: page
        }
      })
    }
  }, [page, serchAnimeText])

  const redirectToType = (type) => {
    router.push(`/${type}`)
  }
  const redirectToItem = (id: string) => {
    router.push(`/anime/${id}`)
  }
  const redirectToGenres = () => {
    router.push(`/anime/genres`)
  }
  const getRandomAnime = async () => {
    const { data } = await axios.get(`https://api.jikan.moe/v4/random/anime`)
    router.push(`/anime/${data.data.mal_id}`)
  }
  const handlePageClick = (event: any) => {
    setPage(event.selected + 1)
  }

  const onChangeInput = (e) => {
    setValue(e.target.value)
    MyDebounce(e)
  }

  const MyDebounce = React.useCallback(
    debounce((e) => {
      setSerachAnimeText(e.target.value)
    }, 1000), []
  )
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      serchAnime()
    }
  }
  const changeAnimeType = () => {
    setAnimeType(animeType == TypeAnime[0] ? TypeAnime[1] : TypeAnime[0])
    if (animeType === 'default') {
      router.push({
        pathname: '/anime',
        query: {
          type: TypeAnime[1],
          page: 1,
        }
      })
    } else if (animeType === 'top') {
      router.push({
        pathname: '/anime',
        query: {
          page: 1,
          search: serchAnimeText
        },
      });
    }
  }

  const serchAnime = () => {
    router.push({
      pathname: '/anime',
      query: {
        page: page,
        search: serchAnimeText
      },
    });
    setSerachAnimeText('')
  }

  const checkAnimeTypeUrl = () => router.query.type ? true : false
  // console.log(anime)
  return (<div className={styles.container}>
    <Menu redirectToType={redirectToType} />
    <div className={styles.containManga}>
      <div className={styles.mangaNav}>
        <div className={styles.hr} />
        <div className={styles.navItems}>
          <div className={styles.containSearch}>
            <input className={styles.searchInput}
              type="text" placeholder='Search...'
              value={value} onKeyDown={handleKeyDown}
              onChange={(e) => onChangeInput(e)}
              disabled={checkAnimeTypeUrl()}
            />
            <button className={styles.searchBtn} onClick={() => serchAnime()} disabled={checkAnimeTypeUrl()}>
              <BiSearchAlt2 className={styles.searchIcon} />
            </button>
          </div>
          <div className={styles.navItem} onClick={() => redirectToGenres()}>Genres</div>
          <div className={styles.navItem} onClick={() => changeAnimeType()}>
            {checkAnimeTypeUrl() ? 'Anime' : 'Top anime'}
          </div>
          <div className={styles.navItem} onClick={() => getRandomAnime()}>Random anime</div>
        </div>
      </div>
      <div className={styles.containGrid}>
        {
          anime
            ? anime.map((animeItem) => <ContentItem styles={styles} contentItem={animeItem} redirectToItem={redirectToItem} />)
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
  </div>)
}

export default AnimeHome



export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let res;
  let page = query.page ?? 1
  if (query.search) {
    res = await axios.get(`https://api.jikan.moe/v4/anime?page=${page}&letter=${query.search}`)
  } else if (query.type) {
    res = await axios.get(`https://api.jikan.moe/v4/top/anime?page=${page}`)
  } else {
    res = await axios.get(`https://api.jikan.moe/v4/anime?page=${page}`)
  }

  // https://api.jikan.moe/v4/top/anime
  return {
    props: {
      anime: res.data.data || null,
      pagination: res.data.pagination || null,
    }
  }
}
