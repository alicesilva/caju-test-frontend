import Router from "~/router";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Header />
      <Router />
      <ToastContainer limit={1}/> 
    </>
  );
}

export default App;
