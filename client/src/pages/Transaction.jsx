import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";

export const Transaction = () => {
  const [transactionData, setTransactionData] = useState({
    user_id: "",
    username: "",
    date: "",
    cost: "",
  });
  const [userIds, setUserIds] = useState([]);

  useEffect(() => {
    const fetchUserIds = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        if (response.ok) {
          const data = await response.json();
          const userIds = data.map((user) => user._id);
          setUserIds(userIds);
        } else {
          console.error("Failed to fetch user IDs");
        }
      } catch (error) {
        console.error("Error fetching user IDs:", error);
      }
    };

    fetchUserIds();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setTransactionData({
      ...transactionData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/transaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transactionData),
        }
      );
      if (response.ok) {
        alert("Transaction data added successfully");
        setTransactionData({
          user_id: "",
          username: "",
          date: "",
          cost: "",
        });
      } else {
        console.error("Failed to add transaction data");
      }
    } catch (error) {
      console.error("Error adding transaction data:", error);
    }
  };

  const validateForm = () => {
    return (
      transactionData.user_id &&
      transactionData.username &&
      transactionData.date &&
      transactionData.cost &&
      !isNaN(transactionData.cost)
    );
  };

  return (
    <Box marginLeft={10} marginRight={10} marginTop={10}>
      <Typography variant="h2" mb={2}>
        Add Transaction
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          select
          name="user_id"
          label="User ID"
          value={transactionData.user_id}
          onChange={handleInput}
          fullWidth
          required
          mb={2}
        >
          {userIds.map((userId) => (
            <MenuItem key={userId} value={userId}>
              {userId}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="username"
          label="Username"
          value={transactionData.username}
          onChange={handleInput}
          fullWidth
          required
          mb={2}
        />
        <TextField
          name="date"
          label="Date"
          type="date"
          value={transactionData.date}
          onChange={handleInput}
          fullWidth
          required
          mb={2}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          name="cost"
          label="Cost"
          type="number"
          value={transactionData.cost}
          onChange={handleInput}
          fullWidth
          required
          mb={2}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!validateForm()}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};
