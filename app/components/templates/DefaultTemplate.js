export default function DefaultTemplate({ resumeData }) {
    if (!resumeData) {
      return <p className="text-center text-red-500">No resume data available.</p>;
    }
    return (
      <div id="resume-template" className="w-full max-w-2xl mx-auto p-4 sm:p-8 bg-blue-50 shadow-lg rounded-2xl border border-blue-300 shadow-blue-200 overflow-hidden">
        <div className="text-center mb-4 sm:mb-6 p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-200 w-full break-words overflow-hidden">
          <h1 className="text-2xl sm:text-4xl font-bold text-black break-words">{resumeData.name || "Name not provided"}</h1>
          <p className="text-sm sm:text-lg text-black break-words w-full overflow-hidden text-ellipsis text-center">{resumeData.email || "Email not provided"}</p>
          <p className="text-sm sm:text-lg text-black break-words">{resumeData.phone || "Phone not provided"}</p>
          <p className="text-sm sm:text-lg text-black break-words">{resumeData.address || "Address not provided"}</p>
        </div>
  
        <div className="mt-4 sm:mt-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-black border-b pb-2 mb-3 sm:mb-4 border-blue-400">Professional Summary</h2>
          <p className="text-sm sm:text-lg text-black break-words">{resumeData.professionalSummary || "Summary not provided"}</p>
        </div>
  
        <div className="mt-4 sm:mt-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-black border-b pb-2 mb-3 sm:mb-4 border-blue-400">Work Experience</h2>
          {resumeData.workExperience?.length > 0 ? (
            resumeData.workExperience.map((job, index) => (
              <div key={index} className="mb-3 sm:mb-4 break-words">
                <h3 className="text-base sm:text-lg font-medium text-black">{job.position || "Position not provided"} - {job.company || "Company not provided"}</h3>
                <p className="text-sm sm:text-base text-black break-words">{job.duration || "Duration not provided"}</p>
                <p className="text-sm sm:text-base text-black break-words">{job.description || "Description not provided"}</p>
              </div>
            ))
          ) : (
            <p className="text-sm sm:text-base text-black break-words">No work experience added.</p>
          )}
        </div>
  
        <div className="mt-4 sm:mt-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-black border-b pb-2 mb-3 sm:mb-4 border-blue-400">Education</h2>
          {resumeData.education?.length > 0 ? (
            resumeData.education.map((edu, index) => (
              <div key={index} className="mb-3 sm:mb-4">
                <h3 className="text-base sm:text-xl font-medium text-black">{edu.degree || "Degree not provided"} - {edu.institution || "Institution not provided"}</h3>
                <p className="text-sm sm:text-base text-black italic">{edu.year || "Year not provided"}</p>
              </div>
            ))
          ) : (
            <p className="text-sm sm:text-base text-black">No education details added.</p>
          )}
        </div>
  
        <div className="mt-4 sm:mt-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-black border-b pb-2 mb-3 sm:mb-4 border-blue-400">Skills</h2>
          {resumeData.skills?.length > 0 ? (
            <ul className="list-disc list-inside text-black">
              {resumeData.skills.map((skill, index) => (
                <li key={index} className="text-sm sm:text-lg">{skill}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm sm:text-base text-black">No skills added.</p>
          )}
        </div>
  
        <div className="mt-4 sm:mt-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-black border-b pb-2 mb-3 sm:mb-4 border-blue-400">Projects</h2>
          {resumeData.projects?.length > 0 ? (
            resumeData.projects.map((project, index) => (
              <div key={index} className="mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-medium text-black">{project.title}</h3>
                <p className="text-sm sm:text-base text-black">{project.description}</p>
                <p className="text-sm sm:text-base text-black italic">{project.technologies?.join(", ")}</p>
                {project.link && (
                  <a href={project.link} className="text-sm sm:text-base text-blue-600 underline break-words" target="_blank">
                    View Project
                  </a>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm sm:text-base text-black">No projects added.</p>
          )}
        </div>
  
        <div className="mt-4 sm:mt-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-black border-b pb-2 mb-3 sm:mb-4 border-blue-400">Achievements</h2>
          {resumeData.achievements?.length > 0 ? (
            <ul className="list-disc list-inside text-black">
              {resumeData.achievements.map((achievement, index) => (
                <li key={index} className="text-sm sm:text-lg">{achievement}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm sm:text-base text-black">No achievements added.</p>
          )}
        </div>
        
        <div className="mt-4 sm:mt-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-black border-b pb-2 mb-3 sm:mb-4 border-blue-400">Certifications</h2>
          {Array.isArray(resumeData.certifications) && resumeData.certifications.length > 0 ? (
            <ul className="list-disc list-inside text-black">
              {resumeData.certifications.map((cert, index) => (
                <li key={index} className="text-sm sm:text-lg mb-2">
                  <strong>{cert.title || "Certification Title Not Provided"}</strong> -
                  {cert.provider || "Provider Not Provided"} ({cert.issueDate || "Date Not Provided"})
                  {cert.certificateUrl && (
                    <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 ml-2 break-words">
                      View Certificate
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm sm:text-base text-black">No certifications added.</p>
          )}
        </div>
      </div>
    );
  }
