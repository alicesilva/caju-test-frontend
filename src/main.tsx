import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RegistrationDataContextProvider } from "./hooks/useFetchData";
import { ModalContextProvider } from "./hooks/useConfirmationModal";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RegistrationDataContextProvider>
    <ModalContextProvider>
      <App />
    </ModalContextProvider>
  </RegistrationDataContextProvider>
);
