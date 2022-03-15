import useSWR from "swr"
import Jazzicon from "../Other/Jazzicon"
import { shortenIfAddress } from "@usedapp/core"
import { AnimatePresence, motion } from "framer-motion"
import { getFetcher, revalidateOptions } from "../../utils/fetcher"
import { useMoralis } from "react-moralis"
import { useMemo } from "react"
import { findCollectionByAddress } from "../../store/store"
import { useRecoilValue } from "recoil"
import { collectionInfo } from "../../store/listingsSlice"
const CollectionHeader = ({ address }) => {
  const { Moralis } = useMoralis()
  const options = {
    url: address ? `/api/collection?address=${address}&chain=0x3` : null,
  }
  const collection = useRecoilValue(findCollectionByAddress(address))
  const { floor, listedCount } = useRecoilValue(collectionInfo(address))

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{ opacity: 0, y: -20 }}
        className='flex flex-col'>
        <div className='flex flex-col items-center'>
          <h1 className='text-center text-3xl font-black '>{collection?.collectionName}</h1>
          <div className='my-5 h-48 w-48 overflow-hidden rounded-full border-4 border-white'>
            <img src={collection?.imageUrl} alt='' className='h-full w-full' />
          </div>
          <h3 className=' -mt-12 rounded-full bg-white px-3 py-2 font-bold text-black'>{shortenIfAddress(address)}</h3>
        </div>
        <div className='container mx-auto my-5 max-w-[50rem] px-5'>
          <div
            className='rounded-lg 
            bg-gradient-to-b px-5 py-5 text-white '>
            <h4 className='border-secondary-100 mx-auto mb-5 w-max border-b-4 text-center text-xl'>Information</h4>
            <ul className='grid  grid-cols-3 gap-5 text-xs sm:text-lg'>
              <li className='border-secondary-200 bg-secondary-100/20 shadow-glass-large flex w-full flex-col items-center justify-between overflow-hidden rounded-lg border py-2 backdrop-blur-sm backdrop-filter'>
                <span>Floor Price</span>
                <span>{floor || "N/A"}</span>
              </li>
              <li className='border-secondary-200 bg-secondary-100/20 shadow-glass-large flex w-full flex-col items-center justify-between overflow-hidden rounded-lg border py-2 backdrop-blur-sm backdrop-filter'>
                <span>Listed Count</span>
                <span className='text-base'>{listedCount}</span>
              </li>
              <li className='border-secondary-200 bg-secondary-100/20 shadow-glass-large flex w-full flex-col items-center justify-between overflow-hidden rounded-lg border py-2 backdrop-blur-sm backdrop-filter'>
                <span>Token Symbol</span> <span>{collection?.symbol || "N/A"}</span>
              </li>
            </ul>
            <p
              className='border-secondary-200 bg-secondary-100/20 
              shadow-glass-large  mt-5 flex w-full flex-col items-center justify-between overflow-hidden 
              rounded-lg border p-3 text-sm backdrop-blur-sm backdrop-filter lg:text-base'>
              {collection?.description}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CollectionHeader
