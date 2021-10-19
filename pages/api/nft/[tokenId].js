const handler = async (req, res) => {
  const { tokenId } = req.query
  const file = require(`../../../1.json`)
  res.json(file[tokenId])
}
export default handler
