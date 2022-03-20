import React from "react"
import { launchpadsState } from "../../store/store"
import { useRecoilValue } from "recoil"
import Metadata from "../../components/Other/Metadata"
import { LargeCollectionCard } from "../../components/Cards/CollectionCard"
import { motion } from "framer-motion"
const Collection = () => {
  const collections = useRecoilValue(launchpadsState)

  return (
    <div className=''>
      <Metadata title='NFT Explorer - All Collections' />
      <div className='container mx-auto grid grid-cols-1 place-items-center gap-10 py-48 text-white md:grid-cols-2   xl:grid-cols-3 2xl:grid-cols-4'>
        {collections.map((el, i) => {
          return (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 100 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ delay: i * 0.05, easings: "backIn" }}
              className='max-w-max'>
              <LargeCollectionCard
                description={el.attributes.description}
                name={el.attributes.collectionName}
                collectionAddress={el.attributes.contractAddress}
                imageUrl={el.attributes.imageUrl}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default Collection
