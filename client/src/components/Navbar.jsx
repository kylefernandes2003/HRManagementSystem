import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { useContext } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { ColorModeContext, tokens } from "../theme";

export const Navbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { isLoggedIn } = useAuth();

  return (
    <header>
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          paddingTop: "10px",
        }}
      >
        {/* HRMS Logo */}
        {/* <NavLink to="/" style={{ textDecoration: "none", color: colors.grey[100], gridColumn: "1" }}>
          <Typography variant="h4" fontWeight="bold">
            HRMS
          </Typography>
        </NavLink> */}

        {/* Spacer */}
        <div style={{ gridColumn: "2" }}></div>

        {/* Navigation Links */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gridColumn: "3",
          }}
        >
          {/* Dark and Light Mode Buttons */}
          <IconButton
            onClick={colorMode.toggleColorMode}
            style={{ marginLeft: "10px" }}
          >
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>

          {/* Navigation Links */}
          {isLoggedIn ? (
            <NavLink
              to="/logout"
              style={{
                marginLeft: "15px",
                textDecoration: "none",
                color: colors.grey[100],
              }}
            >
              Logout
            </NavLink>
          ) : (
            <>
              {/* <NavLink
                to="/register"
                style={{
                  marginLeft: "15px",
                  textDecoration: "none",
                  color: colors.grey[100],
                  padding: "8px 16px",
                  borderRadius: "5px",
                  border: `1px solid ${
                    theme.palette.mode === "dark" ? "#ffffff" : colors.grey[500]
                  }`,
                }}
              >
                Register
              </NavLink> */}
              <NavLink
                to="/login"
                style={{
                  marginLeft: "15px",
                  textDecoration: "none",
                  color: colors.grey[100],
                  padding: "8px 16px",
                  borderRadius: "5px",
                  border: `1px solid ${
                    theme.palette.mode === "dark" ? "#ffffff" : colors.grey[500]
                  }`,
                }}
              >
                Login
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
