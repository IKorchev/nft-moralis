export default async function handler(req, res) {
  const { url } = JSON.parse(req.body)
  try {
    if (url.startsWith("data:application/json;base64,")) {
      const tokenURI = Buffer.from(url.substring(29), "base64").toString()
      res.json({ data: JSON.parse(tokenURI) })
    }

    const response = await fetch(
      url.startsWith("ipfs://") ? url.replace("ipfs://", "https://ipfs.io/ipfs/") : url
    )
    const data = await response.json()
    res.json({ data })
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}
