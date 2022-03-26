import { AnimatePresence, motion } from "framer-motion"
import { useEffect } from "react"
import { useMoralisQuery } from "react-moralis"
import { useSetRecoilState } from "recoil"
import { Upper, Lower } from "../components/LandingPage"
import Metadata from "../components/Other/Metadata"
import { listingsState } from "../store/listingsSlice"

const Home = () => {
  const setListings = useSetRecoilState(listingsState)
  //prettier-ignore
  const { data: allListings } = useMoralisQuery(
    "MarketItems",
    (query) => query
    .equalTo("sold", false)
    .equalTo('confirmed', true)
    .descending("createdAt"),
    [],
    { live: true }
  )

  useEffect(() => {
    setListings(allListings)
  }, [allListings])

  return (
    <>
      <Metadata title='NFT Explorer | Launchpad and Marketplace' />
      <AnimatePresence>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='relative'>
          <Upper />
          <Lower />
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default Home
