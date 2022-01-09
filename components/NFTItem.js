import { motion } from "framer-motion"
import { formatIpfs } from "../utils/common"
import Link from "next/link"
import useSWR from "swr"
import fetcher from "../utils/fetcher"

const Content = ({ children, ...props }) => <div {...props}>{children}</div>

const NFTItem = ({ children, tokenUri, tokenId, tokenAddress, index }) => {
  const { data, error, isValidating } = useSWR(tokenUri, fetcher)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.03, delayChildren: 0.5 }}
      className='flex rounded-lg bg-purple-900 shadow-3xl shadow-purple-400/20 overflow-hidden w-72 flex-col'>
      {data?.format === "video" ? (
        <Link passHref={true} href={`/assets/${tokenAddress}/${tokenId}`}>
          <video
            autoPlay
            muted
            controls
            src={formatIpfs(data?.image_url || data?.image || data?.url)}
            alt=''
            className='rounded-lg cursor-pointer h-72 w-full object-scale-down'
          />
        </Link>
      ) : (
        <Link passHref={true} href={`/assets/${tokenAddress}/${tokenId}`}>
          <img
            src={
              formatIpfs(data?.image_url || data?.image || data?.url) ||
              "https://comnplayscience.eu/app/images/notfound.png"
            }
            alt=''
            className='object-scale-down cursor-pointer  h-72 w-full'
          />
        </Link>
      )}
      {children}
    </motion.div>
  )
}

NFTItem.Content = Content
export default NFTItem
