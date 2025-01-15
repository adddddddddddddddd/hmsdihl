import React, { useState, useEffect, useCallback } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ setIsAuthenticated, isAuthenticated }) {
  // État pour gérer le chargement et les erreurs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction de vérification d'authentification avec optimisation (useCallback)
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true); // Déclenche le chargement
      const response = await fetch(
        `https://hmsdihl-api.onrender.com/auth/login?cacheBust=${Date.now()}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setError("Erreur lors de la vérification de l'authentification.");
      setIsAuthenticated(false);
    } finally {
      setLoading(false); // Fin du chargement
    }
  }, [setIsAuthenticated]);

  // Lancer la vérification au montage du composant
  useEffect(() => {
    checkAuth();
    return () => {
      setLoading(false); // Nettoyage si le composant est démonté
    };
  }, [checkAuth]);

  // Si l'application est en cours de chargement, afficher un message de loading
  if (loading) {
    return <div>Chargement...</div>;
  }

  // Si une erreur est survenue lors de la vérification, afficher un message d'erreur
  if (error) {
    return <div>{error}</div>;
  }

  // Si l'utilisateur est authentifié, afficher le contenu protégé (Outlet)
  // Sinon, rediriger vers la page de démarrage
  return isAuthenticated ? <Outlet /> : <Navigate to="/getstarted1" />;
}

export default ProtectedRoute;
