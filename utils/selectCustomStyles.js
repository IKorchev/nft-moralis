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
    <div ref={innerRef} {...innerProps}>
      <Link href={`/assets/${data.contractAddress}`}>
        <div
          className={`
          cursor-pointer flex-shrink-0 h-12 flex 
          border items-center mx-3 border-secondary-dark rounded-md
          overflow-hidden 
          ${isSelected ? "bg-secondary" : isFocused ? "bg-primary-800" : ""}`}>
          <img
            className='h-12 w-12 object-cover bg-primary-700 border-r border-secondary-light'
            src={data.image}
            alt='Collection '
          />
          <h1 className='truncate px-4 hover:text-gray-500'>{data.label}</h1>
        </div>
      </Link>
    </div>
  )
}
