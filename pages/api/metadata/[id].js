const handler = async (req, res) => {
  const { id } = req.query
  const file = require(`../../../metadata/${id}.json`)
  res.json(file)
}

export default handler
