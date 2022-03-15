import { useMoralisData } from "../Providers/MoralisDataProvider"
import { CollectionCard } from "../Cards/CollectionCard"
import { gsap } from "gsap/dist/gsap"
import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import SectionTitle from "../SectionTitle"
import { allLaunchpadsState } from "../../store/store"
gsap.registerPlugin(ScrollTrigger)
import { useRecoilValue } from "recoil"
const LandingPage2 = () => {
  const containerRef = useRef()
  const { completed } = useRecoilValue(allLaunchpadsState)
  useEffect(() => {
    const childEls = containerRef.current.children
    if (childEls.length > 0) {
      gsap.from(childEls, {
        y: 100,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "20% 100%",
        },
      })
    }
  }, [])

  return (
    <div className='py-24'>
      <div
        style={{
          backgroundImage: "url('/Group_1.png')",
          backgroundSize: "contain",
        }}
        className='mt-24 bg-cover bg-center bg-no-repeat py-24'>
        <SectionTitle title='Featured collections' justify='center' />
        <div
          ref={containerRef}
          className=' container mx-auto  mt-12  flex flex-wrap items-center
         justify-center gap-2 lg:gap-10'>
          {completed?.slice(1, 4).map((el, i) => (
            <CollectionCard
              key={el.attributes.contractAddress}
              name={el.attributes.collectionName}
              collectionAddress={el.attributes.contractAddress}
              imageUrl={el.attributes.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LandingPage2
