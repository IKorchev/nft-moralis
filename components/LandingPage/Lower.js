import { allLaunchpadsState } from "../../store/store"
import { Primary as ButtonPrimary } from "../Buttons/CTAButton"
import Slider from "react-slick"
import Link from "next/link"
import { useRecoilValue } from "recoil"
import FeaturedSection from "./FeaturedSection"
import { useEffect, useState } from "react"

const LandingPage2 = () => {
  const { completed, upcoming } = useRecoilValue(allLaunchpadsState)
  const [showChild, setShowChild] = useState(false)
  useEffect(() => {
    setShowChild(true)
  }, [])
  if (!showChild) return null
  return (
    <div className='py-24'>
      <div className=' container mx-auto grid grid-cols-1 gap-5 lg:mt-48 lg:grid-cols-2'>
        <div className='self-center p-5 py-12 text-center text-white lg:text-left'>
          <h2 className='h1 font-montserrat text-6xl font-black text-emerald-300 xl:text-8xl'>Upcoming collections</h2>
          <p className='my-12 text-2xl'>New collections are being listed weekly. Don't miss out! Check them out.</p>
          <Link passHref href='/collections'>
            <ButtonPrimary title='View all collections' />
          </Link>
        </div>
        <div className='p-12'>
          <Slider
            pauseOnFocus={false}
            pauseOnHover={true}
            className=' mx-auto w-full overflow-hidden rounded-xl bg-teal-100 shadow-glass-large'
            arrows={false}
            autoPlaySpeed={2000}
            autoplay>
            {upcoming?.map((el) => {
              return (
                <div key={el.attributes.imageUrl} className='h-max'>
                  <Link href={`/assets/${el.attributes.contractAddress}`}>
                    <a>
                      <img
                        src={el.attributes.imageUrl}
                        className='h-[25rem] w-full rounded-xl object-cover xl:h-[35rem]'
                        alt=''
                      />
                    </a>
                  </Link>
                  <h1 className='py-5 text-center text-3xl font-black text-black'>{el.attributes.collectionName}</h1>
                </div>
              )
            })}
          </Slider>
        </div>
      </div>
      {completed && <FeaturedSection completed={completed} />}
    </div>
  )
}

export default LandingPage2
