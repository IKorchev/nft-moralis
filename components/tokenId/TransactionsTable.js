import { useChain } from "react-moralis"
import { useState } from "react"
import { shortenIfAddress, shortenTransactionHash } from "@usedapp/core"
import ExternalLinkIcon from "@heroicons/react/solid/ExternalLinkIcon"
import Moralis from "moralis"
import Link from "next/link"
import { Table, TablePagination, TableRow, TableHead, TableContainer, TableCell, TableBody } from "@mui/material"
import Paper from "@mui/material/Paper"

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
    <Paper className=' container mx-auto max-w-[70rem] overflow-hidden rounded-md border border-secondary-600 '>
      <TableContainer className='styled-scrollbar h-[36.5rem]  bg-secondary-900 text-white'>
        <Table className='text-white' aria-label='Transactions Table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderColor: "purple" }} className='text-white'>
                <span className='text-white'>Date</span>
              </TableCell>
              <TableCell sx={{ borderColor: "purple" }}>
                <span className='text-white'>From</span>
              </TableCell>
              <TableCell sx={{ borderColor: "purple" }}>
                <span className='text-white'>To</span>
              </TableCell>
              <TableCell sx={{ borderColor: "purple" }}>
                <span className='text-white'>Hash</span>
              </TableCell>
              <TableCell sx={{ borderColor: "purple" }}>
                <span className='text-white'>Amount</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(({ hash, from, to, value, date }) => (
              <TableRow key={hash} className='bg-secondary-800/40 text-white odd:bg-secondary-900'>
                <TableCell sx={{ border: 0 }}>
                  <span className=' text-white'>{date}</span>
                </TableCell>
                <TableCell sx={{ border: 0 }} className='text-white'>
                  <Link href={`/user/${from}`}>
                    <a className='inline-flex text-white hover:text-secondary-100 '>
                      {shortenIfAddress(from)} <ExternalLinkIcon className='h-5 w-5' />
                    </a>
                  </Link>
                </TableCell>
                <TableCell sx={{ border: 0 }} className=' text-white '>
                  {to ? (
                    <Link href={`/user/${to}`}>
                      <a className='inline-flex text-white hover:text-secondary-100'>
                        {shortenIfAddress(to) || "null"} <ExternalLinkIcon className='h-5 w-5' />
                      </a>
                    </Link>
                  ) : (
                    "Null address"
                  )}
                </TableCell>
                <TableCell sx={{ border: 0 }} className=' text-white '>
                  <a
                    href={`${chain?.blockExplorerUrl}tx/${hash}`}
                    target='_blank'
                    rel='noreferrer'
                    className='inline-flex text-white hover:text-secondary-100'>
                    {shortenTransactionHash(hash) || "null"}
                    <ExternalLinkIcon className='h-5 w-5' />
                  </a>
                </TableCell>
                <TableCell sx={{ border: 0 }}>
                  <span className=' text-white '>{parseFloat(Moralis.Units.FromWei(value)).toFixed(3)}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className='border-t border-secondary-500 bg-secondary-900 text-white'
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
