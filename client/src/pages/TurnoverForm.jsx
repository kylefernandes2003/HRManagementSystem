import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";

export const TurnoverForm = () => {
  const [turnoverData, setTurnoverData] = useState({
    user_id: "",
    start_date: "",
    end_date: "",
    reason_for_leaving: "",
  });
  const [userIds, setUserIds] = useState([]);
  const [reasonsForLeaving, setReasonsForLeaving] = useState([
    "Retirement",
    "Resignation",
    "Layoff",
    "Termination",
    "Other",
  ]);

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
    setTurnoverData({
      ...turnoverData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/turnover", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(turnoverData),
      });
      if (response.ok) {
        alert("Turnover data added successfully");
        setTurnoverData({
          user_id: "",
          start_date: "",
          end_date: "",
          reason_for_leaving: "",
        });
      } else {
        console.error("Failed to add turnover data");
      }
    } catch (error) {
      console.error("Error adding turnover data:", error);
    }
  };

  return (
    <Box marginLeft={10} marginRight={10} marginTop={10}>
      <Typography variant="h2" mb={2}>
        Add Employee Leave Date
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          select
          name="user_id"
          label="User ID"
          value={turnoverData.user_id}
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
          name="start_date"
          label="Start Date"
          type="date"
          value={turnoverData.start_date}
          onChange={handleInput}
          fullWidth
          required
          mb={2}
          InputLabelProps={{
            shrink: true,
          }}
          // InputProps={{
          //   inputProps: { min: "2022-01-01" }, // Adjust the min date as needed
          // }}
        />
        <TextField
          name="end_date"
          label="End Date"
          type="date"
          value={turnoverData.end_date}
          onChange={handleInput}
          fullWidth
          mb={2}
          InputLabelProps={{
            shrink: true,
          }}
          // InputProps={{
          //   inputProps: { min: "2022-01-01" }, // Adjust the min date as needed
          // }}
        />
        <TextField
          select
          name="reason_for_leaving"
          label="Reason for Leaving"
          value={turnoverData.reason_for_leaving}
          onChange={handleInput}
          fullWidth
          required
          mb={2}
        >
          {reasonsForLeaving.map((reason) => (
            <MenuItem key={reason} value={reason}>
              {reason}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};
