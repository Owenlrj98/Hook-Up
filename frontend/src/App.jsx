import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

// pages
import StartPage from "./pages/StartPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import InvitationPage from "./pages/InvitationPage";
import AppointmentsPage from "./pages/AppointmentsPage";

// components
import Navibar from "./components/NaviBar";
import UserNavBar from "./components/UserNavBar";
import AdminNavBar from "./components/AdminNavBar";

function App() {
  const [token, setToken] = useState(localStorage.getItem('jwt token'));
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [profile, setProfile] = useState([]);

  return (
    <div className="homeContent">
      {isUserLoggedIn ? (
        <UserNavBar setIsUserLoggedIn={setIsUserLoggedIn} setToken={setToken} />
      ) : isAdminLoggedIn ? (
        <AdminNavBar
          setIsAdminLoggedIn={setIsAdminLoggedIn}
          setToken={setToken}
        />
      ) : (
        <Navibar />
      )}

      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route
          path="/user/signup"
          element={<SignUpPage setToken={setToken} />}
        />
        <Route
          path="/user/login"
          element={
            <LoginPage
              setToken={setToken}
              setIsUserLoggedIn={setIsUserLoggedIn}
            />
          }
        />
        <Route
          path="/user"
          element={<HomePage token={token} setToken={setToken} />}
        />
        <Route
          path="/user/profile"
          element={<ProfilePage token={token} setToken={setToken} profile={profile} setProfile={setProfile} />}
        />
        <Route
          path="/user/invitation"
          element={<InvitationPage setToken={setToken} />}
        />
        <Route
          path="/user/appointments"
          element={<AppointmentsPage setToken={setToken} />}
        />
      </Routes>
    </div>
  );
}

export default App;
