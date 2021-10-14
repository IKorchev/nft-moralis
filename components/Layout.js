import Navbar from "./Navbar"
import Footer from "./Footer"
import { useEffect } from "react"
import Moralis from "moralis"
const SERVER_URL = "https://ygd29vv4jadp.moralishost.com:2053/server",
  APP_ID = "OAXJng37MqF1XffwA6KURrtaGneUqYzTPDNrt8Iz"
const Layout = ({ children }) => {
  useEffect(async () => {
    await Moralis.start({ serverUrl: SERVER_URL, appId: APP_ID })
  }, [])
  return (
    <div className='bg-gradient-to-l from-primary-dark to-primary-900 wrapper'>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
