const mongoose = require("mongoose");

const turnoverSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Referencing the User model
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
  },
  reason_for_leaving: {
    type: String,
  },
});

const Turnover = mongoose.model("Turnover", turnoverSchema);

module.exports = Turnover;
