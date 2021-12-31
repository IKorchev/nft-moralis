import "../styles/Globals.css"
import { MoralisProvider } from "react-moralis"
import { DAppProvider } from "@usedapp/core"
import Moralis from "moralis"
import Layout from "../components/Layout"
import { useEffect } from "react"
const SERVER_URL = "https://puvi0xctfpov.usemoralis.com:2053/server",
  APP_ID = "5pxsdN5InAwggSVfnEr8c2ZB7orX8iDJCJ4V8REC"

//prettier-ignore"
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    Moralis.enableWeb3()
  }, [])
  return (
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <DAppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DAppProvider>
    </MoralisProvider>
  )
}

export default MyApp
