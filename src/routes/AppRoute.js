import { Routes, Route } from "react-router-dom";

import TableUsers from "../components/TableUsers";
import Home from "../components/Home";
import Default from "../components/Default";
import Login from "../components/Login";
import PrivateRoute from "./PrivateRoute";

function AppRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Default />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <TableUsers />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default AppRoute;
