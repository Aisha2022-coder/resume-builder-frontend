export default function ModernTemplate({ resumeData }) {
  return (
    <div id="resume-template" className="max-w-3xl mx-auto p-10 bg-gray-100 shadow-xl rounded-lg border border-gray-500">
      <div className="text-center bg-blue-600 text-white p-6 rounded-t-lg">
        <h1 className="text-5xl font-extrabold">{resumeData?.name || "Your Name"}</h1>
        <p className="text-lg mt-2">
          {resumeData?.email || "your.email@example.com"} | {resumeData?.phone || "123-456-7890"} | {resumeData?.address || "Your Address"}
        </p>
      </div>

      <div className="mt-8 px-6">
        <h2 className="text-3xl font-semibold text-blue-600 border-b-2 border-blue-300 pb-2 mb-4">Work Experience</h2>
        {resumeData?.workExperience?.length > 0 ? (
          resumeData.workExperience.map((job, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-bold text-gray-700">{job?.position || "Position"} - {job?.company || "Company"}</h3>
              <p className="text-gray-500 italic">{job?.duration || "Duration"}</p>
              <p className="text-gray-700 mt-2">{job?.description || "Job description goes here."}</p>
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-700">No work experience added.</p>
        )}
      </div>

      <div className="mt-8 px-6">
        <h2 className="text-3xl font-semibold text-blue-600 border-b-2 border-blue-300 pb-2 mb-4">Education</h2>
        {resumeData?.education?.length > 0 ? (
          resumeData.education.map((edu, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-bold text-gray-700">{edu?.degree || "Degree"} - {edu?.institution || "Institution"}</h3>
              <p className="text-gray-500 italic">{edu?.year || "Year"}</p>
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-700">No education details added.</p>
        )}
      </div>

      <div className="mt-8 px-6">
        <h2 className="text-3xl font-semibold text-blue-600 border-b-2 border-blue-300 pb-2 mb-4">Skills</h2>
        {resumeData.skills?.length > 0 ? (
          <ul className="mb-6 text-xl font-bold text-gray-700">
            {resumeData.skills.map((skill, index) => (
              <li key={index} className="text-lg">{skill}</li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-700">No skills added.</p>
        )}
      </div>

      <div className="mt-8 px-6">
        <h2 className="text-3xl font-semibold text-blue-600 border-b-2 border-blue-300 pb-2 mb-4">Projects</h2>
        {resumeData?.projects?.length > 0 ? (
          resumeData.projects.map((project, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-bold text-gray-700">{project?.title || "Project Title"}</h3>
              <p className="text-gray-500 italic">{project?.description || "Project description goes here."}</p>
              <p className="text-gray-500 italic">{project?.technologies?.join(", ") || "Technologies used"}</p>
              {project?.link && <a href={project.link} className="text-blue-500 underline" target="_blank">View Project</a>}
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-700">No projects added.</p>
        )}
      </div>

      <div className="mt-8 px-6">
        <h2 className="text-3xl font-semibold text-blue-600 border-b-2 border-blue-300 pb-2 mb-4">Achievements</h2>
        {resumeData.achievements?.length > 0 ? (
          <ul className="mb-6 text-xl font-bold text-gray-700">
            {resumeData.achievements.map((achievement, index) => (
              <li key={index} className="text-lg">{achievement}</li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-700">No achievements added.</p>
        )}
      </div>

      <div className="mt-8 px-6">
        <h2 className="text-3xl font-semibold text-blue-600 border-b-2 border-blue-300 pb-2 mb-4">Certifications</h2>
        {Array.isArray(resumeData.certifications) && resumeData.certifications.length > 0 ? (
          <ul className="mb-6 text-xl font-bold text-gray-700">
            {resumeData.certifications.map((cert, index) => (
              <li key={index} className="text-lg">
                <strong>{cert.title || "Certification Title"}</strong> - {cert.provider || "Provider"} ({cert.issueDate || "Date"})
                {cert.certificateUrl && (
                  <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 ml-2">
                    View Certificate
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-700">No certifications added.</p>
        )}
      </div>
    </div>
  );
}


