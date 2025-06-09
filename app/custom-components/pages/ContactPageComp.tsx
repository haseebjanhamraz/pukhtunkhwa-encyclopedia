"use client"

import React, { useState, useEffect, useRef, ChangeEvent, FocusEvent } from 'react';
import {
    Mail,
    Phone,
    MapPin,
    Send,
    MessageSquare,
    Clock,
    Globe,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    CheckCircle,
    AlertCircle,
    User,
    Building,
    HelpCircle,
    X,
    Check,
    ChevronUp
} from 'lucide-react';

interface FormData {
    name: string;
    email: string;
    subject: string;
    category: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    category?: string;
    message?: string;
}

type SubmitStatus = 'success' | 'error' | null;
type FieldStatus = 'success' | 'error' | 'default';
type FocusedField = keyof FormData | null;

const ContactPageComp = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: ''
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [focusedField, setFocusedField] = useState<FocusedField>(null);
    const pageRef = useRef<HTMLDivElement>(null);

    // Background images for scroll effect
    const backgroundImages = [
        {
            url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070",
            title: "Scenic Mountains of KP"
        },
        {
            url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070",
            title: "Ancient Architecture"
        },
        {
            url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070",
            title: "Cultural Heritage"
        },
        {
            url: "https://images.unsplash.com/photo-1601919051950-bb9f3ffb3fee?q=80&w=2070",
            title: "Natural Beauty"
        }
    ];

    useEffect(() => {
        setIsVisible(true);

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setScrollY(scrollPosition);

            // Change background image based on scroll position
            const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = scrollPosition / pageHeight;
            const imageIndex = Math.min(
                Math.floor(scrollPercent * backgroundImages.length),
                backgroundImages.length - 1
            );
            setActiveImageIndex(imageIndex);

            // Show scroll to top button
            setShowScrollTop(scrollPosition > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const contactMethods = [
        {
            icon: Mail,
            title: "Email Us",
            description: "Get in touch via email",
            contact: "info@pukhtunkhwa.com",
            subtext: "We respond within 24 hours",
            gradient: "from-gray-800 to-gray-900"
        },
        {
            icon: Phone,
            title: "Call Us",
            description: "Speak with our team",
            contact: "+92 91 123 4567",
            subtext: "Mon-Fri, 9 AM - 6 PM PKT",
            gradient: "from-gray-900 to-black"
        },
        {
            icon: MapPin,
            title: "Visit Us",
            description: "Our office location",
            contact: "Peshawar, Khyber Pakhtunkhwa",
            subtext: "Pakistan",
            gradient: "from-black to-gray-800"
        }
    ];

    const inquiryTypes = [
        { icon: Globe, title: "Tourism Information", description: "Travel guides, destinations, and recommendations" },
        { icon: Building, title: "Business Partnerships", description: "Collaboration opportunities and sponsorships" },
        { icon: User, title: "Data Contributions", description: "Share local insights and information" },
        { icon: HelpCircle, title: "General Support", description: "Technical issues and general questions" }
    ];

    const socialLinks = [
        { icon: Facebook, name: "Facebook", url: "#", hover: "hover:bg-blue-600" },
        { icon: Twitter, name: "Twitter", url: "#", hover: "hover:bg-blue-400" },
        { icon: Instagram, name: "Instagram", url: "#", hover: "hover:bg-pink-600" },
        { icon: Linkedin, name: "LinkedIn", url: "#", hover: "hover:bg-blue-700" }
    ];

    // Form validation
    const validateField = (name: keyof FormData, value: string): FormErrors => {
        const errors: FormErrors = {};

        switch (name) {
            case 'name':
                if (!value.trim()) {
                    errors.name = 'Name is required';
                } else if (value.trim().length < 2) {
                    errors.name = 'Name must be at least 2 characters';
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    errors.name = 'Name can only contain letters and spaces';
                }
                break;
            case 'email':
                if (!value.trim()) {
                    errors.email = 'Email is required';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    errors.email = 'Please enter a valid email address';
                }
                break;
            case 'subject':
                if (!value.trim()) {
                    errors.subject = 'Subject is required';
                } else if (value.trim().length < 5) {
                    errors.subject = 'Subject must be at least 5 characters';
                }
                break;
            case 'category':
                if (!value) {
                    errors.category = 'Please select a category';
                }
                break;
            case 'message':
                if (!value.trim()) {
                    errors.message = 'Message is required';
                } else if (value.trim().length < 10) {
                    errors.message = 'Message must be at least 10 characters';
                }
                break;
        }

        return errors;
    };

    const validateForm = (): FormErrors => {
        const errors: FormErrors = {};
        (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
            const fieldErrors = validateField(key, formData[key]);
            Object.assign(errors, fieldErrors);
        });
        return errors;
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Real-time validation
        const fieldErrors = validateField(name as keyof FormData, value);
        setFormErrors(prev => ({
            ...prev,
            [name]: fieldErrors[name as keyof FormErrors]
        }));
    };

    const handleSubmit = async () => {
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 3000);
            return;
        }

        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                subject: '',
                category: '',
                message: ''
            });
            setFormErrors({});

            setTimeout(() => {
                setSubmitStatus(null);
            }, 5000);
        }, 2000);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getFieldStatus = (fieldName: keyof FormData): FieldStatus => {
        if (formErrors[fieldName]) return 'error';
        if (formData[fieldName] && !formErrors[fieldName]) return 'success';
        return 'default';
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative" ref={pageRef}>
            {/* Dynamic Background Images */}
            <div className="fixed inset-0 z-0">
                {backgroundImages.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${index === activeImageIndex ? 'opacity-20' : 'opacity-0'
                            }`}
                        style={{
                            backgroundImage: `url(${image.url})`,
                            transform: `translateY(${scrollY * 0.5}px)` // Parallax effect
                        }}
                    />
                ))}
                <div className="absolute inset-0 bg-black bg-opacity-80" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Scroll Progress Indicator */}
                <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
                    <div
                        className="h-full bg-white transition-all duration-300"
                        style={{
                            width: `${Math.min((scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`
                        }}
                    />
                </div>

                {/* Floating Image Info */}
                <div className="fixed top-20 right-6 bg-black bg-opacity-50 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-700 z-40">
                    <div className="text-sm text-gray-300">{backgroundImages[activeImageIndex]?.title}</div>
                </div>

                {/* Hero Section */}
                <section className="relative px-6 py-24 lg:px-12">
                    <div className={`max-w-6xl mx-auto transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-gray-700">
                                <MessageSquare className="w-4 h-4" />
                                <span className="text-sm text-gray-300">We're Here to Help</span>
                            </div>

                            <h1 className="text-6xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                                Get in <span className="text-white drop-shadow-lg">Touch</span>
                            </h1>

                            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                Have questions about Khyber Pakhtunkhwa? Need specific data or insights? Our team is ready to assist you with information, partnerships, and support.
                            </p>
                        </div>

                        {/* Contact Methods */}
                        <div className="grid lg:grid-cols-3 gap-8 mb-20">
                            {contactMethods.map((method, index) => (
                                <div
                                    key={index}
                                    className={`bg-gradient-to-br ${method.gradient} bg-opacity-90 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer shadow-2xl`}
                                    style={{ animationDelay: `${index * 200}ms` }}
                                >
                                    <div className="bg-gray-800 bg-opacity-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-700 transition-all duration-300 group-hover:rotate-6">
                                        <method.icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3 group-hover:text-gray-200 transition-colors">{method.title}</h3>
                                    <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">{method.description}</p>
                                    <div className="text-lg font-medium mb-2 group-hover:text-white transition-colors">{method.contact}</div>
                                    <div className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">{method.subtext}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Main Content Grid */}
                <section className="px-6 py-16 lg:px-12">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-gradient-to-br from-gray-900 to-black bg-opacity-95 backdrop-blur-sm p-8 rounded-3xl border border-gray-700 relative overflow-hidden shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-5 animate-pulse"></div>

                                <div className="relative z-10">
                                    <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                                    <p className="text-gray-400 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>

                                    {submitStatus === 'success' && (
                                        <div className="bg-green-900 bg-opacity-50 backdrop-blur-sm border border-green-700 rounded-xl p-4 mb-6 flex items-center gap-3 animate-fade-in">
                                            <CheckCircle className="w-5 h-5 text-green-400" />
                                            <span className="text-green-300">Message sent successfully! We'll get back to you soon.</span>
                                        </div>
                                    )}

                                    {submitStatus === 'error' && (
                                        <div className="bg-red-900 bg-opacity-50 backdrop-blur-sm border border-red-700 rounded-xl p-4 mb-6 flex items-center gap-3 animate-fade-in">
                                            <AlertCircle className="w-5 h-5 text-red-400" />
                                            <span className="text-red-300">Please fix the errors below and try again.</span>
                                        </div>
                                    )}

                                    <div className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                                                    Full Name
                                                    {getFieldStatus('name') === 'success' && <Check className="w-4 h-4 text-green-400" />}
                                                    {getFieldStatus('name') === 'error' && <X className="w-4 h-4 text-red-400" />}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    onFocus={() => setFocusedField('name')}
                                                    onBlur={() => setFocusedField(null)}
                                                    className={`w-full bg-gray-800 bg-opacity-50 backdrop-blur-sm border rounded-xl px-4 py-3 focus:outline-none transition-all duration-300 ${getFieldStatus('name') === 'error'
                                                        ? 'border-red-500 focus:border-red-400'
                                                        : getFieldStatus('name') === 'success'
                                                            ? 'border-green-500 focus:border-green-400'
                                                            : 'border-gray-700 focus:border-gray-500'
                                                        } ${focusedField === 'name' ? 'scale-105' : ''}`}
                                                    placeholder="Your full name"
                                                />
                                                {formErrors.name && (
                                                    <p className="text-red-400 text-sm mt-1 animate-fade-in">{formErrors.name}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                                                    Email Address
                                                    {getFieldStatus('email') === 'success' && <Check className="w-4 h-4 text-green-400" />}
                                                    {getFieldStatus('email') === 'error' && <X className="w-4 h-4 text-red-400" />}
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    onFocus={() => setFocusedField('email')}
                                                    onBlur={() => setFocusedField(null)}
                                                    className={`w-full bg-gray-800 bg-opacity-50 backdrop-blur-sm border rounded-xl px-4 py-3 focus:outline-none transition-all duration-300 ${getFieldStatus('email') === 'error'
                                                        ? 'border-red-500 focus:border-red-400'
                                                        : getFieldStatus('email') === 'success'
                                                            ? 'border-green-500 focus:border-green-400'
                                                            : 'border-gray-700 focus:border-gray-500'
                                                        } ${focusedField === 'email' ? 'scale-105' : ''}`}
                                                    placeholder="your.email@example.com"
                                                />
                                                {formErrors.email && (
                                                    <p className="text-red-400 text-sm mt-1 animate-fade-in">{formErrors.email}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                                                    Subject
                                                    {getFieldStatus('subject') === 'success' && <Check className="w-4 h-4 text-green-400" />}
                                                    {getFieldStatus('subject') === 'error' && <X className="w-4 h-4 text-red-400" />}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleInputChange}
                                                    onFocus={() => setFocusedField('subject')}
                                                    onBlur={() => setFocusedField(null)}
                                                    className={`w-full bg-gray-800 bg-opacity-50 backdrop-blur-sm border rounded-xl px-4 py-3 focus:outline-none transition-all duration-300 ${getFieldStatus('subject') === 'error'
                                                        ? 'border-red-500 focus:border-red-400'
                                                        : getFieldStatus('subject') === 'success'
                                                            ? 'border-green-500 focus:border-green-400'
                                                            : 'border-gray-700 focus:border-gray-500'
                                                        } ${focusedField === 'subject' ? 'scale-105' : ''}`}
                                                    placeholder="What's this about?"
                                                />
                                                {formErrors.subject && (
                                                    <p className="text-red-400 text-sm mt-1 animate-fade-in">{formErrors.subject}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                                                    Category
                                                    {getFieldStatus('category') === 'success' && <Check className="w-4 h-4 text-green-400" />}
                                                    {getFieldStatus('category') === 'error' && <X className="w-4 h-4 text-red-400" />}
                                                </label>
                                                <select
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleInputChange}
                                                    onFocus={() => setFocusedField('category')}
                                                    onBlur={() => setFocusedField(null)}
                                                    className={`w-full bg-gray-800 bg-opacity-50 backdrop-blur-sm border rounded-xl px-4 py-3 focus:outline-none transition-all duration-300 ${getFieldStatus('category') === 'error'
                                                        ? 'border-red-500 focus:border-red-400'
                                                        : getFieldStatus('category') === 'success'
                                                            ? 'border-green-500 focus:border-green-400'
                                                            : 'border-gray-700 focus:border-gray-500'
                                                        } ${focusedField === 'category' ? 'scale-105' : ''}`}
                                                >
                                                    <option value="">Select a category</option>
                                                    <option value="tourism">Tourism Information</option>
                                                    <option value="business">Business Partnership</option>
                                                    <option value="data">Data Contribution</option>
                                                    <option value="support">General Support</option>
                                                    <option value="other">Other</option>
                                                </select>
                                                {formErrors.category && (
                                                    <p className="text-red-400 text-sm mt-1 animate-fade-in">{formErrors.category}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                                                Message
                                                {getFieldStatus('message') === 'success' && <Check className="w-4 h-4 text-green-400" />}
                                                {getFieldStatus('message') === 'error' && <X className="w-4 h-4 text-red-400" />}
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                onFocus={() => setFocusedField('message')}
                                                onBlur={() => setFocusedField(null)}
                                                rows={6}
                                                className={`w-full bg-gray-800 bg-opacity-50 backdrop-blur-sm border rounded-xl px-4 py-3 focus:outline-none transition-all duration-300 resize-none ${getFieldStatus('message') === 'error'
                                                    ? 'border-red-500 focus:border-red-400'
                                                    : getFieldStatus('message') === 'success'
                                                        ? 'border-green-500 focus:border-green-400'
                                                        : 'border-gray-700 focus:border-gray-500'
                                                    } ${focusedField === 'message' ? 'scale-105' : ''}`}
                                                placeholder="Tell us more about your inquiry..."
                                            ></textarea>
                                            {formErrors.message && (
                                                <p className="text-red-400 text-sm mt-1 animate-fade-in">{formErrors.message}</p>
                                            )}
                                        </div>

                                        <button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                            className="w-full bg-white text-black py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5" />
                                                    Send Message
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Sidebar */}
                        <div className="space-y-8">

                            {/* Quick Info */}
                            <div className="bg-gray-900 bg-opacity-95 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105">
                                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    Quick Info
                                </h3>
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between items-center p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                                        <div className="text-gray-400">Response Time</div>
                                        <div className="font-medium">Within 24 hours</div>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                                        <div className="text-gray-400">Office Hours</div>
                                        <div className="font-medium">Mon-Fri, 9 AM - 6 PM</div>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                                        <div className="text-gray-400">Weekend Support</div>
                                        <div className="font-medium">Limited</div>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Inquiry Types */}
                            <div className="bg-gray-900 bg-opacity-95 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
                                <h3 className="text-xl font-semibold mb-4">Common Inquiries</h3>
                                <div className="space-y-3">
                                    {inquiryTypes.map((type, index) => (
                                        <div key={index} className="flex items-start gap-3 p-4 rounded-xl hover:bg-gray-800 hover:bg-opacity-50 transition-all duration-300 cursor-pointer transform hover:scale-105 border border-transparent hover:border-gray-600">
                                            <div className="bg-gray-800 bg-opacity-50 p-2 rounded-lg">
                                                <type.icon className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-sm mb-1">{type.title}</div>
                                                <div className="text-xs text-gray-400">{type.description}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Enhanced Social Links */}
                            <div className="bg-gray-900 bg-opacity-95 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
                                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.url}
                                            className={`flex items-center gap-2 p-3 bg-gray-800 bg-opacity-50 rounded-xl transition-all duration-300 transform hover:scale-110 ${social.hover}`}
                                        >
                                            <social.icon className="w-4 h-4" />
                                            <span className="text-sm">{social.name}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enhanced FAQ Section */}
                <section className="px-6 py-16 lg:px-12 bg-gradient-to-b from-transparent to-gray-900 bg-opacity-50">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                            <p className="text-gray-400 text-lg">Quick answers to common questions</p>
                        </div>

                        <div className="space-y-4">
                            {[
                                {
                                    question: "How accurate is the data on your website?",
                                    answer: "All our data is sourced from official government statistics, verified local sources, and updated regularly to ensure maximum accuracy."
                                },
                                {
                                    question: "Can I contribute information about my local area?",
                                    answer: "Absolutely! We welcome contributions from local residents and experts. Contact us with your insights and we'll verify and incorporate valuable information."
                                },
                                {
                                    question: "Do you provide custom research services?",
                                    answer: "Yes, we offer custom research and data analysis services for businesses, researchers, and organizations. Contact us to discuss your specific needs."
                                },
                                {
                                    question: "How often is the information updated?",
                                    answer: "We update our database continuously, with major statistical updates quarterly and tourism information updated monthly or as needed."
                                }
                            ].map((faq, index) => (
                                <div key={index} className="bg-gray-900 bg-opacity-95 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105">
                                    <h3 className="font-semibold mb-3 text-lg">{faq.question}</h3>
                                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-110 z-50 animate-bounce"
                >
                    <ChevronUp className="w-6 h-6" />
                </button>
            )}

            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
        </div>
    );
};

export default ContactPageComp;