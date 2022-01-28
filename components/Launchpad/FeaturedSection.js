import Link from "next/link"
import { useLayoutEffect } from "react"
import { useState } from "react"
import useMarketInteractions from "../../hooks/useMarketInteraction"
import { useMoralis } from "react-moralis"
import { BiRefresh } from "react-icons/bi"
import { toast } from "react-toastify"
import Loading from "../Loading"

const FeaturedSection = ({ featuredCollection }) => {
  const { mintToken, getMintCost, getMaxSupply, getTotalSupply } = useMarketInteractions()
  const { Moralis } = useMoralis()
  const [cost, setCost] = useState(0)
  const [maxSupply, setMaxSupply] = useState()
  const [mintedAmount, setMintedAmount] = useState()

  const getCostHandler = async () => {
    const mintCost = await getMintCost(featuredCollection?.contractAddress)
    mintCost && setCost(Moralis.Units.FromWei(mintCost))
  }
  const getMaxSupplyHandler = async () => {
    const maxSupply = await getMaxSupply(featuredCollection?.contractAddress)
    maxSupply && setMaxSupply(Number(maxSupply))
  }
  const getTotalSupplyHandler = async () => {
    const tokensMinted = await getTotalSupply(featuredCollection?.contractAddress)
    tokensMinted && setMintedAmount(Number(tokensMinted))
  }

  const handleRefresh = () => {
    getCostHandler()
    getMaxSupplyHandler()
    getTotalSupplyHandler()
    toast.success("Data refreshed", { autoClose: 1000 })
  }

  useLayoutEffect(() => {
    if (featuredCollection) {
      getCostHandler()
      getMaxSupplyHandler()
      getTotalSupplyHandler()
    }
  }, [featuredCollection])
  if (!featuredCollection)
    return (
      <Loading
        containerProps={{ className: "h-[70vh] grid place-items-center bg-blue" }}
        loaderProps={{ size: 200, color: "white" }}
      />
    )
  return (
    <section className='flex flex-col lg:justify-between border border-primary-700 bg-primary-800/30 rounded-md p-8 lg:p-12 xl:flex-row gap-5 min-h-24 text-white w-full mt-12'>
      <div className='flex-1 relative'>
        <h1 className='inline text-xl my-2 bg-primary-700 text-center px-4 py-2 uppercase rounded-full '>
          Featured launch
        </h1>
        <button
          onClick={handleRefresh}
          className='w-max rounded-full absolute text-3xl p-1 text-secondary-light bg-primary-700 right-0'>
          <BiRefresh />
        </button>
        <h2 className='text-4xl text-white mt-16'>
          {featuredCollection?.collectionName}
        </h2>
        <p className='text-sm mt-5'>{featuredCollection?.description}</p>
        <div>
          <button
            onClick={async () => {
              const cost = await getMintCost(featuredCollection?.contractAddress)
              mintToken(featuredCollection?.contractAddress, cost, 1)
            }}
            className='bg-secondary  py-1 px-3 text-lg mt-12 rounded-full hover:bg-secondary-dark transition duration-500'>
            Mint now {cost}
          </button>
          <Link href={`/assets/${featuredCollection?.contractAddress}`}>
            <a className='bg-light text-secondary ml-3 py-1 px-3 text-lg mt-12 rounded-full focus:ring-2 focus:ring-secondary'>
              Learn more
            </a>
          </Link>
        </div>
        <div className='mt-12 w-full xl:pr-16'>
          <p className='text-center'>Minted</p>
          <div className='w-full flex h-3 bg-primary-700 my-3 rounded-full relative overflow-hidden'>
            <div
              className='bg-secondary-dark rounded-full h-3 grid place-items-center absolute top-0 left-0 '
              style={{ width: `${(mintedAmount / maxSupply) * 100}%` }}></div>
            <span className='text-[10px] text-center w-full'>
              {mintedAmount}/{maxSupply}
            </span>
          </div>
          <p className='text-center text-white mt-3'>
            ({(mintedAmount / maxSupply) * 100}%)
          </p>
        </div>
      </div>
      <div className='flex-1 w-full h-full relative'>
        <Link href={`/assets/${featuredCollection?.contractAddress}`}>
          <img
            className='object-contain w-full cursor-pointer shadow-2xl shadow-primary-700'
            src={featuredCollection?.imageUrl}
            alt=''
          />
        </Link>
      </div>
    </section>
  )
}

export default FeaturedSection
