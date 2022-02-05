import Link from "next/link"
import Wave from "../public/assets/wave.svg"
import { useMoralisData } from "./Providers/MoralisDataProvider"


const LandingPage2 = () => {
  const { completedLaunchpads } = useMoralisData()

  return (
    <div className=''>
      <img src={Wave.src} className='-pt-24' />
      <div className='bg-light'>
        <h1 className='text-secondary pt-24 pb-12 text-center text-5xl font-semibold'>
          Featured collections
        </h1>

        <div
          className='flex flex-wrap gap-10 justify-center
         items-center container mx-auto py-5 px-12  '>
          {completedLaunchpads.slice(0, 3).map((el) => (
            <Link href={`/assets/${el.attributes.contractAddress}`}>
              <div className='flex-col bg-light rounded-xl w-60 overflow-hidden cursor-pointer shadow-lg border'>
                <img src={el.attributes.imageUrl} className='h-60 w-60 object-cover' />
                <div className='p-5 text-center'>
                  <h1 className='font-bold truncate'>{el.attributes.collectionName}</h1>
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
