import { Route, Routes } from "react-router-dom";
import AppLayout from "./Components/AppLayout";
import Dashboard from "./pages/Dashboard.jsx";
import ApplicationsPage from "./pages/ApplicationsPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ApplicationDetailsPage from "./pages/ApplicationDetailsPage.jsx";


export default function App() {
  
  return (
    
      <Routes>
        <Route element={<AppLayout />} >
        <Route path="/" element={<Dashboard />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/applications/:id" element={<ApplicationDetailsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    
  );
}
