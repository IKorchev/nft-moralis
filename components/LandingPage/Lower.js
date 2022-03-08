import { useMoralisData } from "../Providers/MoralisDataProvider"
import { CollectionCard } from "../Cards/CollectionCard"
import { gsap } from "gsap/dist/gsap"
import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { SectionTitle } from "../SectionTitle"
gsap.registerPlugin(ScrollTrigger)

const LandingPage2 = () => {
  const { completedLaunchpads } = useMoralisData()
  const containerRef = useRef()

  useEffect(() => {
    const childEls = containerRef.current.children
    if (childEls.length > 0) {
      gsap.from(childEls, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "linear",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "20% 100%",
        },
      })
    }
  }, [])

  return (
    <div
      className='mt-24 min-h-screen bg-contain bg-center bg-no-repeat lg:mt-48'
      style={{
        backgroundImage: "url('/Object_1.svg')",
      }}>
      <div>
        <SectionTitle title='Featured collections' justify='center' />
        <div
          ref={containerRef}
          className='container mx-auto mt-12 flex
         flex-wrap items-center justify-center gap-2 py-5 px-3 md:px-12 lg:gap-10'>
          {completedLaunchpads?.slice(0, 3).map((el, i) => (
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
