import React from "react";
import Header from "../components/nav/Header";
import ProfilHandle from "../components/ProfilHandle";
import ScrollBtn from "../components/ScrollBtn";

//Page de profil de l'utilisateur connecté
const Profil = () => {
  return (
    <div className="profil-body">
      <Header />
      <ProfilHandle />
      <ScrollBtn />
    </div>
  );
};

export default Profil;
