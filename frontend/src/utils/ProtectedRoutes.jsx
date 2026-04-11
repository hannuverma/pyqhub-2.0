import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../services/apiClient.js";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "./constants.js";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const location = useLocation();

  useEffect(() => {
    auth().catch(() => {
      clearTokens();
      setIsAuthorized(false);
    });
  }, []);

  function clearTokens() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }

  const refreshToken = async () => {
    const token = localStorage.getItem(REFRESH_TOKEN);
    if (!token) {
      clearTokens();
      setIsAuthorized(false);
      return;
    }
    try {
      const res = await api.post("/api/token/refresh/", { refresh: token });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        clearTokens();
        setIsAuthorized(false);
      }
    } catch {
      clearTokens();
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        await refreshToken();
      } else {
        setIsAuthorized(true);
      }
    } catch {
      clearTokens();
      setIsAuthorized(false);
    }
  };

  if (isAuthorized === null) {
    return null;
  }

  return isAuthorized ? (
    children
  ) : (
    <Navigate to="/sector/login" state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
