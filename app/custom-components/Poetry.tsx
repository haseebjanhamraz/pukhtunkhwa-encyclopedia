"use client"

import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Music } from "lucide-react"

import usePoetry from "@/app/hooks/usePoetry"

const Poetry = () => {
  const { poetry } = usePoetry()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined
    if (isPlaying) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % poetry.length)
      }, 5000)
    }

    return () => clearInterval(intervalId)
  }, [poetry.length, isPlaying])

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % poetry.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? poetry.length - 1 : prevIndex - 1
    )
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {/* Background Image */}
        <motion.div
          key={`bg-${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={poetry[currentIndex]?.backgroundImg || "/tapa-placeholder.jpg"}
            alt="Background"
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        </motion.div>

        {/* Couplet Content */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4"
        >
          <p className="text-2xl md:text-4xl destar text-white mb-4 rtl:text-right drop-shadow-lg">
            {poetry[currentIndex]?.verse[0]}
          </p>
          <p className="text-2xl md:text-4xl destar text-white mb-4 rtl:text-right drop-shadow-lg">
            {poetry[currentIndex]?.verse[1]}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4 z-20">
        <button
          onClick={handlePrev}
          className="bg-white/30 hover:bg-white/50 rounded-full p-2 md:p-3 transition-all duration-300 ease-in-out"
        >
          <ChevronLeft className="text-white" size={24} />
        </button>
        <button
          onClick={handleNext}
          className="bg-white/30 hover:bg-white/50 rounded-full p-2 md:p-3 transition-all duration-300 ease-in-out"
        >
          <ChevronRight className="text-white" size={24} />
        </button>
      </div>

      {/* Pagination and Play/Pause */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center space-x-4 z-20">
        <div className="flex space-x-2">
          {poetry.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white w-6" : "bg-white/50"
              }`}
            />
          ))}
        </div>
        <button
          onClick={togglePlay}
          className="bg-white/30 hover:bg-white/50 rounded-full p-2 transition-all duration-300 ease-in-out"
        >
          <Music
            className={`text-white ${isPlaying ? "animate-pulse" : ""}`}
            size={20}
            fill={isPlaying ? "white" : "none"}
          />
        </button>
      </div>
    </div>
  )
}

export default Poetry
