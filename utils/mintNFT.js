import Moralis from "moralis"

export const mintNFT = (name, imageUrl, description) => {
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "All fields are required.",
    }
  }
}
export const uploadMetadata = async (imageFile, name, description) => {
  if (!imageFile || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      tokenURI: null,
    }
  }

  const data = new Moralis.File(imageFile.name, imageFile)
  await data.saveIPFS()
  const imageURI = data.ipfs()
  //prettier-ignore
  const metadata = {
      "name": name,
      "description": description,
      "image": imageURI,
    }
  const metadataFile = new Moralis.File("metadata.json", {
    base64: btoa(JSON.stringify(metadata)),
  })
  await metadataFile.saveIPFS()
  const metadataURI = metadataFile.ipfs()
  return {
    success: true,
    tokenURI: metadataURI,
  }
}
