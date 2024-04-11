import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styling/Login.css"; // Import the CSS file
import { useAuth } from "../store/auth";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const { storeTokenInLS } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log(response);
      if (response.ok) {
        alert("Login successful");
        const res_data = await response.json();
        storeTokenInLS(res_data.token);
        setUser({ email: "", password: "" });
        navigate("/");
      } else {
        setSnackbarMessage("Invalid credentials");
        setOpenSnackbar(true);
        console.log("invalid credentials");
      }
    } catch (error) {
      console.log("Login failed", error);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <>
      <section>
        <main>
          <div className="section-login">
            <div className="container grid grid-two-cols">
              <div className="login-image">
                <img
                  src="/images/login.png"
                  alt="A person logging in"
                  width="400"
                  height="500"
                />
              </div>
              <div className="login-form">
                <h1 className="main-heading mb-3">Login</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="Password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login
                  </button>
                </form>
                <p className="redirect_to_reg">
                  Don't have an account?{" "}
                  <NavLink to="/register">Register here</NavLink>
                </p>
              </div>
            </div>
          </div>
        </main>
      </section>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="error"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};
