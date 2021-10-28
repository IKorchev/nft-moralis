import { formatBalance } from "../../utils/common"
import jazzicon from "@metamask/jazzicon"
import { useMoralis } from "react-moralis"
import { useEffect, useRef, useState } from "react"
import { shortenAddress, useEtherBalance, useEthers } from "@usedapp/core"
import { formatEther } from "@ethersproject/units"
import Tooltip from "../Tooltip"

const AccountAndBalance = () => {
  const iconRef = useRef()
  const { chainId, account } = useEthers()
  const balance = useEtherBalance(account)
  const [showTooltip, setShowTooltip] = useState(false)
  const { isAuthenticated, user } = useMoralis()
  useEffect(async () => {
    if (isAuthenticated && user && iconRef.current) {
      iconRef.current.innerHTML = ""
      iconRef.current.appendChild(
        jazzicon(12, parseInt(user.attributes.ethAddress.slice(2, 10), 16))
      )
    }
  }, [isAuthenticated])
  return (
    <div className='bg-pinkish flex items-center rounded-full py-0.5 text-light mr-3'>
      {balance && (
        <span className='px-2'>
          {parseFloat(formatEther(balance)).toFixed(5)} {formatBalance(chainId)}
        </span>
      )}
      <span
        className='relative text-light bg-primary rounded-3xl px-2 mr-0.5'
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}>
        <Tooltip shown={showTooltip} text={user.attributes.ethAddress} />
        {shortenAddress(user.attributes.ethAddress)}
        <span className='mx-2' ref={iconRef}></span>
      </span>
    </div>
  )
}

export default AccountAndBalance
