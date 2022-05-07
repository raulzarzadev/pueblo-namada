import { format } from "date-fns"

export const formatDate = (date, stringFormat = 'dd/MM/yy') => {
  const objectDate = new Date(date)
  if (!objectDate) return console.error('date is undefined')
  return format(new Date(objectDate.setMinutes(objectDate.getMinutes() + objectDate.getTimezoneOffset())), stringFormat)
}