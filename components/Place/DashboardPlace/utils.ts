interface Guest {
  id: string,
  payments: Payment[]
}

interface Payment {
  id: string
  guest: string,
  createdAt: string | Date | number
}

export const formatGuestFromRoomRequests = ({
  roomRequests = []
}) => {
  const guestsFromRoomRequests = roomRequests.reduce(
    (prev: any, curr: any) => {
      const { guest } = curr
      const findGuest = prev.find(({ id }: { id: string }) => id === guest.id)
      if (findGuest) {
        return prev
      } else {
        return [...prev, { ...guest }]
      }
    },
    []
  )
  const formatGuestRoomRequests =
    guestsFromRoomRequests.map((guest: Guest) => {
      const requests = roomRequests?.filter(
        ({ userId }) => userId === guest.id
      )
      return {
        ...guest,
        roomRequests: requests,
        payments: requests
      }
    })

  return formatGuestRoomRequests
}

export const guestFromAccomodationAndPayemts = ({
  guests,
  payments
}: { guests: Guest[], payments: Payment[] }) => {
  return guests.map((guest) => {
    const guestPayments = payments.filter(
      (payment) => payment.guest === guest.id
    )
    return { ...guest, payments: guestPayments }
  })
}

export const formatGuestPayments = ({ guests }: { guests: Guest[] }) => {
  return [...guests].map((guest) => {
    const sortedPaymentsByDate = guest?.payments?.sort(
      (a, b) => {
        const toNumber = (date: any) => {
          const newDate = new Date(date)
          if (newDate instanceof Date) {
            return newDate?.getTime()
          } else {
            return console.error('invalid date')
          }
        }
        if (
          toNumber(a?.createdAt) > toNumber(b?.createdAt)
        )
          return -1
        if (
          toNumber(a?.createdAt) < toNumber(b?.createdAt)
        )
          return 1
        return 0
      }
    )

    return {
      ...guest,
      payments: sortedPaymentsByDate,
      lastPayment: sortedPaymentsByDate?.[0],
      lastPaymentDate:
        sortedPaymentsByDate?.[0]?.createdAt,
      paymentsLength: sortedPaymentsByDate?.length
    }
  })
}