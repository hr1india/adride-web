import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";

import LoginAdmin from "./screens/LoginAdmin";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem("adminToken"));
  });

  return (
    <>
      {isAuthenticated ? (
        <>
          <Navbar setIsAuthenticated={setIsAuthenticated} /> 
          <main className="py-3">
            <Container>
              <Outlet />
            </Container>
          </main>
        </>
      ) : (
        <LoginAdmin setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
};

export default App;
