import Link from "next/link"

const Card = ({ collectionAddress, imageUrl, name }) => {
  return (
    <Link passHref href={`/assets/${collectionAddress}`}>
      <div
        className='w-48 flex-shrink-0 cursor-pointer flex-col overflow-hidden
        rounded-md bg-white transition duration-300 hover:-translate-y-1
        hover:shadow-lg hover:shadow-secondary-light/30 lg:w-60'>
        <img className='h-60 w-80 object-cover' src={imageUrl} alt='Collection' />
        <div className='p-3'>
          <h1 className='truncate text-center font-semibold'>{name}</h1>
        </div>
      </div>
    </Link>
  )
}

export default Card
