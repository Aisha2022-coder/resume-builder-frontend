"use client"
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-20 min-h-screen w-full relative overflow-hidden">

      <div className="left flex flex-col items-center md:items-start justify-center text-center md:text-left h-full w-full md:w-1/2 p-4 z-10 relative sm:pr-6 md:pr-12 flex-grow">
        <div className="text-white text-3xl md:text-4xl font-bold leading-tight">
          Build your Resume
        </div>
        <p className="text-lg max-w-[650px] mt-4 text-gray-300 relative z-10 bg-opacity-80 p-2 sm:mb-10 md:mb-12 lg:mb-0 xl:mb-6 2xl:mb-8">
          Build your AI-powered Resume in a few minutes! It analyzes the keywords required for the role and helps you in developing your own ATS-friendly Resume.
        </p>
        <Link href="/dashboard">
          <button className="mt-6 bg-blue-500 w-44 text-white font-bold p-3 border-none rounded-lg flex justify-center hover:bg-blue-600 transition duration-300">
            Create your Resume
          </button>
        </Link>
      </div>

      <div className="right flex justify-center items-center relative w-full md:w-1/2 mt-6 md:mt-0 z-0 sm:pl-6 md:pl-12 lg:pl-24 xl:pl-32 2xl:pl-40 flex-grow">
        <img className="h-40 w-40 sm:h-[180px] sm:w-[180px] md:h-[220px] md:w-[220px] lg:h-[250px] lg:w-[250px] xl:h-[280px] xl:w-[280px] 2xl:h-[300px] 2xl:w-[300px] md:relative md:left-auto max-w-full" src="/my-resume.png" alt="resume" />
        <img className="h-60 w-60 sm:h-[240px] sm:w-[240px] md:h-[320px] md:w-[320px] lg:h-[400px] lg:w-[400px] xl:h-[450px] xl:w-[450px] 2xl:h-[480px] 2xl:w-[480px] relative z-0 max-w-full" src="/resume-builder.avif" alt="resume builder" />
      </div>
    </div>
  );
}














