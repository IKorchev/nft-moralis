import Navbar from "./Navbar/Navbar"
import Footer from "./Footer"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import InstallMetamask from "../Other/InstallMetamask"
import Moralis from "moralis"

const Layout = ({ children }) => {
  const isInstalled = useRef(true)

  useEffect(() => {
    const checkInstalled = async () => {
      isInstalled.current = await Moralis.Web3.isMetaMaskInstalled()
    }
    checkInstalled()
  }, [])

  return (
    <motion.div
      style={{
        backgroundImage: "url('/bg-lights-2.png')",
        backgroundSize: "cover",
      }}
      exit={{ opacity: 0, scale: 0, transition: { duration: 3 } }}
      className='bg-primary-900 relative w-full '>
      <Navbar />
      {children}
      {!isInstalled.current && <InstallMetamask />}
      <Footer />
    </motion.div>
  )
}

export default Layout
