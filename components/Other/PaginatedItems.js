import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import ReactPaginate from "react-paginate"

function PaginatedItems({ items, itemsPerPage = 20, renderItem, isLayoutAnimated = true }) {
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
    <motion.div layout={isLayoutAnimated} className='relative mx-auto text-white'>
      {currentItems && (
        <div className=''>
          <div aria-hidden='true' className='absolute -top-24' ref={scrollToRef} />
          <div class='grid grid-cols-1 justify-items-center gap-3 sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 '>
            {currentItems.map(renderItem)}
          </div>
          {items?.length > itemsPerPage && (
            <ReactPaginate
              containerClassName='flex my-5 rounded-lg justify-center items-center overflow-hidden'
              pageLinkClassName='bg-white border-gray-300 text-gray-500  inline-flex items-center px-4 py-2 border'
              nextLinkClassName='bg-white border-gray-300 text-gray-500 inline-flex items-center px-4 py-2 border'
              previousLinkClassName='bg-white border-gray-300 text-gray-500 inline-flex items-center px-4 py-2 border'
              pageClassName=''
              nextClassName=''
              previousClassName=''
              breakLabel={
                <span className='inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-gray-500'>
                  ...
                </span>
              }
              activeLinkClassName='bg-gray-300 text-gray-900'
              nextLabel='>'
              onPageChange={handlePageClick}
              pageRangeDisplayed={0}
              pageCount={pageCount}
              previousLabel='<'
              renderOnZeroPageCount={null}
            />
          )}
        </div>
      )}
    </motion.div>
  )
}
export default PaginatedItems
