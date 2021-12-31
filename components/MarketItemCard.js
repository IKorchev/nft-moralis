import React, { useEffect } from "react"
import { useState } from "react"
import { useChain, useMoralis } from "react-moralis"
import { formatImage } from "../utils/common"

const MarketItemCard = ({ tokenId, tokenAddress, price }) => {
  const { chainId } = useChain()
  const { Moralis } = useMoralis()
  const [metadata, setMetadata] = useState()
  const { image_url, name, Name, description } = metadata || {}

  useEffect(() => {
    const getMetadata = async () => {
      try {
        const options = { address: tokenAddress, token_id: 1, chain: chainId }
        const tokenIdMetadata = await Moralis.Web3API.token.getTokenIdMetadata(options)
        console.log(tokenIdMetadata.token_uri)
        const metadata = await fetch(tokenIdMetadata.token_uri, {
          mode: "no-cors",
        })
        setMetadata(await metadata.json())
      } catch (error) {
        console.log(error)
      }
    }
    getMetadata()
  }, [tokenId])
  return (
    <div className='text-white bg-purple-900 h-48 w-48'>
      <img src={formatImage(image_url)} className='h-24 w-full object-contain' />
      <h1>{name || Name}</h1>
      <h1>{description}</h1>
      <h1>{parseFloat(Moralis.Units.FromWei(price)) * 10 ** 18}</h1>
    </div>
  )
}

export default MarketItemCard
