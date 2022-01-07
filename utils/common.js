import jazzicon from "@metamask/jazzicon"

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
export const formatIpfs = (str) => {
  if (typeof str !== "string") return 
  return str.replace("ipfs://", "https://ipfs.io/ipfs/")
}

export const createIcon = (ref, address, size) => {
  if (!ref) return
  ref.innerHTML = ""
  ref.appendChild(jazzicon(size, parseInt(address.slice(2, 3), 16)))
}
