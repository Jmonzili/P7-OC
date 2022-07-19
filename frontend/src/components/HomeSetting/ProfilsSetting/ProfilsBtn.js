import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import Api from "../../../Api/users";
import { useNavigate } from "react-router-dom";
import { UidContext } from "../../Context/AppContext";

//Utilisation du props "post" définie sur le composant Posts. Structure du bouton d'accès au profil sur les posts.
const ProfilsBtn = (post) => {
  //Préparation a la navigation et récupération du context
  let navigate = useNavigate();
  const userData = useContext(UidContext);

  const handleProfilsData = async (e) => {
    e.preventDefault();

    //Récupération des données de l'API et envoie dans le local storage
    await Api.get(`posts/profile/${post.post.id}`, {}).then((res, req) => {
      const data = res;
      localStorage.setItem("profils", JSON.stringify(data));
      navigate("/profils");
    });
  };

  return (
    <div>
      {userData.userData !== post.post.userId ? (
        <>
          <Button
            variant="outline-secondary"
            aria-label="Profil : Chemin vers le profil de l'utilisateur liée à ce message"
            onClick={handleProfilsData}
            className="card-btn"
          >
            <i className="fa-solid fa-user "></i>
          </Button>{" "}
        </>
      ) : null}
    </div>
  );
};

export default ProfilsBtn;
