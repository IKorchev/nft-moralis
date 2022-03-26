import { shortenIfAddress } from "@usedapp/core"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { useNft } from "use-nft"
import Link from "next/link"
import ListItemModal from "../../tokenId/ListItemModal"
import SkeletonCard from "../SkeletonCard/SkeletonCard"
import SkeletonImage from "../SkeletonCard/SkeletonImage"
import VideoOrImage from "./VideoOrImage"
import { chainState, currentUserState } from "../../../store/userSlice"
import { useRecoilValue } from "recoil"

const NFTCard = ({ children, tokenId, tokenAddress }) => {
  const chain = useRecoilValue(chainState)
  const account = useRecoilValue(currentUserState)
  const [isOpen, setIsOpen] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState("loading")
  const { loading, error, nft } = useNft(tokenAddress, tokenId)
  if (error) return null
  if (loading) return <SkeletonCard />
  return (
    <motion.div
      layout
      className='border-secondary-600 bg-secondary-900 shadow-glass relative flex h-72 w-48 flex-col overflow-hidden  rounded-md border text-white lg:h-[21rem] lg:w-60'>
      <Link href={`/assets/${tokenAddress}/${tokenId}`}>
        <div>
          <a className={`${isImageLoading === "loaded" ? "block" : "hidden"}`}>
            <VideoOrImage setLoading={setIsImageLoading} format={nft.imageType} url={nft.image} />
          </a>
          <a className={`${isImageLoading !== "loaded" ? "block" : "hidden"}`}>
            <SkeletonImage />
          </a>
        </div>
      </Link>
      <div className='flex flex-col items-start px-2 py-1'>
        <Link passHref href={`/assets/${tokenAddress}/`}>
          <a>
            <small className='text-[0.7rem] text-white hover:text-gray-300'>{shortenIfAddress(tokenAddress)}</small>
          </a>
        </Link>
        <Link href={`/assets/${tokenAddress}/${tokenId}`}>
          <a className='font-bold hover:text-gray-300'>{nft.name}</a>
        </Link>
        {nft.owner.toLowerCase() === account?.toLowerCase() && (
          <>
            <button onClick={() => setIsOpen(true)} className='card-button mt-2'>
              List for sale
            </button>
            <AnimatePresence>
              {isOpen && (
                <ListItemModal
                  chain={chain}
                  data={{ ...nft, contractAddress: tokenAddress, tokenId: tokenId }}
                  isOpen={isOpen}
                  onClose={() => setIsOpen(!isOpen)}
                />
              )}
            </AnimatePresence>
          </>
        )}
      </div>
      {children}
    </motion.div>
  )
}
export default NFTCard
