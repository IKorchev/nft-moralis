import Navbar from "./Navbar/Navbar"
import Footer from "./Footer"
import { useEffect } from "react"
import Moralis from "moralis"
import { motion } from "framer-motion"
const SERVER_URL = "https://ygd29vv4jadp.moralishost.com:2053/server",
  APP_ID = "OAXJng37MqF1XffwA6KURrtaGneUqYzTPDNrt8Iz"
const Layout = ({ children }) => {
  useEffect(async () => {
    await Moralis.start({ serverUrl: SERVER_URL, appId: APP_ID })
  }, [])
  return (
    <motion.div
      exit={{ opacity: 0, scale: 0, transition: { duration: 3 } }}
      className='bg-gradient-to-l from-primary-dark to-primary-900 relative w-full'>
      <Navbar />
      {children}
      <Footer />
    </motion.div>
  )
}

export default Layout
