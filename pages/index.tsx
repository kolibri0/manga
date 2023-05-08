import * as React from 'react';
import Menu from '../components/Menu';
import { useRouter } from 'next/router';

const Homa = () => {
  const router = useRouter()

  const redirectToType = (type) => {
    router.push(`/${type}`)
  }
  return (<>
    <Menu redirectToType={redirectToType} />
  </>)
}

export default Homa