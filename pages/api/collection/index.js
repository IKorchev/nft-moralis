import Moralis from "moralis/node"
import {
  checkIsOwner,
  isCollectionInDatabase,
  saveCollectionInDatabase,
} from "../../../utils/collectionRouteUtils"

const authenticate = async (token, address, chain) => {
  try {
    const query = new Moralis.Query("_Session").equalTo("sessionToken", token)
    const sessionMatch = await query.find({ useMasterKey: true })
    if (!sessionMatch) return { error: "You need to sign in first." }
    //Query the user to check his wallet addresses
    const userObjectId = sessionMatch[0].attributes.user.id
    const query2 = new Moralis.Query("_User").equalTo("objectId", userObjectId)
    const userMatch = await query2.find({ useMasterKey: true })
    const { isOwner } = await checkIsOwner(userMatch[0].attributes.accounts, address, chain)
    return { isOwner }
  } catch (error) {
    return { error: `The contract was not found. Make sure the contract address is correct` }
  }
}

const getHandler = async (req, res) => {
  try {
    const { address, chain } = req.query
    const metadata = await Moralis.Web3API.token.getNFTMetadata({ address, chain })
    res.json(metadata)
  } catch (error) {
    res.status(500).send({ error })
  }
}
const postHandler = async (req, res) => {
  const { imageUrl, description, collectionName, chain, address } = JSON.parse(req.body)
  const token = req.headers.authorization.split(" ")[1]
  try {
    const collectionIsInDatabase = await isCollectionInDatabase(address)
    if (collectionIsInDatabase) {
      return res.status(403).send({ error: "The collection already exists." })
    }
    const { error } = await authenticate(token, address, chain)
    if (error) return res.status(403).send({ error: "You must be the owner of the contract." })
    const _metadata = await Moralis.Web3API.token.getNFTMetadata({ chain, address })
    const collectionObject = {
      imageUrl,
      description,
      collectionName: collectionName || _metadata.name,
      contractAddress: _metadata.token_address,
      contractType: _metadata.contract_type,
      symbol: _metadata.symbol,
    }
    await saveCollectionInDatabase(collectionObject)
    res.status(201).send({ message: "Collection added successfully" })
  } catch (error) {
    res.status(500).send({ error })
  }
}


export default async function handler(req, res) {
  const { method } = req
  await Moralis.start({
    appId: process.env.APP_ID,
    serverUrl: process.env.SERVER_URL,
    masterKey: process.env.MASTER_KEY,
  })
  switch (method) {
    case "GET":
      return getHandler(req, res)

    case "POST":
      return postHandler(req, res)

    case "PUT":
      // putHandler(req, res)
      return
  }
}
