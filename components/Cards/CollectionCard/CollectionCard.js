import Link from "next/link"

const CollectionCard = ({ name, collectionAddress, imageUrl }) => {
  return (
    <div
      className='collection-card'>
      <Link href={`/assets/${collectionAddress}`}>
        <a>
          <div className='relative h-36 p-2 lg:h-48 '>
            <div className='inset to-secondary absolute inset-1.5 -z-1 overflow-hidden rounded-lg bg-gradient-to-br  from-emerald-200 '></div>
            <img src={imageUrl} className='h-full w-full rounded-lg bg-white object-cover ' />
          </div>
          <div className='relative p-4 text-center'>
            <h1 className=' truncate text-xl font-bold text-white'>{name}</h1>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default CollectionCard
