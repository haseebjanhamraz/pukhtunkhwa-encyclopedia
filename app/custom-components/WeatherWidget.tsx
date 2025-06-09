import { useState } from 'react'
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, Eye, CloudSnow, CloudLightning } from "lucide-react"

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

interface WeatherWidgetProps {
    weather: WeatherData
}

export default function WeatherWidget({ weather }: WeatherWidgetProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    const getWeatherIcon = (main: string, iconCode?: string) => {
        const isNight = iconCode?.includes('n')

        switch (main?.toLowerCase()) {
            case 'clear':
                return isNight ?
                    <div className="relative"><Sun className="w-8 h-8 text-blue-200" /><div className="absolute inset-0 w-4 h-4 bg-gray-800 rounded-full top-10 left-1"></div></div> :
                    <Sun className="w-8 h-8 text-yellow-400" />
            case 'clouds':
                return <Cloud className="w-8 h-8 text-gray-400" />
            case 'rain':
            case 'drizzle':
                return <CloudRain className="w-8 h-8 text-blue-400" />
            case 'snow':
                return <CloudSnow className="w-8 h-8 text-blue-200" />
            case 'thunderstorm':
                return <CloudLightning className="w-8 h-8 text-purple-400" />
            case 'mist':
            case 'fog':
            case 'haze':
                return <Cloud className="w-8 h-8 text-gray-300" />
            default:
                return <Cloud className="w-8 h-8 text-gray-400" />
        }
    }

    return (
        <div className={`fixed top-20 right-4 z-50 transition-all duration-500 ${isExpanded ? 'w-96' : 'w-80'}`}>
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-600/50 overflow-hidden">
                {/* Widget Header */}
                <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {getWeatherIcon(weather.weather[0].main, weather.weather[0].icon)}
                            <div>
                                <div className="text-2xl font-bold">{Math.round(weather.main.temp)}°C</div>
                                <div className="text-sm opacity-90 capitalize">{weather.weather[0].description}</div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <svg
                                className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Expanded Content */}
                <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="p-4 space-y-4">
                        {/* Current Weather Details */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <Thermometer className="w-4 h-4 text-orange-500" />
                                <div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Feels like</div>
                                    <div className="font-semibold text-gray-800 dark:text-white">{Math.round(weather.main.feels_like)}°C</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <Droplets className="w-4 h-4 text-blue-500" />
                                <div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Humidity</div>
                                    <div className="font-semibold text-gray-800 dark:text-white">{weather.main.humidity}%</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <Wind className="w-4 h-4 text-green-500" />
                                <div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Wind</div>
                                    <div className="font-semibold text-gray-800 dark:text-white">{weather.wind.speed} m/s</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <Eye className="w-4 h-4 text-purple-500" />
                                <div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Visibility</div>
                                    <div className="font-semibold text-gray-800 dark:text-white">{(weather.visibility / 1000).toFixed(1)} km</div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Weather Info */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <Cloud className="w-4 h-4 text-gray-500" />
                                <div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Cloudiness</div>
                                    <div className="font-semibold text-gray-800 dark:text-white">{weather.clouds.all}%</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="w-4 h-4 text-indigo-500 font-bold text-sm">P</div>
                                <div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Pressure</div>
                                    <div className="font-semibold text-gray-800 dark:text-white">{weather.main.pressure} hPa</div>
                                </div>
                            </div>
                        </div>

                        {/* Temperature Range */}
                        <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Min Temp</div>
                                    <div className="font-semibold text-gray-800 dark:text-white">{Math.round(weather.main.temp_min)}°C</div>
                                </div>
                                <div className="h-8 w-px bg-gray-300 dark:bg-gray-600"></div>
                                <div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Max Temp</div>
                                    <div className="font-semibold text-gray-800 dark:text-white">{Math.round(weather.main.temp_max)}°C</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Compact View */}
                {!isExpanded && (
                    <div className="p-4">
                        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center space-x-2">
                                <Thermometer className="w-4 h-4" />
                                <span>Feels {Math.round(weather.main.feels_like)}°C</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Droplets className="w-4 h-4" />
                                <span>{weather.main.humidity}%</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Wind className="w-4 h-4" />
                                <span>{weather.wind.speed} m/s</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Cloud className="w-4 h-4" />
                                <span>{weather.clouds.all}% clouds</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
} 