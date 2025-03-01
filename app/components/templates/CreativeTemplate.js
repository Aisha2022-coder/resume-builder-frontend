export default function CreativeTemplate({ resumeData = {} }) {
  return (
    <div id="resume-template" className="w-full max-w-3xl mx-auto p-4 sm:p-10 bg-gradient-to-br from-purple-600 to-blue-500 text-white shadow-2xl rounded-lg">
      <div className="text-center bg-white text-gray-900 p-4 sm:p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl sm:text-5xl font-extrabold break-words">{resumeData?.name || "Your Name"}</h1>
        <p className="text-sm sm:text-lg mt-2 font-medium break-words">
          {resumeData?.email || "your.email@example.com"} | {resumeData?.phone || "123-456-7890"} | {resumeData?.address || "Your Address"}
        </p>
      </div>

      <div className="mt-6 sm:mt-10 px-3 sm:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold border-b-2 border-white pb-2 mb-3 sm:mb-4 break-words">Professional Summary</h2>
        <p className="bg-white text-gray-900 p-3 sm:p-4 rounded-lg shadow-md text-sm sm:text-lg break-words">
          {resumeData?.aiGeneratedResume || resumeData?.professionalSummary || "Add your professional summary here."}
        </p>
      </div>

      <div className="mt-6 sm:mt-10 px-3 sm:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold border-b-2 border-white pb-2 mb-3 sm:mb-4 break-words">Work Experience</h2>
        {resumeData?.workExperience?.length > 0 ? (
          resumeData.workExperience.map((job, index) => (
            <div key={index} className="mb-4 sm:mb-6 bg-white text-gray-900 p-3 sm:p-4 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-bold">{job?.position || "Position"} - {job?.company || "Company"}</h3>
              <p className="text-sm sm:text-base text-gray-500 italic">{job?.duration || "Duration"}</p>
              <p className="text-sm sm:text-base text-gray-700 mt-2 break-words">{job?.description || "Job description goes here."}</p>
            </div>
          ))
        ) : (
          <p className="text-sm sm:text-lg text-white">No work experience added.</p>
        )}
      </div>

      <div className="mt-6 sm:mt-10 px-3 sm:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold border-b-2 border-white pb-2 mb-3 sm:mb-4 break-words">Education</h2>
        {resumeData?.education?.length > 0 ? (
          resumeData.education.map((edu, index) => (
            <div key={index} className="mb-4 sm:mb-6 bg-white text-gray-900 p-3 sm:p-4 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-bold">{edu?.degree || "Degree"} - {edu?.institution || "Institution"}</h3>
              <p className="text-sm sm:text-base text-gray-500 italic">{edu?.year || "Year"}</p>
            </div>
          ))
        ) : (
          <p className="text-sm sm:text-lg text-white">No education details added.</p>
        )}
      </div>

      <div className="mt-6 sm:mt-10 px-3 sm:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold border-b-2 border-white pb-2 mb-3 sm:mb-4 break-words">Skills</h2>
        {resumeData.skills?.length > 0 ? (
          <div className="bg-white text-gray-900 p-3 sm:p-4 rounded-lg shadow-md">
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {resumeData.skills.map((skill, index) => (
                <li key={index} className="text-sm sm:text-lg font-bold">{skill}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm sm:text-lg text-white">No skills added.</p>
        )}
      </div>

      <div className="mt-6 sm:mt-10 px-3 sm:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold border-b-2 border-white pb-2 mb-3 sm:mb-4 break-words">Projects</h2>
        {resumeData?.projects?.length > 0 ? (
          resumeData.projects.map((project, index) => (
            <div key={index} className="bg-white text-gray-900 p-3 sm:p-4 rounded-lg shadow-md mb-4">
              <h3 className="text-lg sm:text-xl font-bold">{project?.title || "Project Title"}</h3>
              <p className="text-sm sm:text-base text-gray-700 mt-2 break-words">{project?.description || "Project description goes here."}</p>
              <p className="text-sm sm:text-base text-gray-500 italic">{project?.technologies?.join(", ") || "Technologies used"}</p>
              {project?.link && (
                <a href={project.link} className="text-sm sm:text-base text-blue-500 underline break-words" target="_blank">
                  View Project
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm sm:text-lg text-white">No projects added.</p>
        )}
      </div>

      <div className="mt-6 sm:mt-10 px-3 sm:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold border-b-2 border-white pb-2 mb-3 sm:mb-4 break-words">Achievements</h2>
        {resumeData.achievements?.length > 0 ? (
          <div className="bg-white text-gray-900 p-3 sm:p-4 rounded-lg shadow-md">
            <ul className="space-y-2">
              {resumeData.achievements.map((achievement, index) => (
                <li key={index} className="text-sm sm:text-lg">{achievement}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm sm:text-lg text-white">No achievements added.</p>
        )}
      </div>

      <div className="mt-6 sm:mt-10 px-3 sm:px-6 pb-6 sm:pb-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold border-b-2 border-white pb-2 mb-3 sm:mb-4 break-words">Certifications</h2>
        {Array.isArray(resumeData.certifications) && resumeData.certifications.length > 0 ? (
          <div className="bg-white text-gray-900 p-3 sm:p-4 rounded-lg shadow-md">
            <ul className="space-y-2">
              {resumeData.certifications.map((cert, index) => (
                <li key={index} className="text-sm sm:text-lg">
                  <strong>{cert.title || "Certification Title Not Provided"}</strong> - {cert.provider || "Provider Not Provided"} ({cert.issueDate || "Date Not Provided"})
                  {cert.certificateUrl && (
                    <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 ml-2 break-words">
                      View Certificate
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm sm:text-lg text-white">No certifications added.</p>
        )}
      </div>
    </div>
  );
}


