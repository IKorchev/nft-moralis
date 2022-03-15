import React from "react"
import { useMoralis } from "react-moralis"
import useMarketInteractions from "../../hooks/useMarketInteraction"
const MintButton = ({ contractAddress, cost }) => {
  const { Moralis } = useMoralis()
  const { mintToken } = useMarketInteractions()
  return (
    <div className='border-primary-600 bg-primary-700 mt-12 w-max rounded-full border-2 pr-5'>
      <button
        onClick={async () => {
          mintToken(contractAddress, cost, 1)
        }}
        className='bg-secondary-100 hover:bg-secondary-700 w-max rounded-full py-1 px-3 text-lg transition  duration-500'>
        Mint now
      </button>
      <span> {cost} ETH </span>
    </div>
  )
}

export default MintButton
