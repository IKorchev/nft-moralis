import { motion } from "framer-motion"
import { Suspense, useEffect, useRef, useState } from "react"
import ReactPaginate from "react-paginate"
import Loading from "./Loading"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
}

function PaginatedItems({ items, itemsPerPage = 20, renderItem }) {
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
    <Suspense fallback={<Loading />}>
      <div className='relative mx-auto text-white'>
        <>
          <div aria-hidden='true' className='absolute -top-24' ref={scrollToRef} />
          <motion.div
            variants={container}
            layout
            initial='hidden'
            whileInView='show'
            class='flex flex-wrap justify-center gap-2 lg:justify-start'>
            {currentItems.map(renderItem)}
          </motion.div>
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
        </>
      </div>
    </Suspense>
  )
}
export default PaginatedItems
