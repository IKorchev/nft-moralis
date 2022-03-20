import useSWR from "swr"
import Link from "next/link"
import Countdown from "./Countdown"
import Mint from "./Mint"
import Loading from "../Other/Loading"
import { ScaleLoader } from "react-spinners"
import { useState } from "react"
import { BiRefresh } from "react-icons/bi"
import { allLaunchpadsState } from "../../store/store"
import { useRecoilValue } from "recoil"
import { getFetcher } from "../../utils/fetcher"
import { AnimatePresence, motion } from "framer-motion"

const outterContainer = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}
const innerContainer = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
    },
  },
}
const item = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
}

const FeaturedSection = () => {
  const { featured } = useRecoilValue(allLaunchpadsState)
  const [countdownFinished, setCountdownFinished] = useState(false)
  const { data, mutate, isValidating } = useSWR(
    featured ? `/api/nft/data?contract=${featured?.attributes?.contractAddress}` : null,
    getFetcher
  )
  const countdownHandler = () => {
    setCountdownFinished(true)
  }
  return (
    <motion.section
      variants={outterContainer}
      initial='initial'
      animate='animate'
      exit='exit'
      className='min-h-24 border-secondary-700 bg-secondary-900/50 mt-12 flex w-full
      flex-col gap-5 rounded-md border
      p-8  text-white backdrop-blur-sm backdrop-filter lg:flex-row lg:justify-between lg:p-12'>
      <motion.div variants={innerContainer} initial='initial' animate='animate' className='relative flex-1'>
        <motion.h1
          variants={item}
          className=' border-secondary-700 bg-secondary-700/60 shadow-glass-large my-2 -ml-3 inline  cursor-default rounded-full border px-4 py-2 text-center text-xl font-black  uppercase backdrop-blur-sm backdrop-filter'>
          <span className='bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent'>
            Featured launch
          </span>
        </motion.h1>
        <motion.button
          onClick={mutate}
          variants={item}
          className='bg-secondary-100/20  text-secondary-100 shadow-glass ring-secondary-100 absolute right-0 w-max transform rounded-full p-1 text-3xl backdrop-blur-sm backdrop-filter duration-300 active:translate-y-1 active:scale-95 active:shadow-none active:ring-1'>
          <BiRefresh className={`${isValidating ? "animate-spin" : ""}`} />
        </motion.button>
        <motion.div variants={innerContainer} className='flex h-full flex-col justify-evenly py-5 xl:py-0'>
          <motion.h2 variants={item} className='py-5 text-4xl text-white'>
            {featured?.attributes?.collectionName}
          </motion.h2>
          <motion.p variants={item} className='mt-3 w-3/4 text-sm'>
            {featured?.attributes?.description}
          </motion.p>
          {!countdownFinished ? (
            <Countdown startDate={featured?.attributes?.startDate} onFinish={countdownHandler} />
          ) : isValidating ? (
            <div className='mx-auto my-12 py-12'>
              <ScaleLoader color='purple' />
            </div>
          ) : (
            <Mint contractAddress={featured?.attributes?.contractAddress} data={data} />
          )}
        </motion.div>
        {/* IMPORTANT: This is not a safety check!
              The contract owner needs to make sure the mint
              function in the smart contract is paused until the counter reaches 0. */}
      </motion.div>
      <div className='relative max-h-[35rem] w-full flex-1 overflow-hidden rounded-xl'>
        <Link href={`/assets/${featured?.attributes?.contractAddress}`}>
          <img className='h-full w-full cursor-pointer object-cover' src={featured?.attributes?.imageUrl} alt='' />
        </Link>
      </div>
    </motion.section>
  )
}

export default FeaturedSection
