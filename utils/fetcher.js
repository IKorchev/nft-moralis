const fetcher = async (tokenURI) => {
  return fetch("/api/metadata", {
    method: "POST",
    body: JSON.stringify({
      tokenURI: tokenURI,
    }),
  }).then(async (res) => {
    const data = await res.json()
    return data
  })
}

export default fetcher
