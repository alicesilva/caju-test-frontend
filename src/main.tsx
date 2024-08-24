import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RegistrationDataContextProvider } from "~/components/contexts/RegistrationData";
import { ModalContextProvider } from "~/components/contexts/ModalContext";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RegistrationDataContextProvider>
    <ModalContextProvider>
      <App />
    </ModalContextProvider>
  </RegistrationDataContextProvider>
);
