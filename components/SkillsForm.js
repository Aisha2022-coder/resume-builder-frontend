import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SkillsForm({ setIsFormSubmitted, closeModal }) {
  const [skillEntries, setSkillEntries] = useState([""]);

  const handleChange = (index, e) => {
    const updatedEntries = [...skillEntries];
    updatedEntries[index] = e.target.value;
    setSkillEntries(updatedEntries);
  };

  const addSkillEntry = () => {
    setSkillEntries([...skillEntries, ""]);
  };

  const removeSkillEntry = (index) => {
    if (skillEntries.length > 1) {
      setSkillEntries(skillEntries.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = localStorage.getItem("userID");

    try {
      const response = await fetch("http://localhost:5000/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID, skills: skillEntries }),
      });

      if (response.ok) {
        if (setIsFormSubmitted) {
          setIsFormSubmitted(true);
        }
        toast.success("Skills saved successfully!");
        setTimeout(() => closeModal(), 2000);
      } else {
        toast.error("Failed to save skills.");
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
          className={`bg-white p-4 rounded-lg shadow-lg w-96 transition-all ${skillEntries.length > 3 ? "h-[70vh] overflow-y-auto" : "h-auto"
            }`}
        >
          <h2 className="text-xl font-bold mb-2">Add Skills</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            {skillEntries.map((skill, index) => (
              <div
                key={index}
                className="relative p-2 border rounded-lg bg-gray-100 transition-all flex items-center"
              >
                <input
                  type="text"
                  placeholder="Enter skill"
                  value={skill}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-1 border rounded text-sm"
                  required
                />
                {skillEntries.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSkillEntry(index)}
                    className="flex items-center gap-2 ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded"
                  ><img className="w-5 h-5" src="subtract.svg" alt="subtract" /> Remove
                  </button>
                )}
              </div>
            ))}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={addSkillEntry}
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


