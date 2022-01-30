import Link from "next/link"

const Card = ({ collectionAddress, imageUrl, name }) => {
  return (
    <Link passHref href={`/assets/${collectionAddress}`}>
      <div
        className='w-48 rounded-md overflow-hidden lg:w-60 flex-shrink-0
        flex-col bg-white cursor-pointer transition duration-300
        hover:-translate-y-1 hover:shadow-secondary-light/30 hover:shadow-lg'>
        <img className='w-80 h-60 object-cover' src={imageUrl} alt='Collection' />
        <div className='p-3'>
          <h1 className='text-center truncate font-semibold'>{name}</h1>
        </div>
      </div>
    </Link>
  )
}

export default Card
