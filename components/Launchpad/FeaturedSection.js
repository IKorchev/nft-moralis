import Link from "next/link"
import { useEffect, useLayoutEffect } from "react"
import { useState } from "react"
import useMarketInteraction from "../../hooks/useMarketInteraction"
import { BiRefresh } from "react-icons/bi"
import { toast } from "react-toastify"
import Loading from "../Other/Loading"
import Countdown from "./Countdown"
import Mint from "./Mint"
import { useChain, useMoralis } from "react-moralis"
//

const FeaturedSection = ({ featuredCollection }) => {
  if (!featuredCollection) return <Loading />
  const { Moralis, authenticate } = useMoralis()
  const { getMintCost, getMaxSupply, getTotalSupply } = useMarketInteraction()
  const [cost, setCost] = useState("0")
  const [maxSupply, setMaxSupply] = useState(0)
  const [mintedAmount, setMintedAmount] = useState(0)
  const [countdownFinished, setCountdownFinished] = useState(false)

  const countdownHandler = () => {
    setCountdownFinished(true)
  }

  const refreshData = async () => {
    const tokensMinted = await getTotalSupply(featuredCollection?.contractAddress)
    const maxSupply = await getMaxSupply(featuredCollection?.contractAddress)
    const mintCost = await getMintCost(featuredCollection?.contractAddress)
    const value = await Promise.all([tokensMinted, maxSupply, mintCost])
    setCost(value[2])
    setMaxSupply(Number(value[1]))
    setMintedAmount(Number(value[0]))
  }

  const refreshDataHandler = async () => {
    refreshData()
    toast.success("Data refreshed", { autoClose: 1000 })
  }

  //get initial data and start countdown timer
  useLayoutEffect(() => {
    refreshData()
  }, [])

  return (
    <section
      className='min-h-24 border-secondary-700 bg-secondary-900/50 mt-12 flex w-full 
    flex-col gap-5 rounded-md border
    p-8  text-white backdrop-blur-sm backdrop-filter lg:flex-row lg:justify-between lg:p-12'>
      <div className='relative flex-1'>
        <h1 className=' border-secondary-700 bg-secondary-700/60 shadow-glass-large my-2 -ml-3 inline  cursor-default rounded-full border px-4 py-2 text-center text-xl font-black  uppercase backdrop-blur-sm backdrop-filter'>
          <span className='bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent'>
            Featured launch
          </span>
        </h1>
        <button
          onClick={refreshDataHandler}
          className='bg-secondary-100/20 text-secondary-100 shadow-glass ring-secondary-100 absolute right-0 w-max transform rounded-full p-1 text-3xl backdrop-blur-sm backdrop-filter duration-300 active:translate-y-1 active:scale-95 active:shadow-none active:ring-1'>
          <BiRefresh />
        </button>

        <div className='flex h-full flex-col justify-evenly py-5 xl:py-0'>
          <div>
            <h2 className='text-4xl text-white'>{featuredCollection?.collectionName}</h2>
            <p className='mt-5 text-sm'>{featuredCollection?.description}</p>
          </div>
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
