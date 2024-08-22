import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RegistrationDataContextProvider } from "./hooks/useFetchData";
import { ModalContextProvider } from "./hooks/useConfirmModal";
import { ToastContainer } from "react-toastify";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RegistrationDataContextProvider>
    <ModalContextProvider>
      <App />
    </ModalContextProvider>
  </RegistrationDataContextProvider>
);
