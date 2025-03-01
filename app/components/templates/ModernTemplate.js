export default function ModernTemplate({ resumeData }) {
  return (
    <div id="resume-template" className="w-full max-w-3xl mx-auto p-4 sm:p-10 bg-gray-100 shadow-xl rounded-lg border border-gray-500">
      <div className="text-center bg-blue-600 text-white p-4 sm:p-6 rounded-t-lg">
        <h1 className="text-3xl sm:text-5xl font-extrabold break-words">{resumeData?.name || "Your Name"}</h1>
        <p className="text-sm sm:text-lg mt-2 break-words">
          {resumeData?.email || "your.email@example.com"} | {resumeData?.phone || "123-456-7890"} | {resumeData?.address || "Your Address"}
        </p>
      </div>

      <div className="mt-6 sm:mt-8 px-3 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-600 border-b-2 border-blue-300 pb-2 mb-3 sm:mb-4">Work Experience</h2>
        {resumeData?.workExperience?.length > 0 ? (
          resumeData.workExperience.map((job, index) => (
            <div key={index} className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-700">{job?.position || "Position"} - {job?.company || "Company"}</h3>
              <p className="text-sm sm:text-base text-gray-500 italic">{job?.duration || "Duration"}</p>
              <p className="text-sm sm:text-base text-gray-700 mt-2 break-words">{job?.description || "Job description goes here."}</p>
            </div>
          ))
        ) : (
          <p className="text-sm sm:text-lg text-gray-700">No work experience added.</p>
        )}
      </div>

      <div className="mt-6 sm:mt-8 px-3 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-600 border-b-2 border-blue-300 pb-2 mb-3 sm:mb-4">Education</h2>
        {resumeData?.education?.length > 0 ? (
          resumeData.education.map((edu, index) => (
            <div key={index} className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-700">{edu?.degree || "Degree"} - {edu?.institution || "Institution"}</h3>
              <p className="text-sm sm:text-base text-gray-500 italic">{edu?.year || "Year"}</p>
            </div>
          ))
        ) : (
          <p className="text-sm sm:text-lg text-gray-700">No education details added.</p>
        )}
      </div>

      <div className="mt-6 sm:mt-8 px-3 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-600 border-b-2 border-blue-300 pb-2 mb-3 sm:mb-4">Skills</h2>
        {resumeData.skills?.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-gray-700">
            {resumeData.skills.map((skill, index) => (
              <li key={index} className="text-sm sm:text-lg">{skill}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm sm:text-lg text-gray-700">No skills added.</p>
        )}
      </div>

      <div className="mt-6 sm:mt-8 px-3 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-600 border-b-2 border-blue-300 pb-2 mb-3 sm:mb-4">Projects</h2>
        {resumeData?.projects?.length > 0 ? (
          resumeData.projects.map((project, index) => (
            <div key={index} className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-700">{project?.title || "Project Title"}</h3>
              <p className="text-sm sm:text-base text-gray-500 italic break-words">{project?.description || "Project description goes here."}</p>
              <p className="text-sm sm:text-base text-gray-500 italic">{project?.technologies?.join(", ") || "Technologies used"}</p>
              {project?.link && (
                <a href={project.link} className="text-sm sm:text-base text-blue-500 underline break-words" target="_blank">
                  View Project
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm sm:text-lg text-gray-700">No projects added.</p>
        )}
      </div>

      <div className="mt-6 sm:mt-8 px-3 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-600 border-b-2 border-blue-300 pb-2 mb-3 sm:mb-4">Achievements</h2>
        {resumeData.achievements?.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700">
            {resumeData.achievements.map((achievement, index) => (
              <li key={index} className="text-sm sm:text-lg mb-2">{achievement}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm sm:text-lg text-gray-700">No achievements added.</p>
        )}
      </div>

      <div className="mt-6 sm:mt-8 px-3 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-600 border-b-2 border-blue-300 pb-2 mb-3 sm:mb-4">Certifications</h2>
        {Array.isArray(resumeData.certifications) && resumeData.certifications.length > 0 ? (
          <ul className="space-y-2">
            {resumeData.certifications.map((cert, index) => (
              <li key={index} className="text-sm sm:text-lg text-gray-700">
                <strong>{cert.title || "Certification Title"}</strong> - {cert.provider || "Provider"} ({cert.issueDate || "Date"})
                {cert.certificateUrl && (
                  <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 ml-2 break-words">
                    View Certificate
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm sm:text-lg text-gray-700">No certifications added.</p>
        )}
      </div>
    </div>
  );
}



