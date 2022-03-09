import Moralis from "moralis/node"

const Collection = Moralis.Object.extend("Launchpads")
const isCollectionInDatabase = async (contractAddress) => {
  const query = new Moralis.Query(Collection).equalTo("contractAddress", contractAddress).limit(1)
  const result = await query.find()
  return result.length === 1 //if it's already in, return true else return false
}
const saveCollectionInDatabase = async (collectionObject, chainId) => {
  if (!collectionObject.token_address || !chainId) return //not valid
  // const isInDB = await isCollectionInDatabase(collectionObject.token_address)
  // if (isInDB) return // Collection is already in db
  const collection = new Collection()
  
  collection.set("contractAddress", collectionObject.token_address)
  collection.set(
    "imageUrl",
    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930" // no image available
  )
  // Collection.set("finished", true)
  collection.set("description", "No description available.")
  // collection.set("autoAdded", true)
  collection.set("contractType", collectionObject.contract_type)
  collection.set("name", collectionObject.name)
  console.log(collection.attributes)
  // Collection.save()
  //Add to db
}
const getHandler = async (req, res) => {
  try {
    const { address, chain } = req.query
    const options = {
      address,
      chain: chain,
    }
    await Moralis.start({ appId: process.env.APP_ID, serverUrl: process.env.SERVER_URL })
    const metadata = await Moralis.Web3API.token.getNFTMetadata(options)
    res.json(metadata)
  } catch (error) {
    res.status(500).json(error)
  }
}

const postHandler = async (req, res) => {
  const { address, chain } = req.body
  try {
    const options = {
      address,
      chain,
    }
    await Moralis.start({ appId: process.env.APP_ID, serverUrl: process.env.SERVER_URL })
    const metadata = await Moralis.Web3API.token.getNFTMetadata(options)
    // const result = await saveCollectionInDatabase(metadata)
    saveCollectionInDatabase(metadata, chain)
    res.json(metadata)
  } catch (error) {
    res.status(500).json(error)
  }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    getHandler(req, res)
  }
  if (req.method === "POST") {
    postHandler(req, res)
  }
}
