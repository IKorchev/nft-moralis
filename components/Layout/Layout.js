import Navbar from "./Navbar/Navbar"
import Footer from "./Footer"
import { motion } from "framer-motion"
import { ToastContainer } from "react-toastify"
import InstallMetamask from "../InstallMetamask"
import { useEffect, useState } from "react"
import Moralis from "moralis"

const Layout = ({ isMetamaskInstalled, children }) => {
  const [isInstalled, setIsInstalled] = useState(true)

  useEffect(() => {
    const checkInstalled = async () => {
      setIsInstalled(await Moralis.Web3.isMetaMaskInstalled())
    }
    checkInstalled()
  }, [])

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0, transition: { duration: 3 } }}
      className='bg-primary-900 relative w-full'>
      <Navbar />
      <ToastContainer className='' position='top-right' draggable={false} hideProgressBar={false} />
      {children}
      {!isInstalled && <InstallMetamask />}
      <Footer />
    </motion.div>
  )
}

export default Layout
