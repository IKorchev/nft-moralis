export default async function handler(req, res) {
    const { method } = req
    await Moralis.start({
      appId: process.env.APP_ID,
      serverUrl: process.env.SERVER_URL,
      masterKey: process.env.MASTER_KEY,
    })
    switch (method) {
      case "GET":
        return getHandler(req, res)
  
      case "POST":
        return postHandler(req, res)
  
      case "PUT":
        // putHandler(req, res)
        return
    }
  }
  