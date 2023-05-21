import Menu from "../components/Menu";
import * as React from 'react';
import Head from 'next/head'
import { useRouter } from "next/router";

const Layout = ({ children, title = 'Some page' }) => {

  const router = useRouter()

  const redirectToType = (type) => {
    router.push(`/${type}`)
  }

  return (<>
    <Head>
      <title>{title}</title>
    </Head>
    <Menu redirectToType={redirectToType} />
    {children}
  </>);
}

export default Layout;