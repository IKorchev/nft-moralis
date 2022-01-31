export const sortOptions = [
  { name: "Newest first", data: "date-desc" },
  { name: "Oldest first", data: "date-asc" },
  { name: "Price: Low to High", data: "price-asc" },
  { name: "Price: High to Low", data: "price-desc" },
  { name: "ID: Ascending", data: "id-asc" },
  { name: "ID: Descending", data: "id-desc" },
]

export const sortFunction = (object, attribute) => {
  switch (attribute) {
    case "price-asc":
      return object.attributes.price
    case "price-desc":
      return -object.attributes.price
    case "date-asc":
      return object.createdAt
    case "date-desc":
      return -object.createdAt
    case "id-asc":
      return object.attributes.tokenId
    case "id-desc":
      return -object.attributes.tokenId
  }
}

