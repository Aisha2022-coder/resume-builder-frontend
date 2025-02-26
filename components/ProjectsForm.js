import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProjectsForm({ setIsFormSubmitted, closeModal }) {
  const [projectEntries, setProjectEntries] = useState([
    { title: "", description: "", technologies: "", link: "", date: "" },
  ]);

  const handleChange = (index, field, e) => {
    const updatedEntries = [...projectEntries];
    updatedEntries[index][field] = e.target.value;
    setProjectEntries(updatedEntries);
  };

  const addProjectEntry = () => {
    setProjectEntries([
      ...projectEntries,
      { title: "", description: "", technologies: "", link: "", date: "" },
    ]);
  };

  const removeProjectEntry = (index) => {
    if (projectEntries.length > 1) {
      setProjectEntries(projectEntries.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = localStorage.getItem("userID");

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID, projects: projectEntries }),
      });

      if (response.ok) {
        if (setIsFormSubmitted) {
          setIsFormSubmitted(true);
        }
        toast.success("Projects saved successfully!");
        setTimeout(() => closeModal(), 2000);
      } else {
        toast.error("Failed to save projects.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Try again!");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-4 rounded-lg shadow-lg w-96 overflow-y-auto max-h-[70vh]">
          <h2 className="text-xl font-bold mb-2">Add Projects</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            {projectEntries.map((project, index) => (
              <div key={index} className="relative p-2 border rounded-lg bg-gray-100">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={project.title}
                  onChange={(e) => handleChange(index, "title", e)}
                  className="w-full p-1 border rounded text-sm mb-1"
                  required
                />
                <textarea
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) => handleChange(index, "description", e)}
                  className="w-full p-1 border rounded text-sm mb-1"
                  required
                />
                <input
                  type="text"
                  placeholder="Technologies Used"
                  value={project.technologies}
                  onChange={(e) => handleChange(index, "technologies", e)}
                  className="w-full p-1 border rounded text-sm mb-1"
                  required
                />
                <input
                  type="url"
                  placeholder="Project Link"
                  value={project.link}
                  onChange={(e) => handleChange(index, "link", e)}
                  className="w-full p-1 border rounded text-sm mb-1"
                />
                <input
                  type="date"
                  placeholder="Completion Date"
                  value={project.date}
                  onChange={(e) => handleChange(index, "date", e)}
                  className="w-full p-1 border rounded text-sm"
                  required
                />
                {projectEntries.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProjectEntry(index)}
                    className="flex items-center gap-2 mt-1 px-2 py-1 bg-red-500 text-white text-xs rounded"
                  ><img className="w-5 h-5" src="subtract.svg" alt="subtract" /> Remove
                  </button>
                )}
              </div>
            ))}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={addProjectEntry}
                className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white text-sm rounded"
              ><img className="w-5 h-5" src="add.svg" alt="add" /> Add Another
              </button>
            </div>

            <div className="flex justify-between mt-3">
              <button
                type="button"
                onClick={closeModal}
                className="px-3 py-1 bg-gray-500 text-white text-sm rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}



