import React from "react"
import { useMoralis } from "react-moralis"
import useMarketInteractions from "../../hooks/useMarketInteraction"
const MintButton = ({ contractAddress, cost }) => {
  const { Moralis } = useMoralis()
  const { mintToken } = useMarketInteractions()
  return (
    <div className='mt-12 w-max rounded-full border-2 border-primary-600 bg-primary-700 pr-5'>
      <button
        onClick={async () => {
          mintToken(contractAddress, cost, 1)
        }}
        className='w-max rounded-full bg-secondary py-1 px-3 text-lg transition duration-500  hover:bg-secondary-dark'>
        Mint now
      </button>
      <span> {cost && Moralis.Units.FromWei(cost)} ETH </span>
    </div>
  )
}

export default MintButton
