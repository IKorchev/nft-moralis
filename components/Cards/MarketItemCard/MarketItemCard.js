import { useMoralis, useMoralisQuery } from "react-moralis"
import { useMoralisData } from "../../Providers/MoralisDataProvider"
import useMarketInteractions from "../../../hooks/useMarketInteraction"
import { formatIpfs } from "../../../utils/common"
import Link from "next/link"
import { shortenIfAddress } from "@usedapp/core"
import { motion } from "framer-motion"
import VideoOrImage from "../NFTCard/VideoOrImage"
export const MarketItem = ({ price, nftContract, tokenId, itemId, sold }) => {
  const { Moralis } = useMoralis()
  const { chain } = useMoralisData()
  const { buyItem } = useMarketInteractions()

  const { data: itemInfo, error } = useMoralisQuery("ItemImage", (q) =>
    q.equalTo("tokenId", tokenId.toString()).equalTo("contractAddress", nftContract.toLowerCase())
  )
  if (error) return null
  return (
    <motion.div className='relative flex w-48 flex-col overflow-hidden rounded-md bg-secondary-darkest text-white  shadow-glass xl:w-60'>
      <div className='h-max w-full'>
        <Link href={`/assets/${nftContract}/${tokenId}`}>
          <VideoOrImage
            format={itemInfo[0]?.attributes.format}
            url={formatIpfs(itemInfo[0]?.attributes.image)}
          />
        </Link>
      </div>
      <div className='flex  flex-col justify-evenly truncate p-2 text-sm font-bold'>
        <Link href={`/assets/${nftContract}`}>
          <a className='w-max py-0.5 pr-5 text-[0.66rem] hover:text-gray-300'>
            {shortenIfAddress(nftContract)}
          </a>
        </Link>
        <Link href={`/assets/${nftContract}/${tokenId}`}>
          <a className='w-max py-1 pr-5 hover:text-gray-300'>
            {itemInfo[0]?.attributes.name || "Unknown"}
          </a>
        </Link>
      </div>
      <div className='p-2 '>
        {sold ? (
          <p className='mt-1 flex py-0.5 text-xs'>
            last
            <span className='ml-1'>
              {Moralis.Units.FromWei(price)} {chain?.nativeCurrency.symbol || "ROP"}
            </span>
          </p>
        ) : (
          <>
            <div className='flex items-center justify-between '>
              <button
                className='flex items-center justify-center rounded-sm bg-secondary px-3 font-bold text-black ring-black transition duration-300 focus:ring-2 hover:bg-secondary-dark'
                onClick={() => buyItem(nftContract, itemId, price)}>
                Buy now
              </button>
              <span>
                {Moralis.Units.FromWei(price)} {chain?.nativeCurrency.symbol || "ROP"}
              </span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}

export default MarketItem
