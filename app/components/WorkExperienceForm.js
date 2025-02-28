import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

export default function WorkExperienceForm({ userID, setIsFormSubmitted, closeModal }) {
  const [workExperiences, setWorkExperiences] = useState([
    { position: "", company: "", duration: "", description: "" },
  ]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperiences = [...workExperiences];
    updatedExperiences[index][name] = value;
    setWorkExperiences(updatedExperiences);
  };

  const addWorkExperience = () => {
    setWorkExperiences([
      ...workExperiences,
      { position: "", company: "", duration: "", description: "" },
    ]);
  };

  const removeWorkExperience = (index) => {
    if (workExperiences.length > 1) {
      const updatedExperiences = workExperiences.filter((_, i) => i !== index);
      setWorkExperiences(updatedExperiences);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/api/work-experience`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userID,
          workExperience: workExperiences
        }),
      });

      console.log(response);

      if (response.ok) {
        if (setIsFormSubmitted) {
          setIsFormSubmitted(true);
        }
        toast.success("Work experiences saved successfully!");
        setTimeout(() => closeModal(), 2000);
      } else {
        toast.error("Failed to save work experiences.");
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
        <div
          className={`bg-white p-4 rounded-lg shadow-lg w-96 transition-all ${workExperiences.length > 2 ? "h-[70vh] overflow-y-auto" : "h-auto"
            }`}
        >
          <h2 className="text-xl font-bold mb-2">Add Work Experience</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            {workExperiences.map((experience, index) => (
              <div
                key={index}
                className="relative p-2 border rounded-lg bg-gray-100 transition-all"
              >
                <input
                  type="text"
                  name="position"
                  placeholder="Job Title"
                  value={experience.position}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-1 border rounded mb-1 text-sm"
                  required
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={experience.company}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-1 border rounded mb-1 text-sm"
                  required
                />
                <input
                  type="text"
                  name="duration"
                  placeholder="Duration (e.g., Jan 2020 - Present)"
                  value={experience.duration}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-1 border rounded mb-1 text-sm"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Job Description"
                  value={experience.description}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-1 border rounded mb-1 text-sm h-16 resize-none"
                  required
                />
                <div className="flex justify-end">
                  {workExperiences.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeWorkExperience(index)}
                      className="flex items-center gap-2 px-2 py-1 bg-red-500 text-white text-xs rounded"
                    ><Image src="subtract.svg" alt="subtract" width={20} height={20} priority /> Remove
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={addWorkExperience}
                className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white text-sm rounded"
              ><Image src="add.svg" alt="add" width={20} height={20} priority /> Add Another
              </button>
            </div>

            <div className="flex justify-between mt-3">
              <button type="button" onClick={closeModal} className="px-3 py-1 bg-gray-500 text-white text-sm rounded">
                Cancel
              </button>
              <button type="submit" className="px-3 py-1 bg-blue-500 text-white text-sm rounded">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}



