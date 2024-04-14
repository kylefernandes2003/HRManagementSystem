import React, { useState } from "react";
import { Typography } from "@mui/material";

export const ResumeAnalyzer = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [editedResult, setEditedResult] = useState(null);

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
        setEditedResult(data);
      } else {
        console.error("HTTP Error:", response.status);
      }
    } catch (error) {
      console.error("Error analyzing resume:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedResult({ ...editedResult, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/save-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedResult),
      });

      if (response.ok) {
        console.log("Data saved successfully");
        alert("Data saved successfully");
        setEditedResult({
          name: "",
          email: "",
          phone: "",
          cgpa: "",
          comments: "",
        });
      } else {
        console.error("HTTP Error:", response.status);
      }
    } catch (error) {
      console.error("Error saving resume data:", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h1" style={{ color: "#000" }}>
        Analyze Resume
      </Typography>
      <input
        type="file"
        name="resume"
        accept=".pdf"
        onChange={handleFileChange}
        style={{ marginBottom: "10px" }}
      />
      <button
        onClick={handleAnalyzeClick}
        style={{
          display: "block",
          width: "100%",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Analyze Resume
      </button>

      {/* Display analysis result */}
      {analysisResult && (
        <div style={{ marginTop: "10px" }}>
          <Typography variant="h2" style={{ color: "#000" }}>
            Edit Analysis Result:
          </Typography>
          <div style={{ marginBottom: "10px" }}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={editedResult.name}
              onChange={handleInputChange}
              style={{
                width: "calc(100% - 10px)",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={editedResult.email}
              onChange={handleInputChange}
              style={{
                width: "calc(100% - 10px)",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={editedResult.phone}
              onChange={handleInputChange}
              style={{
                width: "calc(100% - 10px)",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>CGPA:</label>
            <input
              type="text"
              name="cgpa"
              value={editedResult.cgpa}
              onChange={handleInputChange}
              style={{
                width: "calc(100% - 10px)",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Comments:</label>
            <input
              type="text"
              name="comments"
              value={editedResult.comments}
              onChange={handleInputChange}
              style={{
                width: "calc(100% - 10px)",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <button
            onClick={handleSaveClick}
            style={{
              display: "block",
              width: "100%",
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};
