import "./App.scss";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppRoute from "./routes/AppRoute";
import Header from "./components/Header";

import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";

function App() {
  const { loginContext } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(
        localStorage.getItem("email"),
        localStorage.getItem("token")
      );
    }
  }, []);
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoute />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
}

export default App;
