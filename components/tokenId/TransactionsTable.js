import { LinkIcon } from "@heroicons/react/solid"
import ExternalLinkIcon from "@heroicons/react/solid/ExternalLinkIcon"
import { shortenIfAddress, shortenTransactionHash } from "@usedapp/core"
import Moralis from "moralis"
import Link from "next/link"
import { FiLink, FiLink2 } from "react-icons/fi"
import { useChain } from "react-moralis"
import { MARKET_ADDRESS } from "../../utils/ABIS"
const formatAddress = (address) => {
  switch (address) {
    case "0xe6f1a815c66bac5f1d59f802bb2a73aa77b36621":
      return "Market Contract"
    case "0x0000000000000000000000000000000000000000":
      return "Null"
    case MARKET_ADDRESS:
      return "Market Contract"
    default:
      return shortenIfAddress(address)
  }
}
const TransactionsTable = ({ transactions, rowProps, ...props }) => {
  return (
    <div className='align-middle inline-block min-w-full '>
      <div className='shadow  border-b border-gray-200 sm:rounded-lg '>
        <table className='min-w-full  divide-y divide-gray-200  '>
          <thead className='bg-purple-900 text-xs  text-pink-500 font-medium uppercase '>
            <tr>
              <th scope='col' className='lg:px-6 py-3'>
                Date
              </th>
              <th scope='col' className='lg:px-6 py-3'>
                From
              </th>
              <th scope='col' className='lg:px-6 py-3'>
                To
              </th>
              <th scope='col' className='lg:px-6 py-3'>
                Transaction Hash
              </th>
              <th scope='col' className='lg:px-6 py-3'>
                Amount
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200 '>
            {transactions.result?.map((el) => (
              <TableRow
                {...rowProps}
                key={el.transaction_hash}
                blockTimestamp={el.block_timestamp}
                transactionHash={el.transaction_hash}
                fromAddress={el.from_address}
                toAddress={el.to_address}
                price={el.value}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const TableRow = ({
  blockTimestamp,
  transactionHash,
  fromAddress,
  toAddress,
  price,
  ...props
}) => {
  const { chain } = useChain()
  const date = new Date(blockTimestamp).toLocaleDateString("uk")
  return (
    <tr className=' text-xs text-center whitespace-nowrap bg-purple-700 text-white'>
      <td className='lg:px-6 py-2'>{date}</td>
      <td className='lg:px-6 py-2'>
        <Link href={`/user/${fromAddress}`}>
          <a className='flex items-center justify-center'>
            {shortenIfAddress(fromAddress)} <ExternalLinkIcon className='h-5 w-5' />
          </a>
        </Link>
      </td>
      <td className='lg:px-6 py-2'>
        <Link href={`/user/${toAddress}`}>
          <a className='flex items-center justify-center'>
            {shortenIfAddress(toAddress)} <ExternalLinkIcon className='h-5 w-5' />
          </a>
        </Link>
      </td>
      <td className='lg:px-6 py-2'>
        <a
          href={`${chain.blockExplorerUrl}tx/${transactionHash}`}
          target='_blank'
          rel='noreferrer'
          className='flex items-center justify-center'>
          {shortenTransactionHash(transactionHash)}

          <ExternalLinkIcon className='h-5 w-5' />
        </a>
      </td>
      <td className='lg:px-6 py-2'>{Moralis.Units.FromWei(price)}</td>
    </tr>
  )
}

export default TransactionsTable
