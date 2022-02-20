import { useMoralis, useMoralisQuery } from "react-moralis"
import { useMoralisData } from "../Providers/MoralisDataProvider"
import useMarketInteractions from "../../hooks/useMarketInteraction"
import { formatIpfs } from "../../utils/common"
import Loading from "../Loading"
import Link from "next/link"
import { shortenIfAddress } from "@usedapp/core"
import { motion } from "framer-motion"

const MarketItem = ({ price, nftContract, tokenId, itemId, sold }) => {
  const { Moralis } = useMoralis()
  const { chain } = useMoralisData()
  const { buyItem } = useMarketInteractions()

  const {
    data: itemInfo,
    error,
    isLoading,
  } = useMoralisQuery("ItemImage", (q) =>
    q.equalTo("tokenId", tokenId.toString()).equalTo("contractAddress", nftContract.toLowerCase())
  )
  return (
    <motion.div layout className='w-48 text-black overflow-hidden'>
      {/* TODO: Create a skeleton instead */}
      {isLoading && !error ? (
        <Loading
          containerProps={{ className: "grid place-items-center bg-blue" }}
          loaderProps={{ size: 100, color: "white" }}
        />
      ) : (
        <motion.div layout className='h-72 bg-rose-50 relative rounded-md overflow-hidden'>
          <Link href={`/assets/${nftContract}/${tokenId}`}>
            {itemInfo[0]?.attributes.format === "image" ? (
              <img
                className='h-48 w-48 object-contain cursor-pointer hover:opacity-90'
                src={formatIpfs(itemInfo[0]?.attributes.image)}
              />
            ) : itemInfo[0]?.attributes.format === "video" ? (
              <video
                autoPlay
                muted
                controls
                className='h-48 w-48 object-contain cursor-pointer'
                src={formatIpfs(itemInfo[0]?.attributes.image)}
              />
            ) : (
              <img
                className='h-48 w-48 object-contain cursor-pointer'
                src='https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'
              />
            )}
          </Link>
          <div className='p-2 text-sm truncate font-bold'>
            <p className='text-[10px]'>
              <Link href={`/assets/${nftContract}`}>
                <a>{shortenIfAddress(nftContract)}</a>
              </Link>
            </p>
            <p>
              <Link href={`/assets/${nftContract}/${tokenId}`}>
                <a>{itemInfo[0]?.attributes.name || "Unknown"}</a>
              </Link>
            </p>
          </div>
          <div className='p-2 '>
            {sold ? (
              <p className='flex mt-1 text-xs py-0.5'>
                last
                <span className='ml-1'>
                  {Moralis.Units.FromWei(price)} {chain.nativeCurrency.symbol}
                </span>
              </p>
            ) : (
              <>
                <p className='absolute top-3 right-0 cursor-default rounded-l-md pointer-events-none text-xs text-white bg-emerald-600 py-1.5 pl-2 pr-0.5'>
                  {Moralis.Units.FromWei(price)} {chain.nativeCurrency.symbol}
                </p>
                <div className='flex justify-between items-center '>
                  <button
                    className='bg-emerald-400  flex justify-center items-center   px-3  rounded-lg text-black font-bold transition duration-300 hover:bg-emerald-500 focus:ring-2 ring-black'
                    onClick={() => buyItem(nftContract, itemId, price)}>
                    Buy now
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default MarketItem
