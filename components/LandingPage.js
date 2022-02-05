import Link from "next/link"
import BSCLogo from "../public/assets/BSCLogo.svg"
import AVAXLogo from "../public/assets/AVAXLogo.svg"
import ETHLogo from "../public/assets/ETHLogo.svg"
import MATICLogo from "../public/assets/MATICLogo.svg"
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
    <motion.main exit={{ opacity: 0 }} className='text-center relative mx-auto container'>
      <div className='px-5 py-48 lg:px-24 text-white text-left'>
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
          <motion.p variants={variants} className='text-lg mt-8 font-light'>
            Buy and sell NFTs with minimal fees. New collections listed every week!
          </motion.p>
        </motion.div>
        <div className='mt-12'>
          <Link href='/marketplace'>
            <a
              className='transition duration-300 bg-secondary  w-max text-xl mt-5 px-5 py-1.5 
            rounded-lg border-secondary border-2 focus:ring ring-white
            hover:bg-pink-900
            '>
              Marketplace
            </a>
          </Link>
          <Link href='/launchpad'>
            <a
              className='transition duration-300  text-secondary bg-light w-max ml-5 text-xl mt-5 px-5 py-1.5 rounded-lg border-secondary border-2
              hover:bg-pink-900 hover:text-white
              focus:ring ring-white'>
              Launchpad
            </a>
          </Link>
        </div>
      </div>
    </motion.main>
  )
}

export default LandingPage
