import { Base } from '../Base.model'

export interface Cost extends Base {
  name: string
  description: string
  value: number
  quantity: number
  unit: string
  date: Date
  type: string
  category: string
  subcategory: string
  tags: string[]
  notes: string
  isDeleted: boolean
  isArchived: boolean
}
