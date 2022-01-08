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
    <div className='container mx-auto  max-w-[800px] px-24 lg:px-0'>
      <form
        className='divide-y-2 lg:divide-y-0 w-full lg:divide-x-2 divide-primary-lightest mt-24 flex flex-col rounded-xl lg:flex-row border overflow-hidden border-primary-lightest h-full lg:h-10 items-center mx-auto '
        onSubmit={(e) => {
          e.preventDefault()
          searchHandler(term, chain, 0)
          setTerm("")
        }}>
        <label
          htmlFor='search'
          className='text-white py-1 w-full grid place-items-center font-semibold px-5 h-full   bg-primary '>
          <h2 className='text-white text-lg'>Search</h2>
        </label>
        <input
          type='text'
          className='h-full w-full text-white py-1 px-2 bg-primary text-lg ring-inset ring-yellow-400   focus:ring-1'
          onChange={(e) => {
            setTerm(e.target.value)
          }}
          value={term}
        />
        <select
          onChange={(e) => {
            setChain(e.target.value)
          }}
          name='chain'
          id='chain'
          className='text-md p-1.5 w-full h-full text-white font-semibold bg-primary -t-2 -b-2 '>
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
          className='px-4 py-1 w-full lg:w-24 h-full flex justify-between text-lg text-white font-semibold bg-primary-lightest  -l-0  hover:bg-primary-dark ring-inset ring-yellow-400 focus:ring-1'>
          <span className='lg:hidden mx-auto'>Search</span>
          <SearchIcon className='h-full w-0 lg:w-6 text-white ' />
        </button>
      </form>
    </div>
  )
}

export default Search
