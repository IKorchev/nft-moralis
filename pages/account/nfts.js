import { useEffect, useState } from "react"
import { useMoralis, useMoralisWeb3Api } from "react-moralis"

const Nfts = () => {
  const { Moralis, isInitialized } = useMoralis()
  const [nfts, setNfts] = useState()
  const fetchAccountNFTs = async () => {
    const userEthNFTs = await Moralis.Web3API.account.getNFTs()
    return setNfts(userEthNFTs)
  }
  useEffect(async () => {
    isInitialized && (await fetchAccountNFTs())
    console.log("hello")
  }, [])
  return (
    <div>
      {!nfts && (
        <h2>
          You have no NFTs in your account
        </h2>
      )}
    </div>
  )
}

export default Nfts
