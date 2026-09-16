import { useState } from "react";

const ADMIN_USERNAME = "GameMaster";
const ADMIN_PASSWORD = "WestSyde2026";
const ADMIN_STORAGE_KEY = "westsyde_admin_auth";

function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem(ADMIN_STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const login = (username, password) => {
    const valid =
      username.trim() === ADMIN_USERNAME &&
      password === ADMIN_PASSWORD;

    if (!valid) {
      return {
        success: false,
        error: "Invalid Game Master credentials.",
      };
    }

    try {
      localStorage.setItem(ADMIN_STORAGE_KEY, "true");
    } catch {
      // Continue with the in-memory login if storage is unavailable.
    }

    setIsAdmin(true);

    return {
      success: true,
    };
  };

  const logout = () => {
    try {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    } catch {
      // Continue with the in-memory logout.
    }

    setIsAdmin(false);
  };

  return {
    isAdmin,
    login,
    logout,
  };
}

export default useAdminAuth;