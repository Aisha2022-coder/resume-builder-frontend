import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

export default function EducationForm({ setIsFormSubmitted, closeModal }) {
  const [educationEntries, setEducationEntries] = useState([
    { degree: "", institution: "", year: "", grade: "" },
  ]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEntries = [...educationEntries];
    updatedEntries[index][name] = value;
    setEducationEntries(updatedEntries);
  };

  const addEducationEntry = () => {
    setEducationEntries([
      ...educationEntries,
      { degree: "", institution: "", year: "", grade: "" },
    ]);
  };

  const removeEducationEntry = (index) => {
    if (educationEntries.length > 1) {
      const updatedEntries = educationEntries.filter((_, i) => i !== index);
      setEducationEntries(updatedEntries);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = localStorage.getItem("userID");

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/api/education`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID, education: educationEntries }),
      });

      if (response.ok) {
        if (setIsFormSubmitted) {
          setIsFormSubmitted(true);
        }
        toast.success("Education details saved successfully!");
        setTimeout(() => closeModal(), 2000);
      } else {
        toast.error("Failed to save education details.");
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
          className={`bg-white p-4 rounded-lg shadow-lg w-96 transition-all ${educationEntries.length > 2 ? "h-[70vh] overflow-y-auto" : "h-auto"
            }`}
        >
          <h2 className="text-xl font-bold mb-2">Add Education</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            {educationEntries.map((entry, index) => (
              <div
                key={index}
                className="relative p-2 border rounded-lg bg-gray-100 transition-all"
              >
                <input
                  type="text"
                  name="degree"
                  placeholder="Degree"
                  value={entry.degree}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-1 border rounded mb-1 text-sm"
                  required
                />
                <input
                  type="text"
                  name="institution"
                  placeholder="Institution Name"
                  value={entry.institution}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-1 border rounded mb-1 text-sm"
                  required
                />
                <input
                  type="text"
                  name="year"
                  placeholder="Year of Completion"
                  value={entry.year}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-1 border rounded mb-1 text-sm"
                  required
                />
                <input
                  type="text"
                  name="grade"
                  placeholder="Grade / Percentage"
                  value={entry.grade}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-1 border rounded mb-1 text-sm"
                  required
                />
                <div className="flex justify-end">
                  {educationEntries.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEducationEntry(index)}
                      className="flex items-center gap-2 px-2 py-1 bg-red-500 text-white text-xs rounded"
                    ><Image src="subtract.svg" alt="subtract" width={20} height={20} priority />Remove
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={addEducationEntry}
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


