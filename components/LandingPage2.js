import { gsap } from "gsap/dist/gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
import Link from "next/link"
import { useMoralisData } from "./Providers/MoralisDataProvider"
import { useEffect, useRef } from "react"

const LandingPage2 = () => {
  const { completedLaunchpads } = useMoralisData()
  const cardsContainer = useRef()

  useEffect(() => {
    gsap.from(cardsContainer.current.children, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: "backOut()",
      scrollTrigger: {
        trigger: cardsContainer.current,
      },
    })
  }, [])

  return (
    <div
      className='mt-24 min-h-screen bg-contain bg-center bg-no-repeat lg:mt-48'
      style={{
        backgroundImage: "url('/Object_1.svg')",
      }}>
      <div>
        <div className='flex justify-center pt-24 pb-16'>
          <h1 className='mt-24  rounded-lg bg-primary-900/60 p-3 text-center text-4xl font-semibold text-secondary shadow-glass lg:text-5xl'>
            <span className='bg-gradient-to-r from-emerald-400 via-white to-secondary bg-clip-text text-transparent'>
              Featured collections
            </span>
          </h1>
        </div>
        <div
          ref={cardsContainer}
          className='container mx-auto flex flex-wrap
         items-center justify-center gap-2 py-5 px-3 md:px-12 lg:gap-10'>
          {completedLaunchpads.slice(0, 3).map((el) => (
            <div>
              <Link
                key={el.attributes.collectionName}
                href={`/assets/${el.attributes.contractAddress}`}>
                <div className='w-48 transform cursor-pointer flex-col overflow-hidden rounded-md  bg-primary-700/20  pb-3 shadow-glass  backdrop-blur-sm backdrop-filter transition-transform duration-200 hover:-translate-y-1 lg:w-60'>
                  <div className='relative overflow-hidden p-2'>
                    <div className='overflow-hidden rounded-lg bg-gradient-to-br from-white via-secondary to-secondary shadow-4xl shadow-black/50  '>
                      <img
                        src={el.attributes.imageUrl}
                        className='h-36 w-full rounded-lg object-cover p-0.5 lg:h-48 '
                      />
                    </div>
                  </div>
                  <div className='relative p-4 text-center'>
                    <h1 className=' truncate text-xl font-bold text-white'>
                      {el.attributes.collectionName}
                    </h1>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* <div className='pb-24'>
        <h1 className='pt-24 pb-12 text-center text-4xl font-semibold text-secondary lg:text-5xl'>
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
      </div> */}
    </div>
  )
}

export default LandingPage2
