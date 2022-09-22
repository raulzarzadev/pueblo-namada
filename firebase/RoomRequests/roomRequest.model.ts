import { Base } from '../Base.model'

export interface RoomRequest extends Base {
  placeId: string
  place: object
  dates: {
    startsAt: number
    endsAt: number
  }
}
