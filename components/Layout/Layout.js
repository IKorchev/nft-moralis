import Navbar from "./Navbar/Navbar"
import Footer from "./Footer"
import { motion } from "framer-motion"
import { ToastContainer } from "react-toastify"
const Layout = ({ children }) => {
  return (
    <motion.div
      exit={{ opacity: 0, scale: 0, transition: { duration: 3 } }}
      className='bg-gradient-to-l from-primary-dark to-primary-900 relative w-full'>
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
