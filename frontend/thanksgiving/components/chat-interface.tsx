"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon } from "lucide-react"

interface ChatInterfaceProps {
  familyCount: number
  chaosLevel: string
  onReset: () => void
}

interface Message {
  id: string
  text: string
  sender: "user" | "coach"
  timestamp: Date
}

export default function ChatInterface({ familyCount, chaosLevel, onReset }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize with coach greeting
  useEffect(() => {
    if (!hasInitialized) {
      const chaosEmoji = chaosLevel === "zen" ? "☮️" : chaosLevel === "medium" ? "😅" : "🚨"
      const greeting = `${chaosEmoji} Hey there, chaos coordinator! Welcome to the hot mess. I see you've got ${familyCount} family members coming and we're operating at ${chaosLevel} chaos level. Don't worry – I've survived worse (probably). What's the first crisis we need to tackle?`

      setMessages([
        {
          id: "1",
          text: greeting,
          sender: "coach",
          timestamp: new Date(),
        },
      ])
      setHasInitialized(true)
    }
  }, [hasInitialized, chaosLevel, familyCount])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Call the backend API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `[${familyCount} family members, ${chaosLevel} chaos] ${input}`,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from coach")
      }

      const data = await response.json()
      const coachMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply,
        sender: "coach",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, coachMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "🦃 Oh no! The turkey got loose and unplugged the WiFi. Try again!",
        sender: "coach",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#fff5e6] to-[#ffe8cc]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#d4601d] to-[#a0471f] text-white p-6 shadow-lg">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🦃</span>
            <div>
              <h1 className="text-2xl font-bold">HotMessCoach</h1>
              <p className="text-sm opacity-90">Your Thanksgiving Survival Buddy</p>
            </div>
          </div>
          <button
            onClick={onReset}
            className="px-4 py-2 bg-white text-[#a0471f] rounded-lg font-semibold hover:bg-[#fff5e6] transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto w-full">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg px-6 py-4 rounded-3xl ${
                  message.sender === "user"
                    ? "bg-[#d4601d] text-white rounded-br-none"
                    : "bg-white text-[#8b3a1a] rounded-bl-none border-2 border-[#d4601d]"
                }`}
              >
                <p className="text-sm md:text-base">{message.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-[#8b3a1a] rounded-3xl rounded-bl-none border-2 border-[#d4601d] px-6 py-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-[#d4601d] rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-[#d4601d] rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-[#d4601d] rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t-4 border-[#d4601d] p-6">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tell the coach about your Thanksgiving chaos..."
            className="flex-1 px-6 py-3 border-2 border-[#d4601d] rounded-full focus:outline-none focus:ring-2 focus:ring-[#a0471f] text-[#8b3a1a] placeholder-[#c9a88a]"
            disabled={isLoading}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="border-2 border-[#d4601d] text-[#d4601d] hover:bg-[#fff5e6] rounded-full w-12 h-12 flex items-center justify-center bg-transparent"
          >
            <ArrowUpIcon className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-center text-sm text-[#8b3a1a] mt-3 italic">
          🦃 Type your question and let the chaos commence!
        </p>
      </div>
    </div>
  )
}
