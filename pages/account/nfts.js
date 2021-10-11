import { useEffect, useState } from "react"
import { useMoralis } from "react-moralis"

const Nfts = () => {
  const { Moralis, account } = useMoralis()
  const [nfts, setNfts] = useState()
  const fetchAccountNFTs = async () => {
    const options = { chain: "bsc", address: account, order: "desc", from_block: "0" }
    const userEthNFTs = await Moralis.Web3API.account.getNFTs(options)
    return userEthNFTs
  }
  useEffect(() => {
   
  }, [])
  return <div>{!nfts && <h2>You have no NFTs in your account</h2>}</div>
}

export default Nfts
