export default function sortByDate(
  arr: any[],
  field: string = 'date',
  order: 'inc' | 'dec' = 'inc'
): any[] {
  return arr?.sort((a, b) => {
    const dateA = new Date(a[field])
    const dateB = new Date(b[field])
    if (order === 'inc') {
      return dateA.getTime() - dateB.getTime()
    } else {
      return dateB.getTime() - dateA.getTime()
    }
  })
}
