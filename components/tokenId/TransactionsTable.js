import { useChain } from "react-moralis"
import { useState } from "react"
import { shortenIfAddress, shortenTransactionHash } from "@usedapp/core"
import ExternalLinkIcon from "@heroicons/react/solid/ExternalLinkIcon"
import Moralis from "moralis"
import Link from "next/link"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TablePagination from "@mui/material/TablePagination"
import Paper from "@mui/material/Paper"

// block_hash: "0x614b90760f7d49031eb8622e5b52ff602d9376a0435e53259d2d73aefe0b8865"
// block_number: "11213766"
// block_timestamp: "2021-10-12T11:08:45.000Z"
// from_address: "0x910111ecd2377662f98d5b8d735539a4157b8a83"
// gas: "7600000"
// gas_price: "1500000174"
// hash: "0x4b1ac1e650035d40fbab014636b0ae9441134746cfebee2f321a95c05fb1e73e"
// input: "0x33eba49a0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000005068747470733a2f2f697066732e6d6f72616c69732e696f3a323035332f697066732f516d61674b50353133314545323544426966347051477253624833646755774e3545463744314d4b34397159466700000000000000000000000000000000"
// nonce: "7"
// receipt_contract_address: null
// receipt_cumulative_gas_used: "200443"
// receipt_gas_used: "22914"
// receipt_root: null
// receipt_status: "0"
// to_address: "0x9f92dd963c02d6390b2ad875a2cfc409b3e360de"
// transaction_index: "2"
// transfer_index: (2) [11213766, 2]
// value: "0"

const TransactionsTable = ({ transactions, rowProps, ...props }) => {
  const { chain } = useChain()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const rows = transactions.map((el) => {
    const date = new Date(el.block_timestamp).toLocaleDateString("uk")
    return {
      date: date,
      from: el.from_address,
      to: el.to_address,
      hash: el.hash || el.transaction_hash,
      value: el.value,
    }
  })
  return (
    <Paper className='container mx-auto max-w-[70rem] overflow-hidden rounded-lg'>
      <TableContainer className='styled-scrollbar h-[37rem]  bg-secondary-800'>
        <Table stickyHeader aria-label='Transactions Table'>
          <TableHead>
            <TableRow>
              <TableCell className='bg-secondary-700 text-white'>Date</TableCell>
              <TableCell className='bg-secondary-700 text-white'>From</TableCell>
              <TableCell className='bg-secondary-700 text-white'>To</TableCell>
              <TableCell className='bg-secondary-700 text-white'>Tx Hash</TableCell>
              <TableCell className='bg-secondary-700 text-white'>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(({ hash, from, to, value, date }) => (
              <TableRow key={hash} className='bg-secondary-700 text-white odd:bg-secondary-800'>
                <TableCell className=' text-white'>{date}</TableCell>
                <TableCell className='text-white'>
                  <Link href={`/user/${from}`}>
                    <a className='inline-flex hover:text-secondary-100 '>
                      {shortenIfAddress(from)} <ExternalLinkIcon className='h-5 w-5' />
                    </a>
                  </Link>
                </TableCell>
                <TableCell className=' text-white '>
                  {to ? (
                    <Link href={`/user/${to}`}>
                      <a className='inline-flex hover:text-secondary-100'>
                        {shortenIfAddress(to) || "null"} <ExternalLinkIcon className='h-5 w-5' />
                      </a>
                    </Link>
                  ) : (
                    "Null address"
                  )}
                </TableCell>
                <TableCell className=' text-white '>
                  <a
                    href={`${chain?.blockExplorerUrl}tx/${hash}`}
                    target='_blank'
                    rel='noreferrer'
                    className='inline-flex hover:text-secondary-100'>
                    {shortenTransactionHash(hash) || "null"}
                    <ExternalLinkIcon className='h-5 w-5' />
                  </a>
                </TableCell>
                <TableCell className=' text-white '>{Moralis.Units.FromWei(value)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className='bg-secondary-500 text-white'
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TransactionsTable
