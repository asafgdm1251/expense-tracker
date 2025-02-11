"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { v4 as uuidv4 } from "uuid"

interface ExpenseFormProps {
  tripId: string
}

export default function ExpenseForm({ tripId }: ExpenseFormProps) {
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Get trip details for currency
    const trip = JSON.parse(localStorage.getItem(`trip-${tripId}`) || "{}")

    const expense = {
      id: uuidv4(),
      amount: Number.parseFloat(amount),
      category,
      date,
      time,
      description,
      currency: trip.currency,
      tripId,
    }

    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]")
    localStorage.setItem("expenses", JSON.stringify([...expenses, expense]))

    setAmount("")
    setCategory("")
    setDate("")
    setTime("")
    setDescription("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="transportation">Transportation</SelectItem>
              <SelectItem value="restaurants">Restaurants</SelectItem>
              <SelectItem value="drinks">Drinks</SelectItem>
              <SelectItem value="shopping">Shopping</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="time">Time</Label>
          <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Add Expense
      </Button>
    </form>
  )
}

