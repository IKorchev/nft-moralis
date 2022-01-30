import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { useRef } from "react"

function PaginatedItems({ items, itemsPerPage, renderItem }) {
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
    <div className=' text-white relative'>
      {currentItems && (
        <div className='flex flex-col items-center justify-center '>
          <div className='absolute -top-24' ref={scrollToRef} />
          <div className='flex flex-wrap gap-5 w-full justify-start  lg:justify-start  min-h-[40rem]'>
            {currentItems.map(renderItem)}
          </div>
          {items?.length > itemsPerPage && (
            <ReactPaginate
              containerClassName='flex my-5 rounded-lg  items-center overflow-hidden'
              pageLinkClassName='bg-white border-gray-300 text-gray-500  inline-flex items-center px-4 py-2 border'
              nextLinkClassName='bg-white border-gray-300 text-gray-500 inline-flex items-center px-4 py-2 border'
              previousLinkClassName='bg-white border-gray-300 text-gray-500 inline-flex items-center px-4 py-2 border'
              pageClassName=''
              nextClassName=''
              previousClassName=''
              breakLabel={
                <span className='bg-white border-gray-300 text-gray-500 inline-flex items-center px-4 py-2 border'>
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
    </div>
  )
}
export default PaginatedItems
