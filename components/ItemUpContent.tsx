import * as React from 'react';


const ItemUpContent = ({ styles, content, redirectToGenres }) => {
  return (<>
    <div className={styles.containImg}>
      <img className={styles.img} src={content.images.jpg.image_url} alt="" width={200} />
    </div>
    <div className={styles.infoTitle}>
      <div className={styles.title}>{content.title}</div>
      <div className={styles.genres}>{content.genres.map((genre) => <div className={styles.genre} onClick={() => redirectToGenres(genre.mal_id)}>{genre.name}</div>)}</div>
      <div className={styles.synopsis}>{content.synopsis.length < 900 ? content.synopsis : (content.synopsis.slice(0, 900) + ' ...')}</div>
    </div>
  </>);
}

export default ItemUpContent;