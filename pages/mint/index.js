import { useState } from "react"
import { useMoralis } from "react-moralis"

const Mint = () => {
  const { Moralis } = useMoralis()

  const [file, setFile] = useState()
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  return (
    <div className=' bg-primary-900  h-screen '>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          if (!file) return
          const data = new Moralis.File(file.name, file)
          await data.saveIPFS()
          const imageURI = data.ipfs()
          console.log(e)
          console.log(imageURI)
        }}
        className='bg-primary rounded-lg w-96 mt-32 mx-auto flex flex-col shadow-4xl p-8 bg-opacity-60 backdrop-filter backdrop-blur-xl'>
        <div className='flex flex-col text-white'>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            onChange={(e) => setName(e.target.value)}
            className='bg-primary border-pinkish border rounded-md text-lg px-2 py-1'
          />
        </div>

        <div className='flex flex-col text-white mt-2'>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            type='text'
            className='bg-primary border-pinkish border rounded-md text-lg px-2 py-1'
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <label
          htmlFor='file'
          className='mt-5 border focus-within:border-red-400 shadow-4xl  bg-primary relative border-pinkish rounded-md text-white transform cursor-pointer py-1 font-semibold transition hover:bg-pinkish'>
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
          className='text-white bg-primary-dark border border-pinkish font-semibold rounded-lg p-2 mt-5 transition shadow-4xl hover:bg-primary-lightest focus:border-red-400'
          placeholder='Image'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Mint
