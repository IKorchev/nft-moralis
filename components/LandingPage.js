import Link from "next/link"
import { motion } from "framer-motion"

const LandingPage = () => {
  const container = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  }
  const variants = {
    hidden: {
      clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",

      opacity: 0,
    },
    visible: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      opacity: 1,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 90,
      },
    },
  }

  return (
    <motion.main exit={{ opacity: 0 }} className='container relative mx-auto text-center'>
      <div className='px-5 py-48 text-left text-white lg:px-24'>
        <motion.div
          variants={container}
          initial='hidden'
          animate='visible'
          className='w-full lg:w-1/2'>
          <motion.p variants={variants} className='mb-2 text-lg text-secondary'>
            Around the blockchain
          </motion.p>
          <motion.h1 variants={variants} className='text-5xl font-semibold text-white '>
            Explore the NFT space.
          </motion.h1>
          <motion.p variants={variants} className='mt-8 text-lg font-light'>
            Buy and sell NFTs with minimal fees. New collections listed every week!
          </motion.p>
        </motion.div>
        <div className='mt-12'>
          <Link href='/marketplace'>
            <a
              className='mt-5 w-max rounded-lg  border-2 border-secondary bg-secondary px-5 py-1.5 
            text-xl ring-white transition duration-300 focus:ring
            hover:bg-pink-900
            '>
              Marketplace
            </a>
          </Link>
          <Link href='/launchpad'>
            <a
              className='ml-5 mt-5  w-max rounded-lg border-2 border-secondary bg-light px-5 py-1.5 text-xl text-secondary ring-white transition
              duration-300 focus:ring
              hover:bg-pink-900 hover:text-white'>
              Launchpad
            </a>
          </Link>
        </div>
      </div>
    </motion.main>
  )
}

export default LandingPage
