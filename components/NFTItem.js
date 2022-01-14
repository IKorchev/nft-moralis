import { motion } from "framer-motion"
import { formatIpfs } from "../utils/common"
import Link from "next/link"
import useSWR from "swr"
import fetcher from "../utils/fetcher"
import { FadeLoader } from "react-spinners"
import { shortenIfAddress } from "@usedapp/core"

const NFTItem = ({ children, tokenUri, tokenId, tokenAddress, index, ...props }) => {
  //prettier-ignore
  const { data, error, isValidating } = useSWR(tokenUri ? tokenUri : "null", (tokenUri) =>fetcher(tokenUri, tokenAddress, tokenId))
  
  if (error) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.0005,
        y: -1,
      }}
      transition={{ duration: 0.5, delay: index * 0.03, delayChildren: 0.5 }}
      className='flex rounded-lg bg-purple-900 shadow-3xl shadow-purple-400/20 overflow-hidden w-72 flex-col relative'>
      <Link passHref={true} href={`/assets/${tokenAddress}/${tokenId}`}>
        {isValidating ? (
          <div className='grid place-items-center h-72 bg-white/90'>
            <FadeLoader size={1} color='black' />
          </div>
        ) : data?.format === "video" ? (
          <video
            autoPlay
            muted
            controls
            src={formatIpfs(data?.image_url || data?.image || data?.url)}
            alt=''
            className='rounded-lg cursor-pointer h-72 w-full object-scale-down'
          />
        ) : (
          <img
            src={formatIpfs(data?.image_url || data?.image || data?.url)}
            alt=''
            className='object-scale-down cursor-pointer  h-72 w-full'
          />
        )}
      </Link>
      <div className='flex flex-col items-start p-3'>
        <p>{data?.name}</p>
        <Link href={`/assets/${tokenAddress}`}>{shortenIfAddress(tokenAddress)}</Link>
      </div>
      {children}
    </motion.div>
  )
}
export default NFTItem
