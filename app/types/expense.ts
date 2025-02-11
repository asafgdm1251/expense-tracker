export interface Expense {
  id: string
  amount: number
  category: string
  date: string
  time: string
  description: string
  currency: string
  tripId?: string
}

export interface Trip {
  id: string
  name: string
  startDate: string
  endDate: string
  currency: string
}

export type CategoryType = "transportation" | "restaurants" | "drinks" | "shopping" | "entertainment" | "other"

