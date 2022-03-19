import { shortenIfAddress } from "@usedapp/core"
import { AnimatePresence, motion } from "framer-motion"
import { findCollectionByAddress } from "../../store/store"
import { useRecoilValue } from "recoil"
import { collectionInfo } from "../../store/listingsSlice"
import InfoBox from "./InfoBox"

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
  const rows = [
    {
      title: "Floor Price",
      subtitle: floor || "N/A",
      variant: itemVariant,
    },
    {
      title: "Listed Count",
      subtitle: listedCount || "0",
      variant: itemVariant,
    },
    {
      title: "Token Symbol",
      subtitle: collection?.symbol || "N/A",
      variant: itemVariant,
    },
  ]
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
              className='border-secondary-100 mx-auto mb-5 w-max border-b-4 text-center text-xl'>
              Information
            </h4>
            <motion.ul
              variants={containerVariants}
              initial='initial'
              animate='animate'
              className='grid  grid-cols-3 gap-5 text-xs sm:text-lg'>
              {rows.map(({ title, subtitle, variant }) => (
                <InfoBox animationVariants={variant} title={title} subtitle={subtitle} />
              ))}
            </motion.ul>
            <motion.p
              variants={itemVariant}
              className='border-secondary-200 bg-secondary-100/20 
              shadow-glass-large  mt-5 flex w-full flex-col items-center justify-between overflow-hidden 
              rounded-lg border p-3 text-sm backdrop-blur-sm backdrop-filter lg:text-base'>
              {collection?.description}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CollectionHeader
