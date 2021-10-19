fs.writeFile("./testJsonFile.json", asyncFrameworksData, "utf-8", (error) => {
  // 4
  if (error) {
    console.log(`WRITE ERROR: ${error}`)
  } else {
    // 5
    console.log("FILE WRITTEN TO")
  }
})

export default function helloAPI(req, res) {
  res.status(200).json({ name: "John Doe" })
}
