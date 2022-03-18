import { truncate } from "lodash"
import Link from "next/link"

export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: 300,
    cursor: "text",
    color: "white",
    background: "#10011F",
    // Overwrittes the different states of border
    borderColor: "#c429d7",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: "#831c8f",
    },
  }),
  menu: (provided, state) => ({
    ...provided,
    gap: "5px",
    color: "white",

    backgroundColor: "#420042",
    padding: "0 2px",
  }),
  dropdownIndicator: () => ({
    display: "none",
  }),
  input: (provided, state) => ({
    ...provided,
    color: "white",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  menuList: (provided, state) => ({
    ...provided,
    display: "flex",
    paddingRight: "5px",
    height: "200px",
    flexDirection: "column",
    flexShrink: "0",
    gap: "2px",

    scrollBehavior: "smooth",
    "::-webkit-scrollbar": {
      width: 5,
      background: "#9920a7",
      borderRadius: "15%",
    },
    "::-webkit-scrollbar-track": {
      background: "#9920a7",
      borderRadius: "15%",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#c429d7",
      borderRadius: "25%",
    },
  }),
}

export const CustomOption = ({ data, innerRef, innerProps, isFocused, isSelected }) => {
  return (
    <div className='border-secondary-100 bg-secondary-400 border' ref={innerRef} {...innerProps}>
      <Link href={`/assets/${data.contractAddress}`}>
        <div
          className={`
           mx-3 flex h-12 
          cursor-pointer items-center 
           ${isSelected ? "bg-secondary-100" : isFocused ? "bg-secondary-800" : "bg-secondary-600"}`}>
          <img
            className='h-12 max-h-12 w-12 max-w-[3rem] bg-gray-100 object-cover'
            height='50'
            width='50'
            src={data.image}
            alt='Collection'
          />
          <h1 className='flex-grow whitespace-nowrap px-3 hover:text-gray-500'>
            {truncate(data.label, { length: 29 })}
          </h1>
        </div>
      </Link>
    </div>
  )
}
