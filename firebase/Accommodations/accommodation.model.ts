import { Base } from '../Base.model'

export interface Accommodation extends Base {
  accommodationStarts: string
  createdAt: Date
  dates: {
    startsAt: Date
    endsAt: Date
  }

  discountedNights: number
  guest: string
  nights: number
  place: string
  prices: {
    nigth: number
    usd: number
  }
  placeId: string
  useTodal: number
  mxnTotal: number
  userId: string,
}
