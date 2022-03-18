import Navbar from "./Navbar/Navbar"
import Footer from "./Footer"
import { motion } from "framer-motion"
import { ToastContainer } from "react-toastify"
import InstallMetamask from "../Other/InstallMetamask"
import { useEffect, useRef, useState } from "react"
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
      exit={{ opacity: 0, scale: 0, transition: { duration: 3 } }}
      className='bg-primary-900 relative w-full bg-gradient-to-br '>
      <Navbar />
      <ToastContainer
        toastClassName='bg-primary-200 text-white shadow-md shadow-secondary-200/20 border border-secondary-500'
        progressClassName='bg-secondary-200'
        position='top-right'
        draggable={false}
        hideProgressBar={false}
      />
      {children}
      {!isInstalled.current && <InstallMetamask />}
      <Footer />
    </motion.div>
  )
}

export default Layout
