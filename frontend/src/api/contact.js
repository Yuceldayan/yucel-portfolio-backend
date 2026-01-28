// src/api/contact.js
import { api } from "./http";

// Public: Contact form -> mesaj gönder
export const sendContact = (payload) => {
  return api.post("/api/v1/contact", payload);
  // veya backend’in controller'ına göre:
  // return api.post("/api/v1/contact/send", payload);
};

// Admin: Gelen mesajları listele
export const adminListContacts = () => {
  return api.get("/api/v1/admin/contacts");
};
