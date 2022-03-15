import { ethers } from "ethers"
import { NFT_ABI } from "../../../utils/ABIS"
import Moralis from "moralis/node"

export default async function handler(req, res) {
  try {
    const { contract } = req.query
    const provider = new ethers.providers.JsonRpcProvider(process.env.NODE_URL + "eth/ropsten")
    const nftContract = new ethers.Contract(contract, NFT_ABI, provider)
    const _mintCost = await nftContract.cost()
    const _totalSupply = await nftContract.totalSupply()
    const _maxSupply = await nftContract.maxSupply()
    const [cost, supply, maxSupply] = await Promise.all([
      Moralis.Units.FromWei(_mintCost),
      Number(_totalSupply),
      Number(_maxSupply),
    ])
    res.json({
      cost,
      supply,
      maxSupply,
    })
  } catch (error) {
    res.status(500).send(error)
  }
}
