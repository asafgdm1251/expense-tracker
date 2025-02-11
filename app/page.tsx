"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Layout from "./components/Layout"
import AddTripForm from "./components/AddTripForm"
import TripView from "./components/TripView"
import ExpenseForm from "./components/ExpenseForm"
import TripSelector from "./components/TripSelector"

export default function Home() {
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null)
  const [isAddTripOpen, setIsAddTripOpen] = useState(false)

  const handleAddTripSuccess = (tripId: string) => {
    setIsAddTripOpen(false)
    setSelectedTripId(tripId)
  }

  return (
    <>
      <Layout
        selectedTripId={selectedTripId}
        onSelectTrip={setSelectedTripId}
        onAddTripClick={() => setIsAddTripOpen(true)}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <TripSelector selectedTripId={selectedTripId} onSelectTrip={setSelectedTripId} />
            <Button onClick={() => setIsAddTripOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Trip
            </Button>
          </div>

          {selectedTripId ? (
            <div className="space-y-6">
              <ExpenseForm tripId={selectedTripId} />
              <TripView tripId={selectedTripId} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
              <h2 className="text-xl font-semibold">Welcome to Expense Tracker</h2>
              <p className="text-muted-foreground">
                Select a trip from the dropdown or create a new one to start tracking expenses.
              </p>
            </div>
          )}
        </div>
      </Layout>

      <Dialog open={isAddTripOpen} onOpenChange={setIsAddTripOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Trip</DialogTitle>
          </DialogHeader>
          <AddTripForm onSuccess={handleAddTripSuccess} />
        </DialogContent>
      </Dialog>
    </>
  )
}

