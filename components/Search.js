import SearchIcon from "@heroicons/react/outline/SearchIcon"
import { useState } from "react"
import Select from "react-select"

const Search = ({ searchHandler }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [blockchain, setBlockchain] = useState("")
  const options = [
    {
      value: "eth",
      label: "Ethereum",
    },
    {
      value: "0x89",
      label: "Polygon",
    },
    {
      value: "0xa86a",
      label: "Avalanche",
    },
    {
      value: "0x38",
      label: "Binance Smart Chain",
    },
  ]
  return (
    <form
      className=' mt-10 flex h-10 items-center mx-auto'
      onSubmit={(e) => {
        e.preventDefault()
        searchHandler(searchTerm, blockchain)
        setSearchTerm("")
      }}>
      <label htmlFor='search' className='text-white font-semibold mx-5'>
        <h2 className='text-white'>Search</h2>
      </label>
      <input
        type='text'
        className='h-full text-white px-2 bg-grayish text-lg focus:border rounded-l-lg border-2 border-r-0 border-light-tealish'
        placeholder='Search'
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }}
        value={searchTerm}
      />
      <select
        onChange={(e) => {
          console.log(e.target.value)
          setBlockchain(e.target.value)
        }}
        name='chain'
        id='chain'
        className='text-md p-1.5 h-full text-white font-semibold bg-grayish border-t-2 border-b-2 border-light-tealish'>
        {options.map((el) => {
          return <option value={el.value}>{el.label}</option>
        })}
      </select>
      <button
        type='submit'
        className='px-4 py-1 h-full text-lg font-semibold bg-light-tealish rounded-r-lg border-light-tealish hover:bg-green-200'>
        <SearchIcon className='h-full w-6 text-grayish ' />
      </button>
    </form>
  )
}

export default Search
