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
    <motion.div layout className='w-48 overflow-hidden text-black '>
      {/* TODO: Create a skeleton instead */}
      {isLoading && !error ? (
        <Loading
          containerProps={{ className: "grid place-items-center bg-blue" }}
          loaderProps={{ size: 100, color: "white" }}
        />
      ) : (
        <motion.div className='relative h-72 overflow-hidden rounded-md bg-rose-50'>
          <Link href={`/assets/${nftContract}/${tokenId}`}>
            {itemInfo[0]?.attributes.format === "image" ? (
              <img
                className='h-48 w-48 cursor-pointer object-contain hover:opacity-90'
                src={formatIpfs(itemInfo[0]?.attributes.image)}
              />
            ) : itemInfo[0]?.attributes.format === "video" ? (
              <video
                autoPlay
                muted
                controls
                className='h-48 w-48 cursor-pointer object-contain'
                src={formatIpfs(itemInfo[0]?.attributes.image)}
              />
            ) : (
              <img
                className='h-48 w-48 cursor-pointer object-contain'
                src='https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'
              />
            )}
          </Link>
          <div className='truncate p-2 text-sm font-bold'>
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
              <p className='mt-1 flex py-0.5 text-xs'>
                last
                <span className='ml-1'>
                  {Moralis.Units.FromWei(price)} {chain?.nativeCurrency.symbol || "ROP"}
                </span>
              </p>
            ) : (
              <>
                <p className='pointer-events-none absolute top-3 right-0 cursor-default rounded-l-md bg-emerald-600 py-1.5 pl-2 pr-0.5 text-xs text-white'>
                  {Moralis.Units.FromWei(price)} {chain?.nativeCurrency.symbol || "ROP"}
                </p>
                <div className='flex items-center justify-between '>
                  <button
                    className='flex  items-center justify-center rounded-sm bg-emerald-400  px-3 font-bold text-black ring-black transition duration-300 focus:ring-2 hover:bg-emerald-500'
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
      )}
    </motion.div>
  )
}

export default MarketItem
