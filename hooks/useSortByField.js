import { useState } from 'react'

const useSortByField = (array) => {
  const [sortReverse, setSortReverse] = useState(true)
  const [arraySorted, setArraySorted] = useState(array)

  const sortByField = (arr, fieldName, reverse) => {
    const auxArr = [...arr]
    return auxArr.sort((a, b) => {
      if (a[fieldName] < b[fieldName])
        return reverse ? -1 : 1
      if (a[fieldName] > b[fieldName])
        return reverse ? 1 : -1
      return 0
    })
  }

  const handleSortBy = (fieldName) => {
    setArraySorted(
      sortByField(array, fieldName, sortReverse)
    )
    setSortReverse(!sortReverse)
  }

  return { arraySorted, handleSortBy }
}

export default useSortByField
