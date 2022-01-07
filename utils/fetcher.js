const fetcher = async (url) => {
  return fetch("/api/metadata", {
    method: "POST",
    body: JSON.stringify({
      url: url,
    }),
  }).then(async (res) => {
    const data = await res.json()
    return data.data
  })
}

export default fetcher
