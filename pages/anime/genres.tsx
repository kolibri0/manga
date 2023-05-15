import axios from 'axios';
import { GetServerSideProps } from 'next/types';
import * as React from 'react';
import styles from '../../styles/genres.module.css'
import Menu from '../../components/Menu'
import { useRouter } from 'next/router';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import ContentItem from '../../components/ContentItem'

const types = ["tv", "movie", "ova", "ona", "special", "music"]
const sortArray = ["title", "chapters", "volumes", "score", "popularity", "members", "favorites"]
const noGenres = [12, 26, 28, 44, 49, 53, 56, 65, 42]

const Genres = ({ genres, anime, pagination }) => {
  const router = useRouter()
  const [checkedState, setCheckedState] = React.useState<any[] | []>(new Array(genres.length).fill(false));
  const [showGenres, setShowGenres] = React.useState(false)
  const [showSort, setShowSort] = React.useState(false)
  const [selectedSort, setSelectedSort] = React.useState<string>(String(router.query.order_by) ?? '')
  const [selectedGenres, setSelectedGenres] = React.useState<string>(String(router.query.genres) ?? '')
  const [letter, setLetter] = React.useState('')
  const [selecyedType, setSelectedType] = React.useState(String(router.query.type) ?? "")
  const [selectedSortType, setSelectedSortType] = React.useState<string>(String(router.query.sort) ?? '')
  const [page, setPage] = React.useState(0)
  React.useEffect(() => {
    if (
      (selectedGenres?.length || selecyedType?.length || selectedSort?.length || selectedSortType?.length || letter?.length) && (page > 0)
      || (!(router.query.genres?.length || router.query.type?.length || router.query.order_by?.length || router.query.sort?.length || router.query.letter?.length) && (page > 0))
    ) {
      router.push({
        pathname: '/anime/genres',
        query: {
          genres: selectedGenres,
          type: selecyedType,
          order_by: selectedSort,
          sort: selectedSortType,
          letter: letter,
          page: page
        }
      })
    }
    if (router.query.genres?.length || router.query.type?.length || router.query.order_by?.length || router.query.sort?.length || router.query.letter?.length) {
      router.push({
        pathname: '/anime/genres',
        query: {
          genres: router.query.genres,
          type: router.query.type,
          order_by: router.query.order_by,
          sort: router.query.sort,
          letter: router.query.letter,
          page: page
        }
      })
    }
  }, [page])

  const redirectToType = (type) => {
    router.push(`/${type}`)
  }

  const onOptionChange = (type) => {
    setSelectedType(type)
  }
  const onSortChange = (sortItem) => {
    setSelectedSort(sortItem)
  }
  const onSortTypeChange = (type) => {
    setSelectedSortType(type)
  }
  const handlePageClick = (event: any) => {
    setPage(event.selected + 1)
  }
  const redirectToItem = (id) => {
    router.push(`/anime/${id}`)
  }
  const handleOnChange = (position: any) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState)
    let res: any | any[] = [];
    for (let i = 0; i < updatedCheckedState.length; i++) {
      res.push({ ...genres[i], checked: updatedCheckedState[i] })
    }
    setSelectedGenres(res.filter((genre) => genre.checked === true || genre.mal_id == router.query.genres).map((genre) => genre.mal_id).join(','))
  }

  const getResult = () => {
    router.push({
      pathname: '/anime/genres',
      query: {
        genres: selectedGenres,
        type: selecyedType,
        order_by: selectedSort,
        sort: selectedSortType,
        letter: letter,
        page: 1
      }
    })
  }

  const reset = () => {
    setSelectedType('')
    setSelectedSort('')
    setCheckedState(new Array(genres.length).fill(false))
    setSelectedSortType('')
    setSelectedGenres('')
    setLetter('')
    setPage(0)
    router.push({ pathname: '/anime/genres' })
  }

  return (<>
    <Menu redirectToType={redirectToType} />
    <div className={styles.container}>
      <div className={styles.containGenres}>
        <div className={styles.left}>
          <div className={styles.leftHead}>
            <div className={styles.catalog}>Catalog</div>
            <div className={styles.sortBlock}>
              <div className={styles.containSortTitle} onClick={() => setShowSort(!showSort)}>
                <div>Sort by</div>
                {showSort
                  ? <MdKeyboardArrowDown className={styles.sortArrow} />
                  : <MdKeyboardArrowRight className={styles.sortArrow} />
                }
              </div>
              {showSort &&
                <div className={styles.containSort}>
                  {
                    sortArray.map((sortItem) => (
                      <div className={styles.selectSort} onClick={() => onSortChange(sortItem)}>
                        <input className={styles.sortRadioBtn} type="radio" name='sort' id={sortItem} value={sortItem} />
                        <label htmlFor={sortItem}>{sortItem[0].toUpperCase() + sortItem.slice(1)}</label>
                      </div>
                    ))
                  }
                  <div className={styles.hr} />
                  {
                    <div className={styles.selectedSortTypeBlock}>
                      <div className={styles.selectSort} onClick={() => onSortTypeChange('asc')}>
                        <input className={styles.sortRadioBtn} type="radio" name='sortType' id={'asc'} value={'asc'} />
                        <label htmlFor={'asc'}>Asc</label>
                      </div>
                      <div className={styles.selectSort} onClick={() => onSortTypeChange('desc')}>
                        <input className={styles.sortRadioBtn} type="radio" name='sortType' id={'desc'} value={'desc'} />
                        <label htmlFor={'desc'}>Desc</label>
                      </div>
                    </div>
                  }
                </div>
              }
            </div>
          </div>
          <input
            className={styles.leftInput}
            type="text"
            placeholder='Search by title...'
            value={letter}
            onChange={(e) => setLetter(e.target.value)} />
          <div className={styles.containManga}>
            {
              anime
                ? anime.map((animeItem) => <ContentItem styles={styles} contentItem={animeItem} redirectToItem={redirectToItem} />)
                : null
            }
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
        <div className={styles.right}>
          <div className={showGenres ? styles.rightGenresBlockSelected : styles.rightGenresBlock}>
            <div className={styles.genres} onClick={() => setShowGenres(!showGenres)}>
              <div className={styles.genresTitle}>Genres</div>
              {showGenres
                ? <MdKeyboardArrowDown className={styles.genresArrow} />
                : <MdKeyboardArrowRight className={styles.genresArrow} />
              }
            </div>
            {showGenres &&
              <div className={styles.genresBlock}>
                {
                  genres.map((genre, index) => (
                    !noGenres.includes(genre.mal_id) ?
                      <div className={styles.genreBlock}>
                        <input
                          className={styles.genreCheckbox}
                          type="checkbox"
                          checked={[router.query.genres].includes(`${genre.mal_id}`) || checkedState[index]}
                          onChange={() => handleOnChange(index)}
                        />
                        <div>{genre.name}</div>
                      </div>
                      : null
                  ))}
              </div>
            }
            <div className={styles.btnBlock}>
              <button className={styles.reset} onClick={() => reset()}>Reset</button>
              <button className={styles.show} onClick={() => getResult()}>Show</button>
            </div>
            <div className={styles.radioGroup}>
              <div className={styles.radioItem} onClick={() => onOptionChange('')}>
                <input className={styles.radio} type="radio" name="type" id={'all'} value={''} />
                <label htmlFor={'all'}>All</label>
              </div>
              {types.map((type) => (
                <div className={styles.radioItem} onClick={() => onOptionChange(type)}>
                  <input className={styles.radio} type="radio" name="type" id={type} value={type} />
                  <label htmlFor={type}>{type[0].toUpperCase() + type.slice(1)}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

  </>)

}

export default Genres



export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let res;
  const { data } = await axios.get(`https://api.jikan.moe/v4/genres/anime`)
  let page = query.page ?? 1

  if (query.genres?.length || query.type?.length || query.order_by?.length || query.sort?.length || query.letter?.length) {
    res = await axios.get(`https://api.jikan.moe/v4/anime?type=${query.type ?? ''}&genres=${query.genres ?? ''}&order_by=${query.order_by ?? ''}&sort=${query.sort ?? ''}&letter=${query.letter ?? ''}&page=${page}&genres_exclude=12,26,28,44,49,53,56`)
  } else {
    res = await axios.get(`https://api.jikan.moe/v4/anime?page=${page}&genres_exclude=12,26,28,44,49,53,56`)
  }
  // console.log(!!query.genres?.length)
  // &sort=desc
  return {
    props: {
      genres: data.data || null,
      anime: res?.data?.data || null,
      pagination: res?.data?.pagination || null
    }
  }
}
