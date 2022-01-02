export const formatImage = (img) => {
  if (!img) {
    img =
      "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
  }
  if (img.startsWith("ipfs://")) {
    img = img.replace("ipfs://", "https://ipfs.io/ipfs/")
  }
  return img
}

// Returns the respective token for a chain
// (used to find out what token the account balance should display)

export const formatBalance = (chainId) => {
  switch (chainId) {
    case 1:
      return "ETH"
    case 56:
      return "BNB"
    case 137:
      return "MATIC"
    case 43113:
      return "AVAX"

    default:
      return ""
  }
}

export const copyTextToClipboard = async (text) => {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text)
  } else {
    return document.execCommand("copy", true, text)
  }
}

export const formatChainForMoralis = (chainId) => {
  switch (chainId) {
    case 1:
      return "eth"
    case 56:
      return "bsc"
    case 137:
      return "matic"
    case 43113:
      return "avax"

    default:
      return "eth"
  }
}
