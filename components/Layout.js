import Navbar from "./Navbar/Navbar"
import Footer from "./Footer"
import { motion } from "framer-motion"

const Layout = ({ children }) => {
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
