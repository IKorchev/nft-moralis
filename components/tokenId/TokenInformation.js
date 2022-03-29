import React from "react"
import Link from "next/link"
const TokenInformation = ({ account, nft, contract, tokenId, openModal }) => {
  return (
    <div className='h-full p-4'>
      <h2 className='text-white'>{nft?.name || nft?.rawData?.name}</h2>
      <p className='my-3'>
        Owned by:
        <Link href={`/user/${nft?.owner}`} passHref>
          <button className='font-semibold text-blue-200 hover:text-blue-400'>{nft?.owner}</button>
        </Link>
      </p>
      <hr />
      {nft?.description && (
        <>
          <h2 className='mt-5 text-white'>Description</h2>
          <p className='mt-2'>{nft?.rawData?.description || "There is no description for this item.  "}</p>
        </>
      )}
      <p className='mt-5'>
        <span className='font-bold'> Address:</span> {contract}
      </p>
      <p className='mt-2'>
        <span className='font-bold'> Token ID:</span> {tokenId}
      </p>
      {nft?.owner.toLowerCase() == account?.toLowerCase() && (
        <button onClick={openModal} className='card-button mt-3 w-48 rounded-md p-2 text-white'>
          List for sale
        </button>
      )}
    </div>
  )
}

export default TokenInformation
