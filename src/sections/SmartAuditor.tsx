"use client";
import { useState } from "react";
import { FileText } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
  console.warn(
    "Gemini API key is missing. Make sure to set NEXT_PUBLIC_GEMINI_API_KEY in your environment variables."
  );
}

export default function SmartAuditor() {
  const [inputCode, setInputCode] = useState("");
  const [optimizedCode, setOptimizedCode] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAudit = async () => {
    if (!apiKey) {
      console.error("Missing API key for Gemini AI.");
      setOptimizedCode("Error generating contract. Please try again later.");
      return;
    }
  
    setIsGenerating(true);
  
    const prompt = `Optimize the following smart contract code and provide suggestions for improvement:
    \n${inputCode}\nEnsure the optimized code follows best practices and security measures.`;
  
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
      const response = await model.generateContent(prompt);
  
      // ✅ Correct way to extract the response text
      const responseText = response.response.text(); 
  
      setOptimizedCode(responseText);
      setSuggestions(
        "- Follow security best practices\n- Optimize gas consumption\n- Remove redundant logic"
      );
    } catch (error) {
      console.error("Error generating contract:", error);
      setOptimizedCode("Error generating contract. Please try again later.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-black px-4 sm:px-10 lg:px-20 overflow-auto">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-6 w-full max-w-7xl h-full max-h-screen p-4 md:p-6">

        {/* Input Code Section */}
        <div className="p-4 md:p-6 rounded-lg shadow-lg min-h-[200px] flex flex-col bg-black border border-green-400">
          <textarea
            className="w-full h-full p-2 md:p-3 bg-transparent border border-green-400 rounded-md resize-none focus:outline-none text-sm md:text-base"
            placeholder="Paste your smart contract or smart oracle to optimize..."
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
          />
        </div>

        {/* Optimized Code Section */}
        <div className="relative p-4 md:p-6 rounded-lg shadow-lg min-h-[200px] flex flex-col bg-black border border-green-400">
          <button
            className="absolute top-2 right-2 md:top-3 md:right-3 text-green-600 hover:text-blue-500"
            onClick={() => copyToClipboard(optimizedCode)}
          >
            <FileText size={20} />
          </button>
          <textarea
            className="w-full h-full p-2 md:p-3 bg-transparent border border-green-400 rounded-md resize-none focus:outline-none text-sm md:text-base"
            placeholder="Your improved code appears here..."
            value={optimizedCode}
            readOnly
          />
        </div>

        {/* Audit & Suggestions Section */}
        <div className="flex flex-col">
          <div className="p-4 md:p-6 rounded-lg shadow-lg text-center font-semibold bg-black border border-green-400 text-sm md:text-lg">
            Audit Contracts
          </div>
          <div className="relative p-4 md:p-6 mt-2 md:mt-4 rounded-lg shadow-lg flex-grow min-h-[150px] md:min-h-[200px] bg-black border border-green-400">
            <button
              className="absolute top-2 right-2 md:top-3 md:right-3 text-green-600 hover:text-blue-500"
              onClick={() => copyToClipboard(suggestions)}
            >
              <FileText size={20} />
            </button>
            <textarea
              className="w-full h-full p-2 md:p-3 bg-transparent border border-green-400 rounded-md resize-none focus:outline-none text-sm md:text-base"
              placeholder="Suggestions go here..."
              value={suggestions}
              readOnly
            />
          </div>
          <button
  onClick={handleAudit}
  className="mt-2 md:mt-4 p-2 md:p-3 bg-blue-500 text-green-100 rounded-lg shadow-md hover:bg-blue-600 transition-all text-sm md:text-base w-full max-w-sm md:max-w-md text-center whitespace-nowrap"
  disabled={isGenerating}
>
  {isGenerating ? "Generating..." : "Audit & Improve"}
</button>

        </div>
      </div>
    </div>
  );
}
