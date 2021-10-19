import SearchIcon from "@heroicons/react/outline/SearchIcon"

const Search = ({ searchHandler, term, setTerm, chain, setChain }) => {
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
      className=' mt-10 flex h-10 items-center mx-auto '
      onSubmit={(e) => {
        e.preventDefault()
        searchHandler(term, chain, 0)
        setTerm("")
      }}>
      <label
        htmlFor='search'
        className='text-white grid place-items-center font-semibold px-5 h-full border-2 rounded-lg rounded-r-none border-r-0 bg-primary border-primary-lightest'>
        <h2 className='text-white text-lg'>Search</h2>
      </label>
      <input
        type='text'
        className='h-full text-white px-2 bg-primary text-lg focus:border rounded-l-none border-2 border-r-0 ring-inset ring-yellow-400 border-primary-lightest  focus:ring-1'
        onChange={(e) => {
          setTerm(e.target.value)
        }}
        value={term}
      />
      <select
        onChange={(e) => {
          console.log(e.target.value)
          setChain(e.target.value)
        }}
        name='chain'
        id='chain'
        className='text-md p-1.5  h-full text-white font-semibold bg-primary border-t-2 border-b-2 border-primary-lightest'>
        {options.map((el) => {
          return (
            <option key={el.value} value={el.value}>
              {el.label}
            </option>
          )
        })}
      </select>
      <button
        type='submit'
        className='px-4 py-1 h-full text-lg font-semibold bg-primary-lightest rounded-r-lg border-2 border-l-0 border-primary-lightest hover:bg-primary-dark ring-inset ring-yellow-400 focus:ring-1'>
        <SearchIcon className='h-full w-6 text-white ' />
      </button>
    </form>
  )
}

export default Search
