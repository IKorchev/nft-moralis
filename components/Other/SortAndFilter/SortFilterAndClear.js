import ClearFiltersButton from "./ClearFiltersButton"
import FilterSection from "./FilterSection"
import SortSection from "./SortSection"

const SortFilterAndClear = ({ setSortOption, filterOption, filterOptions, setFilterOption }) => {
  return (
    <div className='relative flex flex-col gap-3 '>
      <SortSection defaultOpen={true} />
      <FilterSection />
      <ClearFiltersButton/>
    </div>
  )
}

export default SortFilterAndClear
