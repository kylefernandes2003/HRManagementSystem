const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Referencing the User model
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
