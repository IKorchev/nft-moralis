import { useEffect, useLayoutEffect } from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { formatImage } from "../utils/common"
import { useRouter } from "next/router"

import Link from "next/link"
const NFTItem = ({ tokenUri, metadata, tokenId }) => {
  const [nftMetadata, setNftMetadata] = useState(JSON.parse(metadata))
  const router = useRouter()
  const getNftMetadata = async () => {
    try {
      const response = await fetch(tokenUri, { mode: "no-cors" })
      const result = await response.json()
      setNftMetadata(JSON.parse(result))
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    !metadata && getNftMetadata()
  }, [])
  return (
    <div className='container py-12'>
      <Link passHref={true} href={`/assets/${router.query.contract}/${tokenId}`}>
        <img src={formatImage(nftMetadata?.image)} alt='' className='h-72 w-72' />
      </Link>
      <h1 className='text-4xl'>{nftMetadata?.name || "Unknown"}</h1>
    </div>
  )
}

export default NFTItem
