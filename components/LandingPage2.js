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
  return (
    <div className=''>
      <img src={Wave.src} className='-pt-24' />
      <div className='bg-light'>
        <h1 className='text-pinkish pt-24 pb-12 text-center text-5xl font-semibold'>
          Everything in one place
        </h1>
      </div>
    </div>
  )
}

export default LandingPage2
