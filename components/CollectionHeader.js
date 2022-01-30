import { shortenIfAddress } from "@usedapp/core"
import useSWR from "swr"
import Jazzicon from "../components/Jazzicon"
import { SyncLoader } from "react-spinners"
import { AnimatePresence, motion } from "framer-motion"
import { formatChain } from "../utils/common"
import { metadataFetcher, revalidateOptions } from "../utils/fetcher"
import { useMoralis } from "react-moralis"

const CollectionHeader = ({ address, chain, amountListed, floorPrice }) => {
  const { Moralis } = useMoralis()
  const options = {
    url: chain ? "/api/collection" : null,
    args: {
      address: address,
      chain: { chainString: formatChain(chain?.networkId), chainId: chain?.chainId },
    },
  }
  //prettier-ignore
  const { data, error, isValidating } = useSWR(options,metadataFetcher,revalidateOptions)

  if (!data && !error)
    return (
      <div className='h-24 grid place-items-center'>
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
          <div className='rounded-full overflow-hidden my-5 border-4 border-white'>
            <Jazzicon address={address} size={150} />
          </div>
          <h3 className=' bg-white text-black font-bold px-3 py-2 rounded-full -mt-12'>
            {shortenIfAddress(address)}
          </h3>
        </div>
        <div className='container mx-auto my-5 px-5 max-w-[50rem]'>
          <div
            className='bg-gradient-to-b 
            text-white px-5 py-5 rounded-lg '>
            <h4 className='text-xl text-center mb-5 border-b-4 border-secondary w-max mx-auto'>
              Information
            </h4>
            <div className='flex gap-5'>
              <p className='w-full bg-primary-700 rounded-lg flex flex-col justify-between items-center py-2 overflow-hidden'>
                <span>Floor Price:</span>
                <span className='text-xs'>
                  {floorPrice && parseFloat(Moralis.Units.FromWei(floorPrice)).toFixed(2)}
                </span>
              </p>
              <p className='w-full bg-primary-700 rounded-lg flex flex-col justify-between items-center py-2 overflow-hidden'>
                <span>Total Listed Count:</span>
                <span className='text-base'>{amountListed}</span>
              </p>
              <p className='w-full bg-primary-700 rounded-lg flex flex-col justify-between items-center py-2 overflow-hidden'>
                <span>Token Symbol:</span> <span>{data?.symbol}</span>
              </p>
              <p className='w-full bg-primary-700 rounded-lg flex flex-col justify-between items-center py-2 overflow-hidden'>
                <span>Contract type:</span> <span>{data?.contract_type}</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CollectionHeader
