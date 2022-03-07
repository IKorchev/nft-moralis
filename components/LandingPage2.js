import { useMoralisData } from "./Providers/MoralisDataProvider"
import CollectionCard from "./Cards/CollectionCard"
import { gsap } from "gsap/dist/gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useEffect, useRef } from "react"
gsap.registerPlugin(ScrollTrigger)
const LandingPage2 = () => {
  const { completedLaunchpads } = useMoralisData()
  const containerRef = useRef()

  useEffect(() => {
    const childEls = containerRef.current.children
    if (childEls) {
      gsap.from(childEls, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1)",
        scrollTrigger: {
          trigger: childEls[0],
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
        <div className='flex justify-center pt-24 pb-16'>
          <h1 className='mt-24  rounded-lg bg-emerald-400/10 p-3 text-center text-4xl font-semibold text-secondary shadow-glass lg:text-5xl'>
            <span className='bg-gradient-to-r from-emerald-400 via-white to-secondary bg-clip-text text-transparent'>
              Featured collections
            </span>
          </h1>
        </div>
        <div
          ref={containerRef}
          className='container mx-auto flex flex-wrap
         items-center justify-center gap-2 py-5 px-3 md:px-12 lg:gap-10'>
          {completedLaunchpads.slice(0, 3).map((el, i) => (
            <CollectionCard
              key={el.attributes.collectionName}
              name={el.attributes.collectionName}
              contractAddress={el.attributes.collectionName}
              imageUrl={el.attributes.imageUrl}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LandingPage2
