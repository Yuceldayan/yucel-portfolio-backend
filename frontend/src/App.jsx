// src/App.jsx
import { BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <Helmet>
        <title>Yücel Dayan | Full-Stack Developer</title>
        <meta
          name="description"
          content="Yücel Dayan portfolio sitesi. React ve modern web teknolojileriyle geliştirdiğim projeler, deneyimler ve iletişim."
        />
      </Helmet>

      <AppRoutes />
    </BrowserRouter>
  );
}
