import jazzicon from "@metamask/jazzicon"
import SearchIcon from "@heroicons/react/outline/SearchIcon"
import UserIcon from "@heroicons/react/solid/UserIcon"
import { useMoralis, useWeb3Transfer } from "react-moralis"
import { useEffect, useRef, useState } from "react"
import { shortenAddress, useEtherBalance, useEthers } from "@usedapp/core"

import { formatEther } from "@ethersproject/units"

const Navbar = ({ searchHandler }) => {
  const iconRef = useRef()
  const { account } = useEthers()
  const { user, authenticate, logout } = useMoralis()
  const [searchTerm, setSearchTerm] = useState("")
  const etherBalance = useEtherBalance(account)
  const [showMenu, setShowMenu] = useState(false)
  useEffect(async () => {
    if (account && iconRef.current) {
      iconRef.current.innerHTML = ""
      iconRef.current.appendChild(jazzicon(12, parseInt(account.slice(2, 10), 16)))
    }
  }, [user])

  return (
    <nav className='bg-purple-100 w-full shadow-lg'>
      <div className=' flex justify-around py-2 items-center relative mx-auto px-12 container'>
        <h1 className='text-2xl font-semibold'>AVAX Marketplace</h1>
        <form
          className='flex'
          onSubmit={(e) => {
            e.preventDefault()
            searchHandler(searchTerm)
          }}>
          <label htmlFor='search' className='hidden'>
            Search NFT's
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

        {!account ? (
          <button
            className='bg-blue-50 p-2 px-3 text-lg font-semibold text-center text-black rounded-lg shadow'
            onClick={() => {
              authenticate({ signingMessage: "hello" })
            }}>
            Connect wallet
          </button>
        ) : (
          <div className='flex items-center'>
            <div className='py-1 rounded-3xl bg-purple-400 border-purple-900 text-white font-semibold mx-6'>
              <span className='px-2'>
                Balance: {etherBalance && formatEther(etherBalance)}
              </span>
              <span className='bg-purple-200 text-black rounded-3xl py-1 px-2 mr-0.5'>
                {shortenAddress(account)}
              </span>
            </div>
            <div className='relative'>
              <button
                className='text-lg font-semibold p-1 text-center rounded-full shadow-md  bg-purple-300 hover:bg-purple-400'
                onClick={async () => {
                  setShowMenu((s) => !s)
                  await logout()
                  console.log(account)
                }}>
                <UserIcon className='h-8 w-8 text-purple-800' />
              </button>
              <div
                className={`${
                  showMenu ? "" : "hidden"
                } absolute rounded-lg top-9 right-6 bg-purple-100 text-purple-900 flex flex-col text-lg p-4 font-semibold z-50`}>
                <a href='/account/nfts' className='my-2 hover:text-black'>
                  My NFT's
                </a>
                <a href='/account/nfts' className='my-2 hover:text-black'>
                  Settings
                </a>
                <hr className='text-purple-900' />
                <button className='text-red-600 font-semibold mt-2 hover:text-red-900'>
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
