import jazzicon from "@metamask/jazzicon"

export const formatChain = (networkId) => {
  switch (networkId) {
    case 1:
      return "eth/mainnet"
    case 3:
      return "eth/ropsten"
    case 4:
      return "eth/rinkeby"
    case 5:
      return "eth/goerli"
    case 42:
      return "eth/kovan"
    case 56:
      return "bsc/mainnet"
    case 137:
      return "polygon/mainnet"
    case 43114:
      return "avalanche/mainnet"
    case 250:
      return "fantom/mainnet"
  }
}

export const formatImage = (img) => {
  if (typeof img !== "string") {
    img =
      "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
  }

  return img.replace("ipfs://", "https://ipfs.io/ipfs/")
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

// Necessary checks to ensure the image loads,
// ipfs requires to be converted to https via a gateway
// some gateways get overloaded with requests sometimes,
// which is why I use https://ipfs.io/ipfs/{CID}

export const formatIpfs = (str) => {
  if (typeof str !== "string") return
  if (str.startsWith("ipfs://ipfs/")) {
    return str.replace("ipfs://ipfs/", "https://ipfs.io/ipfs/")
  }
  if (str.startsWith("https://gateway.pinata.cloud/ipfs/")) {
    return str.replace("https://gateway.pinata.cloud/ipfs/", "https://ipfs.io/ipfs/")
  }
  return str.replace("ipfs://", "https://ipfs.io/ipfs/")
}

export const createIcon = (ref, address, size) => {
  if (!ref) return
  ref.innerHTML = ""
  ref.appendChild(jazzicon(size, parseInt(address.slice(2, 3), 16)))
}
