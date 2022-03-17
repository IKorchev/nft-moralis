import useSWR from "swr"
import Jazzicon from "../Other/Jazzicon"
import { shortenIfAddress } from "@usedapp/core"
import { AnimatePresence, motion } from "framer-motion"
import { getFetcher, revalidateOptions } from "../../utils/fetcher"
import { useMoralis } from "react-moralis"
import { findCollectionByAddress } from "../../store/store"
import { useRecoilValue } from "recoil"
import { collectionInfo } from "../../store/listingsSlice"

const containerVariants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      damping: 0.5,
      staggerChildren: 0.15,
    },
  },
}

const itemVariant = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
  },
}

const CollectionHeader = ({ address }) => {
  const collection = useRecoilValue(findCollectionByAddress(address))
  const { floor, listedCount } = useRecoilValue(collectionInfo(address))

  return (
    <AnimatePresence>
      <motion.div variants={containerVariants} initial='initial' animate='animate' className='flex flex-col'>
        <motion.div variants={containerVariants} className='flex flex-col items-center'>
          <h1 className='text-center text-3xl font-black '>{collection?.collectionName}</h1>
          <div variants={itemVariant} className='my-5 h-48 w-48 overflow-hidden rounded-full border-4 border-white'>
            <img src={collection?.imageUrl} alt='' className='h-full w-full' />
          </div>
          <h3 className=' -mt-12 rounded-full bg-white px-3 py-2 font-bold text-black'>{shortenIfAddress(address)}</h3>
        </motion.div>
        <div className='container mx-auto my-5 max-w-[50rem] px-5'>
          <div
            className='rounded-lg 
            bg-gradient-to-b px-5 py-5 text-white '>
            <h4
              variants={itemVariant}
              className='mx-auto mb-5 w-max border-b-4 border-secondary-100 text-center text-xl'>
              Information
            </h4>
            <motion.ul
              variants={containerVariants}
              initial='initial'
              animate='animate'
              className='grid  grid-cols-3 gap-5 text-xs sm:text-lg'>
              <motion.li
                variants={itemVariant}
                className='flex w-full flex-col items-center justify-between overflow-hidden rounded-lg border border-secondary-200 bg-secondary-100/20 py-2 shadow-glass-large backdrop-blur-sm backdrop-filter'>
                <span>Floor Price</span>
                <span>{floor || "N/A"}</span>
              </motion.li>
              <motion.li
                variants={itemVariant}
                className='flex w-full flex-col items-center justify-between overflow-hidden rounded-lg border border-secondary-200 bg-secondary-100/20 py-2 shadow-glass-large backdrop-blur-sm backdrop-filter'>
                <span>Listed Count</span>
                <span className='text-base'>{listedCount}</span>
              </motion.li>
              <motion.li
                variants={itemVariant}
                className='flex w-full flex-col items-center justify-between overflow-hidden rounded-lg border border-secondary-200 bg-secondary-100/20 py-2 shadow-glass-large backdrop-blur-sm backdrop-filter'>
                <span>Token Symbol</span> <span>{collection?.symbol || "N/A"}</span>
              </motion.li>
            </motion.ul>
            <motion.p
              variants={itemVariant}
              className='mt-5 flex 
              w-full  flex-col items-center justify-between overflow-hidden rounded-lg border border-secondary-200 
              bg-secondary-100/20 p-3 text-sm shadow-glass-large backdrop-blur-sm backdrop-filter lg:text-base'>
              {collection?.description}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CollectionHeader
