import Head from "next/head"
import Image from "next/image"
import router from 'next/router'
import loadingGif from '../../../public/images/loading.gif'
import useAuth from "../../data/hook/useAuth"

export default function ForceAuthentication(props: any) {
  const cookieAuthKey = process.env.NEXT_PUBLIC_COOKIE_AUTH_KEY

  const { user, loading } = useAuth()

  function renderContent() {
    return (
      <>
        <Head>
          <script dangerouslySetInnerHTML={{
            __html: `
              if(!document.cookie?.includes("${cookieAuthKey}")){
                window.location.href = "/authentication"
              }
            `
          }}
          />
        </Head>
        {props.children}
      </>
    )
  }

  function renderLoading() {
    return (
      <div className={`
        flex justify-center items-center h-screen
      `}>
        <Image src={loadingGif} />
      </div>
    )
  }

  if (!loading && user?.email) {
    return renderContent()
  } else if (loading) {
    return renderLoading()
  } else {
    router.push('/authentication')
    return null
  }
}
