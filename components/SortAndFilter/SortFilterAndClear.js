import ClearFiltersButton from "./ClearFiltersButton"
import FilterSection from "./FilterSection"
import SortSection from "./SortSection"

const SortFilterAndClear = ({
  sortOption,
  sortOptions,
  setSortOption,
  filterOption,
  filterOptions,
  setFilterOption,
}) => {
  return (
    <div className='flex flex-col gap-1 '>
      <SortSection
        defaultOpen={true}
        sortOption={sortOption}
        setSortOption={setSortOption}
        sortOptions={sortOptions}
      />
      <FilterSection
        filterOption={filterOption}
        filterOptions={filterOptions}
        setFilterOption={setFilterOption}
        variant='desktop'
      />
      <ClearFiltersButton
        setFilterOption={setFilterOption}
        setSortOption={setSortOption}
      />
    </div>
  )
}

export default SortFilterAndClear
