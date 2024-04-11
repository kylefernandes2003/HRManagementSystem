import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Navbar } from "./components/Navbar";

import { Logout } from "./pages/Logout";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Dashboard } from "./pages/Dashboard";
import { Team } from "./pages/Team";
import Calendar from "./pages/Calendar";
import { TurnoverForm } from "./pages/TurnoverForm";
import { PrivateRoute } from "./components/PrivateRoute";
import Bar from "./pages/Bar";
import { ResumeAnalyzer } from "./pages/ResumeAnalyzer";
import Pie from "./pages/Pie";
import Geography from "./pages/Geography";
import { Absent } from "./pages/Absent";
import Line from "./pages/Line";
import { Transaction } from "./pages/Transaction";
// import Line from "./pages/Line";
// import Geography from "./pages/Geography";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Navbar setIsSidebar={setIsSidebar} />
              <Routes>
                {/* <Route exact path="/" element={<PrivateRoute />}>
                  <Route exact path="/" element={<Home />} />
                </Route> */}

                <Route path="/login" element={<Login />} />
                {/* <Route path="/register" element={<Register />} /> */}
                <Route path="/register" element={<PrivateRoute />}>
                  <Route path="/register" element={<Register />} />
                </Route>

                <Route path="/" element={<PrivateRoute />}>
                  <Route path="/" element={<Dashboard />} />
                </Route>

                <Route path="/team" element={<PrivateRoute />}>
                  <Route path="/team" element={<Team />} />
                </Route>

                <Route path="/resume" element={<PrivateRoute />}>
                  <Route path="/resume" element={<ResumeAnalyzer />} />
                </Route>

                <Route path="/logout" element={<PrivateRoute />}>
                  <Route path="/logout" element={<Logout />} />
                </Route>

                <Route path="/calendar" element={<PrivateRoute />}>
                  <Route path="/calendar" element={<Calendar />} />
                </Route>

                <Route path="/turnover" element={<PrivateRoute />}>
                  <Route path="/turnover" element={<TurnoverForm />} />
                </Route>

                <Route path="/barchart" element={<PrivateRoute />}>
                  <Route path="/barchart" element={<Bar />} />
                </Route>

                <Route path="/piechart" element={<PrivateRoute />}>
                  <Route path="/piechart" element={<Pie />} />
                </Route>

                <Route path="/geochart" element={<PrivateRoute />}>
                  <Route path="/geochart" element={<Geography />} />
                </Route>

                <Route path="/absent" element={<PrivateRoute />}>
                  <Route path="/absent" element={<Absent />} />
                </Route>

                <Route path="/linechart" element={<PrivateRoute />}>
                  <Route path="/linechart" element={<Line />} />
                </Route>

                <Route path="/transaction" element={<PrivateRoute />}>
                  <Route path="/transaction" element={<Transaction />} />
                </Route>

                {/* <PrivateRoute path="/logout" element={<Logout />} />
                <PrivateRoute path="/team" element={<Team />} />
                <PrivateRoute path="/calendar" element={<Calendar />} />
                <PrivateRoute path="/turnover" element={<TurnoverForm />} /> */}
                {/* <Route path="/" element={<Dashboard />} /> */}
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
