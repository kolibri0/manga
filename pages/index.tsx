import * as React from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

const Homa = () => {
  const router = useRouter()

  const redirectToType = (type) => {
    router.push(`/${type}`)
  }
  return (<>
    <Layout title='Home'>
      <div>
        as
      </div>
    </Layout>
  </>)
}

export default Homa