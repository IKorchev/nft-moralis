import { AnimatePresence } from "framer-motion"
import { formatChain, formatIpfs } from "../../../utils/common"
import Link from "next/link"
import useSWR from "swr"
import { revalidateOptions, getFetcher } from "../../../utils/fetcher"
import { shortenIfAddress } from "@usedapp/core"
import { useChain } from "react-moralis"
import ListItemModal from "../../tokenId/ListItemModal"
import { useEffect, useState } from "react"
import VideoOrImage from "./VideoOrImage"
import SkeletonCard from "../SkeletonCard/SkeletonCard"
import SkeletonImage from "../SkeletonCard/SkeletonImage"
import { useNft } from "use-nft"
const NFTCard = ({ children, tokenUri, tokenId, tokenAddress, metadata, index }) => {
  const { chain, account } = useChain()
  const [isOpen, setIsOpen] = useState(false)
  const chainString = formatChain(chain?.networkId)
  const [isImageLoading, setIsImageLoading] = useState("loading")
  const { loading, error, nft } = useNft(tokenAddress, tokenId)
  console.log(nft)
  console.log(tokenAddress)

  // description: "This is #46 out of 1000 randomly generated images based on Rick's (Target Hit) Twitch Emote. YouTube: Target Hit - targethit.com"
  // image: "https://ipfs.io/ipfs/Qmd5LGK9hNtacDEYjByxPW89sNJi2NuCBGv7MaCyKEsb5T/46.png"
  // imageType: "image"
  // metadataUrl: "https://ipfs.io/ipfs/QmSYZCbQKmxsMfYkecSsM2AWfzgPgGH2rP75fCYKhNov9f/46.json"
  // name: "Rick #46"
  // owner: "0x910111ECD2377662F98d5b8d735539A4157B8a83"
  if (loading) return <SkeletonCard />
  if (error) return null

  return (
    <div className='relative flex h-72 w-48 flex-col overflow-hidden rounded-md  bg-secondary-800 text-white shadow-glass lg:h-[21rem] lg:w-60'>
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
            <button
              onClick={() => setIsOpen(true)}
              className='mt-1 rounded-sm  bg-secondary-500 px-2 py-0.5 text-white transition duration-150 active:scale-95'>
              List for sale
            </button>
            <AnimatePresence>
              {isOpen && <ListItemModal chain={chain} data={data} isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} />}
            </AnimatePresence>
          </>
        )}
      </div>
      {children}
    </div>
  )
}
export default NFTCard
