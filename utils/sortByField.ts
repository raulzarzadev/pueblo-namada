const sortByField = (
  arr: [],
  fieldName: string,
  reverse: boolean
) => {
  const auxArr = [...arr]

  return auxArr.sort((a, b) => {
    if (a[fieldName] < b[fieldName]) return reverse ? -1 : 1
    if (a[fieldName] > b[fieldName]) return reverse ? 1 : -1
    return 0
  })
}

export default sortByField
