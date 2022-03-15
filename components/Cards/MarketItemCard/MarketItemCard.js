import { useMoralis } from "react-moralis"
import { useMoralisData } from "../../Providers/MoralisDataProvider"
import { formatIpfs } from "../../../utils/common"
import { shortenIfAddress } from "@usedapp/core"
import { motion } from "framer-motion"
import SwitchNetworkButton from "../../Buttons/SwitchNetworkButton"
import useMarketInteractions from "../../../hooks/useMarketInteraction"
import Link from "next/link"
import VideoOrImage from "../NFTCard/VideoOrImage"
import { useRecoilValue } from "recoil"
import { getItem } from "../../../store/imagesSlice"
import ConnectWalletButton from "../../Buttons/ConnectWalletButton"
export const MarketItem = ({ price, nftContract, tokenId, itemId, sold }) => {
  const { Moralis } = useMoralis()
  const { chain, account } = useMoralisData()
  const { buyItem } = useMarketInteractions()
  const item = useRecoilValue(getItem({ tokenId, nftContract }))
  return (
    <motion.div className='bg-secondary-800 min-h-80 shadow-glass relative flex w-48 flex-col overflow-hidden rounded-md  text-white xl:w-60'>
      <Link href={`/assets/${nftContract}/${tokenId}`}>
        <div className='h-max w-full cursor-pointer'>
          <VideoOrImage format={item?.attributes?.format} url={formatIpfs(item?.attributes?.image)} />
        </div>
      </Link>
      <div className='flex  flex-col justify-evenly truncate p-2 text-sm font-bold'>
        <Link href={`/assets/${nftContract}`}>
          <a className='w-max py-0.5 pr-5 text-[0.66rem] hover:text-gray-300'>{shortenIfAddress(nftContract)}</a>
        </Link>
        <Link href={`/assets/${nftContract}/${tokenId}`}>
          <a className='w-max py-1 pr-5 hover:text-gray-300'>{item?.attributes?.name || "Unknown"}</a>
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
              {!account ? (
                <ConnectWalletButton rounded='sm' size='xs' label='Connect' />
              ) : chain?.chainId !== "0x3" ? (
                <SwitchNetworkButton rounded='sm' size='xs' network='0x3' />
              ) : (
                <button
                  className='bg-secondary-100 hover:bg-secondary-700 flex items-center justify-center rounded-sm px-3 font-bold text-black ring-black transition duration-300 focus:ring-2'
                  onClick={() => buyItem(nftContract, itemId, price)}>
                  Buy now
                </button>
              )}
              <span>{Moralis.Units.FromWei(price)} ETH</span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}

export default MarketItem