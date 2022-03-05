import Link from "next/link"
import { motion } from "framer-motion"
import Abstract from "../public/assets/Abstract.svg"

const LandingPage = () => {
  return (
    <div className='landing-page relative h-screen min-h-[40rem] '>
      <div className='absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2'>
        <img
          src={Abstract.src}
          className='clip-img z-20 mx-auto h-48 w-auto transform rounded-lg object-contain  lg:h-[30rem]'
        />
      </div>
      <motion.main exit={{ opacity: 0 }} className='mx-auto pt-12 text-center'>
        <div className='container mx-auto h-full flex-col items-center py-48  text-center text-white md:flex'>
          <div className='flex w-full justify-center gap-2 lg:gap-4'>
            <div className='flex gap-2 lg:gap-5'>
              <p className='mt-2 w-48 text-right text-xs lg:text-base'>
                Know what you are selling. Know what you are buying.
              </p>
              <div className='my-auto h-3/4 w-1  rounded-lg bg-gradient-to-b from-emerald-300 to-cyan-500 lg:w-1.5' />
            </div>
            <h1 className='h1 whitespace-nowrap text-left'>BUY NFTS</h1>
          </div>
          <div className='mt-5 flex w-full justify-center gap-2 lg:gap-4'>
            <h1 className='h1 whitespace-nowrap text-right'>SELL NFTS</h1>
            <div className='flex gap-2 lg:gap-5'>
              <div className='my-auto h-3/4 w-1 rounded-lg  bg-gradient-to-t from-emerald-300 to-cyan-500 lg:w-1.5' />
              <p className='mt-2 w-48 text-left text-xs lg:text-base'>
                Trade on the largest NFT Marketplace on Ropsten.
              </p>
            </div>
          </div>
          <div className='mt-12 '>
            <Link href='/marketplace'>
              <a
                className='mx-2 w-max rounded border border-cyan-600 bg-gradient-to-tr from-emerald-200 to-cyan-300 px-5 py-2.5 text-base 
                text-black ring-white focus:from-emerald-100 focus:to-cyan-100 focus:ring hover:from-emerald-100 hover:to-cyan-100 lg:text-xl'>
                Marketplace
              </a>
            </Link>
            <Link href='/launchpad'>
              <a
                className='mx-2 w-max rounded border border-cyan-400 bg-transparent px-5 py-2.5 
                text-base ring-white focus:bg-cyan-100 focus:text-black focus:ring hover:bg-cyan-100 hover:text-black lg:text-xl'>
                Launchpad
              </a>
            </Link>
          </div>
        </div>
      </motion.main>
    </div>
  )
}

export default LandingPage
