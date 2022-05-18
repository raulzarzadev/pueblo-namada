import { format } from "date-fns"

export const formatDate = ( date: string | number | Date, stringFormat = 'dd/MM/yy') => {
  if(!date) return console.error('no date')
  console.log(date)
  const objectDate = new Date(date)
  function isValidDate(d :  string | number | Date):boolean {
    return d instanceof Date && !isNaN(d as any)
  }

  if (isValidDate(objectDate)) {
    return format(new Date(objectDate.setMinutes(objectDate.getMinutes() + objectDate.getTimezoneOffset())), stringFormat)
  } else {
    console.error('date is not valid date')
  }

}

