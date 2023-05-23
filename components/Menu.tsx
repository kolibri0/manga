import * as React from 'react';
import styles from '../styles/menu.module.css'
import '../types.d.ts'
import { ImHome } from 'react-icons/im'
import { useRouter } from 'next/router';

const types = ['manga', 'anime', 'saved']

interface IProps {
  redirectToType: (type: string) => void
}

const Menu: React.FC<IProps> = ({ redirectToType }) => {
  const router = useRouter()
  const [selectedType, setSelectedType] = React.useState('')
  const type = router.pathname.split('/').slice(1)[0]
  React.useEffect(() => {
    // setSelectedType(router.pathname.split('/').slice(1)[0])
    setSelectedType(type)
  }, [])
  return (<>
    <div className={styles.container}>
      <div className={styles.containMenu}>
        <div className={styles.left}>
          <div className={styles.homeContainer} onClick={() => redirectToType('')}>
            <ImHome className={styles.homeIcon} />
            <div className={styles.home}>HOME</div>
          </div>

        </div>
        <div className={styles.right}>
          <div className={styles.types}>
            {types.map((type) => (
              <div
                className={selectedType === type ? styles.typeActive : styles.type}
                onClick={() => redirectToType(type)}
              >{type[0].toUpperCase() + type.slice(1)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>)

}

export default Menu