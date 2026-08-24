import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import DashboardPage from './Pages/DashboardPage';
import CandidatesPage from './Pages/CandidatesPage';
import CandidateProfilePage from './Pages/CandidateProfilePage';
import SettingsPage from './Pages/SettingsPage';
import JobsPage from './Pages/JobsPage';
import CreateVacancyPage from './Pages/CreateVacancyPage';
import PrivateRoute from './Components/PrivateRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* PROTECTED DASHBOARD ROUTE */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* PROTECTED CANDIDATES ROUTE WITH TAB PARAMETER */}
        <Route
          path="/candidates/:candidateId/profile"
          element={
            <PrivateRoute>
              <CandidateProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/candidates/:tab?"
          element={
            <PrivateRoute>
              <CandidatesPage />
            </PrivateRoute>
          }
        />

        {/* PROTECTED SETTINGS ROUTE */}
        <Route
          path="/jobs"
          element={
            <PrivateRoute>
              <JobsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/jobs/create"
          element={
            <PrivateRoute>
              <CreateVacancyPage />
            </PrivateRoute>
          }
        />

        {/* PROTECTED SETTINGS ROUTE */}
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}