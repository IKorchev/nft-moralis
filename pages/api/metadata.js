import { formatIpfs } from "../../utils/common"

// Checks what type of file is in the url, video or image
const isImageOrVideo = async (imageUrl) => {
  if (!imageUrl) return null
  const image = await fetch(formatIpfs(imageUrl))
  if (!image) return null
  const blob = await image.blob()
  const type = blob.type.split("/")[0]
  return type
}

export async function getTokenMetadata(tokenURI) {
  try {
    if (tokenURI.startsWith("data:application/json;base64,")) {
      const data = Buffer.from(tokenURI.substring(29), "base64").toString()
      return { metadata: JSON.parse(data) }
    } else {
      const response = await fetch(formatIpfs(tokenURI))
      const data = await response.json()
      const format = await isImageOrVideo(formatIpfs(data.image || data.image_url || data.url))
      data.format = format
      return { metadata: data }
    }
  } catch (error) {
    return { metadata: null, error: error }
  }
}

export default async function handler(req, res) {
  const { tokenURI } = req.query
  try {
    const { metadata, error } = await getTokenMetadata(tokenURI)
    if (error && !metadata) {
      res.status(404).send("Data not found")
    }
    res.json(metadata)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}
