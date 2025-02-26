import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PersonalInfoForm({ closeModal, setIsFormSubmitted }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    professionalSummary: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = localStorage.getItem("userID");
  
    try { 
      const response = await fetch("http://localhost:5000/api/personal-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID, ...formData }),
      });
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        if (response.ok) {
          if (setIsFormSubmitted) {
            setIsFormSubmitted(true);
          }
          toast.success("Personal info saved successfully!");
          setTimeout(() => closeModal(), 2000);
        } else {
          toast.error(data.error || "Failed to save personal info.");
        }
      } catch (jsonError) {
        console.error("Unexpected response:", text);
        toast.error("Unexpected server response. Please try again.");
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
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Edit Personal Info</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              name="professionalSummary"
              placeholder="Professional Summary"
              value={formData.professionalSummary}
              onChange={handleChange}
              className="w-full p-2 border rounded h-24 resize-none"
              required
            />
            <div className="flex justify-between">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}




