import { ethers } from "ethers"
import { NFT_ABI } from "../../../utils/ABIS"
import { getTokenMetadata } from "../metadata"

//for test nft
const excludeString = "https://nft-moralis"
const excludeString2 = "https://ipfs.moralis.io"
// fetching data for given nft contract address,
// ideally it should be split into separate endpoints,
// but for now it stays like this

export default async function handler(req, res) {
  try {
    const { tokenUri, tokenId, chainString, chainId, contract } = req.query
    const provider = new ethers.providers.JsonRpcProvider(process.env.NODE_URL + chainString)
    const transactionsUrl = `https://deep-index.moralis.io/api/v2/nft/${contract}/${tokenId}/transfers?chain=${
      chainId || "0x3"
    }&format=decimal`
    const _transactions = await fetch(transactionsUrl, {
      headers: { "x-api-key": process.env.API_KEY },
    }).then((res) => res.json())
    const nftContract = new ethers.Contract(contract, NFT_ABI, provider)

    const tokenURI =
      tokenUri && !tokenUri.startsWith(excludeString || excludeString2) ? tokenUri : await nftContract.tokenURI(tokenId)
    const _symbol = await nftContract.symbol()
    const _owner = await nftContract.ownerOf(tokenId)
    const { metadata: _metadata } = await getTokenMetadata(tokenURI)
    const [transactions, symbol, owner, metadata] = await Promise.all([_transactions, _symbol, _owner, _metadata])

    const data = {
      contractAddress: contract,
      tokenId,
      transactions,
      symbol,
      owner,
      metadata,
    }
    res.json(data)
  } catch (error) {
    res.status(500).send({ message: "Internal error" })
  }
}
