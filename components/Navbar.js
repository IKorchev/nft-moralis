import jazzicon from "@metamask/jazzicon"
import SearchIcon from "@heroicons/react/outline/SearchIcon"
import { useMoralis, useWeb3Transfer } from "react-moralis"
import { useEffect, useRef, useState } from "react"
import {
  useEtherBalance,
  useEthers,
  shortenAddress,
  useTokenBalance,
  getChainName,
} from "@usedapp/core"

import { formatEther } from "@ethersproject/units"

const Navbar = ({ searchHandler }) => {
  const iconRef = useRef()
  const { activateBrowserWallet, account, chainId, library } = useEthers()
  const etherBalance = useEtherBalance(account)
  const { isInitialized, auth, user, authenticate, logout, Moralis } = useMoralis()
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (account && iconRef.current) {
      iconRef.current.innerHTML = ""
      iconRef.current.appendChild(jazzicon(12, parseInt(account.slice(2, 10), 16)))
    }
  }, [account])

  return (
    <nav className='bg-purple-100 w-full shadow-lg'>
      <div className=' flex justify-around py-2 items-center relative mx-auto'>
        <h1 className='text-2xl font-semibold'>AVAX Marketplace</h1>
        <form
          className='flex'
          onSubmit={(e) => {
            e.preventDefault()
            searchHandler(searchTerm)
          }}>
          <label htmlFor='search' className='hidden'>
            Search
          </label>
          <input
            type='text'
            className='p-1 px-2 text-lg focus:border rounded-l-lg border border-r-0 border-purple-900'
            placeholder='Search'
            onChange={(e) => {
              setSearchTerm(e.target.value)
            }}
            value={searchTerm}
          />
          <button className='px-2 py-1 text-lg font-semibold bg-purple-800 rounded-r-lg border  border-purple-900'>
            <SearchIcon className='h-full w-6 text-white ' />
          </button>
        </form>
        {account ? (
          <div className='flex'>
            <div className='text-white flex items-center bg-gray-700 border border-gray-500 rounded-2xl'>
              <p className='px-2 py-2  text-sm'>
                {getChainName(chainId)}{" "}
                {etherBalance
                  ? parseFloat(formatEther(etherBalance)).toFixed(4)
                  : "Loading..."}
              </p>
              <p className='bg-gray-900 px-2 py-1.5 rounded-2xl text-sm flex items-center'>
                {shortenAddress(account)}
                <span className='ml-3 mr-1' ref={iconRef}></span>
              </p>
            </div>
            <button
              className='bg-blue-50 p-2 px-3 text-lg font-semibold text-center text-black rounded-lg shadow ml-5'
              onClick={() => {
                setUserNFTS([])
                logout()
              }}>
              Disconnect
            </button>
          </div>
        ) : (
          <button
            className='bg-blue-50 p-2 px-3 text-lg font-semibold text-center text-black rounded-lg shadow'
            onClick={() => authenticate({ signingMessage: "Sign in to our app" })}>
            Connect wallet
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
