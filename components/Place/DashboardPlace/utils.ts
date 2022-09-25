export const formatGuestFromRoomRequests = ({
  roomRequests = []
}) => {
  const guestsFromRoomRequests = roomRequests.reduce(
    (prev, curr) => {
      const { guest } = curr
      const findGuest = prev.find((g) => g?.id === guest.id)
      if (findGuest) {
        return prev
      } else {
        return [...prev, { ...guest }]
      }
    },
    []
  )

  const formatGuestRoomRequests =
    guestsFromRoomRequests.map((guest) => {
      const roomRequests = roomRequests?.filter(
        ({ userId }) => userId === guest.id
      )
      return {
        ...guest,
        roomRequests,
        payments: roomRequests
      }
    })

  return formatGuestRoomRequests
}

export const guestFromAccomodationAndPayemts = ({
  guests,
  payments
}) => {
  console.log({ guests, payments })
  return guests.map((guest) => {
    const guestPayments = payments.filter(
      (payment) => payment.guest === guest.id
    )
    return { ...guest, payments: guestPayments }
  })
}

export const formatGuestPayments = ({ guests = [] }) => {
  return [...guests].map((guest) => {
    const sortedPaymentsByDate = guest?.payments?.sort(
      (a, b) => {
        const toNumber = (date) => {
          const newDate = new Date(date)
          if (newDate instanceof Date) {
            return newDate?.getTime()
          } else {
            console.error('invalid date')
          }
        }
        if (
          toNumber(a?.createdAt) > toNumber(b?.createdAt)
        )
          return 1
        if (
          toNumber(a?.createdAt) < toNumber(b?.createdAt)
        )
          return -1
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