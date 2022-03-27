import { allLaunchpadsState } from "../../store/store"
import { CTAButton } from "../Buttons"
import { useRecoilValue } from "recoil"
import { motion } from "framer-motion"
import Link from "next/link"
import Slider from "react-slick"
import FeaturedSection from "./FeaturedSection"
import StaggerChildren, { createSlideVariant } from "../Other/StaggerChildren"

const LandingPage2 = () => {
  const { completed, upcoming } = useRecoilValue(allLaunchpadsState)
  const slideFromBottom = createSlideVariant({ from: "bottom", whileInView: true })

  return (
    <div className=''>
      <div className='container mx-auto grid  grid-cols-1 gap-5 pt-12 lg:mt-24 lg:grid-cols-2'>
        <StaggerChildren
          whileInView
          staggerDelay={0.25}
          className='self-center p-5 py-12 text-center text-white lg:text-left'>
          <motion.h2
            variants={slideFromBottom}
            transition={{ duration: 0.7, type: "spring", damping: 14 }}
            className='h1 font-montserrat text-tertiary-300 text-6xl font-black xl:text-8xl'>
            Upcoming collections
          </motion.h2>
          <motion.p
            variants={slideFromBottom}
            transition={{ duration: 0.7, type: "spring", damping: 14 }}
            className='mt-12 mb-24 text-2xl'>
            New collections are being listed weekly. Don't miss out! Check them out.
          </motion.p>
          <motion.span variants={slideFromBottom} transition={{ duration: 0.7, type: "spring", damping: 14 }}>
            <CTAButton href='/collections' title='View all collections' />
          </motion.span>
        </StaggerChildren>
        <StaggerChildren className='p-12'>
          <Slider
            pauseOnFocus={false}
            pauseOnHover={true}
            className=' bg-tertiary-50 shadow-glass-large mx-auto w-full overflow-hidden rounded-xl lg:w-[30rem]'
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
                        className='h-[25rem] w-full rounded-xl object-cover xl:h-[25rem] xl:max-w-[30rem]'
                        alt=''
                      />
                    </a>
                  </Link>
                  <h1 className='py-5 text-center text-3xl font-black text-black'>{el.attributes.collectionName}</h1>
                </div>
              )
            })}
          </Slider>
        </StaggerChildren>
      </div>
      <FeaturedSection completed={completed} />
    </div>
  )
}

export default LandingPage2
