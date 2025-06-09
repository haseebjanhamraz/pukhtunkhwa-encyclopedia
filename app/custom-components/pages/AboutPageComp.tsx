"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Mountain, Users, GraduationCap, MapPin, TrendingUp, Building, Heart, ChevronDown, Star, Globe, Calendar, Award, Play, Pause, ArrowRight, Eye, MousePointer, Zap, Sun, Moon } from 'lucide-react';
import { useTheme } from "next-themes"

const AboutPageComp = () => {
    const [activeSection, setActiveSection] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredStat, setHoveredStat] = useState<number | null>(null);
    const [scrollY, setScrollY] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Handle hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        setIsVisible(true);

        // Mouse tracking
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        // Scroll tracking
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        // Intersection Observer for animations
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleElements(prev => new Set([...prev, entry.target.id]));
                    }
                });
            },
            { threshold: 0.1 }
        );

        // Observe all animated elements
        document.querySelectorAll('[data-animate]').forEach((el) => {
            if (observerRef.current) observerRef.current.observe(el);
        });

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, [mounted]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
        return null;
    }

    const stats = [
        {
            icon: Users,
            label: "Population",
            value: "40M+",
            description: "Proud residents",
            detail: "Growing at 2.4% annually",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: MapPin,
            label: "Districts",
            value: "34",
            description: "Administrative units",
            detail: "Each with unique heritage",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: Mountain,
            label: "Peaks",
            value: "5000+",
            description: "Majestic mountains",
            detail: "Including K2 base camps",
            color: "from-purple-500 to-violet-500"
        },
        {
            icon: GraduationCap,
            label: "Universities",
            value: "50+",
            description: "Educational institutions",
            detail: "Fostering future leaders",
            color: "from-orange-500 to-red-500"
        }
    ];

    const features = [
        {
            icon: Mountain,
            title: "Tourism & Heritage",
            description: "Discover breathtaking landscapes, ancient Buddhist sites, and cultural treasures that make KP a unique destination.",
            gradient: "from-gray-800 to-gray-900 dark:from-gray-800 dark:to-gray-900",
            lightGradient: "from-gray-50 to-gray-100",
            highlights: ["Ancient Buddhist Sites", "Natural Landscapes", "Cultural Festivals"],
            buttonText: "Explore Tourism"
        },
        {
            icon: Users,
            title: "Demographics & Culture",
            description: "Explore population statistics, ethnic diversity, and the rich cultural tapestry of Pashtun traditions.",
            gradient: "from-gray-900 to-black dark:from-gray-900 dark:to-black",
            lightGradient: "from-gray-100 to-gray-200",
            highlights: ["Population Data", "Cultural Diversity", "Traditional Arts"],
            buttonText: "View Demographics"
        },
        {
            icon: GraduationCap,
            title: "Education & Development",
            description: "Track educational progress, literacy rates, and institutional growth across the province.",
            gradient: "from-black to-gray-800 dark:from-black dark:to-gray-800",
            lightGradient: "from-gray-200 to-gray-100",
            highlights: ["Literacy Statistics", "University Rankings", "Research Output"],
            buttonText: "Education Stats"
        },
        {
            icon: Building,
            title: "Political Insights",
            description: "Stay informed about governance, administrative divisions, and political developments in KP.",
            gradient: "from-gray-800 to-gray-900 dark:from-gray-800 dark:to-gray-900",
            lightGradient: "from-gray-100 to-gray-50",
            highlights: ["Government Structure", "Policy Updates", "Administrative Data"],
            buttonText: "Political Data"
        }
    ];

    const team = [
        {
            role: "Data Analysts",
            description: "Ensuring accuracy in all statistics",
            icon: TrendingUp,
            count: "12+ Experts"
        },
        {
            role: "Local Experts",
            description: "Providing authentic cultural insights",
            icon: Users,
            count: "25+ Contributors"
        },
        {
            role: "Researchers",
            description: "Continuously updating information",
            icon: Eye,
            count: "8+ Scholars"
        },
        {
            role: "Community",
            description: "Contributing local knowledge",
            icon: Heart,
            count: "500+ Members"
        }
    ];

    const toggleAnimation = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden relative transition-colors duration-500">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 opacity-10 pointer-events-none">
                <div
                    className="absolute w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                    style={{
                        left: `${20 + Math.sin(scrollY * 0.001) * 10}%`,
                        top: `${20 + Math.cos(scrollY * 0.001) * 5}%`,
                        transform: `scale(${isPlaying ? 1 + Math.sin(Date.now() * 0.002) * 0.1 : 1})`
                    }}
                ></div>
                <div
                    className="absolute w-24 h-24 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full transition-all duration-1000"
                    style={{
                        right: `${15 + Math.cos(scrollY * 0.002) * 8}%`,
                        top: `${30 + Math.sin(scrollY * 0.002) * 7}%`,
                        transform: `scale(${isPlaying ? 1 + Math.cos(Date.now() * 0.003) * 0.15 : 1})`
                    }}
                ></div>
                <div
                    className="absolute w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000"
                    style={{
                        left: `${25 + Math.sin(scrollY * 0.003) * 6}%`,
                        bottom: `${20 + Math.cos(scrollY * 0.003) * 4}%`,
                        transform: `scale(${isPlaying ? 1 + Math.sin(Date.now() * 0.004) * 0.2 : 1})`
                    }}
                ></div>
            </div>

            {/* Theme Toggle Button */}
            <button
                onClick={toggleTheme}
                className="fixed top-4 right-4 p-2 rounded-full bg-background border border-border hover:bg-accent transition-colors"
                aria-label="Toggle theme"
            >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Floating Mouse Cursor Effect */}
            <div
                className="fixed w-6 h-6 bg-gradient-to-r from-gray-400 to-gray-600 dark:from-white dark:to-gray-300 rounded-full pointer-events-none transition-all duration-300 z-50 opacity-20"
                style={{
                    left: mousePosition.x - 12,
                    top: mousePosition.y - 12,
                    transform: `scale(${hoveredStat !== null ? 2 : 1})`
                }}
            ></div>

            {/* Hero Section */}
            <section ref={heroRef} className="relative px-6 py-20 lg:px-12">
                <div className={`max-w-6xl mx-auto transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-muted/80 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-border hover:border-border/80 transition-all duration-300 cursor-pointer group">
                            <Globe className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                            <span className="text-sm text-muted-foreground">Your Gateway to Khyber Pakhtunkhwa</span>
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        </div>

                        <h1 className="text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent">
                            About <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Pukhtunkhwa</span>
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                            Your comprehensive digital companion for exploring the Land of the Brave. We bring together tourism, demographics, education, and political insights in one unified platform.
                        </p>

                        <div className="flex justify-center gap-4">
                            <button className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-primary-foreground">
                                Start Exploring
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="border border-border hover:border-border/80 px-8 py-4 rounded-xl font-semibold hover:bg-muted/50 transition-all duration-300 backdrop-blur-sm">
                                Watch Demo
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className={`relative bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border hover:border-border/80 transition-all duration-500 transform hover:scale-110 cursor-pointer group ${isVisible ? 'animate-fade-in' : ''}`}
                                style={{ animationDelay: `${index * 200}ms` }}
                                onMouseEnter={() => setHoveredStat(index)}
                                onMouseLeave={() => setHoveredStat(null)}
                            >
                                {/* Glow effect */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-500`}></div>

                                <stat.icon className={`w-8 h-8 mb-4 transition-all duration-500 ${hoveredStat === index ? 'text-foreground scale-110' : 'text-muted-foreground'}`} />
                                <div className={`text-3xl font-bold mb-2 transition-all duration-500 ${hoveredStat === index ? 'scale-110' : ''}`}>
                                    {stat.value}
                                </div>
                                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                                <div className="text-xs text-muted-foreground/80 mt-1">{stat.description}</div>

                                {/* Hidden detail that appears on hover */}
                                <div className={`mt-3 text-xs text-muted-foreground border-t border-border pt-2 transition-all duration-300 ${hoveredStat === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                                    {stat.detail}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Mission Statement */}
            <section className="px-6 py-16 lg:px-12" data-animate id="mission">
                <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${visibleElements.has('mission') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="bg-gradient-to-r from-gray-50/80 via-white/80 to-gray-50/80 dark:from-gray-900/80 dark:via-black/80 dark:to-gray-900/80 backdrop-blur-sm p-12 rounded-3xl border border-gray-200 dark:border-gray-800 relative overflow-hidden group hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900 dark:via-white to-transparent opacity-5 animate-pulse"></div>
                        <Heart className="w-12 h-12 mx-auto mb-6 text-red-400 group-hover:scale-110 transition-transform duration-500" />
                        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            To create the most comprehensive, accurate, and accessible digital resource about Khyber Pakhtunkhwa.
                            We bridge the gap between data and understanding, making the province's rich heritage, diverse population,
                            and dynamic growth accessible to everyone—from curious travelers to serious researchers.
                        </p>

                        {/* Interactive progress indicators */}
                        <div className="mt-8 flex justify-center gap-8 text-sm">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-400">98%</div>
                                <div className="text-gray-600 dark:text-gray-400">Data Accuracy</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-400">24/7</div>
                                <div className="text-gray-600 dark:text-gray-400">Updates</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-400">15k+</div>
                                <div className="text-gray-600 dark:text-gray-400">Daily Users</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Features Section */}
            <section className="px-6 py-16 lg:px-12" data-animate id="features">
                <div className={`max-w-6xl mx-auto transition-all duration-1000 ${visibleElements.has('features') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">What We Cover</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">Comprehensive insights across multiple domains</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`bg-gradient-to-br ${theme === 'dark' ? feature.gradient : feature.lightGradient} p-8 rounded-2xl border border-border hover:border-border/80 transition-all duration-500 group cursor-pointer relative overflow-hidden`}
                                onMouseEnter={() => setActiveSection(index)}
                            >
                                {/* Animated background */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative z-10">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="bg-gray-200 dark:bg-gray-800 p-3 rounded-xl group-hover:bg-gray-300 dark:group-hover:bg-gray-700 transition-all duration-300 group-hover:scale-110">
                                            <feature.icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Feature highlights */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {feature.highlights.map((highlight, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-gray-200/50 dark:bg-gray-800/50 text-xs px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700 group-hover:border-gray-400 dark:group-hover:border-gray-600 transition-colors"
                                            >
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>

                                    <button className="w-full bg-gray-900/10 dark:bg-white/10 hover:bg-gray-900/20 dark:hover:bg-white/20 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2">
                                        {feature.buttonText}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Values Section */}
            <section className="px-6 py-16 lg:px-12 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900" data-animate id="values">
                <div className={`max-w-6xl mx-auto transition-all duration-1000 ${visibleElements.has('values') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Our Values</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">What drives us every day</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Star, title: "Authenticity", desc: "Every piece of information is verified and sourced from reliable authorities and local experts.", color: "from-yellow-500 to-orange-500" },
                            { icon: TrendingUp, title: "Accuracy", desc: "We maintain the highest standards of data accuracy and update information regularly.", color: "from-green-500 to-blue-500" },
                            { icon: Globe, title: "Accessibility", desc: "Making complex data simple and accessible to everyone, regardless of their background.", color: "from-purple-500 to-pink-500" }
                        ].map((value, index) => (
                            <div key={index} className="text-center group">
                                <div className={`bg-gradient-to-r ${value.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                                    <value.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold mb-4 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">{value.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Team Section */}
            <section className="px-6 py-16 lg:px-12" data-animate id="team">
                <div className={`max-w-4xl mx-auto transition-all duration-1000 ${visibleElements.has('team') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Our Team</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">Passionate individuals working together</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-500 hover:transform hover:scale-105 group cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 w-12 h-12 rounded-xl flex items-center justify-center group-hover:from-gray-300 group-hover:to-gray-400 dark:group-hover:from-gray-700 dark:group-hover:to-gray-600 transition-all duration-300">
                                        <member.icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">{member.role}</h3>
                                            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">{member.count}</span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">{member.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced CTA Section */}
            <section className="px-6 py-20 lg:px-12" data-animate id="cta">
                <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${visibleElements.has('cta') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="bg-gradient-to-r from-gray-50/80 via-white/80 to-gray-50/80 dark:from-gray-900/80 dark:via-black/80 dark:to-gray-900/80 backdrop-blur-sm p-12 rounded-3xl border border-gray-200 dark:border-gray-800 relative overflow-hidden group hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex justify-center items-center gap-2 mb-6">
                                <Calendar className="w-12 h-12 text-blue-400 group-hover:scale-110 transition-transform duration-500" />
                                <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
                            </div>
                            <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
                            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                                Whether you're planning a visit, researching demographics, or seeking educational insights,
                                pukhtunkhwa.com is your trusted companion for discovering the beauty and complexity of Khyber Pakhtunkhwa.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-white">
                                    Explore Data
                                    <MousePointer className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                                </button>
                                <button className="border border-gray-400 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-500 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100/50 dark:hover:bg-gray-900/50 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2">
                                    Contact Us
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                    opacity: 0;
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(2deg); }
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default AboutPageComp;