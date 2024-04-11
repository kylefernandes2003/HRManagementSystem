import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";

export const Absent = () => {
  const [absenteeismData, setAbsenteeismData] = useState({
    user_id: "",
    date: "",
    name: "",
    department: "",
  });
  const [userIds, setUserIds] = useState([]);
  const [departments, setDepartments] = useState([
    "IT",
    "Accounting",
    "Sales",
    "Human Resources",
    "Research and Development",
  ]);

  useEffect(() => {
    const fetchUserIds = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        if (response.ok) {
          const data = await response.json();
          setUserIds(data.map((user) => user._id));
        } else {
          console.error("Failed to fetch user IDs");
        }
      } catch (error) {
        console.error("Error fetching user IDs:", error);
      }
    };

    fetchUserIds();
  }, []);

  const handleInput = async (e) => {
    const { name, value } = e.target;
    setAbsenteeismData({
      ...absenteeismData,
      [name]: value,
    });
    if (name === "user_id") {
      // Fetch user details based on selected user_id
      console.log(value);
      const response = await fetch(`http://localhost:5000/api/users/${value}`);
      console.log(response);
      if (response.ok) {
        const userData = await response.json();
        setAbsenteeismData({
          ...absenteeismData,
          name: userData.name,
          department: userData.department,
        });
      } else {
        console.error("Failed to fetch user details");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/absent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(absenteeismData),
      });
      if (response.ok) {
        alert("Absenteeism data added successfully");
        setAbsenteeismData({
          user_id: "",
          date: "",
          name: "",
          department: "",
        });
      } else {
        console.error("Failed to add absenteeism data");
      }
    } catch (error) {
      console.error("Error adding absenteeism data:", error);
    }
  };

  return (
    <Box marginLeft={10} marginRight={10} marginTop={10}>
      <Typography variant="h2" mb={2}>
        Add Absenteeism Data
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          select
          name="user_id"
          label="User ID"
          value={absenteeismData.user_id}
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
          name="date"
          label="Date"
          type="date"
          value={absenteeismData.date}
          onChange={handleInput}
          fullWidth
          required
          mb={2}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          name="name"
          label="Name"
          value={absenteeismData.name}
          onChange={handleInput}
          fullWidth
          required
          mb={2}
        />
        <TextField
          select
          name="department"
          label="Department"
          value={absenteeismData.department}
          onChange={handleInput}
          fullWidth
          required
          mb={2}
        >
          {departments.map((department) => (
            <MenuItem key={department} value={department}>
              {department}
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

export default Absent;
