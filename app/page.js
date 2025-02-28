"use client";
import Link from "next/link";
import Image from "next/image";

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

      <div className="right relative w-full md:w-1/2 mt-6 md:mt-0 z-0 sm:pl-6 md:pl-12 lg:pl-24 xl:pl-32 2xl:pl-40 flex-grow mr-4">
        <div className="relative w-full h-[80vh]">
          <div className="relative w-full h-full">
            <Image
              src="/resume-builder.avif"
              alt="resume builder"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="absolute left-0 top-0 h-[80%] w-[50%]">
            <Image
              src="/my-resume.png"
              alt="resume"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw, 25vw"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}





















