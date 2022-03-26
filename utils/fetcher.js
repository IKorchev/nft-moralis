import Moralis from "moralis"

export const revalidateOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
}

export const getFetcher = async (url) => {
  const res = await fetch(url)
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.")
    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  return await res.json()
}

export const getNFTsForUser = async ({ args }) => {
  const { chain, address } = args
  const data = await Moralis.Web3API.account.getNFTs({
    address: address,
    chain: chain,
  })

  if (!data) {
    const error = new Error("An error occurred while fetching the data.")
    throw error
  }
  return data
}
