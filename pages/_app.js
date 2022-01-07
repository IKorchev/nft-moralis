import "../styles/Globals.css"
import { MoralisProvider } from "react-moralis"
import { DAppProvider } from "@usedapp/core"
import Layout from "../components/Layout"
import { useEffect, useState } from "react"
import MoralisDataProvider from "../components/Providers/MoralisDataProvider"
import Moralis from "moralis"

const SERVER_URL = "https://puvi0xctfpov.usemoralis.com:2053/server",
  APP_ID = "5pxsdN5InAwggSVfnEr8c2ZB7orX8iDJCJ4V8REC"

//prettier-ignore"
const MyApp = ({ Component, pageProps }) => {
  const [called, setCalled] = useState(false)
  const start = async () => {
    await Moralis.start({ appId: APP_ID, serverUrl: SERVER_URL })
    setCalled(true)
  }
  useEffect(() => {
    start()
  }, [])
  return (
    called && (
      <MoralisProvider appId={APP_ID || ""} serverUrl={SERVER_URL || ""}>
        <DAppProvider>
          <MoralisDataProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MoralisDataProvider>
        </DAppProvider>
      </MoralisProvider>
    )
  )
}

export default MyApp
