
import Moralis from "moralis/node"
export default async function handler(req, res) {
  try {
    const { address, chain } = JSON.parse(req.body)
    const options = {
      address,
      chain: chain.chainId,
    }
    await Moralis.start({ appId: process.env.APP_ID, serverUrl: process.env.SERVER_URL })
    const metadata = await Moralis.Web3API.token.getNFTMetadata(options)

    res.json(metadata)
  } catch (error) {
    res.status(500).json(error)
  }
}
