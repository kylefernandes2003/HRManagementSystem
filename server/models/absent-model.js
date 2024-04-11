const mongoose = require("mongoose");

const absentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Referencing the User model
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
  },
  department: {
    type: String,
  },
});

const Absent = mongoose.model("Absent", absentSchema);

module.exports = Absent;
