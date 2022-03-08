import { AnimatePresence, motion } from "framer-motion"
import { Upper, Lower } from "../components/LandingPage"
import Metadata from "../components/Other/Metadata"

const Home = () => {
  return (
    <>
      <Metadata title='NFT Explorer | Launchpad and Marketplace' />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='relative '>
          <Upper />
          <Lower />
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default Home
