import Modal from "react-modal"
const NFTModal = ({ tokenInfo, isShown, setIsShown }) => {
  const metadata = JSON.parse(tokenInfo.metadata)
  const { image, name, description, attributes } = metadata
  const { token_uri, token_id, token_address } = tokenInfo
  let newimg
  if (image?.startsWith("ipfs") || image === null) {
    // newimg = image?.replace("ipfs://", "https://ipfs.moralis.io:2053/ipfs/")
    newimg =
      "https://thumbs.dreamstime.com/b/image-unavailable-icon-simple-illustration-129166551.jpg"
  } else {
    newimg = image
  }
  return (
    <div>
      <Modal
        className='w-max mx-auto'
        isOpen={isShown}
        onRequestClose={() => setIsShown(false)}
        contentLabel='Modal'>
        <div className='max-w-max mx-auto 1/2 flex bg-white border border-pink-800 shadow-2xl rounded-lg mt-24 overflow-y-auto overflow-x-hidden'>
          <img src={newimg} className='w-96 my-auto h-full' />
          <div className='px-12 mt-5 py-5 w-96'>
            <h1 className='text-semibold font-bold text-3xl px-1'>{name}</h1>
            <p className='mt-8 px-2 overflow-x-hidden max-h-24 leading-5 overflow-y-auto custom-scroll'>
              {description || "No available description for this NFT."}
            </p>
            {attributes && (
              <div className='mt-4'>
                <h1 className='font-semibold px-2'>Attributes</h1>
                <div className='text-center flex flex-wrap max-h-48 overflow-y-auto custom-scroll'>
                  {attributes.length > 0 &&
                    attributes.map((el) => {
                      return (
                        <div className='flex flex-wrap mx-2 flex-col items-between'>
                          <small className='font-semibold capitalize'>
                            {el.trait_type && el.trait_type.replace("_", " ")}:
                          </small>
                          <div className='bg-purple-100 grid place-items-center rounded-2xl w-full'>
                            <small className='capitalize  w-full px-2'>{el.value}</small>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            )}
            <div className='px-2'>
              <div className='mt-5'>
                <small className='font-semibold w-full block'>Token Address:</small>
                <small className=''>{token_address}</small>
              </div>
              <div className=''>
                <small className='font-semibold block'>Token ID:</small>
                <small>{token_id}</small>
              </div>
              <div className='pt-5'>
                <a
                  href={token_uri}
                  className='bg-purple-900 mt-10 transition duration-300 text-purple-100 text-sm px-2 py-1 rounded-lg font-semibold hover:bg-purple-400 border border-purple-900'>
                  TOKEN URI
                </a>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default NFTModal
