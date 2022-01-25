import Link from "next/link"
import BSCLogo from "../assets/BSCLogo.svg"
import AVAXLogo from "../assets/AVAXLogo.svg"
import ETHLogo from "../assets/ETHLogo.svg"
import MATICLogo from "../assets/MATICLogo.svg"
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
          <motion.p variants={variants} className='mb-2 text-lg text-pinkish'>
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
              className='transition duration-300 bg-pink-600  w-max text-xl mt-5 px-5 py-1.5 
            rounded-lg border-pinkish border-2 focus:ring ring-white
            hover:bg-pink-900
            '>
              Marketplace
            </a>
          </Link>
          <Link href='/launchpad'>
            <a
              className='transition duration-300  text-pink-800 bg-light w-max ml-5 text-xl mt-5 px-5 py-1.5 rounded-lg border-pinkish border-2 hover:bg-purple-200
              focus:ring ring-white'>
              Launchpad
            </a>
          </Link>
        </div>
      </div>
      <div>
        <p className='text-center text-pinkish text-xl'>Blockchains supported</p>
        <div className='flex mt-12 mx-auto justify-around px-48 w-full'>
          <img src={ETHLogo.src} className='h-12  mx-2 lg:h-24' />
          <img src={MATICLogo.src} className='h-12 mx-2 lg:h-24' />
          <img src={AVAXLogo.src} className='h-12 mx-2 lg:h-24' />
          <img src={BSCLogo.src} className='h-12 mx-2 lg:h-24' />
        </div>
      </div>
    </motion.main>
  )
}

export default LandingPage
