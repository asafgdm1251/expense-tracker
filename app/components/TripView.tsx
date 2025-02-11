"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane, Coffee, Utensils, Bus, ShoppingBag, Music } from "lucide-react"
import type { Expense, Trip } from "../types/expense"
import { formatCurrency, formatDate, getDailyAverage } from "../utils/format"

const categoryIcons = {
  transportation: Bus,
  restaurants: Utensils,
  drinks: Coffee,
  shopping: ShoppingBag,
  entertainment: Music,
  other: Plane,
}

interface TripViewProps {
  tripId: string
}

export default function TripView({ tripId }: TripViewProps) {
  const [trip, setTrip] = useState<Trip | null>(null)
  const [expenses, setExpenses] = useState<Expense[]>([])

  useEffect(() => {
    const storedTrip = JSON.parse(localStorage.getItem(`trip-${tripId}`) || "null")
    const storedExpenses = JSON.parse(localStorage.getItem("expenses") || "[]")
    setTrip(storedTrip)
    setExpenses(storedExpenses.filter((e: Expense) => e.tripId === tripId))
  }, [tripId])

  if (!trip) return null

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const dailyAverage = getDailyAverage(expenses, trip.startDate, trip.endDate)

  // Group expenses by date
  const expensesByDate = expenses.reduce((groups: Record<string, Expense[]>, expense) => {
    const date = expense.date
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(expense)
    return groups
  }, {})

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{trip.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Total</div>
              <div className="text-2xl font-bold">{formatCurrency(total, trip.currency)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Daily Average</div>
              <div className="text-2xl font-bold">{formatCurrency(dailyAverage, trip.currency)}</div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground mt-2">Trip ended on {formatDate(trip.endDate)}</div>
        </CardContent>
      </Card>

      {Object.entries(expensesByDate).map(([date, dayExpenses]) => (
        <div key={date} className="space-y-2">
          <h3 className="font-medium">{formatDate(date)}</h3>
          {dayExpenses.map((expense) => {
            const Icon = categoryIcons[expense.category as keyof typeof categoryIcons] || categoryIcons.other
            return (
              <Card key={expense.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-full">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium">{expense.description}</div>
                      <div className="text-sm text-muted-foreground">{expense.category}</div>
                    </div>
                  </div>
                  <div className="font-medium">{formatCurrency(expense.amount, trip.currency)}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ))}
    </div>
  )
}

