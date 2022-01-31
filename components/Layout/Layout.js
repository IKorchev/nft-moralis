import Navbar from "./Navbar/Navbar"
import Footer from "./Footer"
import { motion } from "framer-motion"
import { ToastContainer } from "react-toastify"
import { useLayoutEffect } from "react"
import { useMoralis } from "react-moralis"
const Layout = ({ children }) => {
  const { enableWeb3, isWeb3Enabled } = useMoralis()
  useLayoutEffect(() => {
    enableWeb3()
  }, [])
  return (
    <motion.div
      exit={{ opacity: 0, scale: 0, transition: { duration: 3 } }}
      className='bg-primary-900 relative w-full'>
      <Navbar />
      <ToastContainer
        className=''
        position='top-right'
        draggable={false}
        hideProgressBar={false}
      />
      {children}
      <Footer />
    </motion.div>
  )
}

export default Layout
