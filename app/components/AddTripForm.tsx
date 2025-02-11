"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Trip } from "../types/expense"
import { v4 as uuidv4 } from "uuid"

interface AddTripFormProps {
  onSuccess?: (tripId: string) => void
}

export default function AddTripForm({ onSuccess }: AddTripFormProps) {
  const [name, setName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [currency, setCurrency] = useState("USD")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const tripId = uuidv4()
    const trip: Trip = {
      id: tripId,
      name,
      startDate,
      endDate,
      currency,
    }
    localStorage.setItem(`trip-${trip.id}`, JSON.stringify(trip))

    // Trigger a storage event to refresh the trip list
    window.dispatchEvent(new Event("storage"))

    setName("")
    setStartDate("")
    setEndDate("")
    setCurrency("USD")

    onSuccess?.(tripId)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Trip Name</Label>
        <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="startDate">Start Date</Label>
        <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="endDate">End Date</Label>
        <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="currency">Currency</Label>
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger>
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
            <SelectItem value="SGD">SGD</SelectItem>
            <SelectItem value="GBP">GBP</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">
        Add Trip
      </Button>
    </form>
  )
}

