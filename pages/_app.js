import "../styles/Globals.css"
import { MoralisProvider } from "react-moralis"
import { DAppProvider } from "@usedapp/core"
import Layout from "../components/Layout"
const SERVER_URL = "https://ygd29vv4jadp.moralishost.com:2053/server",
  APP_ID = "OAXJng37MqF1XffwA6KURrtaGneUqYzTPDNrt8Iz"
//prettier-ignore"
function MyApp({ Component, pageProps }) {
  return (
    <DAppProvider>
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MoralisProvider>
    </DAppProvider>
  )
}

export default MyApp
