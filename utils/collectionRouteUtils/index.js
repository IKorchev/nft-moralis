import Moralis from "moralis/node"
import { NFT_ABI as abi } from "../ABIS"
const Collection = Moralis.Object.extend("Launchpads")

export const checkIsOwner = async (addressesArray, address, chain) => {
  const owner = await Moralis.Web3API.native.runContractFunction({
    abi,
    address: address,
    chain: chain || "0x3",
    function_name: "owner",
  })
  const _owner = owner.toLowerCase()
  return addressesArray.includes(_owner)
}

export const isCollectionInDatabase = async (contractAddress) => {
  const query = new Moralis.Query(Collection).equalTo("contractAddress", contractAddress).limit(1)
  const result = await query.find()
  return result.length === 1 //if it's already in, return true else return false
}

export const saveCollectionInDatabase = async (collectionObject) => {
  const collection = new Collection()
  const acl = new Moralis.ACL()
  acl.setPublicReadAccess(true)
  acl.setPublicWriteAccess(false)
  collection.setACL(acl)
  collection.set("isUpcoming", false)
  collection.set("finished", true)
  collection.set("contractAddress", collectionObject.contractAddress)
  collection.set("imageUrl", collectionObject.imageUrl)
  collection.set("description", collectionObject.description)
  collection.set("contractType", collectionObject.contractType)
  collection.set("collectionName", collectionObject.collectionName)
  collection.set("symbol", collectionObject.symbol)
  collection.save(null, { useMasterKey: true })
}
