import Link from "next/link"
import { gsap } from "gsap/dist/gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useEffect, useRef } from "react"
gsap.registerPlugin(ScrollTrigger)

const CollectionCard = ({ name, contractAddress, imageUrl }) => {
  const ref = useRef()

  return (
    <Link href={`/assets/${contractAddress}`}>
      <div
        ref={ref}
        className='relative w-48 transform cursor-pointer flex-col overflow-hidden  rounded-md  bg-primary-700/20 pb-3  shadow-glass backdrop-blur-sm backdrop-filter transition duration-200 hover:-translate-y-0.5  lg:w-60'>
        <div className='relative h-36 p-2 lg:h-48 '>
          <img src={imageUrl} className='h-full w-full rounded-lg object-cover p-0.5 ' />
          <div className='inset absolute inset-2 -z-1 animate-pulse overflow-hidden rounded-lg bg-gradient-to-br from-emerald-200 via-secondary to-secondary '></div>
        </div>
        <div className='relative p-4 text-center'>
          <h1 className=' truncate text-xl font-bold text-white'>{name}</h1>
        </div>
      </div>
    </Link>
  )
}

export default CollectionCard
