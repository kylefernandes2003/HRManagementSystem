const User = require("../models/user-model");
const Turnover = require("../models/turnover-model");
const bcrypt = require("bcryptjs");
const Absent = require("../models/absent-model");
const Transaction = require("../models/transaction-model");
const Resume = require("../models/resume-model");

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to homepage using controller");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    console.log(req.body);
    const {
      username,
      email,
      phone,
      age,
      address,
      position,
      department,
      password,
    } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "email already exists" });
    }

    //const saltRound = 10;
    //const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      email,
      phone,
      age,
      address,
      position,
      department,
      password,
    });

    res.status(201).json({
      message: "Registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(400).json({ msg: "page not found" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //const user = await bcrypt.compare(password, userExist.password);
    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(200).json({
        message: "Login successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addTurnover = async (req, res) => {
  try {
    const { user_id, start_date, end_date, reason_for_leaving } = req.body;

    const turnover = await Turnover.create({
      user_id,
      start_date,
      end_date,
      reason_for_leaving,
    });

    // await User.findByIdAndDelete(user_id);

    res.status(201).json({ message: "Turnover data added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addAbsentData = async (req, res) => {
  try {
    const { user_id, date, name, department } = req.body;

    const absent = await Absent.create({
      user_id,
      date,
      name,
      department,
    });

    // await User.findByIdAndDelete(user_id);

    res.status(201).json({ message: "Absenteeism data added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addTransaction = async (req, res) => {
  try {
    const { user_id, username, date, cost } = req.body;

    const transaction = await Transaction.create({
      user_id,
      username,
      date,
      cost,
    });

    res.status(201).json({ message: "Transaction data added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getRecentTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 }).limit(10); // Fetch recent transactions sorted by date
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching recent transactions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTurnoverDataWithDepartments = async (req, res) => {
  try {
    const turnoverData = await getTurnoverData(); // Call the function to get turnover data

    res.status(200).json(turnoverData); // Send the turnover rate data as a response
  } catch (error) {
    console.error("Error fetching turnover data with departments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTurnoverData = async () => {
  try {
    const usersData = await User.find({}, { department: 1 }); // Fetch only the department field from users
    const turnoverData = await Turnover.find();

    const turnoverByDepartment = {};

    // Count turnovers by department
    turnoverData.forEach((turnover) => {
      const { user_id } = turnover;
      const user = usersData.find((user) => user._id.equals(user_id));
      const department = user ? user.department : null;

      if (department) {
        if (!turnoverByDepartment[department]) {
          turnoverByDepartment[department] = 1;
        } else {
          turnoverByDepartment[department]++;
        }
      }
    });

    // Calculate turnover rate by department
    const totalEmployeesByDepartment = {};
    const turnoverWithRates = [];

    usersData.forEach((user) => {
      const { department } = user;
      if (department) {
        if (!totalEmployeesByDepartment[department]) {
          totalEmployeesByDepartment[department] = 1;
        } else {
          totalEmployeesByDepartment[department]++;
        }
      }
    });

    Object.keys(turnoverByDepartment).forEach((department) => {
      const turnoverCount = turnoverByDepartment[department];
      const totalEmployees = totalEmployeesByDepartment[department];
      const turnoverRate = (turnoverCount / totalEmployees) * 100;

      turnoverWithRates.push({
        department,
        turnoverRate: parseFloat(turnoverRate.toFixed(2)), // Round to 2 decimal places
      });
    });
    // console.log(turnoverWithRates);
    return turnoverWithRates;
  } catch (error) {
    console.error("Error fetching turnover data with departments:", error);
    throw error; // Handle error appropriately
  }
};

const getMonthName = (monthNumber) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthNumber - 1]; // Month numbers start from 1
};

const getAbsenteeismDataByDepartment = async (req, res) => {
  try {
    // Fetch absenteeism data from the database
    const absenteeismData = await Absent.aggregate([
      {
        $group: {
          _id: {
            department: "$department",
            month: { $month: "$date" },
            year: { $year: "$date" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          department: "$_id.department",
          month: "$_id.month",
          year: "$_id.year",
          count: 1,
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);

    // Format data for the line chart
    const formattedData = {};

    absenteeismData.forEach((item) => {
      const { department, month, year, count } = item;
      if (!formattedData[department]) {
        formattedData[department] = {};
      }
      formattedData[department][month] = count;
    });

    const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);

    // Prepare data array for each department
    const chartData = Object.keys(formattedData).map((department) => ({
      id: department,
      data: allMonths.map((month) => ({
        x: getMonthName(month),
        y: formattedData[department][month] || 0,
      })),
    }));

    // Send formatted data as response
    res.status(200).json(chartData);
  } catch (error) {
    console.error("Error fetching absenteeism data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAgeDistribution = async (req, res) => {
  try {
    const ageDistribution = await User.aggregate([
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $lte: [{ $toInt: "$age" }, 20] }, then: "Under 20" },
                {
                  case: {
                    $and: [
                      { $gt: [{ $toInt: "$age" }, 20] },
                      { $lte: [{ $toInt: "$age" }, 30] },
                    ],
                  },
                  then: "20-30",
                },
                {
                  case: {
                    $and: [
                      { $gt: [{ $toInt: "$age" }, 30] },
                      { $lte: [{ $toInt: "$age" }, 40] },
                    ],
                  },
                  then: "31-40",
                },
                {
                  case: {
                    $and: [
                      { $gt: [{ $toInt: "$age" }, 40] },
                      { $lte: [{ $toInt: "$age" }, 50] },
                    ],
                  },
                  then: "41-50",
                },
                { case: { $gt: [{ $toInt: "$age" }, 50] }, then: "Over 50" },
              ],
              default: "Unknown",
            },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    const ageDistributionData = ageDistribution.map(({ _id, count }) => ({
      ageCategory: _id,
      count,
    }));
    console.log(ageDistributionData);
    res.status(200).json(ageDistributionData);
  } catch (error) {
    console.error("Error fetching age distribution:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const saveResumeData = async (req, res) => {
  try {
    const { name, email, phone, cgpa, comments } = req.body;

    const resume = await Resume.create({
      username: name,
      email,
      phone,
      cgpa,
      comments,
    });

    // await User.findByIdAndDelete(user_id);

    res.status(201).json({ message: "Resume added successfully" });
  } catch (error) {
    console.error("Error saving resume data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  home,
  register,
  login,
  getAllUsers,
  getUserById,
  addTurnover,
  addAbsentData,
  addTransaction,
  getRecentTransactions,
  getTurnoverDataWithDepartments,
  getAbsenteeismDataByDepartment,
  getAgeDistribution,
  saveResumeData,
};
