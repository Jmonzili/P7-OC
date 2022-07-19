import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UidContext } from "../Context/AppContext";
import Api from "../../Api/users";

//Suppression du profil d'un utilisateur
const ProfilDelete = () => {
  let navigate = useNavigate();
  const userData = useContext(UidContext);

  const handleProfilDelete = async (e) => {
    e.preventDefault();

    if (
      window.confirm(
        `Vous vous apprêtez à supprimer votre profil, êtes-vous sûr de vouloir faire ça?`
      )
    ) {
      //Récupération des données de l'API
      await Api.delete(`users/profile/delete/${userData.userData}`, {})
        .then((res, req) => {
          alert("le profil a bien été supprimer");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/Home");
    }
  };

  return (
    <div>
      <Button
        variant="custom"
        onClick={handleProfilDelete}
        id="ok"
        className="button-update--size profil-btn"
        aria-label="Supprimer le profil : Bouton de suppression"
      >
        Supprimer le profil
      </Button>{" "}
    </div>
  );
};

export default ProfilDelete;
