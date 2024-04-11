import React, { useState } from "react";

export const ResumeAnalyzer = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.type === "application/pdf") {
      setResumeFile(file);
    } else {
      alert("Please select a PDF file.");
    }
  };

  const handleAnalyzeClick = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", resumeFile, resumeFile.name);

      const response = await fetch("http://localhost:5000/api/analyze-resume", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysisResult(data);
      } else {
        console.error("HTTP Error:", response.status);
      }
    } catch (error) {
      console.error("Error analyzing resume:", error);
    }
  };

  return (
    <div>
      <input
        type="file"
        name="resume"
        accept=".pdf"
        onChange={handleFileChange}
      />
      <button onClick={handleAnalyzeClick}>Analyze Resume</button>

      {/* Display analysis result */}
      {analysisResult && (
        <div>
          <h2>Analysis Result:</h2>
          <p>Name: {analysisResult.name}</p>
          <p>Email: {analysisResult.email}</p>
          <p>Phone: {analysisResult.phone}</p>
        </div>
      )}
    </div>
  );
};
