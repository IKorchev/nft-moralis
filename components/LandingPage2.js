import { shortenIfAddress } from "@usedapp/core"
import Link from "next/link"
import Wave from "../assets/wave.svg"

import collections from "../utils/collections"
const LandingPage2 = () => {
  return (
    <div className=''>
      <img src={Wave.src} className='-pt-24' />
      <div className='bg-light'>
        <h1 className='text-secondary pt-24 pb-12 text-center text-5xl font-semibold'>
          Featured collections
        </h1>

        <div className='flex flex-wrap gap-10 justify-center items-center container mx-auto py-5 px-12 '>
          {collections.map((el) => (
            <Link href={`/assets/${el.contractAddress}`}>
              <div className='flex-col bg-primary-100 rounded-xl overflow-hidden cursor-pointer'>
                <img src={el.image} className='h-60 w-60 object-contain' />
                <div className='p-5 text-center'>
                  <h1 className='font-bold'>{el.name}</h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LandingPage2
