import { useMoralis } from "react-moralis"
import { formatIpfs } from "../../../utils/common"
import { shortenIfAddress } from "@usedapp/core"
import { AnimatePresence, motion } from "framer-motion"
import { useRecoilValue } from "recoil"
import { getItem } from "../../../store/imagesSlice"
import { chainState, currentUserState } from "../../../store/userSlice"
import ConnectWalletButton from "../../Buttons/ConnectWalletButton"
import SwitchNetworkButton from "../../Buttons/SwitchNetworkButton"
import useMarketInteractions from "../../../hooks/useMarketInteraction"
import Link from "next/link"
import VideoOrImage from "../NFTCard/VideoOrImage"

export const MarketItem = ({ price, nftContract, tokenId, itemId, sold, index }) => {
  const { Moralis } = useMoralis()
  const chain = useRecoilValue(chainState)
  const account = useRecoilValue(currentUserState)
  const { buyItem } = useMarketInteractions()
  const item = useRecoilValue(getItem({ tokenId, nftContract }))

  return (
    <AnimatePresence>
      <motion.div
        layout
        initial={{ y: 30, opacity: 0 }}
        whileHover={{ y: -2, className: "shadow-lg shadow-secondary-500" }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            type: "spring",
            duration: 0.6,
            delay: index * 0.05,
          },
        }}
        className='market-item-card'>
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
                  <ConnectWalletButton rounded='sm' size='xs' label='Connect wallet' />
                ) : chain && chain.chainId !== "0x3" ? (
                  <SwitchNetworkButton rounded='sm' size='xs' network='0x3' />
                ) : (
                  <button className='card-button' onClick={() => buyItem(nftContract, itemId, price)}>
                    Buy now
                  </button>
                )}
                <span>{Moralis.Units.FromWei(price)} ETH</span>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default MarketItem
