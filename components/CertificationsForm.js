import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CertificationsForm({ setIsFormSubmitted, closeModal }) {
  const [certifications, setCertifications] = useState([
    { title: "", provider: "", issueDate: "", certificateUrl: "" },
  ]);

  const handleChange = (index, e) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index][e.target.name] = e.target.value;
    setCertifications(updatedCertifications);
  };

  const addCertification = () => {
    setCertifications([...certifications, { title: "", provider: "", issueDate: "", certificateUrl: "" }]);
  };

  const removeCertification = (index) => {
    if (certifications.length > 1) {
      setCertifications(certifications.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = localStorage.getItem("userID");

    try {
      const response = await fetch("http://localhost:5000/api/certifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID, certifications }),
      });

      if (response.ok) {
        if (setIsFormSubmitted) {
          setIsFormSubmitted(true); 
        }
        toast.success("Certifications saved successfully!");
        setTimeout(() => closeModal(), 2000); 
      } else {
        toast.error("Failed to save certifications.");
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
          className={`bg-white p-4 rounded-lg shadow-lg w-96 transition-all ${certifications.length > 2 ? "h-[70vh] overflow-y-auto" : "h-auto"
            }`}
        >
          <h2 className="text-xl font-bold mb-2">Add Certifications</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            {certifications.map((certification, index) => (
              <div key={index} className="p-2 border rounded-lg bg-gray-100 transition-all">
                <input
                  type="text"
                  name="title"
                  placeholder="Certification Title"
                  value={certification.title}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-2 border rounded text-sm mb-2"
                  required
                />
                <input
                  type="text"
                  name="provider"
                  placeholder="Provider (e.g., Coursera, Udemy)"
                  value={certification.provider}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-2 border rounded text-sm mb-2"
                  required
                />
                <input
                  type="date"
                  name="issueDate"
                  value={certification.issueDate}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-2 border rounded text-sm mb-2"
                  required
                />
                <input
                  type="url"
                  name="certificateUrl"
                  placeholder="Certificate URL (Optional)"
                  value={certification.certificateUrl}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-2 border rounded text-sm"
                />
                {certifications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCertification(index)}
                    className="flex items-center gap-2 mt-2 px-2 py-1 bg-red-500 text-white text-xs rounded"
                  ><img className="w-5 h-5" src="subtract.svg" alt="subtract" /> Remove
                  </button>
                )}
              </div>
            ))}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={addCertification}
                className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white text-sm rounded"
              ><img className="w-5 h-5" src="add.svg" alt="add" />Add Another
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



