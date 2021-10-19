import fs from "fs"

const handler = async (req, res) => {
  const { id } = req.query
  console.log(process.cwd())
  const file = fs.readFileSync(`${process.cwd()}/metadata/${id}.json`)
  res.send(process.cwd())
}

export default handler
