import { ethers } from "ethers"
import { NFT_ABI } from "../../utils/ABIS"
import { formatIpfs } from "../../utils/common"

export default async function handler(req, res) {
  try {
    let tokenURI, nftData
    const { tokenId, chain, contract } = JSON.parse(req.body)
    const provider = new ethers.providers.JsonRpcProvider(process.env.NODE_URL + chain)
    const transactionsUrl = `https://deep-index.moralis.io/api/v2/nft/${contract}/${tokenId}/transfers?chain=${chain}&format=decimal`
    const transactions = await fetch(transactionsUrl, {
      headers: { "x-api-key": process.env.API_KEY },
    }).then((res) => res.json())

    const nftContract = new ethers.Contract(contract, NFT_ABI, provider)
    tokenURI = await nftContract.tokenURI(tokenId)
    const owner = await nftContract.ownerOf(tokenId)
    if (tokenURI.startsWith("data:application/json;base64,")) {
      tokenURI = Buffer.from(tokenURI.substring(29), "base64").toString()
      nftData = JSON.parse(tokenURI)
    } else {
      nftData = await fetch(formatIpfs(tokenURI)).then((res) => res.json())
    }
    console.log(owner, nftData, transactions)
    res.json({
      owner,
      nftData,
      transactions,
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ message: "Something went wrong" })
  }
}
