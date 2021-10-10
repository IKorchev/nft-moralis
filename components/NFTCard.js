import { useEffect, useState } from "react"
import NFTModal from "./NFTModal"
import SkeletonComponent from "./NFTCardSkeleton"
import { formatImage } from "../utils/common"
const NFTCard = ({ metadata }) => {
  const [isShown, setIsShown] = useState(false)
  const parsedMetadata = JSON.parse(metadata.metadata)
  const { name, title, Name, description, image, image_url } = parsedMetadata

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
    return () => clearTimeout()
  }, [name])

  return !loading ? (
    <div className='card'>
      <button
        onClick={(e) => {
          e.preventDefault()
          setIsShown(true)
        }}>
        <img
          src={formatImage(image || image_url)}
          alt=''
          className='h-72 max-h-72 cursor-pointer'
        />
      </button>
      <div className='flex flex-col h-36 justify-between text-left w-full px-4'>
        <h1 className='text-lg font-bold truncate'>
          {name || Name || title || "Unnamed"}
        </h1>
        <p className='w-full h-12 overflow-hidden'>
          {description || "No available description for this NFT."}
        </p>
        <button
          onClick={() => setIsShown(true)}
          role='button'
          className='w-1/2 text-center bg-primary shadow-3xl py-1 rounded-md text-white font-semibold hover:bg-pinkish'>
          Learn more
        </button>
        <NFTModal tokenInfo={metadata} isShown={isShown} setIsShown={setIsShown} />
      </div>
    </div>
  ) : (
    <SkeletonComponent />
  )
}

export default NFTCard
