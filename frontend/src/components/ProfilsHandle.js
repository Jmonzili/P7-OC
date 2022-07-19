import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { UidContext } from "./Context/AppContext";
import ProfilsAdminDelete from "./ProfilSetting/ProfilsAdminDelete";

//Sous structure de la page Profils, profil des autres utilisateurs
const ProfilsHandle = () => {
  const userData = useContext(UidContext);
  //Récupération des données de profil dans le local storage
  let profils = JSON.parse(localStorage.getItem("profils"));

  return (
    <div className="profil">
      <div className="profil_card">
        <div className="profil_image-container">
          {" "}
          {profils.data.user.attachment ? (
            <img
              src={profils.data.user.attachment}
              alt="photographie de l'utilisateur"
              className="profil_card--img"
            />
          ) : null}
        </div>

        <h4 className="profil_title">{profils.data.user.username}</h4>
        <div className="profil_body-container">
          <div className="button-container">
            <Button
              variant="custom"
              className="profil_body-container--button"
              aria-label="Follow : Bouton destiné à la fonctionnalité de suivi des utilisateurs de Groupomania"
            >
              Follow
            </Button>
          </div>
          <div className="profil-section">
            <h4>Biographie</h4>
            <p>{profils.data.user.bio}</p>
            <div>
              <h4>Contact</h4>
              <p>{profils.data.user.email}</p>
            </div>
            <div>
              <h4>Status</h4>
              {profils.data.user.isAdmin === true ? (
                <p>Je suis un modérateur de Groupomania</p>
              ) : (
                <p>Je suis un simple utilisateur de Groupomania</p>
              )}
            </div>
            {userData.userAdmin ? (
              <div className="profil-section_delete">
                <ProfilsAdminDelete />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilsHandle;
