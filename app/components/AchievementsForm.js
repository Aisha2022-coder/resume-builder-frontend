import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

export default function AchievementsForm({ setIsFormSubmitted, closeModal }) {
  const [achievements, setAchievements] = useState([""]);

  const handleChange = (index, e) => {
    const updatedAchievements = [...achievements];
    updatedAchievements[index] = e.target.value;
    setAchievements(updatedAchievements);
  };

  const addAchievement = () => {
    setAchievements([...achievements, ""]);
  };

  const removeAchievement = (index) => {
    if (achievements.length > 1) {
      setAchievements(achievements.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = localStorage.getItem("userID");

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/api/achievements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID, achievements }),
      });

      if (response.ok) {
        if (setIsFormSubmitted) {
          setIsFormSubmitted(true);
        }
        toast.success("Achievements saved successfully!");
        setTimeout(() => closeModal(), 2000);
      } else {
        toast.error("Failed to save achievements.");
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
          className={`bg-white p-4 rounded-lg shadow-lg w-96 transition-all ${achievements.length > 2 ? "h-[70vh] overflow-y-auto" : "h-auto"
            }`}
        >
          <h2 className="text-xl font-bold mb-2">Add Achievements</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="relative p-2 border rounded-lg bg-gray-100 transition-all">
                <textarea
                  placeholder="Enter achievement"
                  value={achievement}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-1 border rounded text-sm"
                  required
                />
                {achievements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAchievement(index)}
                    className="flex items-center gap-2 mt-1 px-2 py-1 bg-red-500 text-white text-xs rounded"
                  ><Image src="subtract.svg" alt="subtract" width={20} height={20} priority /> Remove
                  </button>
                )}
              </div>
            ))}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={addAchievement}
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


