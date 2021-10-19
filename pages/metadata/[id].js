import { useRouter } from "next/router"
const fs = require("fs")
const id = ({ data }) => {
  const router = useRouter()
  const { id } = router.query
  console.log(data)
  return JSON.stringify(data)
}

export default id

export async function getServerSideProps(context) {
  console.log(context.query.id)
  const file = fs.readFileSync(`${process.cwd()}/metadata/${context.query.id}.json`)
  console.log(JSON.parse(file))
  return {
    props: {
      data: JSON.parse(file),
    },
  }
}
