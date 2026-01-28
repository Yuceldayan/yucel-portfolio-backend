// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";

import AdminProjectsPage from "../pages/AdminProjectsPage";
import AdminContactsPage from "../pages/AdminContactsPage";
import AdminAboutPage from "../pages/AdminAboutPage";
import AdminExperiencesPage from "../pages/AdminExperiencesPage";

import AdminGate from "../components/AdminGate";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />

        {/* ✅ /admin yazınca admin projects'e atsın */}
        <Route path="/admin" element={<Navigate to="/admin/projects" replace />} />

        {/* ADMIN */}
        <Route
          path="/admin/projects"
          element={
            <AdminGate>
              <AdminProjectsPage />
            </AdminGate>
          }
        />

        <Route
          path="/admin/contacts"
          element={
            <AdminGate>
              <AdminContactsPage />
            </AdminGate>
          }
        />

        <Route
          path="/admin/about"
          element={
            <AdminGate>
              <AdminAboutPage />
            </AdminGate>
          }
        />

        <Route
          path="/admin/experiences"
          element={
            <AdminGate>
              <AdminExperiencesPage />
            </AdminGate>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
