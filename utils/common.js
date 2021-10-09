export const formatImage = (img) => {
  if (!img) {
    img =
      "https://www.rit.edu/nsfadvance/sites/rit.edu.nsfadvance/files/default_images/photo-unavailable.png"
  }
  if (img.startsWith("ipfs://")) {
    img = img.replace("ipfs://", "https://ipfs.io/ipfs/")
  }
  return img
}
