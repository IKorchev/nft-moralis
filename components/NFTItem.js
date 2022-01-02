import { useEffect } from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { formatImage } from "../utils/common"
const NFTItem = ({ tokenUri, metadata }) => {
  const [nftMetadata, setNftMetadata] = useState(JSON.parse(metadata))

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
      <img src={formatImage(nftMetadata?.image)} alt='' className='h-72 w-72' />
      <h1 className='text-4xl'>{nftMetadata?.name || "Unknown"}</h1>
    </div>
  )
}

export default NFTItem
