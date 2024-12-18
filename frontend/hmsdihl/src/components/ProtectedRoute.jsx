import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  //state
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  //comportement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/login", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.log(error);
      }
    };
    checkAuth();
  }, []);
  //render
  if (isAuthenticated === null){
    return <div>Loading ...</div>
  }
  return isAuthenticated? <Outlet/>:<Navigate to="/getstarted1"/>;
}

export default ProtectedRoute;
