import { useRef, useState } from "react"
import { useMoralis } from "react-moralis"
import { uploadMetadata } from "../../utils/mintNFT"
const Mint = () => {
  const { Moralis, web3 } = useMoralis()

  const [file, setFile] = useState()
  const [name, setName] = useState("")
  const [contractAddress, setContractAddress] = useState("")
  const [description, setDescription] = useState("")

  const onMintPressed = async () => {
    const { success, tokenURI } = await uploadMetadata(file, name, description)
    console.log(tokenURI)
  }

  return (
    <div className='wrapper grid place-items-center py-36'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onMintPressed()
        }}
        className='bg-primary-900 rounded-lg w-96 max-h-full  mx-auto text-light flex flex-col shadow-4xl p-8 bg-opacity-10 backdrop-filter backdrop-blur-md'>
        <h2 className='-mt-2 mb-5 text-pink-200'>Mint your NFT</h2>
        <div className='flex flex-col '>
          <label htmlFor='contract'>Contract Address</label>
          <input
            id='contract'
            type='text'
            onChange={(e) => setName(e.target.value)}
            className='bg-transparent border-pinkish border rounded-md  px-2 py-1'
          />
        </div>
        <div className='flex flex-col  mt-5'>
          <label htmlFor='name'>NFT Name</label>
          <input
            id='name'
            type='text'
            onChange={(e) => setName(e.target.value)}
            className='bg-transparent border-pinkish border rounded-md  px-2 py-1'
          />
        </div>

        <div className='flex flex-col  mt-2'>
          <label htmlFor='description'>NFT Description</label>
          <textarea
            id='description'
            rows='3'
            className='bg-transparent border-pinkish border rounded-md  px-2 py-1'
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <label
          htmlFor='file'
          className='mt-5 border focus-within:ring ring-yellow-400 shadow-4xl text-black  bg-white relative border-pinkish rounded-md  transform cursor-pointer py-1 font-semibold transition hover:bg-primary-lightest'>
          <input
            id='file'
            tabIndex='0'
            type='file'
            className='opacity-0 cursor-pointer border '
            onChange={(e) => setFile(e.target.files[0])}
          />
          <span className='absolute w-full left-0 text-center top-1/2 transform -translate-y-1/2'>
            Upload image
          </span>
        </label>
        <button
          type='submit'
          className=' bg-primary-lightest text-white font-bold border border-pinkish rounded-lg p-2 mt-5 transition shadow-4xl hover:bg-primary focus:border-red-400'
          placeholder='Image'>
          MINT
        </button>
      </form>
    </div>
  )
}

export default Mint
