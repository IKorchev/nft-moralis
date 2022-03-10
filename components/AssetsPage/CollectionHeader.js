import { shortenIfAddress } from "@usedapp/core"
import useSWR from "swr"
import Jazzicon from "../Other/Jazzicon"
import { SyncLoader } from "react-spinners"
import { AnimatePresence, motion } from "framer-motion"
import { formatChain } from "../../utils/common"
import { metadataFetcher, revalidateOptions } from "../../utils/fetcher"
import { useMoralis } from "react-moralis"

const CollectionHeader = ({ address, chain, amountListed, floorPrice }) => {
  const { Moralis } = useMoralis()
  const options = {
    url: chain && address ? `/api/collection?address=${address}&chain=${chain?.chainId}` : null,
  }

  //prettier-ignore
  const { data, error } = useSWR(options, metadataFetcher, revalidateOptions)
  console.log(data)
  if (!data && !error)
    return (
      <div className='grid h-24 place-items-center'>
        <SyncLoader size={5} color='white' />
      </div>
    )

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        exit={{ opacity: 0 }}
        className='flex flex-col'>
        <div className='flex flex-col items-center'>
          <h1 className='text-center text-3xl font-black '>{data?.name}</h1>
          <div className='my-5 overflow-hidden rounded-full border-4 border-white'>
            <Jazzicon address={address} size={150} />
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
                  {floorPrice && parseFloat(Moralis.Units.FromWei(floorPrice)).toFixed(2)}
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
