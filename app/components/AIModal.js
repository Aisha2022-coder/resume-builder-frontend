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
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/api/generate-resume`, {
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
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-start p-2 overflow-y-auto">
        <div className="bg-white p-3 sm:p-6 rounded-lg shadow-lg w-full max-w-md mx-auto my-2 sm:my-4">
          <h2 className="text-lg sm:text-xl font-bold mb-3">Ask AI for Resume Suggestions</h2>
          <textarea
            className="w-full p-2 border rounded text-sm sm:text-base"
            placeholder="Describe your job role, skills, or ask AI to create your resume..."
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            disabled={!!aiResponse}
            rows={3}
            style={{ minHeight: "60px" }}
          />
          {loading && <p className="text-blue-500 mt-2 text-sm">Generating suggestions...</p>}
          {aiResponse && (
            <div className="mt-3 p-2 bg-gray-100 rounded max-h-40 sm:max-h-80 overflow-y-auto text-xs sm:text-base">
              <p className="whitespace-pre-wrap">{aiResponse}</p>
            </div>
          )}
          <div className="flex flex-row justify-between gap-2 mt-3">
            <button 
              onClick={onClose} 
              className="bg-gray-500 text-white px-3 py-1.5 rounded text-sm flex-1 sm:flex-none"
            >
              Cancel
            </button>

            {!aiResponse ? (
              <button
                className="bg-blue-500 text-white px-3 py-1.5 rounded text-sm flex-1 sm:flex-none"
                onClick={handleGenerateResume}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate"}
              </button>
            ) : (
              <button
                className="bg-green-500 text-white px-3 py-1.5 rounded text-sm flex-1 sm:flex-none"
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
