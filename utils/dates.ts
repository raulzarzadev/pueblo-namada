import { format as fnsFormat } from 'date-fns'

export const format = (
  date: string | number | Date,
  stringFormat = 'dd/MM/yy'
): string => {
  if (!date) {
    console.error('not a date')
    return 'NaD'
  }
  console.log(date)
  const objectDate = new Date(date)
  function isValidDate(d: string | number | Date): boolean {
    return d instanceof Date && !isNaN(d as any)
  }

  if (isValidDate(objectDate)) {
    return fnsFormat(
      new Date(
        objectDate.setMinutes(
          objectDate.getMinutes() +
            objectDate.getTimezoneOffset()
        )
      ),
      stringFormat
    )
  } else {
    return 'NaD'
  }
  console.error('date is not valid date')
}
