import { Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { UserContext } from "../context/UserContext";

function PrivateRoute({ children }) {
  const { user } = useContext(UserContext);

  if (user && !user.auth) {
    return (
      <>
        <Alert variant="danger">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>You don't have permission to access this route</p>
        </Alert>
      </>
    );
  }
  return <>{children}</>;
}

export default PrivateRoute;
