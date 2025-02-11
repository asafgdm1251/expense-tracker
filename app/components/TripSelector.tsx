"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Trip } from "../types/expense"

interface TripSelectorProps {
  selectedTripId: string | null
  onSelectTrip: (tripId: string) => void
}

export default function TripSelector({ selectedTripId, onSelectTrip }: TripSelectorProps) {
  const [trips, setTrips] = useState<Trip[]>([])

  useEffect(() => {
    // Load trips from localStorage
    const storedTrips = Object.entries(localStorage)
      .filter(([key]) => key.startsWith("trip-"))
      .map(([_, value]) => JSON.parse(value))
    setTrips(storedTrips)
  }, [])

  const selectedTrip = trips.find((trip) => trip.id === selectedTripId)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {selectedTrip ? selectedTrip.name : "Select a trip"}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        {trips.map((trip) => (
          <DropdownMenuItem key={trip.id} onSelect={() => onSelectTrip(trip.id)}>
            {trip.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

