import React from "react"
import { useMoralis } from "react-moralis"
import useMarketInteractions from "../../hooks/useMarketInteraction"
const MintButton = ({ contractAddress, cost }) => {
  const { Moralis } = useMoralis()
  const { mintToken } = useMarketInteractions()
  return (
    <div className='mt-12 w-max rounded-full border border-secondary-200 bg-secondary-900 pr-5'>
      <button
        onClick={() => {
          mintToken(contractAddress, Moralis.Units.ETH(cost), 1)
        }}
        className='w-max rounded-full border border-secondary-100 
        bg-secondary-500 py-1 px-3 text-lg text-white transition duration-200 focus:bg-secondary-600  focus:text-white hover:bg-secondary-600 hover:text-white'>
        Mint now
      </button>
      <span> {cost} ETH </span>
    </div>
  )
}

export default MintButton
