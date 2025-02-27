"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Link from "next/link";
import DefaultTemplate from "@/components/templates/DefaultTemplate";
import ModernTemplate from "@/components/templates/ModernTemplate";
import CreativeTemplate from "@/components/templates/CreativeTemplate";
import Image from "next/image";

export default function ResumePreview() {
  const router = useRouter();
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    professionalSummary: "",
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
    achievements: [],
    certifications: [],
  });
  const [resumeTemplate, setResumeTemplate] = useState("default");

  useEffect(() => {
    const storedTemplate = localStorage.getItem("resumeTemplate");
    if (storedTemplate) setResumeTemplate(storedTemplate);
    const userID = localStorage.getItem("userID");
    if (!userID) {
      router.push("/dashboard");
      return;
    }
    const fetchResumeData = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${API_URL}/api/resume/${userID}`);
        if (!response.ok) throw new Error("Failed to fetch resume data");
        const data = await response.json();
        console.log("Fetched Resume Data:", data);
        setResumeData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          professionalSummary: data.professionalSummary || "",
          workExperience: Array.isArray(data.workExperience) ? data.workExperience : [],
          education: Array.isArray(data.education) ? data.education : [],
          skills: Array.isArray(data.skills) ? data.skills : [],
          projects: Array.isArray(data.projects) ? data.projects : [],
          achievements: Array.isArray(data.achievements) ? data.achievements : [],
          certifications: Array.isArray(data.certifications) ? data.certifications : [],
        });
      } catch (error) {
        console.error("Error fetching resume:", error);
        router.push("/dashboard");
      }
    };
    fetchResumeData();
  }, [router]);

  const getSelectedTemplate = () => {
    if (!resumeData) return <p>Loading...</p>;
    switch (resumeTemplate) {
      case "modern":
        return <ModernTemplate resumeData={resumeData} />;
      case "creative":
        return <CreativeTemplate resumeData={resumeData} />;
      default:
        return <DefaultTemplate resumeData={resumeData} />;
    }
  };

  const downloadPDF = () => {
    const element = document.getElementById("resume-template");
    html2canvas(element, {
      scale: 2,
      useCORS: true,
      scrollY: -window.scrollY,
    }).then((canvas) => {
      const ImageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const ImageWidth = 210;
      const pageHeight = 297;
      const ImageHeight = (canvas.height * ImageWidth) / canvas.width;
      let yPosition = 0;
      while (yPosition < ImageHeight) {
        pdf.addImage(ImageData, "PNG", 0, -yPosition, ImageWidth, ImageHeight);
        yPosition += pageHeight;
        if (yPosition < ImageHeight) pdf.addPage();
      }
      pdf.save("resume.pdf");
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📄 Resume Preview</h1>
      <div className="w-full max-w-4xl bg-white shadow-lg p-6 rounded-lg">
        {getSelectedTemplate()}
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <button onClick={downloadPDF} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base md:text-lg rounded-lg font-bold"><Image src="download.svg" alt="download" width={20} height={20} priority />Download PDF</button>
        <Link href="/dashboard">
          <button className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base md:text-lg rounded-lg font-bold"><Image src="edit.svg" alt="edit" width={20} height={20} priority />Edit Resume</button>
        </Link>
      </div>
    </div>
  );
}
