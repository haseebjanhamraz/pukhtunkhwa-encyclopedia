"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Clock, MapPin, Users, Square, Calendar } from "lucide-react"
import WeatherWidget from "@/app/custom-components/WeatherWidget"
import DistrictsSlider from "@/app/custom-components/pages/DistrictsSlider"

interface District {
    _id: string
    name: string
    image: string
    coordinates: number[]
    population: number
    area: number
    description: string
    history: string
    attractions: string[]
    funFacts: string[]
    mustVisit: boolean
}

interface WeatherData {
    coord: {
        lon: number
        lat: number
    }
    weather: Array<{
        id: number
        main: string
        description: string
        icon: string
    }>
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        humidity: number
        sea_level?: number
        grnd_level?: number
    }
    visibility: number
    wind: {
        speed: number
        deg: number
        gust?: number
    }
    clouds: {
        all: number
    }
    dt: number
    sys: {
        country: string
        sunrise: number
        sunset: number
    }
    timezone: number
    id: number
    name: string
    cod: number
}
function DistrictPageComp() {
    const params = useParams()
    const [district, setDistrict] = useState<District | null>(null)
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [currentTime, setCurrentTime] = useState(new Date())
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const fetchDistrict = async () => {
            try {
                const response = await fetch(`/api/districts/${params.id}`)
                if (!response.ok) throw new Error('Failed to fetch district')
                const data = await response.json()
                setDistrict(data)
                setLoading(false)
                setIsVisible(true)

                // Fetch weather data using the new API
                fetchWeather(params.id as string)
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred")
                setLoading(false)
            }
        }

        fetchDistrict()
    }, [params.id])

    const fetchWeather = async (districtId: string) => {
        try {
            const response = await fetch(`/api/weather/${districtId}`)
            if (!response.ok) throw new Error('Failed to fetch weather')
            const weatherData = await response.json()
            setWeather(weatherData)
        } catch (error) {
            console.error("Weather fetch error:", error)
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const getWeatherEffect = () => {
        if (!weather || !weather.weather.length) return ''

        const mainWeather = weather.weather[0].main.toLowerCase()
        const cloudiness = weather.clouds.all

        let effects = []

        // Base weather effects
        switch (mainWeather) {
            case 'rain':
            case 'drizzle':
                effects.push('rain-effect')
                break
            case 'snow':
                effects.push('snow-effect')
                break
            case 'thunderstorm':
                effects.push('storm-effect')
                break
            case 'mist':
            case 'fog':
            case 'haze':
                effects.push('fog-effect')
                break
        }

        // Cloud overlay based on cloudiness
        if (cloudiness > 75) {
            effects.push('heavy-clouds')
        } else if (cloudiness > 50) {
            effects.push('moderate-clouds')
        } else if (cloudiness > 25) {
            effects.push('light-clouds')
        }

        return effects.join(' ')
    }

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        })
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xl font-medium text-gray-700 dark:text-gray-300 animate-pulse">
                        Loading district information...
                    </p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
                <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md mx-4">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">⚠️</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Error</h2>
                    <p className="text-gray-600 dark:text-gray-300">{error}</p>
                </div>
            </div>
        )
    }

    if (!district) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
                <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md mx-4">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-8 h-8 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">District Not Found</h2>
                    <p className="text-gray-600 dark:text-gray-300">The requested district could not be found.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Weather Effects Styles */}
            <style jsx>{`
        .rain-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(173, 216, 230, 0.3) 2px,
            rgba(173, 216, 230, 0.3) 4px
          );
          animation: rain 0.5s linear infinite;
          pointer-events: none;
          z-index: 2;
        }
        
        .snow-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(2px 2px at 20px 30px, white, transparent),
                            radial-gradient(2px 2px at 40px 70px, white, transparent),
                            radial-gradient(1px 1px at 90px 40px, white, transparent),
                            radial-gradient(1px 1px at 130px 80px, white, transparent),
                            radial-gradient(2px 2px at 160px 30px, white, transparent);
          background-repeat: repeat;
          background-size: 200px 100px;
          animation: snow 3s linear infinite;
          pointer-events: none;
          z-index: 2;
        }
        
        .storm-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          animation: lightning 2s infinite;
          pointer-events: none;
          z-index: 2;
        }
        
        .fog-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(200, 200, 200, 0.4);
          backdrop-filter: blur(2px);
          pointer-events: none;
          z-index: 2;
        }
        
        .heavy-clouds::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(100, 100, 100, 0.4);
          pointer-events: none;
          z-index: 1;
        }
        
        .moderate-clouds::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(150, 150, 150, 0.3);
          pointer-events: none;
          z-index: 1;
        }
        
        .light-clouds::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(200, 200, 200, 0.2);
          pointer-events: none;
          z-index: 1;
        }
        
        @keyframes rain {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes snow {
          0% { transform: translateY(-100px); }
          100% { transform: translateY(100vh); }
        }
        
        @keyframes lightning {
          0%, 90%, 100% { background: rgba(0, 0, 0, 0.3); }
          5%, 15% { background: rgba(255, 255, 255, 0.8); }
        }
      `}</style>

            {/* Hero Section */}
            <div className="relative h-screen flex items-center justify-center overflow-hidden">
                <div
                    className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${getWeatherEffect()}`}
                    style={{ backgroundImage: `url(${district.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Floating particles animation */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${3 + Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>
                {/* Weather Widget */}

                {weather && <WeatherWidget weather={weather} />}

                {/* Time Widget */}
                <div className={`absolute top-8 left-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white shadow-2xl border border-white/20 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
                    <div className="flex items-center space-x-3 mb-2">
                        <Clock className="w-5 h-5" />
                        <div className="text-2xl font-mono font-bold">{formatTime(currentTime)}</div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm opacity-80">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(currentTime)}</span>
                    </div>
                </div>

                {/* Main Title */}
                <div className={`text-center z-10 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
                    <h1 className="text-7xl md:text-8xl font-bold text-white mb-4 drop-shadow-2xl">
                        {district.name}
                    </h1>
                    <div className="flex items-center justify-center space-x-2 text-white/80 text-xl">
                        <MapPin className="w-6 h-6" />
                        <span>{district.coordinates.join(", ")}</span>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-6 py-16">
                {/* Stats Cards */}
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-800 dark:text-white">
                                    {district.population.toLocaleString()}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400">Population</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
                                <Square className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-800 dark:text-white">
                                    {district.area.toLocaleString()}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400">km² Area</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                                <MapPin className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <div className="text-lg font-bold text-gray-800 dark:text-white">
                                    {district.coordinates[0].toFixed(2)}, {district.coordinates[1].toFixed(2)}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400">Coordinates</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About & History */}
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-4"></div>
                            About
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                            {district.description}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                            <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full mr-4"></div>
                            History
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                            {district.history}
                        </p>
                    </div>
                </div>

                {/* Attractions & Fun Facts */}
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 transform transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                            <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-teal-600 rounded-full mr-4"></div>
                            Tourist Attractions
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {district.attractions.map((attraction, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {attraction}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                            Fun Facts
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {district.funFacts.map((fact, index) => (
                                <span key={index} className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {fact}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <DistrictsSlider />
            </div>
        </div>
    )
}

export default DistrictPageComp;