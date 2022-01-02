import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { useChain, useMoralis } from "react-moralis"
import NFTItem from "../../../components/NFTItem"
import { AnimatePresence, motion } from "framer-motion"
import { formatImage } from "../../../utils/common"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
const Asset = () => {
  const amountOfItems = 8
  const router = useRouter()
  const { contract: contractAddress } = router.query
  const { chainId } = useChain()
  const { Moralis } = useMoralis()
  const [tokenMetadata, setTokenMetadata] = useState({})
  const [nfts, setNFTs] = useState([])
  const [limit, setLimit] = useState(amountOfItems)
  const [total, setTotal] = useState(0)
  const loadMore = () => {
    if (total >= limit) {
      setLimit((e) => e + amountOfItems)
    }
  }
  const getData = async () => {
    try {
      const options = {
        address: contractAddress,
        chain: chainId,
        limit: limit,
      }
      // const result = await Moralis.Web3API.token.getNFTMetadata(options)
      const NFTs = await Moralis.Web3API.token.getAllTokenIds(options)
      // setTokenMetadata(result)
      setNFTs(NFTs.result)
      setTotal(NFTs.total)
      console.log(NFTs.total)
      console.log(limit)
      console.log("in getTokenData: offset changed")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [limit])

  return (
    <AnimatePresence initial={{ opacity: 0 }}>
      <div className='container px-24 mx-auto text-white'>
        <div className='grid grid-cols-4 items-center justify-center'>
          {nfts.map((el, i) => (
            <motion.div
              initial={{ opacity: 0, y: -25 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 50,
                  duration: 1,
                },
              }}
              exit={{ opacity: 0, y: -25 }}>
              <NFTItem
                key={el.token_uri}
                tokenUri={formatImage(el.token_uri)}
                metadata={el.metadata}
              />
            </motion.div>
          ))}
        </div>
        {total >= limit && (
          <div className='grid py-6 place-items-center'>
            <button
              className='p-4 px-6 text-xl rounded-lg text-white bg-gradient-to-r from-purple-700 to-blue-600'
              onClick={(e) => {
                e.stopPropagation()
                loadMore()
              }}>
              Load more
            </button>
          </div>
        )}
      </div>
    </AnimatePresence>
  )
}

export default Asset
