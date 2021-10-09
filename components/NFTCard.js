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
    console.log(formatImage(image, image_url))
    setTimeout(() => {
      setLoading(false)
    }, 500)
    return () => clearTimeout()
  }, [name])

  return !loading ? (
    <div
      className='flex flex-col items-center rounded-lg w-60 overflow-hidden 
    shadow-lg bg-white mt-4  translate duration-200 transform hover:shadow-3xl hover:-translate-y-1 border-t-4 hover:border-pink-400 border-light-tealish'>
      <button
        onClick={(e) => {
          e.preventDefault()
          setIsShown(true)
        }}>
        <img
          src={formatImage(image || image_url)}
          alt=''
          className='h-48 cursor-pointer'
        />
      </button>
      <div className='flex flex-col bg-gradient-to-b from-white to-green-100 h-36 justify-between text-left w-full px-4'>
        <h1 className='text-lg font-bold truncate'>
          {name || Name || title || "Unnamed"}
        </h1>
        <p className='w-full h-12 overflow-hidden'>
          {description || "No available description for this NFT."}
        </p>
        <button
          onClick={() => setIsShown(true)}
          role='button'
          className='w-1/2 text-center border-green-900 border rounded-lg text-green-900 hover:text-white hover:bg-green-500'>
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
