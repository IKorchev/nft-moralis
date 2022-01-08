import { formatIpfs } from "../utils/common"
import Link from "next/link"
import useMarketInteractions from "../utils/marketInteractions"
import { Suspense } from "react"
import useSWR from "swr"
import fetcher from "../utils/fetcher"

const NFTItem = ({ tokenUri, tokenId, tokenAddress, contractName }) => {
  const { listItem, updateItem } = useMarketInteractions()
  const { data, error, isValidating } = useSWR(tokenUri, fetcher)

  return (
    <Suspense fallback={<h1 className='text-black'>Loading...</h1>}>
      <div className='flex justify-center overflow-hidden w-72'>
        <div className='rounded-lg shadow-lg bg-white w-72'>
          {data?.format === "video" ? (
            <Link passHref={true} href={`/assets/${tokenAddress}/${tokenId}`}>
              <video
                autoPlay
                muted
                controls
                src={formatIpfs(data?.image_url || data?.image || data?.url)}
                alt=''
                className='rounded-lg max-h-72 w-full object-scale-down'
              />
            </Link>
          ) : (
            <Link passHref={true} href={`/assets/${tokenAddress}/${tokenId}`}>
              <img
                src={formatIpfs(data?.image_url || data?.image || data?.url)}
                alt=''
                className='object-scale-down rounded-lg h-72 w-full'
              />
            </Link>
          )}
          <div className='p-3'>
            <h5 className='text-gray-900 text-xl font-medium mb-2'>
              {data?.name || `${contractName}#${tokenId}`}
            </h5>
            <button
              onClick={() => listItem(tokenAddress, tokenId, 1)}
              type='button'
              className=' inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>
              Button
            </button>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default NFTItem
