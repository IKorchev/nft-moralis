import Link from "next/link"

export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: 300,
    cursor: "text",
    background: "#10011F",
    // Overwrittes the different states of border
    borderColor: "#F70C76",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: "#AB044F",
    },
  }),
  menu: (provided, state) => ({
    ...provided,
    gap: "5px",
    backgroundColor: "#420042",
    padding: "0 2px",
  }),
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
      background: "#F70C76",
      borderRadius: "15%",
    },
    "::-webkit-scrollbar-track": {
      background: "#AB044F",
      borderRadius: "15%",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#F70C76",
      borderRadius: "25%",
    },
  }),
}

export const CustomOption = ({ data, innerRef, innerProps, isFocused, isSelected }) => {
  return (
    <div className='bg-secondary-400 border-secondary-100 border' ref={innerRef} {...innerProps}>
      <Link href={`/assets/${data.contractAddress}`}>
        <div
          className={`
           mx-3 flex h-12 
          flex-shrink-0 cursor-pointer items-center overflow-hidden rounded-md
           ${
             isSelected ? "bg-secondary-100" : isFocused ? "bg-secondary-800" : "bg-secondary-600"
           }`}>
          <img
            className='border-secondary-100 bg-secondary-200 h-12 w-12 border-r object-cover'
            src={data.image}
            alt='Collection'
          />
          <h1 className='truncate px-4 hover:text-gray-500'>{data.label}</h1>
        </div>
      </Link>
    </div>
  )
}
