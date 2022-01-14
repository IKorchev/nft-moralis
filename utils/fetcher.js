import Moralis from "moralis"
import { NFT_ABI } from "../utils/ABIS"

const fetcher = async (tokenUri, nftContract, tokenId) => {
  let data = tokenUri
  if (data === "null") {
    data = await Moralis.Web3.executeFunction({
      abi: NFT_ABI,
      contractAddress: nftContract,
      functionName: "tokenURI",
      params: {
        tokenId: tokenId,
      },
    })
    if (!data) throw new Error("Unable to get token uri")
  }
  return fetch("/api/metadata", {
    method: "POST",
    body: JSON.stringify({
      tokenURI: data,
    }),
  }).then(async (res) => {
    if (!res) throw new Error("Couldn't get data")
    const data = await res.json()
    return data
  })
}

export default fetcher
