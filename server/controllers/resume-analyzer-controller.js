const { spawn } = require("child_process");

const analyzeResume = (req, res) => {
  try {
    const pythonExecutablePath =
      "C:\\Users\\Kyle\\AppData\\Local\\Programs\\Python\\Python39\\python.exe"; // Replace with the full path to your Python executable

    const uploadedFilePath = req.file.path; // Use the uploaded file path directly
    // const originalFileName = req.file.originalname; // Get the original file name

    const pythonProcess = spawn(pythonExecutablePath, [
      "-u", // This flag is to force unbuffered binary stdout and stderr, which may be necessary for reading output from Python correctly
      "C:\\final_year_thapa\\server\\scripts\\resume_analyzer.py",
      uploadedFilePath,
      //   originalFileName,
    ]);

    let dataBuffer = "";

    pythonProcess.stdout.on("data", (data) => {
      dataBuffer += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error from Python script: ${data}`);
      res.status(500).json({ error: "Internal Server Error" });
    });

    pythonProcess.on("close", (code) => {
      try {
        const analysisResult = JSON.parse(dataBuffer);
        res.status(200).json(analysisResult);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  } catch (error) {
    console.error("Error analyzing resume:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = analyzeResume;
