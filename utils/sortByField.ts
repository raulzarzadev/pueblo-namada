const sortByField = (
  arr: [],
  fieldName: string,
  reverse: boolean
) => {
  if (!Array.isArray(arr)) {
    return console.error('is not a arr')
  }
  const auxArr = [...arr]
  return auxArr.sort((a, b) => {
    if (a[fieldName] < b[fieldName]) return reverse ? -1 : 1
    if (a[fieldName] > b[fieldName]) return reverse ? 1 : -1
    return 0
  })
}

export default sortByField
