"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Bell,
  ChevronDown,
  FileText,
  Home,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  User,
  Users,
  X,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data
const recentActivities = [
  {
    id: 1,
    title: "Project Approved",
    description: "Your request for Project X has been approved",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "New Comment",
    description: "Sarah commented on your task",
    time: "5 hours ago",
  },
  {
    id: 3,
    title: "Meeting Scheduled",
    description: "Team meeting scheduled for tomorrow at 10:00 AM",
    time: "Yesterday",
  },
]

const stats = [
  {
    id: 1,
    title: "Total Users",
    value: "3,456",
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: 2,
    title: "New Tasks",
    value: "24",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    id: 3,
    title: "Notifications",
    value: "12",
    icon: <Bell className="h-5 w-5" />,
  },
]

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState("home")
  const [mounted, setMounted] = useState(false)

  // Check if on mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    setMounted(true)

    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle("dark", darkMode)
    }
  }, [darkMode, mounted])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const navItems = [
    { id: "home", label: "Dashboard", icon: <Home className="h-5 w-5" /> },
    { id: "users", label: "Users", icon: <Users className="h-5 w-5" /> },
    { id: "reports", label: "Reports", icon: <FileText className="h-5 w-5" /> },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  interface KeyNavigationEvent extends React.KeyboardEvent {
    key: string
  }

  interface HandleKeyNavigation {
    (e: KeyNavigationEvent, id: string): void
  }

  const handleKeyNavigation: HandleKeyNavigation = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      setCurrentPage(id)
      e.preventDefault()
    }
  }

  interface ProfileKeyNavigationEvent extends React.KeyboardEvent {
    key: string
  }

  interface HandleProfileKeyNavigation {
    (e: ProfileKeyNavigationEvent): void
  }

  const handleProfileKeyNavigation: HandleProfileKeyNavigation = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      setProfileOpen(!profileOpen)
      e.preventDefault()
    }
  }

  // Animation variants
  const sidebarVariants = {
    open: { width: "240px", transition: { duration: 0.3 } },
    closed: { width: "80px", transition: { duration: 0.3 } },
  }

  const mobileMenuVariants = {
    open: { x: 0, transition: { duration: 0.3 } },
    closed: { x: "-100%", transition: { duration: 0.3 } },
  }

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        {/* Mobile sidebar backdrop */}
        <AnimatePresence>
          {sidebarOpen && isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black z-20 md:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar - Mobile (position fixed, slide in/out) */}
        {isMobile && (
          <motion.aside
            className="fixed z-30 h-full bg-white dark:bg-gray-800 shadow-lg"
            variants={mobileMenuVariants}
            animate={sidebarOpen ? "open" : "closed"}
            initial="closed"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-xl font-bold">AppDashboard</h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Nav Items */}
            <nav className="flex-1 overflow-y-auto pt-4">
              <ul className="space-y-2 px-3">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <motion.a
                      href={`#${item.id}`}
                      onClick={() => {
                        setCurrentPage(item.id)
                        if (isMobile) setSidebarOpen(false)
                      }}
                      onKeyDown={(e) => handleKeyNavigation(e, item.id)}
                      className={`flex items-center p-3 rounded-lg transition-colors duration-150 ${
                        currentPage === item.id
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                          : "hover:bg-gray-200 dark:hover:bg-gray-700"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      tabIndex={0}
                      role="button"
                      aria-current={
                        currentPage === item.id ? "page" : undefined
                      }
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      <span className="ml-3">{item.label}</span>
                      {currentPage === item.id && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 w-1 h-8 bg-blue-600 rounded-r-full"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.aside>
        )}

        {/* Sidebar - Desktop (relative position, resize) */}
        {!isMobile && (
          <motion.aside
            className="relative z-10 h-full bg-white dark:bg-gray-800 shadow-lg flex flex-col"
            variants={sidebarVariants}
            animate={sidebarOpen ? "open" : "closed"}
            initial="open"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              {sidebarOpen && (
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xl font-bold"
                >
                  AppDashboard
                </motion.h1>
              )}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              >
                {sidebarOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 overflow-y-auto pt-4">
              <ul className="space-y-2 px-3">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <motion.a
                      href={`#${item.id}`}
                      onClick={() => setCurrentPage(item.id)}
                      onKeyDown={(e) => handleKeyNavigation(e, item.id)}
                      className={`flex items-center p-3 rounded-lg transition-colors duration-150 ${
                        currentPage === item.id
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                          : "hover:bg-gray-200 dark:hover:bg-gray-700"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      tabIndex={0}
                      role="button"
                      aria-current={
                        currentPage === item.id ? "page" : undefined
                      }
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      {sidebarOpen && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="ml-3"
                        >
                          {item.label}
                        </motion.span>
                      )}
                      {currentPage === item.id && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 w-1 h-8 bg-blue-600 rounded-r-full"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.aside>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navbar */}
          <header className="bg-white dark:bg-gray-800 shadow z-10">
            <div className="flex items-center justify-between p-4">
              {isMobile && (
                <button
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              )}

              <div className="flex items-center space-x-4 ml-auto">
                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={
                    darkMode ? "Switch to light mode" : "Switch to dark mode"
                  }
                >
                  {darkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setProfileOpen(!profileOpen)}
                    onKeyDown={handleProfileKeyNavigation}
                    aria-expanded={profileOpen}
                    aria-haspopup="true"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      JD
                    </div>
                    <span className="hidden md:block">John Doe</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        role="menu"
                        aria-orientation="vertical"
                      >
                        <a
                          href="#profile"
                          className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
                          role="menuitem"
                          tabIndex={0}
                        >
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </a>
                        <a
                          href="#settings"
                          className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
                          role="menuitem"
                          tabIndex={0}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </a>
                        <a
                          href="#logout"
                          className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
                          role="menuitem"
                          tabIndex={0}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100 dark:bg-gray-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={contentVariants}
                className="space-y-6"
              >
                {/* Welcome Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h2 className="text-2xl font-bold mb-2">
                    Welcome back, John!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Here's what's happening with your projects today.
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {stats.map((stat) => (
                    <motion.div
                      key={stat.id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mr-4">
                          {stat.icon}
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {stat.title}
                          </p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium">Recent Activity</h3>
                  </div>
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {recentActivities.map((activity) => (
                      <motion.div
                        key={activity.id}
                        className="p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{activity.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {activity.description}
                            </p>
                          </div>
                          <span className="text-xs text-gray-500">
                            {activity.time}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Alert Component (Using ShadCN) */}
                <Alert className="bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-800">
                  <AlertTitle className="text-blue-800 dark:text-blue-300">
                    Tip
                  </AlertTitle>
                  <AlertDescription className="text-blue-700 dark:text-blue-400">
                    You can customize this dashboard by adding widgets from the
                    settings panel.
                  </AlertDescription>
                </Alert>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  )
}
