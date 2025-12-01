import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import { Dashboard } from "./Pages/Dashboard";
import { TaskForm } from "./Components/TaskForm";
import getTheme from "./getTheme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import SignIn from "./Pages/SignIn";
import AlertComp from "./Components/AlertComp";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = getTheme(darkMode);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <AlertComp />
        <Routes>
          <Route path="/signin" element={<SignIn />} />{" "}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-task" element={<TaskForm />} />
          <Route path="/edit-task/:taskId" element={<TaskForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
