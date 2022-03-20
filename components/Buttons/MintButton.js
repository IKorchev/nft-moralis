import React, { useState } from "react"
import { useMoralis } from "react-moralis"
import useMarketInteractions from "../../hooks/useMarketInteraction"
const MintButton = ({ contractAddress, cost }) => {
  const { Moralis } = useMoralis()
  const { mintToken } = useMarketInteractions()
  const [mintAmount, setMintAmount] = useState(1)

  return (
    <div
      className=' 
     grid h-full grid-cols-2  items-center justify-center space-x-4  py-3 px-2 '>
      <select
        onChange={(e) => setMintAmount(e.target.value)}
        className='form-select bg-tertiary-50 block h-full cursor-pointer rounded-lg bg-transparent py-2  text-sm font-black text-black lg:text-lg'
        name='mint_amount'
        id='mint_amount'>
        {[1, 2, 3, 4, 5].map((el) => {
          return (
            <option value={el} className='bg-tertiary-50 text-black'>
              {el} - {(cost * el).toFixed(2)} ETH
            </option>
          )
        })}
      </select>
      <button
        onClick={() => {
          mintToken(contractAddress, Moralis.Units.ETH(cost), mintAmount)
        }}
        className='card-button
           from-tertiary-100 to-secondary-100  border-tertiary-700 
           hover:bg-tertiary-200 h-full 
            rounded-md bg-gradient-to-r py-2 px-3 text-sm font-bold text-black lg:text-lg'>
        <span className=''>Mint now</span>
      </button>
    </div>
  )
}

export default MintButton
