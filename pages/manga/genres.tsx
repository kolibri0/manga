import axios from 'axios';
import { GetServerSideProps } from 'next/types';
import * as React from 'react';
import Menu from '../../components/Menu'
import { useRouter } from 'next/router';
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md'
import styles from '../../styles/genres.module.css'
import Link from 'next/link'
import ReactPaginate from 'react-paginate';


const types = ["manga", "novel", "lightnovel", "oneshot", "doujin", "manhwa", "manhua"]
const sortArray = ["title", "chapters", "volumes", "score", "popularity", "members", "favorites"]
const noGenres = [12, 26, 28, 44, 49, 53, 56, 65, 42]

const Genres = ({ genres, manga, pagination }) => {
  const router = useRouter()

  const [checkedState, setCheckedState] = React.useState<any[] | []>(new Array(genres.length).fill(false));
  const [selectedGenres, setSelectedGenres] = React.useState<string>('')
  const [selectedSort, setSelectedSort] = React.useState<string>('')
  const [selectedSortType, setSelectedSortType] = React.useState<string>('')
  const [selecyedType, setSelectedType] = React.useState("")
  const [page, setPage] = React.useState(1)
  const [showSort, setShowSort] = React.useState(false)
  const [showGenres, setShowGenres] = React.useState(false)

  React.useEffect(() => {
    router.push({
      pathname: '/manga/genres',
      query: {
        genres: selectedGenres,
        type: selecyedType,
        order_by: selectedSort,
        sort: selectedSortType,
        page: page
      }
    })
  }, [page])

  const handleOnChange = (position: any) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState)
    let res: any | any[] = [];
    for (let i = 0; i < updatedCheckedState.length; i++) {
      res.push({ ...genres[i], checked: updatedCheckedState[i] })
    }
    setSelectedGenres(res.filter((genre) => genre.checked === true).map((genre) => genre.mal_id).join(','))
  }

  const redirectToType = (type) => {
    router.push(`/${type}`)
  }

  const getResult = () => {
    router.push({
      pathname: '/manga/genres',
      query: {
        genres: selectedGenres,
        type: selecyedType,
        order_by: selectedSort,
        sort: selectedSortType,
        page: 1
      }
    })
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
  const reset = () => {
    setSelectedType('')
    setSelectedSort('')
    setCheckedState(new Array(genres.length).fill(false))
    setSelectedSortType('')
    setSelectedGenres('')
    setPage(1)
    router.push({
      pathname: '/manga/genres',
      query: {
        genres: '',
        type: '',
        order_by: '',
        sort: '',
        page: 1
      }
    })
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
          <input className={styles.leftInput} type="text" placeholder='Search by title...' />
          <div className={styles.containManga}>
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
                        {
                          mangaItem.synopsis
                            ? <div className={styles.synopsis}>{mangaItem.synopsis.slice(0, 200) + '...'}</div>
                            : null
                        }
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
                          checked={checkedState[index]}
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
  const { data } = await axios.get(`https://api.jikan.moe/v4/genres/manga`)

  if (query.genres?.length || query.type?.length || query.order_by?.length || query.sort?.length || query.page) {
    res = await axios.get(`https://api.jikan.moe/v4/manga?type=${query.type}&genres=${query.genres}&order_by=${query.order_by}&sort=${query.sort}&page=${query.page}&genres_exclude=12,26,28,44,49,53,56`)
  } else {
    res = await axios.get(`https://api.jikan.moe/v4/manga?genres_exclude=12,26,28,44,49,53,56`)
  }
  // &sort=desc
  return {
    props: {
      genres: data.data,
      manga: res.data.data,
      pagination: res.data.pagination
    }
  }
}