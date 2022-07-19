import React, { useContext, useState, useEffect } from "react";
import { UidContext } from "../components/Context/AppContext";
import ProfilDelete from "./ProfilSetting/ProfilDelete";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Api from "../Api/users";
import jwt_decode from "jwt-decode";

//Sous structure de la page Profil
const ProfilHandle = () => {
  //Récupération des données de l'utilisateur connecté avec use context
  const userData = useContext(UidContext);

  const [profils, setProfils] = useState();
  const [newProfil, setNewProfil] = useState({
    bio: "",
    attachment: "",
  });
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;

  const handleProfils = () => {
    Api.get(`users/profile/${userId}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
      .then((res) => {
        setProfils(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!profils) {
      handleProfils();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profils]);

  const handleProfilUpdate = async (e) => {
    e.preventDefault();

    //Préparation des données du formulaire
    const formData = new FormData();
    formData.append("bio", newProfil.bio);
    formData.append("attachment", newProfil.attachment);

    if (newProfil.attachment !== "") {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}api/users/profile/update/${userId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          handleProfils();
        })
        .catch((err) => {
          console.log(err);
          alert("taille d'image maximal atteinte: 600ko");
        });
    } else {
      alert(
        "Veuillez sélectionner une nouvelle image ou fermer l'onglet de modification"
      );
    }
  };

  const handleProfil = (e) => {
    if (e.target.name !== "attachment") {
      setNewProfil({ ...newProfil, [e.target.name]: e.target.value });
    } else {
      setNewProfil({
        ...newProfil,
        attachment: e.target.files[0],
      });
    }
  };

  const [profilUpdateBtn, setProfilUpdateBtn] = useState(false);

  const profilUpdateModals = (e) => {
    if (e.target.id === "ok") {
      setProfilUpdateBtn(true);
    } else if (e.target.id === "ko") {
      setProfilUpdateBtn(false);
    }
  };

  return (
    <>
      <div className="profil">
        <div className="profil_card">
          {userData.userAttachment ? (
            <div className="profil_image-container">
              {profils ? (
                <img
                  src={profils.user.attachment}
                  alt="photographie de l'utilisateur"
                  className="profil_card--img"
                />
              ) : (
                <img
                  src={userData.userAttachment}
                  alt="photographie de l'utilisateur"
                  className="profil_card--img"
                />
              )}
              <div className="profil_image-container--none">
                {profils
                  ? (userData.userAttachment = profils.user.attachment)
                  : null}
              </div>
            </div>
          ) : (
            <div className="profil_image-containerEmpty">
              {profils
                ? (userData.userAttachment = profils.user.attachment)
                : null}
            </div>
          )}
          <h4 className="profil_title">
            {!profils ? userData.username : profils.user.username}
          </h4>
          <div className="profil_body-container">
            <div className="button-container">
              <div className="button-update">
                <>
                  <div className="button-update--container">
                    <Button
                      variant="custom"
                      onClick={profilUpdateModals}
                      id="ok"
                      className="button-update--size profil-btn"
                      aria-label="Modifier le profil : Bouton de modification"
                    >
                      modifier le profil
                    </Button>{" "}
                    <Button
                      variant="custom"
                      className="profil-btn"
                      onClick={profilUpdateModals}
                      id="ko"
                    >
                      X
                    </Button>{" "}
                  </div>
                  {profilUpdateBtn !== false ? (
                    <div>
                      <Form
                        action=""
                        onSubmit={handleProfilUpdate}
                        method="put"
                        id="sign-up-form"
                        className="form_log"
                        encType="multipart/form-data"
                      >
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="bio">Biographie</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={profils.user.bio}
                            onChange={(e) => handleProfil(e)}
                            id="bio"
                            name="bio"
                            aria-labelledby="bio"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="attachment">
                            Photographie *
                          </Form.Label>
                          <Form.Control
                            type="file"
                            onChange={(e) => handleProfil(e)}
                            id="attachment"
                            name="attachment"
                            aria-labelledby="attachment"
                          />
                        </Form.Group>
                        <h6>* Champs obligatoire</h6>
                        <Button
                          variant="custom"
                          type="submit"
                          value="Valider inscription"
                          aria-label="Valider les modifications : Envoie du formulaire"
                        >
                          Valider les modifications
                        </Button>
                      </Form>
                    </div>
                  ) : null}
                </>
              </div>
            </div>
            <div className="profil-section">
              <h4>Biographie</h4>
              <p>{!profils ? userData.userBio : profils.user.bio}</p>
              <div>
                <h4>Contact</h4>
                <p>{!profils ? userData.userEmail : profils.user.email}</p>
              </div>
              <div>
                <h4>Status</h4>
                {userData.userAdmin === true ? (
                  <p>Je suis un modérateur de Groupomania</p>
                ) : (
                  <p>Je suis un simple utilisateur de Groupomania</p>
                )}
              </div>
              <div className="profil-section_delete profil-btn deleteBtn">
                <ProfilDelete />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilHandle;
