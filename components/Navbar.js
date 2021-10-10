import jazzicon from "@metamask/jazzicon"
import UserIcon from "@heroicons/react/solid/UserIcon"
import { useMoralis, useWeb3Transfer } from "react-moralis"
import { useEffect, useRef, useState } from "react"
import { shortenAddress, useEtherBalance, useEthers } from "@usedapp/core"
import { formatEther } from "@ethersproject/units"

const Navbar = () => {
  const iconRef = useRef()
  const { account } = useEthers()
  const { user, authenticate, logout, Moralis } = useMoralis()
  const etherBalance = useEtherBalance(account)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(async () => {
    if (account && iconRef.current) {
      iconRef.current.innerHTML = ""
      iconRef.current.appendChild(jazzicon(12, parseInt(account.slice(2, 10), 16)))
    }
  }, [user])

  return (
    <nav className='bg-primary w-full shadow-lg'>
      <div className=' flex justify-between py-4 items-center relative mx-auto px-32 container'>
        <div className='grid place-items-center text-2xl font-bold bg-pinkish rounded-full w-12 h-12 text-white'>
          <h1 className=''>NE</h1>
        </div>
        {!account ? (
          <button
            className='bg-blue-50 p-1 px-3 text-lg font-semibold text-center text-black rounded-lg shadow'
            onClick={() => {
              authenticate({ signingMessage: "hello" })
            }}>
            Connect wallet
          </button>
        ) : (
          <div className='flex items-center'>
            <div className='py-1 rounded-3xl bg-pinkish text-light font-semibold mx-6'>
              <span className='px-2'>
                Balance: {etherBalance && formatEther(etherBalance)}
              </span>
              <span className=' text-light bg-primary rounded-3xl py-1 px-2 mr-0.5'>
                {shortenAddress(account)}
                <span className='ml-2' ref={iconRef}></span>
              </span>
            </div>
            <div className='relative'>
              <button
                className='text-lg font-semibold p-1 text-center shadow-md hover:opacity-90'
                onClick={async () => {
                  setShowMenu((s) => !s)
                  await logout()
                  console.log(account)
                }}>
                <UserIcon className='h-6 w-6 text-primary-lightest' />
              </button>
              <div
                className={`${
                  showMenu ? "" : "hidden"
                } absolute rounded-md top-9 right-6 bg-primary-light text-light flex flex-col text-lg p-4 font-semibold z-50`}>
                <a href='/account/nfts' className='my-2 hover:opacity-90'>
                  My NFT's
                </a>
                <a href='/account/nfts' className='my-2 hover:opacity-90'>
                  Settings
                </a>
                <hr />
                <button className='text-red-600 font-semibold mt-2 hover:text-red-900'>
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
