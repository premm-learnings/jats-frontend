import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import Jobs from "./pages/Jobs";
import CreateJob from "./pages/CreateJob";
import OverdueFollowUps from "./pages/OverdueFollowUps";
import Analytics from "./pages/Analytics";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/followups/overdue" element={<OverdueFollowUps />} />
        <Route path="/analytics" element={<Analytics />} />



        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* 🔥 ADD THIS BLOCK EXACTLY HERE 🔥 */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Jobs />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
  path="/jobs/new"
  element={
    <ProtectedRoute>
      <AppLayout>
        <CreateJob />
      </AppLayout>
    </ProtectedRoute>
  }
/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
