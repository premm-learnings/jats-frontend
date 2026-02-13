import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  // JWT token state
  const [token, setToken] = useState(null);

  // 👇 NEW: tracks whether auth state is initialized
  const [loading, setLoading] = useState(true);

  /*
    On app load:
    ------------
    - Check if token exists in localStorage
    - Restore it into React state
    - Mark auth as initialized
  */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    }

    // ✅ Important: auth check completed
    setLoading(false);
  }, []);

  const login = (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        loading,      // 👈 expose loading state
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
