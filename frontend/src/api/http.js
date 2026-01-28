// src/api/http.js
import axios from "axios";

/**
 * Base URL
 * .env => VITE_API_BASE_URL=http://localhost:8080
 */
const baseURL = import.meta.env.VITE_API_BASE_URL ?? "";

export const api = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
  // ✅ JWT HttpOnly cookie taşımak için şart
  withCredentials: true,
});

/**
 * RESPONSE INTERCEPTOR
 * - UI için tek tip hata mesajı üretir
 */
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Bir hata oluştu";

    return Promise.reject({ ...error, uiMessage: message });
  }
);
