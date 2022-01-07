import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useChain, useMoralis } from "react-moralis"
import ReactPaginate from "react-paginate"
import NFTGrid from "./NFTGrid"
import { useRef } from "react"
import Dots from "@heroicons/react/solid/DotsHorizontalIcon"
function PaginatedItems({ items, itemsPerPage,  }) {

  const [currentItems, setCurrentItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const scrollToRef = useRef()
  useEffect(() => {
    if (items) {
      const endOffset = itemOffset + itemsPerPage
      setCurrentItems(items.slice(itemOffset, endOffset))
      setPageCount(Math.ceil(items.length / itemsPerPage))
    } else {
    }
  }, [items, itemOffset, itemsPerPage])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items?.length
    setItemOffset(newOffset)
    scrollToRef.current.scrollIntoView()
  }

  return (
    <div className='mt-24 text-white'>
      {currentItems && (
        <div className='flex flex-col items-center justify-center'>
          <div ref={scrollToRef} />
          <NFTGrid nfts={currentItems} />
          <ReactPaginate
            containerClassName='flex  h-12 my-5'
            pageLinkClassName="px-4 py-2"
            nextLinkClassName="p-2"
            previousLinkClassName="p-2"
            pageClassName='grid w-12 h-12 place-items-center bg-purple-100 mx-0.5 text-black rounded-lg '
            nextClassName='w-24 grid place-items-center bg-purple-100 mx-0.5 text-black rounded-lg '
            previousClassName='w-26 grid place-items-center bg-purple-100 mx-0.5 text-black rounded-lg '
            breakLabel={<Dots className='h-8 mt-5' color='white' />}
            activeClassName='bg-purple-500'
            nextLabel='next >'
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel='< previous'
            renderOnZeroPageCount={null}
          />
        </div>
      )}
    </div>
  )
}
export default PaginatedItems
