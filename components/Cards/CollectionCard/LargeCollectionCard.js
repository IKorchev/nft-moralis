import React from "react"
import Link from "next/link"
import { truncate } from "lodash"

const LargeCollectionCard = ({ collectionAddress, name, imageUrl, description }) => {
  return (
    <Link href={`/assets/${collectionAddress}`}>
      <a>
        <div
          className='bg-secondary-700/20 hover:shadow-secondary-200/40 shadow-glass-large relative w-60 flex-shrink-0 cursor-pointer flex-col
            overflow-hidden rounded-md pb-3 shadow-lg backdrop-blur-sm backdrop-filter
            duration-200 hover:-translate-y-2 sm:w-72 lg:w-[22rem]'>
          <div className='relative h-48 p-2 sm:h-60 lg:h-80 lg:p-2.5'>
            <div className='inset -z-1 to-secondary-100 via-secondary-100 absolute inset-1.5 overflow-hidden rounded-lg bg-gradient-to-br  from-emerald-200 '></div>
            <img src={imageUrl} className='h-full w-full rounded-lg bg-white object-cover ' />
          </div>
          <div className='relative p-4 '>
            <h1 className=' truncate text-xl font-bold'>
              <span className='from-secondary-100 bg-gradient-to-r to-pink-300  bg-clip-text text-transparent'>
                {name}
              </span>
            </h1>
            <p className='text-start mt-3 min-h-[4rem] text-sm'>
              {truncate(description, {
                length: 80,
              })}
            </p>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default LargeCollectionCard
