"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AIModal({ isOpen, onClose }) {
  const [userQuery, setUserQuery] = useState("");
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const handleGenerateResume = async () => {
    if (!userQuery.trim()) {
      alert("Please enter a resume query.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userQuery }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (data.error) {
        alert(`API Error: ${data.error}`);
        console.error("API Error:", data.error);
      }

      setAiResponse(typeof data.aiResponse === "string" ? data.aiResponse : "Invalid AI response.");
    } catch (error) {
      console.error("Error fetching AI response:", error);
      alert("Failed to generate resume suggestions.");
    }
    setLoading(false);
  };

  const handleCopy = () => {
    if (aiResponse) {
      navigator.clipboard.writeText(aiResponse).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Ask AI for Resume Suggestions</h2>
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Describe your job role, skills, or ask AI to create your resume..."
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            disabled={!!aiResponse}
          />
          {loading && <p className="text-blue-500 mt-2">Generating suggestions...</p>}
          {aiResponse && (
            <p className="mt-4 p-2 bg-gray-100 rounded">{aiResponse}</p>
          )}
          <div className="flex justify-end gap-4 mt-4">
            <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>

            {!aiResponse ? (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleGenerateResume}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Suggestions"}
              </button>
            ) : (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleCopy}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
}
