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
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-auto transform transition-all duration-300 scale-100">
          <div className="p-6 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Ask AI for Resume Suggestions
            </h2>
            
            <div className="space-y-3">
              <textarea
                className="w-full min-h-[100px] p-3 border border-gray-200 rounded-lg text-sm sm:text-base 
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Describe your job role, skills, or ask AI to create your resume..."
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                disabled={!!aiResponse}
                rows={4}
              />

              {loading && (
                <div className="flex items-center justify-center text-blue-600 gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  <span className="text-sm font-medium">Generating suggestions...</span>
                </div>
              )}

              {aiResponse && (
                <div className="mt-4 relative">
                  <div className="bg-gray-50 rounded-lg p-4 max-h-[300px] overflow-y-auto text-sm sm:text-base">
                    <pre className="whitespace-pre-wrap font-sans">{aiResponse}</pre>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
              <button 
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 
                         bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>

              {!aiResponse ? (
                <button
                  onClick={handleGenerateResume}
                  disabled={loading}
                  className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 
                           rounded-lg transition-colors duration-200
                           ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                >
                  {loading ? "Generating..." : "Generate"}
                </button>
              ) : (
                <button
                  onClick={handleCopy}
                  className={`px-4 py-2 text-sm font-medium text-white 
                           ${copied ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}
                           rounded-lg transition-colors duration-200`}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
