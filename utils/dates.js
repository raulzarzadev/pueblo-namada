// @ts-check
import { format } from 'date-fns'

export const formatDate = (
  date,
  stringFormat = 'dd/MM/yy'
) => {
  if (!date) return console.error('no date')
  const objectDate = new Date(date)
  function isValidDate(d) {
    return d instanceof Date && !isNaN(d)
  }

  if (isValidDate(objectDate)) {
    return format(
      new Date(
        objectDate.setMinutes(
          objectDate.getMinutes() +
            objectDate.getTimezoneOffset()
        )
      ),
      stringFormat
    )
  } else {
    return console.error('date is not valid date')
  }
}
