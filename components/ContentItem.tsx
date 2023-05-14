import * as React from 'react';
import Link from 'next/link'

const ContentItem = ({ styles, contentItem, redirectToItem }) => {


  return (
    <div className={styles.CardItem} key={contentItem.mal_id} onClick={() => redirectToItem(contentItem.mal_id)}>
      <div className={styles.containImg}>
        <img className={styles.img} src={contentItem?.images.jpg.image_url} alt="" />
        <div className={styles.descriptionBody}>
          <div className={styles.info}>
            <div>{contentItem.status}</div>
            <div className={styles.score}>{contentItem.score}</div>
          </div>
          <div className={styles.type}>{contentItem.type}</div>
          {
            contentItem.synopsis
              ? <div className={styles.synopsis}>{contentItem.synopsis.slice(0, 200) + '...'}</div>
              : null
          }
        </div>
      </div>
      <div>
        <div className={styles.cardTitle}>{contentItem?.title}</div>
      </div>
    </div>

  )
}

export default ContentItem