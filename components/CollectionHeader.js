import { shortenIfAddress } from "@usedapp/core"
import Moralis from "moralis"
import useSWR from "swr"
import Jazzicon from "../components/Jazzicon"
import { SyncLoader } from "react-spinners"
import { collection } from "../utils/collections"
import { BsGlobe, BsTwitter, BsInstagram, BsDiscord } from "react-icons/bs"
import { AnimatePresence, motion } from "framer-motion"

const CollectionHeader = ({ address, chain }) => {
  const fetcher = async ({ args }) => {
    const { chain, address } = args
    const collectionData = await Moralis.Web3API.token.getNFTMetadata({
      chain,
      address,
    })
    return collectionData
  }
  const { data, error, isValidating } = useSWR(
    {
      url: "notNeeded",
      args: { address: address, chain: chain?.chainId },
    },
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
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
        className='flex flex-col bg-gradient-to-b from-primary-dark/90   via-purple-900/70 to-primary-dark/90'>
        <div className='flex gap-2 container mx-auto justify-center lg:justify-end px-5 pb-12 lg:pb-3'>
          {collection[address] &&
            Object?.values(collection[address])?.map((el, i) => (
              <a
                href={el || "https://google.com/"}
                target='_blank'
                rel='noreferrer'
                className='grid bg-white hover:bg-gray-300  rounded-md w-8 h-8 place-items-center cursor-pointer '>
                {i === 0 ? (
                  <BsGlobe className='text-2xl text-blue-800' />
                ) : i === 1 ? (
                  <BsTwitter className='text-2xl text-blue-400' />
                ) : i === 2 ? (
                  <BsInstagram className='text-2xl text-purple-800' />
                ) : (
                  i === 3 && <BsDiscord className='text-2xl text-gray-900' />
                )}
              </a>
            ))}
        </div>

        <div className='flex flex-col items-center'>
          <h1 className='text-center text-3xl font-black '>{data?.name}</h1>
          <div className='rounded-full overflow-hidden my-5 border-4 border-white'>
            <Jazzicon address={data?.token_address} size={150} />
          </div>
          <h3 className=' bg-white text-black font-bold px-3 py-2 rounded-full -mt-12'>
            {shortenIfAddress(data?.token_address)}
          </h3>
        </div>
        <div className='container mx-auto my-5 px-5 max-w-[50rem]'>
          <div className='bg-gradient-to-tr from-purple-900 via-purple-900 to-purple-300/30 border border-pinkish text-white px-5 py-5 rounded-lg '>
            <h4 className='text-xl text-center mb-5 border-b-4 border-pinkish w-max mx-auto'>
              Information
            </h4>
            <div className='divide-y divide-primary-lightest'>
              <p className='w-full flex justify-between items-center py-2 overflow-hidden'>
                <span>Address:</span>
                <span className='text-xs'>{data?.token_address}</span>
              </p>
              <p className='w-full flex justify-between items-center py-2'>
                <span>Token Symbol:</span> <span>{data?.symbol}</span>
              </p>
              <p className='w-full flex justify-between items-center py-2'>
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
