"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Expense {
  amount: number
  category: string
  date: string
  section?: string
}

export default function ExpenseList() {
  const [expenses, setExpenses] = useState<Expense[]>([])

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses") || "[]")
    setExpenses(storedExpenses)
  }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recent Expenses</h2>
      {expenses.map((expense, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{expense.category}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Amount: ${expense.amount.toFixed(2)}</p>
            <p>Date: {expense.date}</p>
            {expense.section && <p>Section: {expense.section}</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

