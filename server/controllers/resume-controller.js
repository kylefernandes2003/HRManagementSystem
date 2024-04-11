const { spawn } = require("child_process");

const analyzeResume = (resumeFile) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", [
      "controllers/resume_analyzer.py",
      resumeFile.path,
    ]);

    let result = "";

    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      reject(data.toString());
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        try {
          resolve(JSON.parse(result));
        } catch (error) {
          reject("Error parsing JSON result");
        }
      } else {
        reject("Python script execution failed");
      }
    });
  });
};

module.exports = { analyzeResume };
