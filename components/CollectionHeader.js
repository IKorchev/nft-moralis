import { shortenIfAddress } from "@usedapp/core"
import Moralis from "moralis"
import useSWR from "swr"
import Jazzicon from "../components/Jazzicon"
import { SyncLoader } from "react-spinners"
import Loading from "./Loading"
import GlobeIcon from "@heroicons/react/solid/GlobeAltIcon"
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
      args: { address: address, chain: chain },
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
    <div className='flex flex-col bg-gradient-to-b from-primary-dark/90   via-purple-900/70 to-primary-dark/90'>
      <div className='relative flex justify-center'>
        <div /> {/* Just for justify between to push the other content to the right*/}
        <div className='flex flex-col items-center'>
          <h1 className='text-center text-3xl font-black '>{data?.name}</h1>
          <div className='rounded-full overflow-hidden my-5 border-4 border-white'>
            <Jazzicon address={data?.token_address} size={150} />
          </div>
          <h3 className=' bg-white text-black font-bold px-3 py-2 rounded-full -mt-12'>
            {shortenIfAddress(data?.token_address)}
          </h3>
        </div>
        <div className='flex gap-2 absolute top-0 right-12'>
          <div className='bg-pinkish rounded-lg p-1 cursor-pointer '>
            <GlobeIcon className='h-7 text-blue-900' />
          </div>
          <div className='bg-pinkish rounded-lg p-1 cursor-pointer '>
            <GlobeIcon className='h-7 text-blue-900' />
          </div>
          <div className='bg-pinkish rounded-lg p-1 cursor-pointer '>
            <GlobeIcon className='h-7 text-blue-900' />
          </div>
        </div>
      </div>
      <div className=' my-5 w-full px-8 lg:px-24 lg:w-2/3 mx-auto overflow-hidden'>
        <div className='bg-purple-800/90 divide-y text-white px-5 py-5 rounded-lg shadow-lg shadow-purple-700/90'>
          <h4 className='text-xl text-center mb-5'>Information</h4>
          <p className='w-full flex justify-between items-center py-2'>
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
  )
}

export default CollectionHeader
