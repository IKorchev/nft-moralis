import { formatBalance } from "../../utils/common"
import jazzicon from "@metamask/jazzicon"
import { useMoralis, useChain } from "react-moralis"
import { useEffect, useRef, useState } from "react"
import { shortenAddress, useEtherBalance } from "@usedapp/core"
import { formatEther } from "@ethersproject/units"
import Tooltip from "../Tooltip"

const AccountAndBalance = () => {
  const iconRef = useRef()
  const { chainId, account, switchNetwork, chain } = useChain()
  const balance = useEtherBalance(account)
  const [showTooltip, setShowTooltip] = useState(false)
  const { isAuthenticated, user } = useMoralis()
  useEffect(async () => {
    if (isAuthenticated && user && iconRef.current) {
      iconRef.current.innerHTML = ""
      iconRef.current.appendChild(jazzicon(12, parseInt(account.slice(2, 10), 16)))
    }
  }, [isAuthenticated])
  return (
    <>
      {chainId !== "0x3" ? (
        <>
          <div className='bg-pinkish flex-col xl:flex-row shadow-4xl inline-flex items-center justify-center rounded-lg py-0.5 text-light mr-3'>
            <button className='px-2' onClick={() => switchNetwork("0x3")}>
              Switch to Ropsten
            </button>
          </div>
        </>
      ) : (
        <div className='bg-pinkish flex-col xl:flex-row shadow-4xl inline-flex items-center justify-center rounded-lg py-0.5 text-light mr-3'>
          {balance && (
            <span className='px-2 text-black font-bold'>
              {parseFloat(formatEther(balance)).toFixed(5)}
              {formatBalance(chain.networkId)}
            </span>
          )}
          <span
            className='relative text-light bg-primary rounded-md cursor-pointer px-2 mx-1'
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}>
            <Tooltip shown={showTooltip} text={account} />
            {shortenAddress(account)}
            <span className='ml-2' ref={iconRef}></span>
          </span>
        </div>
      )}
    </>
  )
}

export default AccountAndBalance
