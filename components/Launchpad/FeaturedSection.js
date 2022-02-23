import Link from "next/link"
import { useLayoutEffect } from "react"
import { useState } from "react"
import useMarketInteraction from "../../hooks/useMarketInteraction"
import { useMoralis } from "react-moralis"
import { BiRefresh } from "react-icons/bi"
import { toast } from "react-toastify"
import Loading from "../Loading"
import Countdown from "./Countdown"
import moment from "moment"

//

const FeaturedSection = ({ featuredCollection }) => {
  const { mintToken, getMintCost, getMaxSupply, getTotalSupply } = useMarketInteraction()

  const { Moralis } = useMoralis()
  const [cost, setCost] = useState()
  const [maxSupply, setMaxSupply] = useState()
  const [mintedAmount, setMintedAmount] = useState()

  //calculating time left
  const targetTime = moment(new Date(featuredCollection?.startDate))
  const [currentTime, setCurrentTime] = useState(moment().utc())
  const timeLeft = moment.duration(targetTime.diff(currentTime))
  const countdownFinished = timeLeft.seconds() <= 0

  // Handlers
  const getCostHandler = async () => {
    const mintCost = await getMintCost(featuredCollection?.contractAddress)
    mintCost && setCost(mintCost)
  }
  const getMaxSupplyHandler = async () => {
    const maxSupply = await getMaxSupply(featuredCollection?.contractAddress)
    maxSupply && setMaxSupply(Number(maxSupply))
  }
  const getTotalSupplyHandler = async () => {
    const tokensMinted = await getTotalSupply(featuredCollection?.contractAddress)
    tokensMinted && setMintedAmount(Number(tokensMinted))
  }
  const refreshDataHandler = () => {
    getCostHandler()
    getMaxSupplyHandler()
    getTotalSupplyHandler()
    toast.success("Data refreshed", { autoClose: 1000 })
  }

  //get initial data and start countdown timer
  useLayoutEffect(() => {
    if (featuredCollection) {
      getCostHandler()
      getMaxSupplyHandler()
      getTotalSupplyHandler()
    }
    //countdown timer
    const interval = setInterval(() => {
      setCurrentTime(moment().utc())
    }, 1000)

    return () => clearInterval(interval)
  }, [featuredCollection])

  if (!featuredCollection)
    return (
      <Loading
        containerProps={{ className: "h-[70vh] grid place-items-center bg-blue" }}
        loaderProps={{ size: 200, color: "white" }}
      />
    )

  return (
    <section
      className='min-h-24 mt-12 flex w-full flex-col 
    gap-5 rounded-md border border-primary-700
     bg-primary-800/30 p-8 text-white lg:flex-row lg:justify-between lg:p-12'>
      <div className='relative flex-1'>
        <h1 className='my-2 -ml-3 inline rounded-full bg-primary-700 px-4 py-2 text-center text-xl uppercase '>
          Featured launch
        </h1>
        <button
          onClick={refreshDataHandler}
          className='absolute right-0 w-max rounded-full bg-primary-700 p-1 text-3xl text-secondary-light'>
          <BiRefresh />
        </button>
        <h2 className='mt-16 text-4xl text-white'>{featuredCollection?.collectionName}</h2>
        <p className='mt-5 text-sm'>{featuredCollection?.description}</p>

        {/* IMPORTANT: This is not a safety check!
          The contract owner needs to make sure the mint 
          function in the smart contract is paused until the counter reaches 0. */}

        {countdownFinished ? (
          <>
            <div className='mt-12 w-max rounded-full border-2 border-primary-600 bg-primary-700 pr-5'>
              <button
                onClick={async () => {
                  mintToken(featuredCollection?.contractAddress, cost, 1)
                }}
                className='rounded-full  bg-secondary py-1 px-3 text-lg transition duration-500 hover:bg-secondary-dark'>
                Mint now
              </button>
              <span> {cost && Moralis.Units.FromWei(cost)} ETH </span>
            </div>
            <div className='mt-12 w-full xl:pr-16'>
              <p className='text-center'>Minted</p>
              <div className='relative my-3 flex h-4 w-full overflow-hidden rounded-full bg-primary-700'>
                <div
                  className='absolute top-0 left-0 grid h-4 place-items-center rounded-full bg-secondary-light '
                  style={{ width: `${(mintedAmount / maxSupply) * 100}%` }}></div>
                <span className='w-full text-center text-[12px]'>
                  {mintedAmount}/{maxSupply}
                </span>
              </div>
              <p className='mt-3 text-center text-white'>({(mintedAmount / maxSupply) * 100}%)</p>
            </div>
          </>
        ) : (
          <Countdown timeLeft={timeLeft} />
        )}
      </div>
      <div className='relative h-full w-full flex-1'>
        <Link href={`/assets/${featuredCollection?.contractAddress}`}>
          <img
            className='max-h-[30rem] w-full cursor-pointer object-contain '
            src={featuredCollection?.imageUrl}
            alt=''
          />
        </Link>
      </div>
    </section>
  )
}

export default FeaturedSection
