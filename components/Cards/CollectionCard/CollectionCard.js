import Link from "next/link"

const CollectionCard = ({ name, collectionAddress, imageUrl }) => {
  return (
    <Link href={`/assets/${collectionAddress}`}>
      <a>
        <div className='relative w-48 flex-shrink-0 transform cursor-pointer flex-col overflow-hidden rounded-md  bg-primary-700/20 pb-3 shadow-glass backdrop-blur-sm backdrop-filter lg:w-60'>
          <div className='relative h-36 p-2 lg:h-48 '>
            <div className='inset absolute inset-1.5 -z-1 overflow-hidden rounded-lg bg-gradient-to-br from-emerald-200  to-secondary '></div>
            <img src={imageUrl} className='h-full w-full rounded-lg bg-white object-cover ' />
          </div>
          <div className='relative p-4 text-center'>
            <h1 className=' truncate text-xl font-bold text-white'>{name}</h1>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default CollectionCard
