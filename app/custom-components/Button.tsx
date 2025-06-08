import { useEffect, useRef, useState } from "react"
import { Plane } from "lucide-react"

export default function Button() {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [planePosition, setPlanePosition] = useState(0)
  const animationRef = useRef() as any
  const districtName = "Manhattan" // You can change this to any district name

  useEffect(() => {
    if (isHovered) {
      let startTime: number
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime

        // Calculate position based on time (complete one rotation every 2 seconds)
        const position = (elapsed % 2000) / 2000
        setPlanePosition(position)

        animationRef.current = requestAnimationFrame(animate)
      }

      animationRef.current = requestAnimationFrame(animate)
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovered])

  // Calculate plane position around the button
  const getPlanePosition = () => {
    const radius = 80 // Distance from button center
    const angle = planePosition * 2 * Math.PI

    // Calculate rotation angle for the plane (tangent to the circle)
    const rotationAngle = (angle + Math.PI / 2) * (180 / Math.PI)

    return {
      left: `calc(50% + ${Math.cos(angle) * radius}px)`,
      top: `calc(50% + ${Math.sin(angle) * radius}px)`,
      transform: `translate(-50%, -50%) rotate(${rotationAngle}deg)`,
    }
  }

  return (
    <div className="flex items-center justify-center p-24 bg-gray-100 rounded-lg relative">
      {/* Airplane */}
      {isHovered && (
        <div
          className="absolute transition-all duration-100 ease-linear"
          style={getPlanePosition()}
        >
          <Plane size={24} className="text-blue-600" />
        </div>
      )}

      {/* Button */}
      <button
        className={`
          relative
          px-8 py-4
          font-medium text-white
          bg-blue-500
          rounded-md
          overflow-hidden
          transition-all duration-300 ease-in-out
          transform ${isPressed ? "scale-95" : "hover:scale-105"}
          shadow-md hover:shadow-lg
          focus:outline-none
          z-10
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setIsPressed(false)
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      >
        <span className="relative z-10 flex items-center">
          <Plane size={16} className="mr-2" />
          Visit {districtName}
        </span>
        <div
          className={`
          absolute inset-0 
          bg-blue-400 
          transform origin-center 
          transition-opacity duration-300 ease-out 
          opacity-0 hover:opacity-20
          rounded-md
        `}
        ></div>
      </button>
    </div>
  )
}
