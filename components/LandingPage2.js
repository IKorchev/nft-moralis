import Wave from "../assets/wave.svg"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import EXPLOREIcon from "../assets/Group 25.svg"
import SWAPIcon from "../assets/Group 26.svg"
import MINTIcon from "../assets/Group 27.svg"
gsap.registerPlugin(ScrollTrigger)
import { useEffect, useRef } from "react"
// import Card from "./Card"
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
          className='container mx-auto flex flex-col lg:flex-row items-center lg:justify-evenly mt-24 pb-24'>
          {/* <Card
            image={MINTIcon.src}
            title='Mint your own'
            description='Upload a picture and Mint your own NFT easily'
            buttonText='Mint'
          />
          <Card
            animate={true}
            className='lg:-mt-24'
            image={EXPLOREIcon.src}
            title='Explore NFTs'
            description='Enter a keyword and select any of the chains supported'
            buttonText='Explore'
          />
          <Card
            image={SWAPIcon.src}
            title='Swap tokens'
            description='Get quotes from 1Inch and swap any token'
            buttonText='Swap'
          /> */}
        </div>
      </div>
    </div>
  )
}

export default LandingPage2
