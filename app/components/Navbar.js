"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiMenu, HiX } from "react-icons/hi";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isDashboardPage = pathname === "/dashboard";
  const isResumePreviewPage = pathname === "/resume-preview";
  const isContactPage = pathname === "/contact";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/user`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          console.error("User fetch failed with status:", response.status);
          return;
        }

        const data = await response.json();
        if (data.isAuthenticated) {
          setUser(data.user);
          localStorage.setItem("userID", data.userID);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchUser();

    // Add scroll listener for navbar background effect
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Logout failed");

      localStorage.removeItem("userID");
      setUser(null);
      toast.success("Logged out successfully!");
      router.push("/");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Failed to log out. Please try again.");
    }
  };

  // Close menu when clicking a link on mobile
  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`${scrolled ? 'bg-blue-950/95 backdrop-blur-sm shadow-lg' : 'bg-blue-950'} text-white sticky top-0 z-50 w-full transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
      <div className="flex justify-between items-center h-16 relative">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <div className="logo font-bold text-lg flex items-center gap-2 whitespace-nowrap hover:scale-105 transition-transform duration-300">
              <div className="relative h-8 w-12">
                <Image
                  src="/logo.png"
                  alt="logo"
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Resume-Builder</span>
            </div>
          </div>

          {/* Desktop Navigation - Modified flex properties */}
          <div className="hidden lg:flex items-center justify-center">
            {!isDashboardPage && !isResumePreviewPage && !isContactPage && (
              <ul className="flex space-x-6">
                <li>
                  <Link 
                    href="/" 
                    className={`nav-item px-3 py-2 rounded-md text-sm font-medium ${pathname === '/' ? 'text-white bg-blue-800/70' : 'text-gray-300 hover:bg-blue-800/50 hover:text-white'} transition-all duration-200`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/dashboard"
                    className={`nav-item px-3 py-2 rounded-md text-sm font-medium ${pathname === '/dashboard' ? 'text-white bg-blue-800/70' : 'text-gray-300 hover:bg-blue-800/50 hover:text-white'} transition-all duration-200`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resume-preview"
                    className={`nav-item px-3 py-2 rounded-md text-sm font-medium ${pathname === '/resume-preview' ? 'text-white bg-blue-800/70' : 'text-gray-300 hover:bg-blue-800/50 hover:text-white'} transition-all duration-200`}
                  >
                    Preview
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className={`nav-item px-3 py-2 rounded-md text-sm font-medium ${pathname === '/contact' ? 'text-white bg-blue-800/70' : 'text-gray-300 hover:bg-blue-800/50 hover:text-white'} transition-all duration-200`}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            )}
          </div>

           {/* User Section - Desktop - Modified spacing */}
          <div className="hidden lg:flex items-center flex-shrink-0 ml-4">
            {user ? (
              <div className="flex items-center gap-3 bg-blue-900/60 px-4 py-1.5 rounded-full">
                <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-blue-300">
                  <Image
                    src={user.picture || "/user-avatar.jpeg"}
                    alt="User"
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <span className="text-sm font-medium">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="ml-2 bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <a href={`${API_URL}/api/auth/google`}>
                <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md">
                  Login
                </button>
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-800 focus:outline-none transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <HiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <HiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out transform ${
          isMenuOpen
            ? "opacity-100 max-h-screen"
            : "opacity-0 max-h-0 pointer-events-none"
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-900/90 backdrop-blur-sm shadow-lg">
          <Link
            href="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === "/" ? "bg-blue-700 text-white" : "text-gray-300 hover:bg-blue-700 hover:text-white"
            }`}
            onClick={handleLinkClick}
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === "/dashboard" ? "bg-blue-700 text-white" : "text-gray-300 hover:bg-blue-700 hover:text-white"
            }`}
            onClick={handleLinkClick}
          >
            Dashboard
          </Link>
          <Link
            href="/resume-preview"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === "/resume-preview" ? "bg-blue-700 text-white" : "text-gray-300 hover:bg-blue-700 hover:text-white"
            }`}
            onClick={handleLinkClick}
          >
            Preview
          </Link>
          <Link
            href="/contact"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === "/contact" ? "bg-blue-700 text-white" : "text-gray-300 hover:bg-blue-700 hover:text-white"
            }`}
            onClick={handleLinkClick}
          >
            Contact
          </Link>
        </div>
        
        {/* Mobile user section */}
        <div className="pt-4 pb-3 border-t border-blue-700 bg-blue-900/90">
          <div className="flex items-center px-4">
            {user ? (
              <>
                <div className="flex-shrink-0">
                  <Image
                    className="h-10 w-10 rounded-full object-cover border-2 border-blue-300"
                    src={user.picture || "/user-avatar.jpeg"}
                    alt="User"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{user.name}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-auto bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm text-white transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="w-full flex justify-center">
                <a href={`${API_URL}/api/auth/google`} className="block w-full">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300">
                    Login
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;













