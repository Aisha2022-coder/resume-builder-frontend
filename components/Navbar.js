"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiMenu, HiX } from "react-icons/hi";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  return (
    <nav className="bg-blend-darken bg-blue-950 text-white flex justify-between items-center p-4 sticky top-0 z-50 px-4 md:px-12 w-full min-w-full">
      <div className="logo font-bold text-lg flex items-center gap-2 whitespace-nowrap">
        <img className="h-10 w-30 mx-auto" src="/logo.png" alt="logo" />
        Resume-Builder
      </div>

      <div className="hidden lg:flex justify-center flex-grow w-full">
        {!isDashboardPage && !isResumePreviewPage && !isContactPage && (
          <ul className="flex space-x-10 w-full max-w-[500px]">
            <li className="cursor-pointer"><Link href="/">Home</Link></li>
            <li className="cursor-pointer"><Link href="/dashboard">Dashboard</Link></li>
            <li className="cursor-pointer"><Link href="/resume-preview">Preview</Link></li>
            <li className="cursor-pointer"><Link href="/contact">Contact</Link></li>
          </ul>
        )}
      </div>

      <div className="hidden lg:flex items-center gap-4">
        {user ? (
          <>
            <img className="h-8 w-8 rounded-full" src={user.picture || "/user-avatar.jpeg"} alt="User Avatar" />
            <span>{user.name}</span>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded-md">
              Logout
            </button>
          </>
        ) : (
          <a href={`${API_URL}/api/auth/google`}>
            <button className="bg-blue-500 text-white font-bold p-2 border-none rounded-lg w-20">
              Login
            </button>
          </a>
        )}
      </div>

      <div className="lg:hidden flex items-center gap-4">
        <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <HiX className="text-2xl cursor-pointer" /> : <HiMenu className="text-2xl cursor-pointer" />}
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full right-0 bg-blue-950 w-full flex flex-col items-center p-4 space-y-4 shadow-lg rounded-lg lg:hidden z-50">
          <ul className="flex flex-col items-center space-y-3 text-white text-lg w-full">
            <li className="cursor-pointer w-full text-center"><Link href="/">Home</Link></li>
            <li className="cursor-pointer w-full text-center"><Link href="/dashboard">Dashboard</Link></li>
            <li className="cursor-pointer w-full text-center"><Link href="/resume-preview">Preview</Link></li>
            <li className="cursor-pointer w-full text-center"><Link href="/contact">Contact</Link></li>
          </ul>
          {user ? (
            <>
              <img className="h-8 w-8 rounded-full" src={user.picture || "/user-avatar.jpeg"} alt="User Avatar" />
              <span>{user.name}</span>
              <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded-md">
                Logout
              </button>
            </>
          ) : (
            <a href={`${API_URL}/api/auth/google`}>
              <button className="bg-blue-500 text-white font-bold p-2 border-none rounded-lg w-20">
                Login
              </button>
            </a>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;







