import * as React from 'react';

interface IProps {
  styles: any,
  content: any,
  contentType: string,
  statistic?: any
}

const ItemStatistic: React.FC<IProps> = ({ styles, content, contentType, statistic }) => {
  return (<>
    <div className={styles.card}>
      <div className={styles.cardItem}>Type: {content.type}</div>
      <div className={styles.cardItem}>{content.status}</div>
      <div className={styles.cardItem}>Favorites: {content.favorites}</div>
      <div className={styles.cardItem}>{contentType == 'manga'
        ? `Chapters: ${content.chapters ?? 'No info'}`
        : `Episodes: ${content.episodes ?? 'No info'}`
      }</div>
      {
        statistic
          ? <div className={styles.cardItem}>Read: {statistic.total}</div>
          : null
      }
    </div>
  </>);
}

export default ItemStatistic;

