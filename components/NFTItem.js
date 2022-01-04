import { useEffect } from "react"
import { useState } from "react"
import { formatImage, formatIpfs } from "../utils/common"
import Link from "next/link"
import useMarketInteractions from "../utils/marketInteractions"
import { useMoralisData } from "./Providers/MoralisDataProvider"

const NFTItem = ({ tokenUri, metadata, tokenId, tokenAddress, contractName }) => {
  const [nftMetadata, setNftMetadata] = useState()
  const { listItem, updateItem } = useMarketInteractions()
  const getNftMetadata = async () => {
    if (metadata) {
      setNftMetadata(JSON.parse(metadata))
    }
    try {
      const response = await fetch(formatIpfs(tokenUri), { mode: "no-cors" })
      const result = await response.json()
      setNftMetadata(result)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getNftMetadata()
  }, [])
  return (
    <div className='flex justify-center overflow-hidden w-72'>
      <div className='rounded-lg shadow-lg bg-white w-72'>
        <Link passHref={true} href={`/assets/${tokenAddress}/${tokenId}`}>
          <img
            src={formatImage(
              nftMetadata?.image || nftMetadata?.image_url || nftMetadata?.url
            )}
            alt=''
            className='object-scale-down rounded-lg h-72 w-full'
          />
        </Link>
        <div className='p-3'>
          <h5 className='text-gray-900 text-xl font-medium mb-2'>
            {nftMetadata?.name || `${contractName}#${tokenId}`}
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
  )
}

export default NFTItem
