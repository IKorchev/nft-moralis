import Wave from "../assets/wave.svg"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import EXPLOREIcon from "../assets/Group 25.svg"
import SWAPIcon from "../assets/Group 26.svg"
import MINTIcon from "../assets/Group 27.svg"
gsap.registerPlugin(ScrollTrigger)
import { useEffect, useRef } from "react"
const LandingPage2 = () => {
  const parentRef = useRef()
  useEffect(() => {
    const childEls = parentRef.current.children
    gsap.from(childEls, {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "back.out(2)",
      scrollTrigger: {
        trigger: childEls[0],
        start: "center bottom",
      },
    })
  }, [])
  return (
    <div className=''>
      <img src={Wave.src} className='-pt-24' />
      <div className='bg-light'>
        <h1 className='text-pinkish pt-24 pb-12 text-center text-5xl font-semibold'>
          Everything in one place
        </h1>
        <div
          ref={parentRef}
          className='container mx-auto flex justify-evenly mt-24 pb-24'>
          <div className=' card h-96 text-center text-black bg-white border-pinkish p-5 shadow-xl '>
            <img src={MINTIcon.src} alt='' className='w-24 mb-8 mt-2' />
            <h2 className='text-center my-5 text-pink-400'>Mint your own</h2>
            <p>Mint your own NFT with a click of a button</p>
            <a
              href='/mint'
              className='bg-pinkish px-8 text-white hover:bg-primary-lightest transition duration-500 border-pinkish border font-bold  py-1 rounded-full mt-8'>
              Mint
            </a>
          </div>
          <div className=' card h-96 text-center text-black bg-white border-pinkish p-5 shadow-xl -mt-10'>
            <img src={EXPLOREIcon.src} alt='' className='animate-spin-slow mb-6 mt-2' />
            <h2 className='text-center my-5 text-pink-400'>Explore NFTs</h2>
            <p>Enter a keyword and select any of the chains supported</p>
            <a
              href='/explore'
              className='bg-pinkish px-8 text-white hover:bg-primary-lightest transition duration-500 border-pinkish border font-bold  py-1 rounded-full mt-8'>
              Explore
            </a>
          </div>
          <div className=' card h-96 text-center text-black bg-white border-pinkish p-5 shadow-xl'>
            <img src={SWAPIcon.src} alt='' className='w-24 mb-6 mt-2' />
            <h2 className='text-center my-5 text-pink-400'>Swap tokens</h2>
            <p>Get quotes from 1Inch exchange and swap almost any token</p>
            <a
              href='/swap'
              className='bg-pinkish px-8 text-white hover:bg-primary-lightest transition duration-500 border-pinkish border font-bold  py-1 rounded-full mt-8'>
              Swap
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage2
