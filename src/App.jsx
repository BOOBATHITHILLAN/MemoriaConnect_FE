import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ActivateUser from "./components/ActivateUser";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useContext } from "react";
import Datacontext from "./datacontext/Datacontext";

function App() {
  const { url, theme } = useContext(Datacontext);

  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage url={url} />} />
            <Route
              path="/activateuser/:id"
              element={<ActivateUser url={url} />}
            />
            <Route
              path="/forgotpassword"
              element={<ForgotPassword url={url} />}
            />
            <Route
              path="/forgotpassword/:id"
              element={<PasswordReset url={url} />}
            />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
