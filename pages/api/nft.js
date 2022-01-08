import { ethers } from "ethers"
import { NFT_ABI } from "../../utils/ABIS"
import { getTokenMetadata } from "./metadata"

// fetching data for given nft contract address,
// ideally it should be split into separate endpoint,
// but for now it stays like this

export default async function handler(req, res) {
  try {
    const { tokenId, chain, contract } = JSON.parse(req.body)
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NODE_URL + chain.chainString
    )
    const transactionsUrl = `https://deep-index.moralis.io/api/v2/nft/${contract}/${tokenId}/transfers?chain=${chain.chainId}&format=decimal`
    const transactions = await fetch(transactionsUrl, {
      headers: { "x-api-key": process.env.API_KEY },
    }).then((res) => res.json())
    console.log(transactions)
    const nftContract = new ethers.Contract(contract, NFT_ABI, provider)
    const tokenURI = await nftContract.tokenURI(tokenId)
    console.log(tokenURI)
    const symbol = await nftContract.symbol()
    const owner = await nftContract.ownerOf(tokenId)
    const { metadata, error } = await getTokenMetadata(tokenURI)
    const data = {
      owner,
      symbol,
      metadata,
      transactions,
    }
    res.json(data)
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ message: "Internal error" })
  }
}
