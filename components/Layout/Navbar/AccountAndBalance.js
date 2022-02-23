import { useMoralis } from "react-moralis"
import { shortenIfAddress } from "@usedapp/core"
import Jazzicon from "../../Jazzicon"
import { ChevronDownIcon } from "@heroicons/react/solid"

const AccountAndBalance = ({ icon = true }) => {
  const { account } = useMoralis()
  return (
    <div className='mx-auto flex w-full'>
      <div className='relative mx-1 flex cursor-pointer items-center justify-center rounded-md bg-secondary px-2 py-1 text-light '>
        <span className='mr-3'>{account && shortenIfAddress(account)}</span>
        <Jazzicon address={account} size={18} />
        {icon && <ChevronDownIcon className='ml-2 h-5 w-5' />}
      </div>
    </div>
  )
}

export default AccountAndBalance
