import Link from "next/link"
import { Secondary, Primary } from "../Buttons/CTAButton"
import { motion } from "framer-motion"
import StaggerChildren, { createSlideVariant } from "../Other/StaggerChildren"

const LandingPage = () => {
  const slideFromLeft = createSlideVariant({ from: "left" })
  const slideFromRight = createSlideVariant({ from: "right" })
  const slideFromBottom = createSlideVariant({ from: "bottom" })

  return (
    <div
      style={{
        backgroundImage: 'url("/polygon.svg")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className='landing-page relative h-screen bg-auto lg:min-h-[45rem]  '>
      <StaggerChildren
        staggerDelay={0.1}
        className='container mx-auto flex h-full flex-col items-center justify-center overflow-hidden py-24
        text-center text-white'>
        <div className='z-10 flex w-full justify-center gap-2 lg:gap-4'>
          <div className='flex gap-2 lg:gap-5'>
            <motion.p
              variants={slideFromLeft}
              transition={{ type: "spring", damping: 15 }}
              className=' mt-2 w-48 text-right text-xs lg:text-base'>
              Know what you are selling. Know what you are buying.
            </motion.p>
            <motion.div
              variants={slideFromLeft}
              transition={{ type: "spring", damping: 15 }}
              className='my-auto h-3/4 w-1 rounded-lg bg-gradient-to-b from-emerald-300 to-cyan-500 lg:w-1.5'
            />
          </div>
          <motion.h1
            variants={slideFromRight}
            transition={{ type: "spring", damping: 15 }}
            className='h1 whitespace-nowrap text-left'>
            BUY NFTS
          </motion.h1>
        </div>
        <div className='z-10 mt-5 flex w-full justify-center gap-2 lg:gap-4'>
          <motion.h1
            variants={slideFromLeft}
            transition={{ type: "spring", damping: 15 }}
            className='h1 whitespace-nowrap text-right'>
            SELL NFTS
          </motion.h1>
          <div className='flex gap-2 lg:gap-5'>
            <motion.div
              variants={slideFromLeft}
              transition={{ type: "spring", damping: 15 }}
              className='my-auto h-3/4 w-1 rounded-lg  bg-gradient-to-t from-emerald-300 to-cyan-500 lg:w-1.5'
            />
            <motion.p variants={createSlideVariant("right")} className='mt-2 w-48 text-left text-xs lg:text-base'>
              Trade on the largest NFT Marketplace on Ropsten.
            </motion.p>
          </div>
        </div>
        <motion.div variants={slideFromBottom} transition={{ type: "spring", damping: 15 }} className='mt-12 space-x-5'>
          <Link href='/marketplace'>
            <Primary title='Marketplace' />
          </Link>
          <Link href='/launchpad'>
            <Secondary title='Launchpad' />
          </Link>
        </motion.div>
      </StaggerChildren>
    </div>
  )
}

export default LandingPage
