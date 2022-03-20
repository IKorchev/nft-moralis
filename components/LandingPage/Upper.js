import Link from "next/link"
import { Secondary, Primary } from "../Buttons/CTAButton"
import { motion } from "framer-motion"

const containerVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const slideFromLeft = {
  initial: {
    opacity: 0,
    x: -30,
  },
  animate: {
    opacity: 1,
    x: 0,
    trnasition: {
      duration: 1,
    },
  },
}

const slideFromRight = {
  initial: {
    opacity: 0,
    x: 30,
  },
  animate: {
    opacity: 1,
    x: 0,
    trnasition: {
      duration: 1,
    },
  },
}

const LandingPage = () => {
  return (
    <div
      style={{
        backgroundImage: 'url("/polygon.svg")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className='landing-page relative h-screen bg-auto lg:min-h-[45rem]  '>
      <motion.div
        variants={containerVariants}
        initial='initial'
        animate='animate'
        className='container mx-auto h-full flex-col items-center justify-center
         overflow-hidden py-24 text-center text-white flex'>
        <div className='z-10 flex w-full justify-center gap-2 lg:gap-4'>
          <div className='flex gap-2 lg:gap-5'>
            <motion.p variants={slideFromLeft} className=' mt-2 w-48 text-right text-xs lg:text-base'>
              Know what you are selling. Know what you are buying.
            </motion.p>
            <motion.div
              variants={containerVariants}
              className='my-auto h-3/4 w-1 rounded-lg bg-gradient-to-b from-emerald-300 to-cyan-500 lg:w-1.5'
            />
          </div>
          <motion.h1 variants={slideFromRight} className='h1 whitespace-nowrap text-left'>
            BUY NFTS
          </motion.h1>
        </div>
        <div className='z-10 mt-5 flex w-full justify-center gap-2 lg:gap-4'>
          <motion.h1 variants={slideFromLeft} className='h1 whitespace-nowrap text-right'>
            SELL NFTS
          </motion.h1>
          <div className='flex gap-2 lg:gap-5'>
            <motion.div
              variants={containerVariants}
              className='my-auto h-3/4 w-1 rounded-lg  bg-gradient-to-t from-emerald-300 to-cyan-500 lg:w-1.5'
            />
            <motion.p variants={slideFromRight} className='mt-2 w-48 text-left text-xs lg:text-base'>
              Trade on the largest NFT Marketplace on Ropsten.
            </motion.p>
          </div>
        </div>
        <motion.div variants={containerVariants} className='mt-12 space-x-5'>
          <Link href='/marketplace'>
            <Primary title='Marketplace' />
          </Link>
          <Link href='/launchpad'>
            <Secondary title='Launchpad' />
          </Link>
        </motion.div>
        {/* <div className='absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2'>
          <img
            src='/Abstract.svg'
            className='clip-img z-20 mx-auto mt-24 h-48 w-auto transform rounded-lg object-contain  lg:h-[30rem]'
          />
        </div> */}
      </motion.div>
    </div>
  )
}

export default LandingPage
