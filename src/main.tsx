import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import TodoPage from "./pages/Todo.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import UserPage from "./pages/User.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </StrictMode>
    ,
  </BrowserRouter>
);
