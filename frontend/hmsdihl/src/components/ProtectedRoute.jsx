import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute(props) {
  //state
  //comportement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/login", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          props.setIsAuthenticated(true);
        } else {
          props.setIsAuthenticated(false);
        }
      } catch (error) {
        props.setIsAuthenticated(false);
        console.log(error);
      }
    };
    checkAuth();
  }, []);
  //render
  if (props.isAuthenticated === null){
    return <div>Loading ...</div>
  }
  return props.isAuthenticated? <Outlet/>:<Navigate to="/getstarted1"/>;
}

export default ProtectedRoute;
