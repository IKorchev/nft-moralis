import { useEffect, useState } from "react"
import NFTModal from "./NFTModal"
import SkeletonComponent from "./NFTCardSkeleton"

const NFTCard = ({ metadata }) => {
  const [isShown, setIsShown] = useState(false)
  const parsedMetadata = JSON.parse(metadata.metadata)
  const { name, description, image } = parsedMetadata

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout()
  }, [name])
  let newimg
  if (image?.startsWith("ipfs") || image === null) {
    // newimg = image?.replace("ipfs://", "https://ipfs.moralis.io:2053/ipfs/")
    newimg =
      "https://thumbs.dreamstime.com/b/image-unavailable-icon-simple-illustration-129166551.jpg"
  } else {
    newimg = image
  }

  return !loading ? (
    <div
      className='flex flex-col items-center rounded-lg w-60 overflow-hidden 
    shadow-lg bg-white mt-2  translate duration-300 transform hover:shadow-3xl hover:scale-102'>
      <button
        onClick={(e) => {
          e.preventDefault()
          setIsShown(true)
        }}>
        <img
          src={
            newimg ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuDq7-cziw6BRNcnmaDB_fBOrnL8WN6Zp4HFLSC3PlWl9zap0X95n0kS5q__yA5tF15as&usqp=CAU"
          }
          alt=''
          className='h-48 cursor-pointer'
        />
      </button>
      <div className='flex flex-col h-36 justify-between text-left w-full px-4'>
        <h1 className='text-lg font-bold truncate'>{name || "Title"}</h1>
        <p className='w-full h-12 overflow-hidden'>
          {description || "No available description for this NFT."}
        </p>
        <button
          onClick={() => setIsShown(true)}
          role='button'
          className='w-1/2 text-center border-purple-600 border rounded-lg text-purple-600 bg-purple-100'>
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
