import React, { useState } from "react"
import { useRecoilValue } from "recoil"
import { NFT } from "../../features/NFT"
import { currentUserState } from "../../store/userSlice"

const MintButton = ({ contractAddress, cost }) => {
  const [mintAmount, setMintAmount] = useState(1)
  const account = useRecoilValue(currentUserState)

  const handleMint = () => {
    const nftInstance = new NFT(contractAddress, null)
    nftInstance.mintToken(cost, mintAmount, account)
  }
  return (
    <div
      className=' 
     grid h-full grid-cols-2  items-center justify-center space-x-4  py-3 px-2 '>
      <select
        onChange={(e) => setMintAmount(e.target.value)}
        className='form-select block  h-full cursor-pointer rounded-lg py-2 text-sm font-black text-black lg:text-lg'
        name='mint_amount'
        id='mint_amount'>
        {[1, 2, 3, 4, 5].map((el) => {
          return (
            <option key={el} value={el} className='bg-tertiary-50 text-black'>
              {el} - {(cost * el).toFixed(2)} ETH
            </option>
          )
        })}
      </select>
      <button
        onClick={handleMint}
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
