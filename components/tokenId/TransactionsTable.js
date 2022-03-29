import ExternalLinkIcon from "@heroicons/react/solid/ExternalLinkIcon"
import Paper from "@mui/material/Paper"
import Moralis from "moralis"
import Link from "next/link"
import { shortenIfAddress, shortenTransactionHash } from "@usedapp/core"
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { chainState } from "../../store/userSlice"

const createRows = (arr) => {
  if (!arr) return arr
  return arr.map((el) => {
    const date = new Date(el.block_timestamp).toLocaleDateString("uk")
    return {
      date: date,
      from: el.from_address,
      to: el.to_address,
      hash: el.hash || el.transaction_hash,
      value: el.value,
    }
  })
}

const headRowCells = [
  { id: "date", label: "Date" },
  { id: "from", label: "From" },
  { id: "to", label: "To" },
  { id: "hash", label: "Hash" },
  { id: "value", label: "Value" },
]

const TransactionsTable = ({ transactions }) => {
  const { chain } = useRecoilValue(chainState) || {}
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const bodyRows = createRows(transactions)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper className=' border-secondary-600 container mx-auto  max-w-[70rem] overflow-hidden rounded-md border '>
      <TableContainer className='styled-scrollbar bg-secondary-900  h-[36.5rem] text-white'>
        <Table className='text-white' aria-label='Transactions Table'>
          <TableHead>
            <TableRow>
              {headRowCells.map((cell) => (
                <TableCell sx={{ borderColor: "purple" }} className='text-white' key={cell.id}>
                  {cell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bodyRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(({ hash, from, to, value, date }, index) => (
                <TableRow
                  //using index due to bug with moralis duplicate items in the database
                  //If index is not used, the table will have duplicate items on some occasions when changing the page
                  key={index}
                  className='bg-secondary-800/40 odd:bg-secondary-900 text-white'>
                  <TableCell sx={{ border: 0 }}>
                    <span className=' text-white'>{date}</span>
                  </TableCell>
                  <TableCell sx={{ border: 0 }} className='text-white'>
                    <Link href={`/user/${from}`}>
                      <a className='hover:text-secondary-100 inline-flex text-white '>
                        {shortenIfAddress(from)} <ExternalLinkIcon className='h-5 w-5' />
                      </a>
                    </Link>
                  </TableCell>
                  <TableCell sx={{ border: 0 }} className=' text-white '>
                    {to ? (
                      <Link href={`/user/${to}`}>
                        <a className='hover:text-secondary-100 inline-flex text-white'>
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
                      className='hover:text-secondary-100 inline-flex text-white'>
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
        component='div'
        className='border-secondary-500 bg-secondary-900 border-t text-white'
        rowsPerPageOptions={[10, 25, 100]}
        count={bodyRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TransactionsTable
