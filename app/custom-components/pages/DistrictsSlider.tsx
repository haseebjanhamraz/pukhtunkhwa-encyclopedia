import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Star, Users, Calendar } from 'lucide-react';
import useDistricts from '@/app/hooks/useDistricts';
import Link from 'next/link';
import Image from 'next/image';

const DistrictsSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [animateIn, setAnimateIn] = useState(false);
    const [viewportWidth, setViewportWidth] = useState(0);
    const sliderRef = useRef(null);
    const { districts } = useDistricts();

    // Responsive breakpoints and items per view
    const getItemsPerView = () => {
        if (viewportWidth < 640) return 1; // Mobile
        if (viewportWidth < 768) return 1.5; // Small tablets
        if (viewportWidth < 1024) return 2.5; // Tablets
        if (viewportWidth < 1280) return 3.5; // Small desktop
        return 4; // Large desktop
    };

    const itemsPerView = 8
    const maxIndex = Math.max(0, Math.ceil(districts.length - itemsPerView));

    // Handle viewport resize
    useEffect(() => {
        const handleResize = () => {
            setViewportWidth(window.innerWidth);
        };

        // Set initial width
        setViewportWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Initialize animation
    useEffect(() => {
        setAnimateIn(true);
    }, []);

    // Reset current index when viewport changes to prevent overflow
    useEffect(() => {
        if (currentIndex > maxIndex) {
            setCurrentIndex(0);
        }
    }, [maxIndex, currentIndex]);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying || isDragging) return;

        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, maxIndex, isDragging]);

    // Touch/Mouse drag handlers
    const handleStart = (clientX: number) => {
        setIsDragging(true);
        setStartX(clientX);
        setIsAutoPlaying(false);
    };

    const handleMove = (clientX: number) => {
        if (!isDragging) return;
        const diff = clientX - startX;
        setTranslateX(diff);
    };

    const handleEnd = () => {
        if (!isDragging) return;

        const threshold = 100;
        if (translateX > threshold && currentIndex > 0) {
            goToPrevious();
        } else if (translateX < -threshold && currentIndex < maxIndex) {
            goToNext();
        }

        setIsDragging(false);
        setTranslateX(0);
        setTimeout(() => setIsAutoPlaying(true), 3000);
    };

    const goToNext = () => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    };

    const goToPrevious = () => {
        setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 3000);
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
            {/* Animated Header */}
            <div className={`text-center mb-6 sm:mb-8 transition-all duration-1000 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Explore Districts
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                    Discover the diverse districts with their unique culture, history, and attractions
                </p>

                {/* Live counter */}
                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm">
                    <div className="flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-3 sm:px-4 py-2 rounded-full">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-blue-700 dark:text-blue-300">
                            {districts.length} Districts Available
                        </span>
                    </div>
                    <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 px-3 sm:px-4 py-2 rounded-full">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
                        <span className="text-green-700 dark:text-green-300">
                            Active Exploration
                        </span>
                    </div>
                </div>
            </div>

            {/* Slider Container */}
            <div
                ref={sliderRef}
                className={`relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-3 sm:p-6 shadow-lg sm:shadow-2xl transition-all duration-1000 ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                onMouseDown={(e) => handleStart(e.clientX)}
                onMouseMove={(e) => handleMove(e.clientX)}
                onMouseUp={handleEnd}
                onTouchStart={(e) => handleStart(e.touches[0].clientX)}
                onTouchMove={(e) => handleMove(e.touches[0].clientX)}
                onTouchEnd={handleEnd}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >

                {/* Fade effect for partial visibility - hidden on mobile */}
                <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-gray-100 dark:from-gray-900 to-transparent z-10 pointer-events-none hidden sm:block" />

                {/* Progress bar */}
                <div className="absolute top-1 sm:top-2 left-3 sm:left-6 right-3 sm:right-6 h-0.5 sm:h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                        style={{ width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%` }}
                    />
                </div>

                {/* Districts Grid */}
                <div
                    className="flex transition-all duration-500 ease-out gap-3 sm:gap-6 mt-4 sm:mt-6"
                    style={{
                        transform: `translateX(calc(-${currentIndex * (100 / itemsPerView)}% + ${translateX}px))`,
                        width: `${(districts.length * 100) / itemsPerView}%`
                    }}
                >
                    {districts.map((district) => (
                        <div
                            key={district._id}
                            className="flex-shrink-0"
                            style={{
                                width: `${100 / itemsPerView}%`,
                                minWidth: viewportWidth < 640 ? '280px' : '300px'
                            }}
                            onMouseEnter={() => setHoveredCard(district._id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div className={`group cursor-pointer bg-white dark:bg-gray-700 rounded-lg sm:rounded-xl shadow-md hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-3 overflow-hidden border-2 ${hoveredCard === district._id ? 'border-blue-400 dark:border-blue-500 scale-102 sm:scale-105' : 'border-transparent hover:border-blue-200 dark:hover:border-blue-800'}`}>
                                {/* Image Container - Fixed 300px height */}
                                <div className="relative overflow-hidden" style={{ height: '300px' }}>
                                    <Image
                                        src={district.image}
                                        alt={district.name}
                                        className={`w-full h-full object-cover transition-all duration-700 ${hoveredCard === district._id ? 'scale-110 rotate-2' : 'group-hover:scale-105'}`}
                                        width={300}
                                        height={300}
                                    />

                                    {/* Animated overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-500 ${hoveredCard === district._id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                                </div>

                                {/* Content with enhanced animations */}
                                <div className="p-4 sm:p-6 relative">
                                    <h3 className={`text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 transition-all duration-300 ${hoveredCard === district._id ? 'text-blue-600 dark:text-blue-400 transform -translate-y-1' : 'group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
                                        {district.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                                        {district.description}
                                    </p>

                                    {/* Interactive explore button */}
                                    <div className={`flex items-center justify-between transition-all duration-300 ${hoveredCard === district._id ? 'transform translate-y-0 opacity-100' : 'transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}`}>
                                        <Link href={`/districts/${district._id}`}>
                                            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                                Explore District
                                            </button>
                                        </Link>
                                        <div className="text-blue-600 dark:text-blue-400 font-semibold">
                                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Enhanced Navigation Buttons */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 rounded-full p-2 sm:p-4 shadow-lg sm:shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl group border border-gray-200 dark:border-gray-600"
                    aria-label="Previous districts"
                >
                    <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors group-hover:animate-pulse" />
                </button>

                <button
                    onClick={goToNext}
                    className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 rounded-full p-2 sm:p-4 shadow-lg sm:shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl group border border-gray-200 dark:border-gray-600"
                    aria-label="Next districts"
                >
                    <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors group-hover:animate-pulse" />
                </button>
            </div>

            {/* Enhanced Pagination Dots */}
            <div className="flex justify-center mt-4 sm:mt-6 space-x-1 sm:space-x-2">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`relative transition-all duration-300 ${index === currentIndex
                            ? 'w-6 sm:w-8 h-2 sm:h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full scale-110 sm:scale-125'
                            : 'w-2 sm:w-3 h-2 sm:h-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 rounded-full hover:scale-110'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        {index === currentIndex && (
                            <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse" />
                        )}
                    </button>
                ))}
            </div>

            {/* Enhanced Status Indicators */}
            <div className="flex flex-col sm:flex-row justify-center items-center mt-3 sm:mt-4 space-y-2 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isAutoPlaying ? 'bg-green-500 animate-pulse scale-125' : 'bg-gray-400'}`} />
                    <span className="font-medium">{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                    <span className="font-medium">Slide {currentIndex + 1} of {maxIndex + 1}</span>
                </div>
                {isDragging && (
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-blue-600 dark:text-blue-400">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                        <span className="font-medium">Dragging...</span>
                    </div>
                )}
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                .scale-102 {
                    transform: scale(1.02);
                }
            `}</style>
        </div>
    );
};

export default DistrictsSlider;