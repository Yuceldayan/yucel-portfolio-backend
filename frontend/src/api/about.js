// src/api/about.js
import { api } from "./http";

// Public (ziyaretçi)
export const getAbout = () => {
  return api.get("/api/v1/public/about");
};

// Admin (panel)
export const getAboutAdmin = () => {
  return api.get("/api/v1/admin/about");
};

export const updateAboutAdmin = (payload) => {
  return api.put("/api/v1/admin/about", payload);
};
