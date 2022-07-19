import React from "react";
import { NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode";

//Structure de la navBarre de l'application

const handleTestToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwt_decode(localStorage.getItem("token"));
    const dateNow = new Date();
    if (decodedToken.exp > dateNow / 1000) {
    } else {
      localStorage.clear();
      alert(
        "Vous avez dépasser la durée limite de connexion (24h), vous allez maintenant etre dirigé vers la page de connexion afin de vous authentifié"
      );
      window.location = "/";
    }
  }
};

const Navigation = () => {
  return (
    <div className="navigation">
      <div className="navigation_link">
        <NavLink
          to="/home"
          aria-label="Navigation : Chemin vers la page d'accueil"
          className={(nav) => (nav.isActive ? "nav-active" : "nav-passive")}
          onClick={handleTestToken}
        >
          <i className="fa-solid fa-house "></i>
        </NavLink>

        <NavLink
          to="/profil"
          aria-label="Navigation : Chemin vers la page de profil"
          className={(nav) => (nav.isActive ? "nav-active" : "nav-passive")}
          onClick={handleTestToken}
        >
          <i className="fa-solid fa-user "></i>
        </NavLink>

        <NavLink
          to="/reseau"
          aria-label="Navigation : Chemin vers la page reseau"
          className={(nav) => (nav.isActive ? "nav-active" : "nav-passive")}
          onClick={handleTestToken}
        >
          <i className="fa-solid fa-user-group "></i>
        </NavLink>

        <NavLink
          to="/signOut"
          aria-label="Navigation : Chemin vers la page de deconnexion"
          className={(nav) => (nav.isActive ? "nav-active" : "nav-passive")}
          onClick={handleTestToken}
        >
          <i className="fa-solid fa-arrow-right-from-bracket "></i>
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
