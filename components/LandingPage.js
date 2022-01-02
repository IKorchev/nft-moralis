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
        staggerChildren: 0.2,
      },
    },
  }
  const variants = {
    hidden: {
      y: -50,
      x: -25,
      opacity: 0,
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 90,
      },
    },
  }

  return (
    <main className='text-center relative mx-auto container'>
      <div className=' px-5 py-48 lg:px-24 text-white text-left'>
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse commodi
            consectetur, veniam dignissimos eum natus illo.
          </motion.p>
        </motion.div>
        <div className='mt-12'>
          <a
            href='/explore'
            className=' w-max text-xl mt-5 px-5 py-2 rounded-lg bg-gradient-to-l  from-primary-lightest to-pinkish hover:opacity-90 focus:ring ring-white'>
            Explore
          </a>
          <a
            href='/mint'
            className='animate-pulse text-pinkish w-max ml-5 text-xl mt-5 px-5 py-1.5 rounded-lg border-pinkish border-2 focus:ring ring-white'>
            Mint NFT
          </a>
        </div>
      </div>
      <div className='py-12'>
        <p className='text-center text-pinkish text-xl'>Blockchains supported</p>
        <div className='flex mt-12 mx-auto justify-around px-48 w-full'>
          <img src={ETHLogo.src} className='h-12  mx-2 lg:h-24' />
          <img src={MATICLogo.src} className='h-12 mx-2 lg:h-24' />
          <img src={AVAXLogo.src} className='h-12 mx-2 lg:h-24' />
          <img src={BSCLogo.src} className='h-12 mx-2 lg:h-24' />
        </div>
      </div>
    </main>
  )
}

export default LandingPage
