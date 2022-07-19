import React, { useContext } from "react";
import { UidContext } from "../../components/Context/AppContext";
import Navigation from "./Navigation";
import Sticky from "react-sticky-el";

//Structure du Header de l'application
const Header = () => {
  //Récupération du context
  const userData = useContext(UidContext);

  return (
    <div className="header-container">
      <div className="header-container_items">
        <img
          src="./img/icon-left-font-monochrome-white.png"
          alt="logo de l'entreprise groupomania"
          className="header-container_picture"
        />
        <h2 className="header-container_title">{userData.username}</h2>
      </div>
      <Sticky>
        <div className="header-container_link">
          <Navigation />
        </div>
      </Sticky>
    </div>
  );
};

export default Header;
