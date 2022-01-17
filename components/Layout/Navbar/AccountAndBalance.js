import { useChain } from "react-moralis"
import { useState } from "react"
import { shortenAddress, useEtherBalance } from "@usedapp/core"
import { formatEther } from "@ethersproject/units"

import Jazzicon from "../../Jazzicon"
import { ChevronDownIcon } from "@heroicons/react/solid"

const AccountAndBalance = ({ icon = true }) => {
  const { account } = useChain()

  return (
    <div className='mx-auto w-full flex'>
      <div className='relative flex justify-center items-center text-light bg-pinkish rounded-md cursor-pointer px-2 py-1 mx-1 '>
        <span className='mr-3'>{account && shortenAddress(account)}</span>
        <Jazzicon address={account} size={18} />
        {icon && <ChevronDownIcon className='ml-2 h-5 w-5' />}
      </div>
    </div>
  )
}

export default AccountAndBalance
