"use client"

import { useState } from "react"
import ThanksgivingSetup from "@/components/thanksgiving-setup"
import ChatInterface from "@/components/chat-interface"

export default function Home() {
  const [hasSetup, setHasSetup] = useState(false)
  const [familyCount, setFamilyCount] = useState(0)
  const [chaosLevel, setChaosLevel] = useState("")

  const handleSetupComplete = (count: number, chaos: string) => {
    setFamilyCount(count)
    setChaosLevel(chaos)
    setHasSetup(true)
  }

  const handleReset = () => {
    setHasSetup(false)
    setFamilyCount(0)
    setChaosLevel("")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fff5e6] to-[#ffe8cc]">
      {!hasSetup ? (
        <ThanksgivingSetup onSetupComplete={handleSetupComplete} />
      ) : (
        <ChatInterface familyCount={familyCount} chaosLevel={chaosLevel} onReset={handleReset} />
      )}
    </main>
  )
}
