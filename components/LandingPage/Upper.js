import Link from "next/link"
import { Secondary, Primary } from "../Buttons/CTAButton"

const LandingPage = () => {
  return (
    <div
      style={{
        backgroundImage: 'url("/BlurredBG.webp")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className='landing-page relative h-screen min-h-[35rem] lg:min-h-[45rem] '>
      <div className='absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2'>
        <img
          src='/Abstract.svg'
          className='clip-img z-20 mx-auto h-48 w-auto transform rounded-lg object-contain  lg:h-[30rem]'
        />
      </div>
      <div className='container mx-auto h-full flex-col items-center overflow-hidden  py-48 text-center text-white md:flex'>
        <div className='z-10 flex w-full justify-center gap-2 lg:gap-4'>
          <div className='flex gap-2 lg:gap-5'>
            <p className=' mt-2 w-48 text-right text-xs lg:text-base'>
              Know what you are selling. Know what you are buying.
            </p>
            <div className='my-auto h-3/4 w-1 rounded-lg bg-gradient-to-b from-emerald-300 to-cyan-500 lg:w-1.5' />
          </div>
          <h1 className='h1 whitespace-nowrap text-left'>BUY NFTS</h1>
        </div>
        <div className='z-10 mt-5 flex w-full justify-center gap-2 lg:gap-4'>
          <h1 className='h1 whitespace-nowrap text-right'>SELL NFTS</h1>
          <div className='flex gap-2 lg:gap-5'>
            <div className='my-auto h-3/4 w-1 rounded-lg  bg-gradient-to-t from-emerald-300 to-cyan-500 lg:w-1.5' />
            <p className='mt-2 w-48 text-left text-xs lg:text-base'>
              Trade on the largest NFT Marketplace on Ropsten.
            </p>
          </div>
        </div>
        <div className='mt-12 space-x-5'>
          <Link href='/marketplace'>
            <Primary title='Marketplace' />
          </Link>
          <Link href='/launchpad'>
            <Secondary title='Launchpad' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
