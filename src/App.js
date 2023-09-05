import "./App.scss";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Link } from "react-router-dom";

import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import Home from "./components/Home";

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/users" element={<TableUsers />}></Route>
          </Routes>
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
