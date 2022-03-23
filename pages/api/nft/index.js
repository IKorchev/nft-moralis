import { ethers } from "ethers"
import Moralis from "moralis/node"
import { NFT_ABI } from "../../../utils/ABIS"
import { getTokenMetadata } from "../metadata"

//for test nft
const excludeString = "https://nft-moralis"
const excludeString2 = "https://ipfs.moralis.io"
// fetching data for given nft contract address,
// ideally it should be split into separate endpoints,
// but for now it stays like this

const getHandler = async (req, res) => {
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
    return res.json(data)
  } catch (error) {
    return res.status(500).send({ message: "Internal error" })
  }
}

// adds an item's image into the database
const postHandler = async (req, res) => {
  const { nftObject } = req.body
  const ItemImage = Moralis.Object.extend("ItemImage")
  const query = new Moralis.Query(ItemImage)
    .equalTo("contractAddress", nftObject.contractAddress)
    .equalTo("tokenId", nftObject.tokenId)
  const result = await query.find()
  //make sure item doesn't exist
  if (result.length >= 1) {
    return res.status(202).send({ error: { message: "Item already exists" } })
  } else {
    //create the object and save it to the database
    const Item = new ItemImage()
    Item.set("image", nftObject.image || nftObject?.rawData?.image || nftObject?.rawData?.image_url)
    Item.set("format", nftObject.imageType)
    Item.set("contractAddress", nftObject.contractAddress)
    Item.set("tokenId", nftObject.tokenId)
    Item.set("name", nftObject.name || nftObject?.rawData?.name)
    Item.save()
    return res.status(201).json({ data: { nftObject }, message: "Item added successfully" })
  }
}

//updates the item in database to be sold and changes the owner
const patchHandler = async (req, res) => {
  const MarketItems = Moralis.Object.extend("MarketItems")
  const { itemId, buyer } = req.body
  const query = new Moralis.Query(MarketItems).equalTo("itemId", itemId).equalTo("sold", false)
  const result = await query.first()
  result.set("sold", true)
  result.set("owner", buyer)
  result.save()
  res.status(204).json({ message: `Item with id: ${itemId} Updated successfully` })
}

export default async function handler(req, res) {
  await Moralis.start({
    appId: process.env.NEXT_PUBLIC_APP_ID,
    serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  })
  switch (req.method) {
    case "GET":
      return getHandler(req, res)
    case "POST":
      return postHandler(req, res)
    case "PATCH":
      return patchHandler(req, res)
  }
}
