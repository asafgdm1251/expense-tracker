"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Expense {
  amount: number
  category: string
  date: string
  section?: string
}

export default function ExpenseSummary() {
  const [summary, setSummary] = useState<Record<string, number>>({})

  useEffect(() => {
    const expenses: Expense[] = JSON.parse(localStorage.getItem("expenses") || "[]")
    const newSummary = expenses.reduce(
      (acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount
        return acc
      },
      {} as Record<string, number>,
    )
    setSummary(newSummary)
  }, [])

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Spending Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.entries(summary).map(([category, total]) => (
          <div key={category} className="flex justify-between">
            <span className="capitalize">{category}</span>
            <span>${total.toFixed(2)}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

