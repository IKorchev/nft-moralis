import jazzicon from "@metamask/jazzicon"
import UserIcon from "@heroicons/react/solid/UserIcon"
import { useMoralis } from "react-moralis"
import { useEffect, useRef, useState } from "react"
import { shortenAddress, useEthers } from "@usedapp/core"
import Link from "next/link"
const Navbar = () => {
  const iconRef = useRef()
  const { chainId } = useEthers()
  const { user, authenticate, logout, Moralis, isAuthenticated } = useMoralis()
  const [showMenu, setShowMenu] = useState(false)
  const [balance, setBalance] = useState(false)

  useEffect(async () => {
    if (isAuthenticated && user && iconRef.current) {
      const { balance } = await Moralis.Web3API.account.getNativeBalance({
        chain: chainId,
        address: user.attributes.ethAddress,
      })
      setBalance(parseInt(balance).toFixed(2))
      iconRef.current.innerHTML = ""
      iconRef.current.appendChild(
        jazzicon(12, parseInt(user.attributes.ethAddress.slice(2, 10), 16))
      )
    }
  }, [isAuthenticated])

  return (
    <nav className='bg-primary-dark bg-opacity-90 w-full shadow-lg z-10'>
      <div className='flex justify-between py-4 items-center relative mx-auto px-24 container'>
        <Link href='/' passHref>
          <h1 className='text-xl text-white cursor-pointer font-extrabold'>NE</h1>
        </Link>
        <div className='flex w-1/5 justify-between'>
          <Link href='/explore'>
            <h1 className='text-xl text-white cursor-pointer'>Explore</h1>
          </Link>
          <Link href='/mint'>
            <h1 className='text-xl text-white cursor-pointer'>Mint</h1>
          </Link>
          <Link href='/swap'>
            <h1 className='text-xl text-white cursor-pointer'>Swap</h1>
          </Link>
        </div>
        {!isAuthenticated ? (
          <button
            className='bg-blue-50 p-1 px-3 text-lg font-semibold text-center text-black rounded-lg shadow'
            onClick={() => {
              authenticate({ signingMessage: "hello" })
            }}>
            Connect wallet
          </button>
        ) : (
          <div className='flex items-center'>
            <div className='bg-pinkish flex items-center rounded-full py-0.5 text-light mr-3'>
              <span className='px-2'>{balance}</span>
              <span className=' text-light bg-primary rounded-3xl px-2 mr-0.5'>
                {shortenAddress(user.attributes.ethAddress)}
                <span className='mx-2' ref={iconRef}></span>
              </span>
            </div>
            <div className='relative'>
              <button
                className='text-lg font-semibold p-1 text-center shadow-md rounded-full hover:opacity-90'
                onClick={async () => {
                  setShowMenu((s) => !s)
                }}>
                <UserIcon className='h-6 w-6 text-primary-lightest ' />
              </button>
              <div
                className={`${
                  showMenu ? "" : "hidden"
                } divide-y absolute rounded-md top-9 px-12 right-6 bg-primary text-light flex flex-col text-lg p-4 font-semibold z-50`}>
                <a href='/account' className='mt-1 hover:opacity-90 py-2'>
                  Account
                </a>
                <a href='/account/nfts' className='mt-1 hover:opacity-90 py-2'>
                  Settings
                </a>
                <button
                  onClick={logout}
                  className='text-red-600 font-semibold mt-2 hover:text-red-900 py-2'>
                  Disconnect
                </button>
              </div>
            </div>
            <button
              className='text-white text-lg ml-12'
              onClick={() => {
                Moralis.Plugins.fiat.buy()
              }}>
              Buy with fiat
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
