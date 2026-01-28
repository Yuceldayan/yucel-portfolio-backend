// src/api/experiences.js
import { api } from "./http";

// Public
export const getExperiences = () => api.get("/api/v1/experiences");

// Admin
export const adminListExperiences = () => api.get("/api/v1/admin/experiences");
export const adminCreateExperience = (payload) =>
  api.post("/api/v1/admin/experiences", payload);
export const adminUpdateExperience = (id, payload) =>
  api.put(`/api/v1/admin/experiences/${id}`, payload);
export const adminDeleteExperience = (id) =>
  api.delete(`/api/v1/admin/experiences/${id}`);
