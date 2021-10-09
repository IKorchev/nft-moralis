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
    <nav className='bg-blackish w-full shadow-lg'>
      <div className=' flex justify-between py-4 items-center relative mx-auto px-32 container'>
        <h1 className='text-2xl text-light-tealish font-bold'>NFT Explorer</h1>
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
            <div className='py-1 rounded-3xl bg-light-tealish border-tealish text-blackish font-semibold mx-6'>
              <span className='px-2'>
                Balance: {etherBalance && formatEther(etherBalance)}
              </span>
              <span className='bg-tealish text-light rounded-3xl py-1 px-2 mr-0.5'>
                {shortenAddress(account)}
                <span className='ml-2' ref={iconRef}></span>
              </span>
            </div>
            <div className='relative'>
              <button
                className='text-lg font-semibold p-1 text-center rounded-full shadow-md  border border-tealish hover:opacity-90'
                onClick={async () => {
                  setShowMenu((s) => !s)
                  await logout()
                  console.log(account)
                }}>
                <UserIcon className='h-6 w-6 text-light-tealish' />
              </button>
              <div
                className={`${
                  showMenu ? "" : "hidden"
                } absolute rounded-md top-9 right-6 bg-light-grayish text-light flex flex-col text-lg p-4 font-semibold z-50`}>
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
              <button
                className='text-white text-xl '
                onClick={() => {
                  Moralis.Plugins.fiat.buy()
                }}>
                Buy with fiat
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
