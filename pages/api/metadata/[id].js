import fs from "fs"

const handler = async (req, res) => {
  const { id } = req.query
  const file = fs.readFileSync(`${process.cwd()}/metadata/${id}.json`)
  res.send(JSON.parse(file))
}

export default handler
