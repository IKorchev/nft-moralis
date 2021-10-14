import "../styles/Globals.css"
import Moralis from "moralis"
import { MoralisProvider } from "react-moralis"
import { DAppProvider } from "@usedapp/core"
import Layout from "../components/Layout"
import { useEffect } from "react"
const SERVER_URL = "https://ygd29vv4jadp.moralishost.com:2053/server",
  APP_ID = "OAXJng37MqF1XffwA6KURrtaGneUqYzTPDNrt8Iz"

//prettier-ignore"
function MyApp({ Component, pageProps }) {
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
