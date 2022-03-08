import Link from "next/link"
import { useEffect, useLayoutEffect } from "react"
import { useState } from "react"
import useMarketInteraction from "../../hooks/useMarketInteraction"
import { BiRefresh } from "react-icons/bi"
import { toast } from "react-toastify"
import Loading from "../Other/Loading"
import Countdown from "./Countdown"
import Mint from "./Mint"
import { useChain } from "react-moralis"
//

const FeaturedSection = ({ featuredCollection }) => {
  const { getMintCost, getMaxSupply, getTotalSupply } = useMarketInteraction()
  const [cost, setCost] = useState()
  const [maxSupply, setMaxSupply] = useState()
  const [mintedAmount, setMintedAmount] = useState()
  const [countdownFinished, setCountdownFinished] = useState(false)
  const { chain } = useChain()

  const countdownHandler = () => {
    setCountdownFinished(true)
  }

  const refreshData = async () => {
    const tokensMinted = await getTotalSupply(featuredCollection?.contractAddress)
    tokensMinted && setMintedAmount(Number(tokensMinted))
    const maxSupply = await getMaxSupply(featuredCollection?.contractAddress)
    maxSupply && setMaxSupply(Number(maxSupply))
    const mintCost = await getMintCost(featuredCollection?.contractAddress)
    mintCost && setCost(mintCost)
  }
  const refreshDataHandler = async () => {
    refreshData()
    toast.success("Data refreshed", { autoClose: 1000 })
  }

  //get initial data and start countdown timer
  useLayoutEffect(() => {
    refreshData()
  }, [chain])

  if (!featuredCollection) return <Loading />
  return (
    <section
      className='min-h-24 mt-12 flex w-full flex-col gap-5 
    rounded-md border border-primary-700 bg-primary-900/20
    p-8  text-white backdrop-blur-sm backdrop-filter lg:flex-row lg:justify-between lg:p-12'>
      <div className='relative flex-1'>
        <h1 className='my-2 -ml-3 inline rounded-full  bg-secondary-dark/30 px-4 py-2 text-center text-xl font-black  uppercase shadow-glass-secondary backdrop-blur-sm backdrop-filter'>
          <span className='bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent'>
            Featured launch
          </span>
        </h1>
        <button
          onClick={refreshDataHandler}
          className='absolute right-0 w-max transform rounded-full bg-secondary/20 p-1 text-3xl text-secondary-light shadow-glass ring-secondary backdrop-blur-sm backdrop-filter duration-300 focus:translate-y-1 focus:scale-95 focus:shadow-none focus:ring-1'>
          <BiRefresh />
        </button>

        <div className='flex h-full flex-col justify-evenly py-5 xl:py-0'>
          <h2 className='mt-16 text-4xl text-white'>{featuredCollection?.collectionName}</h2>
          <p className='mt-5 text-sm'>{featuredCollection?.description}</p>

          {/* IMPORTANT: This is not a safety check!
          The contract owner needs to make sure the mint 
          function in the smart contract is paused until the counter reaches 0. */}

          {countdownFinished ? (
            <Mint
              mintedAmount={mintedAmount}
              maxSupply={maxSupply}
              cost={cost}
              contractAddress={featuredCollection?.contractAddress}
            />
          ) : (
            <Countdown startDate={featuredCollection?.startDate} onFinish={countdownHandler} />
          )}
        </div>
      </div>
      <div className='relative max-h-[35rem] w-full flex-1 overflow-hidden rounded-xl'>
        <Link href={`/assets/${featuredCollection?.contractAddress}`}>
          <img
            className='h-full w-full cursor-pointer object-cover'
            src={featuredCollection?.imageUrl}
            alt=''
          />
        </Link>
      </div>
    </section>
  )
}

export default FeaturedSection
