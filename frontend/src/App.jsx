import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

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
import GymsPage from "./pages/GymsPage";

// Admin pages
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminHomePage from "./pages/AdminHomePage";
import AdminLocationPage from "./pages/AdminLocationPage";

// components
import Navibar from "./components/NaviBar";
import UserNavBar from "./components/UserNavBar";
import AdminNavBar from "./components/AdminNavBar";
import AdminNewLocationPage from "./pages/AdminNewLocationPage";

function App() {
  const [token, setToken] = useState(
    () => localStorage.getItem("jwt token") || null,
  );
  const [adminToken, setAdminToken] = useState(
    () => localStorage.getItem("ajwt token") || null,
  );
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!token);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(!!adminToken);
  const [profile, setProfile] = useState([]);
  const [user, setUser] = useState("");
  const [locations, setLocations] = useState([]);

  // Sync localStorage with state
  useEffect(() => {
    if (token) {
      localStorage.setItem("jwt token", token);
      setIsUserLoggedIn(true);
    } else {
      localStorage.removeItem("jwt token");
      setIsUserLoggedIn(false);
    }
  }, [token]);

  useEffect(() => {
    if (adminToken) {
      localStorage.setItem("ajwt token", adminToken);
      setIsAdminLoggedIn(true);
    } else {
      localStorage.removeItem("ajwt token");
      setIsAdminLoggedIn(false);
    }
  }, [adminToken]);

  const handleLogout = () => {
    setToken(null);
  };

  const handleAdminLogout = () => {
    setAdminToken(null);
  };

  // Protect routes for users
  const UserProtectedRoute = ({ element }) => {
    return isUserLoggedIn ? element : <Navigate to="/user/login" replace />;
  };

  // Protect routes for admins
  const AdminProtectedRoute = ({ element }) => {
    return isAdminLoggedIn ? element : <Navigate to="/admin/login" />;
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
            <UserProtectedRoute
              element={<HomePage token={token} user={user} setUser={setUser} />}
            />
          }
        />

        <Route
          path="/user/profile"
          element={
            <UserProtectedRoute
              element={
                <ProfilePage
                  token={token}
                  setToken={setToken}
                  profile={profile}
                  setProfile={setProfile}
                />
              }
            />
          }
        />
        <Route
          path="/invite/:recipientId"
          element={
            <UserProtectedRoute
              element={<InvitePage token={token} setToken={setToken} />}
            />
          }
        />
        <Route
          path="/user/invitations"
          element={
            <UserProtectedRoute element={<InvitationsPage token={token} />} />
          }
        />
        <Route
          path="/user/pending"
          element={
            <UserProtectedRoute element={<PendingPage token={token} />} />
          }
        />
        <Route
          path="/user/appointments"
          element={
            <UserProtectedRoute element={<AppointmentsPage token={token} />} />
          }
        />
        <Route
          path="/user/gyms"
          element={
            <UserProtectedRoute element={<GymsPage token={token} />} />
          }
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
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute
              element={<AdminHomePage adminToken={adminToken} />}
            />
          }
        />
        <Route
          path="/admin/locations"
          element={
            <AdminProtectedRoute
              element={
                <AdminLocationPage
                  adminToken={adminToken}
                  locations={locations}
                  setLocations={setLocations}
                />
              }
            />
          }
        />
        <Route
          path="/admin/locations/create"
          element={
            <AdminProtectedRoute
              element={
                <AdminNewLocationPage
                  adminToken={adminToken}
                  locations={locations}
                  setLocations={setLocations}
                />
              }
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
