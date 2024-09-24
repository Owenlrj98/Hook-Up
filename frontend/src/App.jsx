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
import InvitePage from "./pages/InvitePage";
import InvitationsPage from "./pages/InvitationsPage";
import PendingPage from "./pages/PendingPage";
import AppointmentsPage from "./pages/AppointmentsPage";

//Admin pages
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminHomePage from "./pages/AdminHomePage";

// components
import Navibar from "./components/NaviBar";
import UserNavBar from "./components/UserNavBar";
import AdminNavBar from "./components/AdminNavBar";

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwt token"));
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("Ajwt token"),
  );
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!token); // use token to check if user is logged in, if token exist = user logged in
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(!!adminToken);
  const [profile, setProfile] = useState([]);
  const [user, setUser] = useState("");

  console.log(isUserLoggedIn);
  console.log(isAdminLoggedIn);

  const handleLogout = () => {
    setIsUserLoggedIn(false);
    setToken(null);
    localStorage.removeItem("jwt token"); // Clear token from local storage
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminToken(null);
    localStorage.removeItem("ajwt token");
  };

  return (
    <div className="homeContent">
      {isAdminLoggedIn ? (
        <AdminNavBar
          setIsAdminLoggedIn={setIsAdminLoggedIn}
          setAdminToken={setAdminToken}
          handleAdminLogout={handleAdminLogout}
        />
      ) : isUserLoggedIn ? (
        <UserNavBar
          setIsUserLoggedIn={setIsUserLoggedIn}
          setToken={setToken}
          handleLogout={handleLogout}
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
          element={
            <HomePage
              token={token}
              setToken={setToken}
              user={user}
              setUser={setUser}
            />
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProfilePage
              token={token}
              setToken={setToken}
              profile={profile}
              setProfile={setProfile}
            />
          }
        />
        <Route
          path="/invite/:recipientId"
          element={<InvitePage token={token} setToken={setToken} />}
        />
        <Route
          path="/user/invitations"
          element={<InvitationsPage token={token} />}
        />
        <Route path="/user/pending" element={<PendingPage token={token} />} />
        <Route
          path="/user/appointments"
          element={<AppointmentsPage token={token} />}
        />
        <Route
          path="/admin/login"
          element={
            <AdminLoginPage
              setAdminToken={setAdminToken}
              setIsAdminLoggedIn={setIsAdminLoggedIn}
            />
          }
        />
        <Route path="/admin" element={<AdminHomePage />} />
      </Routes>
    </div>
  );
}

export default App;
