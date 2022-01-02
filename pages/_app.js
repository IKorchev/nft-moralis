import "../styles/Globals.css"
import { MoralisProvider } from "react-moralis"
import { DAppProvider } from "@usedapp/core"
import Layout from "../components/Layout"
import Moralis from "moralis"
import { useEffect } from "react"
const SERVER_URL = "https://puvi0xctfpov.usemoralis.com:2053/server",
  APP_ID = "5pxsdN5InAwggSVfnEr8c2ZB7orX8iDJCJ4V8REC"
//prettier-ignore"
const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const startMoralis = async () => await Moralis.enableWeb3()
    startMoralis()
  }, [])

  return (
    <DAppProvider>
      <MoralisProvider appId={APP_ID || ""} serverUrl={SERVER_URL || ""}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MoralisProvider>
    </DAppProvider>
  )
}

export default MyApp
