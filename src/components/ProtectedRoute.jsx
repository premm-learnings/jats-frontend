import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {

  const { isAuthenticated, loading } = useAuth();

  /*
    While auth state is loading:
    - Do NOT redirect
    - Optionally show a loader
  */
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}
