require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router/auth-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const authControllers = require("../server/controllers/auth-controller");
const multer = require("multer");
const { spawn } = require("child_process");
const analyzeResume = require("./controllers/resume-analyzer-controller");
const fs = require("fs");
const Resume = require("./models/resume-model");

// const analyze_resume = require("./scripts/resume_analyzer.py");

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: undefined }, // Set file size limit to undefined to remove the limit
});

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/auth", router);
app.get("/api/users", authControllers.getAllUsers);
app.get("/api/transactions", authControllers.getRecentTransactions);
app.post("/api/save-resume", authControllers.saveResumeData);

app.post("/api/analyze-resume", upload.single("resume"), analyzeResume);

app.use(errorMiddleware);

const PORT = 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});
