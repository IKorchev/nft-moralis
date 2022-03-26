import { ethers } from "ethers"
import { NFT_ABI } from "../../../utils/ABIS"
import Moralis from "moralis/node"

export default async function handler(req, res) {
  try {
    const { contract } = req.query
    const provider = new ethers.providers.JsonRpcProvider(process.env.NODE_URL + "eth/ropsten")
    const nftContract = new ethers.Contract(contract, NFT_ABI, provider)
    const [cost, supply, maxSupply] = await Promise.all([
      nftContract.cost(),
      nftContract.totalSupply(),
      nftContract.maxSupply(),
    ])
    console.log(cost, supply, maxSupply)
    res.json({
      cost: Moralis.Units.FromWei(cost),
      supply: Number(supply),
      maxSupply: Number(maxSupply),
    })
  } catch (error) {
    res.status(500).send(error)
  }
}
