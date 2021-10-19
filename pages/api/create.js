const fs = require("fs")
const path = require("path")

const handler = async (req, res) => {
  console.log(req.body)

  //   const as = path.join(__dirname, "metadata")
  const as = path.join(process.cwd(), "metadata")
  const length = fs.readdirSync(as).length
  console.log(length)
  console.log(as)
  console.log(fs.writeFileSync(`${as}/${length + 1}.json`, req.body))
  res.status(200)
}
export default handler
