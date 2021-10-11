import Navbar from "./Navbar"
import Footer from "./Footer"
const Layout = ({ children }) => {
  return (
    <div className='bg-gradient-to-l from-primary-dark to-primary-900'>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
