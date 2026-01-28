// src/api/projects.js
import { api } from "./http";

// Public
export const getProjects = () => api.get("/api/v1/public/projects");

export const getProjectById = (id) => {
  if (id === undefined || id === null || id === "") {
    return Promise.reject(new Error("Project id gerekli"));
  }
  return api.get(`/api/v1/public/projects/${id}`);
};

// Admin (şimdilik auth yok)
export const adminCreateProject = (payload) =>
  api.post("/api/v1/admin/projects", payload);

export const adminUpdateProject = (id, payload) => {
  if (id === undefined || id === null || id === "") {
    return Promise.reject(new Error("Project id gerekli"));
  }
  return api.put(`/api/v1/admin/projects/${id}`, payload);
};

export const adminDeleteProject = (id) => {
  if (id === undefined || id === null || id === "") {
    return Promise.reject(new Error("Project id gerekli"));
  }
  return api.delete(`/api/v1/admin/projects/${id}`);
};
