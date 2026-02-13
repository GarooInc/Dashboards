import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/register" element={<Register />} />

      <Route element={<PrivateRoute />}>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;
