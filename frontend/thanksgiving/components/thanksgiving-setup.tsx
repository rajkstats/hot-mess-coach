"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ThanksgivingSetupProps {
  onSetupComplete: (familyCount: number, chaosLevel: string) => void
}

export default function ThanksgivingSetup({ onSetupComplete }: ThanksgivingSetupProps) {
  const [step, setStep] = useState(0)
  const [familyCount, setFamilyCount] = useState("")
  const [chaosLevel, setChaosLevel] = useState("")

  const familyOptions = [
    { value: "5-10", label: "🎭 5-10 (Small but mighty)" },
    { value: "11-20", label: "👨‍👩‍👧‍👦 11-20 (Getting spicy)" },
    { value: "21-30", label: "🌪️ 21-30 (Absolute chaos)" },
    { value: "30+", label: "🔥 30+ (God help you)" },
  ]

  const chaosOptions = [
    { value: "zen", label: "☮️ Zen Mode (Yeah right, but let's pretend)" },
    { value: "medium", label: "😅 It's Tuesday (Normal hot mess)" },
    { value: "chaotic", label: "🚨 DEFCON 1 (Everything is fine)" },
  ]

  const handleFamilySelect = (value: string) => {
    setFamilyCount(value)
    setStep(1)
  }

  const handleChaosSelect = (value: string) => {
    setChaosLevel(value)
    onSetupComplete(Number.parseInt(familyCount.split("-")[0]), value)
  }

  const handleBack = () => {
    setStep(0)
    setFamilyCount("")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl">
        {/* Upset Turkey */}
        <div className="flex justify-center mb-8">
          <div className="text-8xl animate-bounce">🦃</div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#d4601d] mb-2 text-pretty">🎉 HotMessCoach</h1>
          <h2 className="text-3xl font-bold text-[#a0471f] mb-4 text-pretty">Thanksgiving Survival Guide</h2>
          <p className="text-lg text-[#8b3a1a] text-pretty">Because family dinners are basically organized chaos</p>
        </div>

        {/* Step 1: Family Count */}
        {step === 0 && (
          <div className="bg-white rounded-3xl shadow-2xl p-10 border-4 border-[#d4601d]">
            <h3 className="text-2xl font-bold text-[#a0471f] mb-6 text-pretty">
              How many family members are descending upon your home?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {familyOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFamilySelect(option.value)}
                  className="p-6 rounded-2xl bg-gradient-to-br from-[#fff5e6] to-[#ffd9a8] hover:from-[#ffd9a8] hover:to-[#ffb366] border-2 border-[#d4601d] transition-all duration-300 hover:scale-105 text-lg font-semibold text-[#8b3a1a]"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Chaos Level */}
        {step === 1 && (
          <div className="bg-white rounded-3xl shadow-2xl p-10 border-4 border-[#d4601d]">
            <h3 className="text-2xl font-bold text-[#a0471f] mb-2 text-pretty">Choose your chaos level</h3>
            <p className="text-[#8b3a1a] mb-8 text-pretty">({familyCount} people incoming!)</p>
            <div className="space-y-4 mb-8">
              {chaosOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleChaosSelect(option.value)}
                  className="w-full p-6 rounded-2xl bg-gradient-to-br from-[#fff5e6] to-[#ffd9a8] hover:from-[#ffd9a8] hover:to-[#ffb366] border-2 border-[#d4601d] transition-all duration-300 hover:scale-105 text-lg font-semibold text-[#8b3a1a] text-left"
                >
                  {option.label}
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={handleBack}
              className="w-full border-2 border-[#d4601d] text-[#8b3a1a] hover:bg-[#fff5e6] bg-transparent"
            >
              ← Go Back
            </Button>
          </div>
        )}

        {/* Angry Turkey Footer */}
        <div className="text-center mt-12">
          <div className="text-6xl">🦃😤</div>
          <p className="text-[#8b3a1a] mt-2 italic text-pretty">"Let's get this party started..."</p>
        </div>
      </div>
    </div>
  )
}
