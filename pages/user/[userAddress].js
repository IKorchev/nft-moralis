import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useChain } from "react-moralis"

import { useNFTBalances } from "react-moralis"
import PaginatedItems from "../../components/PaginatedItems"

function UserAddress() {
  const { chainId } = useChain()
  const { query } = useRouter()
  const [nfts, setNfts] = useState()
  const { getNFTBalances } = useNFTBalances()

  useEffect(() => {
    getNFTBalances({
      params: { chain: chainId, address: query.userAddress },
      onSuccess: (data) => {
        setNfts(data.result)
      },
      onError: (err) => console.log("33 [userAddress]" + err),
    })
  }, [chainId, query])

  return (
    <div className='container mx-auto'>
      <h2 className='text-4xl text-center text-white'>{query.userAddress}</h2>
      <PaginatedItems items={nfts} itemsPerPage={15} />
    </div>
  )
}
export default UserAddress
