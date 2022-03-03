import Link from "next/link"
import Wave from "../public/assets/wave.svg"
import { useMoralisData } from "./Providers/MoralisDataProvider"

const LandingPage2 = () => {
  const { completedLaunchpads } = useMoralisData()

  return (
    <div>
      <img src={Wave.src} className='z-20 pt-24' />
      <div className='bg-light '>
        <h1 className='pt-24 pb-12 text-center text-5xl font-semibold text-secondary'>
          Featured collections
        </h1>
        <div
          className='container mx-auto flex flex-wrap
         items-center justify-center gap-10 py-5 px-12  '>
          {completedLaunchpads.slice(0, 3).map((el) => (
            <Link
              key={el.attributes.collectionName}
              href={`/assets/${el.attributes.contractAddress}`}>
              <div className='w-60 cursor-pointer flex-col overflow-hidden rounded-xl border bg-light shadow-lg'>
                <img src={el.attributes.imageUrl} className='h-60 w-60 object-cover' />
                <div className='p-5 text-center'>
                  <h1 className='truncate font-bold'>{el.attributes.collectionName}</h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className='bg-light pb-24'>
        <h1 className='pt-24 pb-12 text-center text-5xl font-semibold text-secondary'>
          Recently launched
        </h1>
        <div
          className='container mx-auto flex flex-wrap
         items-center justify-center gap-10 py-5 px-12  '>
          {completedLaunchpads.slice(3).map((el) => (
            <Link
              key={el.attributes.collectionName}
              href={`/assets/${el.attributes.contractAddress}`}>
              <div className='w-60 cursor-pointer flex-col overflow-hidden rounded-xl border bg-light shadow-lg'>
                <img src={el.attributes.imageUrl} className='h-60 w-60 object-cover' />
                <div className='p-5 text-center'>
                  <h1 className='truncate font-bold'>{el.attributes.collectionName}</h1>
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
