import * as React from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css'

const Homa = () => {
  return (<>
    <Layout title='Home'>
      <div className={styles.container}>
        <div>
          <div>
            <div className={styles.description}>This project was created to find anime and manga. It has the ability to filter by various criteria,
              search by title and recommendations for each individual anime or manga.</div>
            <div className={styles.api}>API for <a className={styles.link} href='https://docs.api.jikan.moe/' target='blank'>manga and anime</a></div>
          </div>
          <div>
            <div className={styles.technologies}>This project uses technologies such as:</div>
            <ul className={styles.ul}>
              <li className={styles.li}>- HTML</li>
              <li className={styles.li}>- CSS</li>
              <li className={styles.li}>- TypeScipt</li>
              <li className={styles.li}>- React</li>
              <li className={styles.li}>- Next</li>
              <li className={styles.li}>- SSR</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  </>)
}

export default Homa