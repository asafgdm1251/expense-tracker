"use client"

import { useState, useEffect } from "react"
import { Menu, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Trip } from "../types/expense"
import type React from "react" // Added import for React

interface LayoutProps {
  children: React.ReactNode
  selectedTripId: string | null
  onSelectTrip: (tripId: string) => void
  onAddTripClick: () => void
}

export default function Layout({ children, selectedTripId, onSelectTrip, onAddTripClick }: LayoutProps) {
  const [trips, setTrips] = useState<Trip[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const loadTrips = () => {
      const storedTrips = Object.entries(localStorage)
        .filter(([key]) => key.startsWith("trip-"))
        .map(([_, value]) => JSON.parse(value))
      setTrips(storedTrips)
    }

    loadTrips()

    window.addEventListener("storage", loadTrips)
    return () => window.removeEventListener("storage", loadTrips)
  }, [])

  const handleTripSelect = (tripId: string) => {
    onSelectTrip(tripId)
    setIsOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="flex items-center h-16 px-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
              <SheetHeader className="p-4 border-b">
                <SheetTitle>Your Trips</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-8rem)]">
                <div className="flex flex-col gap-1 p-2">
                  {trips.map((trip) => (
                    <Button
                      key={trip.id}
                      variant={selectedTripId === trip.id ? "secondary" : "ghost"}
                      className="justify-start"
                      onClick={() => handleTripSelect(trip.id)}
                    >
                      {trip.name}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <Button
                  onClick={() => {
                    onAddTripClick()
                    setIsOpen(false)
                  }}
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Trip
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex-1 flex items-center justify-between">
            <h1 className="text-lg font-semibold">
              {selectedTripId ? trips.find((t) => t.id === selectedTripId)?.name : "Expense Tracker"}
            </h1>
          </div>
        </div>
      </header>
      <main className="container max-w-md mx-auto p-4">{children}</main>
    </div>
  )
}

