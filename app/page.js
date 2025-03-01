"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize(); // Check on mount
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <main className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 md:px-12 lg:px-20 min-h-[85vh] w-full relative overflow-hidden py-8 md:py-0">
      <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left w-full md:w-1/2 z-10 relative order-2 md:order-1 mt-8 md:mt-0 px-4">
        <div className="w-full max-w-[450px] mx-auto md:mx-0">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight animate-fadeIn mb-4 md:mb-6">
            Create Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Professional</span> Resume
          </h1>
          <p className="text-base sm:text-lg lg:text-xl max-w-[650px] text-gray-300 relative z-10 bg-opacity-80 p-2 md:p-0 backdrop-blur-sm rounded-lg">
            Build your AI-powered Resume in minutes! Our tool analyzes keywords for your target role and helps create an ATS-friendly Resume that stands out.
          </p>
          <div className="flex justify-center md:justify-start mt-6 md:mt-8">
            <Link href="/dashboard">
              <button className="mobile-button bg-gradient-to-r from-blue-500 to-indigo-600 w-44 text-white font-bold p-3 border-none rounded-lg flex justify-center hover:from-blue-600 hover:to-indigo-700 transition duration-300 transform hover:scale-105 shadow-lg">
                Create your Resume
              </button>
            </Link>
          </div>
        </div>
      </div>

      {!isMobile && (
      <div className="w-full md:w-1/2 order-1 md:order-2 z-0 flex justify-center items-center mb-8 md:mb-0">
        <div className="relative w-[95%] max-w-[500px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] mobile-img-container">
          <div className="hidden sm:block absolute w-24 h-24 bg-blue-500 opacity-20 rounded-full -top-10 -right-10 animate-pulse"></div>
          <div className="hidden sm:block absolute w-16 h-16 bg-purple-500 opacity-20 rounded-full bottom-10 -left-10 animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="relative w-full h-full">
            <Image
              src="/resume-builder.avif"
              alt="resume builder"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 480px) 95vw, (max-width: 640px) 90vw, (max-width: 768px) 80vw, 50vw"
              priority
              className="animate-float rounded-lg shadow-2xl"
            />
          </div>
          <div className="absolute left-0 top-0 h-[85%] w-[55%] sm:h-[80%] sm:w-[50%]">
            <Image
              src="/my-resume.png"
              alt="resume"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 480px) 45vw, (max-width: 640px) 45vw, (max-width: 768px) 30vw, 25vw"
              priority
              className="animate-floatDelayed rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
      )}
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-t-3xl block md:hidden"></div>
    </main>
  );
}





















