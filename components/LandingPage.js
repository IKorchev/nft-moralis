import Link from "next/link"
import BSCLogo from "../assets/Group 15.svg"
import AVAXLogo from "../assets/Group 18.svg"
import ETHLogo from "../assets/Group 16.svg"
import MATICLogo from "../assets/Group 17.svg"
const LandingPage = () => {
  return (
    <main className='text-center mx-auto container'>
      <div className='lg:w-1/2 px-5 py-48 lg:px-24 text-white text-left'>
        <div>
          <p className='mb-2 text-lg text-pinkish'>Around the blockchain</p>
          <h1 className='text-5xl font-semibold text-white '>Explore the NFT space.</h1>
          <p className='text-lg mt-8 font-light'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse commodi
            consectetur, veniam dignissimos eum natus illo.
          </p>
        </div>
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
        <p className='text-center text-pinkish opacity-70 text-xl'>
          Blockchains supported
        </p>
        <div className='flex mt-12 mx-auto justify-around px-48 w-full'>
          <img src={ETHLogo.src} className='h-24' />
          <img src={MATICLogo.src} className='h-24' />
          <img src={AVAXLogo.src} className='h-24' />
          <img src={BSCLogo.src} className='h-24' />
        </div>
      </div>
    </main>
  )
}

export default LandingPage
