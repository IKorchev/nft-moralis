import useSWR from "swr"
import Jazzicon from "../Other/Jazzicon"
import { shortenIfAddress } from "@usedapp/core"
import { AnimatePresence, motion } from "framer-motion"
import { metadataFetcher, revalidateOptions } from "../../utils/fetcher"
import { useMoralis } from "react-moralis"
import { useMemo } from "react"

const CollectionHeader = ({ address, itemsAvailableForPurchase }) => {
  const { Moralis } = useMoralis()
  const options = {
    url: address ? `/api/collection?address=${address}&chain=0x3` : null,
  }
  console.log(itemsAvailableForPurchase)
  const { data, error } = useSWR(options, metadataFetcher, revalidateOptions)
  // const floorPrice = 0,
  // amountListed = 0
  const { amountListed, floorPrice } = useMemo(() => {
    return {
      amountListed: itemsAvailableForPurchase?.length,
      floorPrice: itemsAvailableForPurchase
        .map((el) => el.attributes.price)
        .sort((el1, el2) => el1 > el2)[0],
    }
  }, [itemsAvailableForPurchase?.length])
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
          <h1 className='text-center text-3xl font-black '>{data?.name}</h1>
          <div className='my-5 overflow-hidden rounded-full border-4 border-white'>
            {address && <Jazzicon address={address} size={150} />}
          </div>
          <h3 className=' -mt-12 rounded-full bg-white px-3 py-2 font-bold text-black'>
            {shortenIfAddress(address)}
          </h3>
        </div>
        <div className='container mx-auto my-5 max-w-[50rem] px-5'>
          <div
            className='rounded-lg 
            bg-gradient-to-b px-5 py-5 text-white '>
            <h4 className='border-secondary-100 mx-auto mb-5 w-max border-b-4 text-center text-xl'>
              Information
            </h4>
            <ul className='grid grid-cols-2 gap-5 lg:grid-cols-4'>
              <li className='border-secondary-200 bg-secondary-100/20 shadow-glass-large flex w-full flex-col items-center justify-between overflow-hidden rounded-lg border py-2 backdrop-blur-sm backdrop-filter'>
                <span>Floor Price</span>
                <span>
                  {floorPrice ? parseFloat(Moralis.Units.FromWei(floorPrice)).toFixed(2) : 0}
                </span>
              </li>
              <li className='border-secondary-200 bg-secondary-100/20 shadow-glass-large flex w-full flex-col items-center justify-between overflow-hidden rounded-lg border py-2 backdrop-blur-sm backdrop-filter'>
                <span>Listed Count</span>
                <span className='text-base'>{amountListed}</span>
              </li>
              <li className='border-secondary-200 bg-secondary-100/20 shadow-glass-large flex w-full flex-col items-center justify-between overflow-hidden rounded-lg border py-2 backdrop-blur-sm backdrop-filter'>
                <span>Token Symbol</span> <span>{data?.symbol}</span>
              </li>
              <li className='border-secondary-200 bg-secondary-100/20 shadow-glass-large flex w-full flex-col items-center justify-between overflow-hidden rounded-lg border py-2 backdrop-blur-sm backdrop-filter'>
                <span>Contract type</span> <span>{data?.contract_type}</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CollectionHeader
