import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

const layout = ({ children }) => {
  const router = useRouter()
  const [isLoading, setLoading] = useState(true)

  // useEffect(() => {
  //   const localUser = window.localStorage.getItem('user')

  //   if (!localUser) {
  //     router.push('/login')
  //   }
    
  //   setLoading(false);
  // }, [])

  // if (isLoading) return <div> Loading... </div>

  return (
    <div className="container">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
          crossOrigin="anonymous" />
      </Head>

      {children}

    </div>
  )
}

export default layout;