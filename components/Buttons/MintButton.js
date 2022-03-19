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
     flex h-full  items-center justify-center space-x-4  py-3 px-2 '>
      <select
        onChange={(e) => setMintAmount(e.target.value)}
        className='form-select bg-tertiary-100 block h-full cursor-pointer rounded-lg bg-transparent py-2  text-lg font-black text-black'
        name='mint_amount'
        id='mint_amount'>
        {[1, 2, 3, 4, 5].map((el) => {
          return (
            <option value={el} className='bg-tertiary-50 text-black'>
              {el}
            </option>
          )
        })}
      </select>
      <button
        onClick={() => {
          mintToken(contractAddress, Moralis.Units.ETH(cost), mintAmount)
        }}
        className='card-button
           from-tertiary-100 to-tertiary-100  border-tertiary-700 hover:bg-tertiary-200 h-full  rounded-md bg-gradient-to-r py-2 px-3 text-lg font-bold text-black'>
        <span className=''>Mint now</span>
      </button>
      <span className='text-lg'> {(cost * mintAmount).toFixed(2)} ETH </span>
    </div>
  )
}

export default MintButton
