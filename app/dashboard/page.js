"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";;
import DefaultTemplate from "../components/templates/DefaultTemplate";
import ModernTemplate from "../components/templates/ModernTemplate";
import CreativeTemplate from "../components/templates/CreativeTemplate";
import PersonalInfoForm from "../components/PersonalInfoForm";
import WorkExperienceForm from "../components/WorkExperienceForm";
import EducationForm from "../components/EducationForm";
import SkillsForm from "../components/SkillsForm";
import ProjectsForm from "../components/ProjectsForm";
import AchievementsForm from "../components/AchievementsForm";
import CertificationsForm from "../components/CertificationsForm";
import Image from "next/image";

export default function Dashboard() {
  const router = useRouter();
  const [resumeTemplate, setResumeTemplate] = useState("default");
  const [userID, setUserID] = useState(null);
  const [resumeData2, setResumeData2] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, City, Country",
    professionalSummary:
      "A highly skilled and motivated Software Engineer with experience in developing and maintaining web applications using React and Node.js. Passionate about building efficient and scalable solutions.",
    workExperience: [
      {
        position: "Software Engineer",
        company: "XYZ Corp",
        duration: "Jan 2020 - Present",
        description:
          "Developed and maintained web applications using React and Node.js.",
      },
    ],
    education: [
      {
        degree: "B.Tech in Computer Science",
        institution: "ABC University",
        year: "2018 - 2022",
      },
    ],
    skills: ["React", "JavaScript", "Node.js"],
    projects: [
      {
        title: "E-commerce Website",
        description:
          "Developed a full-stack e-commerce website using React and Node.js.",
        technologies: ["React", "Node.js", "MongoDB"],
        link: "https://example.com/ecommerce-website",
        startDate: "Jan 2020",
        endDate: "Dec 2020",
      },
    ],
    achievements: [
      "Employee of the Month - XYZ Corp",
      "Developed an AI-powered tool",
    ],
    certifications: [
      {
        title: "Certified React Developer",
        provider: "Udemy",
        issueDate: "2023",
        certificateUrl: "https://example.com/cert1",
      },
      {
        title: "AWS Cloud Practitioner",
        provider: "Amazon",
        issueDate: "2022",
        certificateUrl: "https://example.com/cert2",
      },
    ],
  });
  const [openSection, setOpenSection] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const getSelectedTemplate = () => {
    switch (resumeTemplate) {
      case "modern":
        return <ModernTemplate resumeData={resumeData2} />;
      case "creative":
        return <CreativeTemplate resumeData={resumeData2} />;
      default:
        return <DefaultTemplate resumeData={resumeData2} />;
    }
  };

  const handleClick = (section) => {
    if (!isLoggedIn) {
      toast.error("Please log in to edit your resume.");
      return;
    }
    setOpenSection(section);
  };

  const handleViewResume = () => {
    if (!isFormSubmitted) {
      toast.error(
        "Please submit at least one section before previewing the resume."
      );
      return;
    }

    localStorage.setItem("resumeTemplate", resumeTemplate);
    router.push("/resume-preview");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${API_URL}/api/auth/user`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch user");
        const data = await response.json();
        if (data.isAuthenticated) {
          setUser(data.user);
          setUserID(data.userID);
          localStorage.setItem("userID", data.userID);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setUserID(null);
          localStorage.removeItem("userID");
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setIsLoggedIn(false);
      }
    };
    fetchUser();

    const handleStorageChange = () => {
      const storedUserID = localStorage.getItem("userID");
      setIsLoggedIn(!!storedUserID);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [router]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-800">
            <Image
              src="/resume.jpeg"
              alt="resume-logo"
              width={32}
              height={32}
              priority
            />{" "}
            Resume Dashboard
          </h1>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Select Resume Template</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              className="flex items-center justify-center gap-2 p-3 border-2 rounded-lg text-sm md:text-base w-36 overflow-hidden"
              onClick={() => setResumeTemplate("default")}
            >
              <Image
                src="/resume-template.jpg"
                alt="resume-template-logo"
                width={24}
                height={24}
                priority
              />{" "}
              Template 1
            </button>
            <button
              className="flex items-center justify-center gap-2 p-3 border-2 rounded-lg text-sm md:text-base w-36 overflow-hidden"
              onClick={() => setResumeTemplate("modern")}
            >
              <Image
                src="/resume-template.jpg"
                alt="resume-template-logo"
                width={24}
                height={24}
                priority
              />{" "}
              Template 2
            </button>
            <button
              className="flex items-center justify-center gap-2 p-3 border-2 rounded-lg text-sm md:text-base w-36 overflow-hidden"
              onClick={() => setResumeTemplate("creative")}
            >
              <Image
                src="/resume-template.jpg"
                alt="resume-template-logo"
                width={24}
                height={24}
                priority
              />{" "}
              Template 3
            </button>
          </div>
        </div>
        <div className="bg-white p-6 mt-6 rounded-lg shadow-lg">
          <h2 className="flex justify-center text-2xl font-bold mb-4">
            Selected Resume Template
          </h2>
          {getSelectedTemplate()}
        </div>
      </div>
      <div className="bg-white p-6 mt-6 rounded-lg shadow-lg">
        <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
          <Image
            src="/resume.jpeg"
            alt="resume-logo"
            width={32}
            height={32}
            priority
          />{" "}
          Edit Resume
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto transition-all duration-300 ease-in-out">
          <div
            className="flex flex-col items-center sm:items-start gap-2 p-3 border rounded-md cursor-pointer w-full text-center sm:text-left"
            onClick={() => handleClick("personalInfo")}
          >
            <Image
              src="/personal-info.avif"
              alt="personal-info"
              width={24}
              height={24}
              priority
            />{" "}
            Personal Info
          </div>
          <div
            className="flex flex-col items-center sm:items-start gap-2 p-3 border rounded-md cursor-pointer w-full text-center sm:text-left"
            onClick={() => handleClick("workExperience")}
          >
            <Image
              src="/work-experience.jpeg"
              alt="work-experience"
              width={24}
              height={24}
              priority
            />{" "}
            Work Experience
          </div>
          <div
            className="flex flex-col items-center sm:items-start gap-2 p-3 border rounded-md cursor-pointer w-full text-center sm:text-left"
            onClick={() => handleClick("education")}
          >
            <Image
              src="/education.webp"
              alt="education"
              width={24}
              height={24}
              priority
            />{" "}
            Education
          </div>
          <div
            className="flex flex-col items-center sm:items-start gap-2 p-3 border rounded-md cursor-pointer w-full text-center sm:text-left"
            onClick={() => handleClick("skills")}
          >
            <Image
              src="/skills.jpg"
              alt="skills"
              width={24}
              height={24}
              priority
            />{" "}
            Skills
          </div>
          <div
            className="flex flex-col items-center sm:items-start gap-2 p-3 border rounded-md cursor-pointer w-full text-center sm:text-left"
            onClick={() => handleClick("projects")}
          >
            <Image
              src="/projects.jpg"
              alt="projects"
              width={24}
              height={24}
              priority
            />{" "}
            Projects
          </div>
          <div
            className="flex flex-col items-center sm:items-start gap-2 p-3 border rounded-md cursor-pointer w-full text-center sm:text-left"
            onClick={() => handleClick("achievements")}
          >
            <Image
              src="/achievements.png"
              alt="achievements"
              width={24}
              height={24}
              priority
            />{" "}
            Achievements
          </div>
          <div
            className="flex flex-col items-center sm:items-start gap-2 p-3 border rounded-md cursor-pointer w-full text-center sm:text-left"
            onClick={() => handleClick("certificates")}
          >
            <Image
              src="/certificates.avif"
              alt="certificates"
              width={24}
              height={24}
              style={{ width: "50px", height: "50px" }}
              priority
            />
            Certifications 
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
        <div>
          <ToastContainer />
        </div>
        <button
          onClick={handleViewResume}
          className={`px-4 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm md:text-base bg-green-500 text-white rounded-md w-32 sm:w-auto flex items-center gap-3`}
        >
          <Image
            src="/view.svg"
            alt="view"
            width={24}
            height={24}
            priority
          />{" "}
          View Resume
        </button>
        <Link href="/">
          <button className="px-4 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm md:text-base bg-gray-500 text-white rounded-md w-32 sm:w-auto flex items-center gap-3">
            <Image
              src="/home.svg"
              alt="home"
              width={24}
              height={24}
            />{" "}
            Back to Home
          </button>
        </Link>
      </div>
      {isLoggedIn && openSection === "personalInfo" && (
        <PersonalInfoForm
          userID={userID}
          setIsFormSubmitted={setIsFormSubmitted}
          closeModal={() => setOpenSection(null)}
        />
      )}

      {isLoggedIn && openSection === "workExperience" && (
        <WorkExperienceForm
          userID={userID}
          setIsFormSubmitted={setIsFormSubmitted}
          closeModal={() => setOpenSection(null)}
        />
      )}

      {isLoggedIn && openSection === "education" && (
        <EducationForm
          userID={userID}
          setIsFormSubmitted={setIsFormSubmitted}
          closeModal={() => setOpenSection(null)}
        />
      )}

      {isLoggedIn && openSection === "skills" && (
        <SkillsForm
          userID={userID}
          setIsFormSubmitted={setIsFormSubmitted}
          closeModal={() => setOpenSection(null)}
        />
      )}

      {isLoggedIn && openSection === "projects" && (
        <ProjectsForm
          userID={userID}
          setIsFormSubmitted={setIsFormSubmitted}
          closeModal={() => setOpenSection(null)}
        />
      )}

      {isLoggedIn && openSection === "achievements" && (
        <AchievementsForm
          userID={userID}
          setIsFormSubmitted={setIsFormSubmitted}
          closeModal={() => setOpenSection(null)}
        />
      )}

      {isLoggedIn && openSection === "certificates" && (
        <CertificationsForm
          userID={userID}
          setIsFormSubmitted={setIsFormSubmitted}
          closeModal={() => setOpenSection(null)}
        />
      )}
    </>
  );
}


